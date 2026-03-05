import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["cursorDot", "cursorOutline", "magneticElement", "glowTrail"]

  connect() {
    this.mouseX = 0
    this.mouseY = 0
    this.dotX = 0
    this.dotY = 0
    this.outlineX = 0
    this.outlineY = 0
    this.isHovering = false
    this.trailPositions = []
    this.maxTrails = 8
    this.animationFrame = null
    this.startAnimation()
  }

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  move(event) {
    if (window.innerWidth < 768) return
    
    const rect = this.element.getBoundingClientRect()
    this.mouseX = event.clientX - rect.left
    this.mouseY = event.clientY - rect.top

    // Add trail position
    this.trailPositions.push({ x: this.mouseX, y: this.mouseY, timestamp: Date.now() })
    if (this.trailPositions.length > this.maxTrails) {
      this.trailPositions.shift()
    }

    // Magnetic effect for interactive elements
    this.magneticElementTargets.forEach(element => {
      const elementRect = element.getBoundingClientRect()
      const elementCenterX = elementRect.left + elementRect.width / 2 - rect.left
      const elementCenterY = elementRect.top + elementRect.height / 2 - rect.top
      
      const distance = Math.sqrt(
        Math.pow(this.mouseX - elementCenterX, 2) + 
        Math.pow(this.mouseY - elementCenterY, 2)
      )
      
      const magneticRadius = 120
      
      if (distance < magneticRadius) {
        const strength = (magneticRadius - distance) / magneticRadius
        const pullX = (this.mouseX - elementCenterX) * strength * 0.3
        const pullY = (this.mouseY - elementCenterY) * strength * 0.3
        
        element.style.transform = `translate(${pullX}px, ${pullY}px) scale(${1 + strength * 0.1})`
        element.style.filter = `brightness(${1 + strength * 0.2})`
      } else {
        element.style.transform = 'translate(0px, 0px) scale(1)'
        element.style.filter = 'brightness(1)'
      }
    })
  }

  startAnimation() {
    const animate = () => {
      // Smooth cursor follow
      const dotEasing = 0.18
      const outlineEasing = 0.08
      
      this.dotX += (this.mouseX - this.dotX) * dotEasing
      this.dotY += (this.mouseY - this.dotY) * dotEasing
      
      this.outlineX += (this.mouseX - this.outlineX) * outlineEasing
      this.outlineY += (this.mouseY - this.outlineY) * outlineEasing

      if (this.hasCursorDotTarget) {
        this.cursorDotTarget.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`
      }

      if (this.hasCursorOutlineTarget) {
        this.cursorOutlineTarget.style.transform = `translate(${this.outlineX}px, ${this.outlineY}px)`
      }

      // Render glow trails
      if (this.hasGlowTrailTarget) {
        this.glowTrailTargets.forEach((trail, index) => {
          const position = this.trailPositions[index]
          if (position) {
            const age = Date.now() - position.timestamp
            const opacity = Math.max(0, 1 - age / 800)
            const scale = 1 - (index / this.maxTrails) * 0.5
            
            trail.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`
            trail.style.opacity = opacity * 0.4
          } else {
            trail.style.opacity = '0'
          }
        })
      }

      this.animationFrame = requestAnimationFrame(animate)
    }

    this.animationFrame = requestAnimationFrame(animate)
  }

  enterMagnetic(event) {
    const element = event.currentTarget
    element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease'
  }

  leaveMagnetic(event) {
    const element = event.currentTarget
    element.style.transform = 'translate(0px, 0px) scale(1)'
    element.style.filter = 'brightness(1)'
  }
}
