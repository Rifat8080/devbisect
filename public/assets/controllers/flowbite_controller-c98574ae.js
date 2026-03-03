import { Controller } from "@hotwired/stimulus"
import { initFlowbite } from "flowbite"

export default class extends Controller {
  connect() {
    this.initializeFlowbite()
  }

  initializeFlowbite() {
    // Initialize flowbite components
    if (window.Flowbite) {
      window.Flowbite.init()
    } else {
      initFlowbite()
    }
  }
}
