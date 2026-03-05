import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "vertical", "horizontal"]

  connect() {
    this.isVisible = false
  }

  enter(event) {
    if (window.innerWidth < 768) return

    const rect = this.element.getBoundingClientRect()
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)

    this.isVisible = true
    this.overlayTarget.classList.remove("opacity-0")
    this.overlayTarget.classList.add("opacity-100")

    this.horizontalTarget.style.transform = `translateY(${y}px)`
    this.updateVertical(event.clientX, rect)
  }

  leave() {
    this.isVisible = false
    this.overlayTarget.classList.remove("opacity-100")
    this.overlayTarget.classList.add("opacity-0")
  }

  move(event) {
    if (window.innerWidth < 768 || !this.isVisible) return

    const rect = this.element.getBoundingClientRect()
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)
    this.horizontalTarget.style.transform = `translateY(${y}px)`
    this.updateVertical(event.clientX, rect)
  }

  updateVertical(clientX, rect) {
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const leftRackX = rect.width * 0.11
    const rightRackX = rect.width * 0.89
    const snapX = Math.abs(x - leftRackX) <= Math.abs(x - rightRackX) ? leftRackX : rightRackX
    this.verticalTarget.style.transform = `translateX(${snapX}px)`
  }
}
