import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]

  selectTab(event) {
    const index = event.currentTarget.dataset.tabIndex

    // Update tab active state
    this.tabTargets.forEach((tab, i) => {
      if (i == index) {
        tab.classList.add("bg-gray-800/50", "text-blue-400")
        tab.classList.remove("text-gray-400", "hover:bg-gray-800/50")
      } else {
        tab.classList.remove("bg-gray-800/50", "text-blue-400")
        tab.classList.add("text-gray-400", "hover:bg-gray-800/50")
      }
    })

    // Update panel visibility
    this.panelTargets.forEach((panel, i) => {
      if (i == index) {
        panel.classList.remove("hidden")
      } else {
        panel.classList.add("hidden")
      }
    })
  }
}
