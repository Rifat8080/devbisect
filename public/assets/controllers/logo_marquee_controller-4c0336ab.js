import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track", "group"]

  connect() {
    this.offset = 0
    this.paused = false
    this.animationFrame = null
    this.speed = window.innerWidth < 640 ? 0.45 : 0.65

    // Start animation immediately on next tick
    setTimeout(() => {
      this.groupWidth = this.groupTarget.scrollWidth
      this.start()
    }, 0)
  }

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
  }

  start() {
    if (!this.groupWidth) return

    const tick = () => {
      if (!this.paused) {
        this.offset -= this.speed

        if (Math.abs(this.offset) >= this.groupWidth) {
          this.offset += this.groupWidth
        }

        this.trackTarget.style.transform = `translate3d(${this.offset}px, 0, 0)`
      }

      this.animationFrame = requestAnimationFrame(tick)
    }

    this.animationFrame = requestAnimationFrame(tick)
  }
}
