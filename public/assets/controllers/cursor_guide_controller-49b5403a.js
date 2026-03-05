import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "vertical", "horizontal"]

  connect() {
    this.isVisible = false
  }

  enter(event) {
    if (window.innerWidth < 768) return

    const rect = this.element.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)

    this.isVisible = true
    this.overlayTarget.classList.remove("opacity-0")
    this.overlayTarget.classList.add("opacity-100")

    this.verticalTarget.style.transform = `translateX(${x}px)`
    this.horizontalTarget.style.transform = `translateY(${y}px)`
  }

  leave() {
    this.isVisible = false
    this.overlayTarget.classList.remove("opacity-100")
    this.overlayTarget.classList.add("opacity-0")
  }

  move(event) {
    if (window.innerWidth < 768 || !this.isVisible) return

    const rect = this.element.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)
    this.verticalTarget.style.transform = `translateX(${x}px)`
    this.horizontalTarget.style.transform = `translateY(${y}px)`
  }
}
