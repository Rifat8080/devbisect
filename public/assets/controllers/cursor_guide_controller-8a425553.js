import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "vertical", "horizontal", "trigger"]

  connect() {
    this.isVisible = false
    this.threshold = 15 // pixels tolerance around the line
  }

  enter(event) {
    this.updateGuide(event)
  }

  leave() {
    this.hideGuide()
  }

  move(event) {
    if (window.innerWidth < 768) return
    this.updateGuide(event)
  }

  updateGuide(event) {
    const rect = this.element.getBoundingClientRect()
    const triggerRect = this.triggerTarget.getBoundingClientRect()
    
    const lineY = triggerRect.top - rect.top
    const mouseY = event.clientY - rect.top
    const distance = Math.abs(mouseY - lineY)

    if (distance <= this.threshold) {
      const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
      
      if (!this.isVisible) {
        this.isVisible = true
        this.overlayTarget.classList.remove("opacity-0")
        this.overlayTarget.classList.add("opacity-100")
      }

      this.verticalTarget.style.transform = `translateX(${x}px)`
      this.horizontalTarget.style.transform = `translateY(${lineY}px)`
    } else if (this.isVisible) {
      this.hideGuide()
    }
  }

  hideGuide() {
    this.isVisible = false
    this.overlayTarget.classList.remove("opacity-100")
    this.overlayTarget.classList.add("opacity-0")
  }
}
