import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "vertical", "horizontal"]

  connect() {
    this.frame = null
    this.latestEvent = null
    this.isVisible = false
  }

  disconnect() {
    if (this.frame) cancelAnimationFrame(this.frame)
  }

  enter() {
    if (window.innerWidth < 768) return

    this.isVisible = true
    this.overlayTarget.classList.remove("opacity-0")
    this.overlayTarget.classList.add("opacity-100")
  }

  leave() {
    this.isVisible = false
    this.overlayTarget.classList.remove("opacity-100")
    this.overlayTarget.classList.add("opacity-0")
  }

  move(event) {
    if (window.innerWidth < 768 || !this.isVisible) return

    this.latestEvent = event
    if (this.frame) return

    this.frame = requestAnimationFrame(() => {
      const rect = this.element.getBoundingClientRect()
      const x = Math.min(Math.max(this.latestEvent.clientX - rect.left, 0), rect.width)
      const y = Math.min(Math.max(this.latestEvent.clientY - rect.top, 0), rect.height)

      const leftRackX = rect.width * 0.11
      const rightRackX = rect.width * 0.89
      const snapX = Math.abs(x - leftRackX) <= Math.abs(x - rightRackX) ? leftRackX : rightRackX

      this.verticalTarget.style.transform = `translateX(${snapX}px)`
      this.horizontalTarget.style.transform = `translateY(${y}px)`

      this.frame = null
    })
  }
}
