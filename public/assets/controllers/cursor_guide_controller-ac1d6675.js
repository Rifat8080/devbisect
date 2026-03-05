import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "leftLine", "rightLine"]

  connect() {
    this.isVisible = false
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
}
