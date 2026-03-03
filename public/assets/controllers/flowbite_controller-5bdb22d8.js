import { Controller } from "@hotwired/stimulus"
import * as Flowbite from "flowbite"

export default class extends Controller {
  connect() {
    this.initializeComponents()
  }

  initializeComponents() {
    try {
      // Initialize all Flowbite components
      if (typeof Flowbite !== 'undefined') {
        Flowbite.initDropdowns?.()
        Flowbite.initModals?.()
        Flowbite.initAccordions?.()
        Flowbite.initCollapses?.()
        Flowbite.initTooltips?.()
        Flowbite.initPopovers?.()
        Flowbite.initDials?.()
        Flowbite.initTabs?.()
        Flowbite.initCarousels?.()
        Flowbite.initDatepickers?.()
        Flowbite.initRangeSliders?.()
        Flowbite.initCopyClipboard?.()
        Flowbite.initCounting?.()
        Flowbite.initDismisses?.()
        Flowbite.initCheckboxes?.()
        Flowbite.initNavbars?.()
        Flowbite.initSizeButtons?.()
        Flowbite.initToggle?.()
      }
    } catch (e) {
      console.warn('Flowbite initialization warning:', e)
    }
  }
}
