// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Import Flowbite
import * as Flowbite from "flowbite"

// Function to initialize Flowbite components
function initializeFlowbite() {
  if (window.Flowbite) {
    window.Flowbite.init()
  } else if (typeof Flowbite !== 'undefined' && Flowbite.initDropdowns) {
    Flowbite.initDropdowns()
    Flowbite.initModals()
    Flowbite.initAccordions()
    Flowbite.initCollapses()
    Flowbite.initTooltips()
    Flowbite.initPopovers()
    Flowbite.initDials()
    Flowbite.initTabs()
    Flowbite.initCarousels()
    Flowbite.initDatepickers()
    Flowbite.initRangeSliders()
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeFlowbite()
})

// Re-initialize on Turbo page navigation
document.addEventListener("turbo:load", () => {
  initializeFlowbite()
})

// Re-initialize after Turbo streams update
document.addEventListener("turbo:before-stream-render", () => {
  initializeFlowbite()
})
