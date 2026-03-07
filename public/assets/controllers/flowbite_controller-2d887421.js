import { Controller } from "@hotwired/stimulus"
import * as Flowbite from "flowbite"

export default class extends Controller {
  connect() {
    this.initializeComponents()
    this.initializeBackToTop()
  }

  disconnect() {
    if (this.backToTopHandler) {
      window.removeEventListener('scroll', this.backToTopHandler)
      window.removeEventListener('resize', this.backToTopHandler)
    }
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

  initializeBackToTop() {
    this.backToTopButton = this.element.querySelector('[data-back-to-top="button"]')
    this.backToTopProgress = this.element.querySelector('[data-back-to-top="progress"]')

    if (!this.backToTopButton || !this.backToTopProgress) return

    this.radius = 22
    this.circumference = 2 * Math.PI * this.radius
    this.backToTopProgress.setAttribute('stroke-dasharray', `${this.circumference}`)
    this.backToTopProgress.setAttribute('stroke-dashoffset', `${this.circumference}`)

    this.backToTopHandler = this.updateBackToTop.bind(this)
    window.addEventListener('scroll', this.backToTopHandler, { passive: true })
    window.addEventListener('resize', this.backToTopHandler)
    this.updateBackToTop()
  }

  updateBackToTop() {
    if (!this.backToTopButton || !this.backToTopProgress) return

    const heroSection = document.getElementById('hero')
    const fallbackTrigger = 320
    const triggerPoint = heroSection
      ? (heroSection.offsetTop + heroSection.offsetHeight - 120)
      : fallbackTrigger

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? Math.max(0, Math.min(scrollTop / scrollHeight, 1)) : 0

    const dashOffset = this.circumference * (1 - progress)
    this.backToTopProgress.setAttribute('stroke-dashoffset', `${dashOffset}`)

    this.backToTopProgress.classList.remove('stroke-blue-400', 'stroke-indigo-400', 'stroke-cyan-300')
    if (progress < 0.34) {
      this.backToTopProgress.classList.add('stroke-blue-400')
    } else if (progress < 0.67) {
      this.backToTopProgress.classList.add('stroke-indigo-400')
    } else {
      this.backToTopProgress.classList.add('stroke-cyan-300')
    }

    const isVisible = scrollTop >= triggerPoint
    this.backToTopButton.classList.toggle('opacity-0', !isVisible)
    this.backToTopButton.classList.toggle('translate-y-3', !isVisible)
    this.backToTopButton.classList.toggle('pointer-events-none', !isVisible)
    this.backToTopButton.classList.toggle('opacity-100', isVisible)
    this.backToTopButton.classList.toggle('translate-y-0', isVisible)
  }
}
