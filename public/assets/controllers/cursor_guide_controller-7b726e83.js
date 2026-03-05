import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "lineTopLeft", "lineTopRight", "lineBottomLeft", "lineBottomRight"]

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

      this.lineTopLeftTarget.setAttribute("x2", `${x}`)
      this.lineTopLeftTarget.setAttribute("y2", `${y}`)

      this.lineTopRightTarget.setAttribute("x1", `${rect.width}`)
      this.lineTopRightTarget.setAttribute("y1", "0")
      this.lineTopRightTarget.setAttribute("x2", `${x}`)
      this.lineTopRightTarget.setAttribute("y2", `${y}`)

      this.lineBottomLeftTarget.setAttribute("x1", "0")
      this.lineBottomLeftTarget.setAttribute("y1", `${rect.height}`)
      this.lineBottomLeftTarget.setAttribute("x2", `${x}`)
      this.lineBottomLeftTarget.setAttribute("y2", `${y}`)

      this.lineBottomRightTarget.setAttribute("x1", `${rect.width}`)
      this.lineBottomRightTarget.setAttribute("y1", `${rect.height}`)
      this.lineBottomRightTarget.setAttribute("x2", `${x}`)
      this.lineBottomRightTarget.setAttribute("y2", `${y}`)

      this.frame = null
    })
  }
}
