import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["vertical", "horizontal"]

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
    this.verticalTarget.classList.remove("opacity-0")
    this.verticalTarget.classList.add("opacity-100")
    this.horizontalTarget.classList.remove("opacity-0")
    this.horizontalTarget.classList.add("opacity-100")
  }

  leave() {
    this.isVisible = false
    this.verticalTarget.classList.remove("opacity-100")
    this.verticalTarget.classList.add("opacity-0")
    this.horizontalTarget.classList.remove("opacity-100")
    this.horizontalTarget.classList.add("opacity-0")
  }

  move(event) {
    if (window.innerWidth < 768 || !this.isVisible) return

    this.latestEvent = event
    if (this.frame) return

    this.frame = requestAnimationFrame(() => {
      const rect = this.element.getBoundingClientRect()
      const x = Math.min(Math.max(this.latestEvent.clientX - rect.left, 0), rect.width)
      const y = Math.min(Math.max(this.latestEvent.clientY - rect.top, 0), rect.height)

      this.verticalTarget.style.transform = `translateX(${x}px)`
      this.horizontalTarget.style.transform = `translateY(${y}px)`

      this.frame = null
    })
  }
}
