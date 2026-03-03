// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import { initFlowbite } from "flowbite"
import "controllers"

// Initialize Flowbite components
function initializeFlowbite() {
  initFlowbite()
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
