// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import { initFlowbite } from "flowbite"
import "controllers"

// Initialize Flowbite on page load
document.addEventListener("turbo:load", () => {
  initFlowbite()
})

// Initialize Flowbite on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initFlowbite()
})
