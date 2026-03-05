import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["spotlight", "gradient", "floatingIcon"]

  connect() {
    this.mouseX = 0
    this.mouseY = 0
    this.currentX = 0
    this.currentY = 0
    this.isHovering = false
    this.animationFrame = null
    this.startAnimation()
  }

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  enter(event) {
    if (window.innerWidth < 768) return
    this.isHovering = true
    if (this.hasSpotlightTarget) {
      this.spotlightTarget.style.opacity = '1'
    }
  }

  leave() {
    this.isHovering = false
    if (this.hasSpotlightTarget) {
      this.spotlightTarget.style.opacity = '0'
    }
  }

  move(event) {
    if (window.innerWidth < 768) return
    
    const rect = this.element.getBoundingClientRect()
    this.mouseX = event.clientX - rect.left
    this.mouseY = event.clientY - rect.top
  }

  startAnimation() {
    const animate = () => {
      // Smooth easing for spotlight
      const easing = 0.15
      this.currentX += (this.mouseX - this.currentX) * easing
      this.currentY += (this.mouseY - this.currentY) * easing

      if (this.hasSpotlightTarget && this.isHovering) {
        this.spotlightTarget.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`
      }

      // Subtle parallax for gradient layers
      if (this.hasGradientTarget) {
        const offsetX = (this.currentX - window.innerWidth / 2) * 0.02
        const offsetY = (this.currentY - window.innerHeight / 2) * 0.02
        this.gradientTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      }

      // Floating animation for icons
      if (this.hasFloatingIconTarget) {
        this.floatingIconTargets.forEach((icon, index) => {
          const time = Date.now() * 0.001
          const offset = index * 0.5
          const floatY = Math.sin(time + offset) * 8
          const floatX = Math.cos(time * 0.8 + offset) * 5
          icon.style.transform = `translate(${floatX}px, ${floatY}px)`
        })
      }

      this.animationFrame = requestAnimationFrame(animate)
    }

    this.animationFrame = requestAnimationFrame(animate)
  }
}
