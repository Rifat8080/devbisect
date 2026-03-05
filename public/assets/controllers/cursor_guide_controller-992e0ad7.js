import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["cursorRing", "cursorDot", "glowRing", "particle", "ripple", "magneticElement"]

  connect() {
    this.mouseX = 0
    this.mouseY = 0
    this.ringX = 0
    this.ringY = 0
    this.dotX = 0
    this.dotY = 0
    this.glowX = 0
    this.glowY = 0
    this.isHovering = false
    this.rippleIndex = 0
    this.particles = []
    this.animationFrame = null
    
    // Initialize particle positions
    if (this.hasParticleTarget) {
      this.particleTargets.forEach(() => {
        this.particles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0 })
      })
    }
    
    this.startAnimation()
    
    // Add click listener for ripple effect
    document.addEventListener('click', this.createRipple.bind(this))
    
    // Add hover listeners for interactive elements
    document.addEventListener('mouseenter', this.handleHover.bind(this), true)
    document.addEventListener('mouseleave', this.handleLeave.bind(this), true)
  }

  disconnect() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }

  move(event) {
    if (window.innerWidth < 768) return
    
    this.mouseX = event.clientX
    this.mouseY = event.clientY
    
    // Create particle trail
    if (Math.random() > 0.7 && this.hasParticleTarget) {
      const availableParticle = this.particles.findIndex(p => p.life <= 0)
      if (availableParticle !== -1) {
        this.particles[availableParticle] = {
          x: this.mouseX,
          y: this.mouseY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1
        }
      }
    }
  }
  
  handleHover(event) {
    const target = event.target
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-cursor-guide-target="magneticElement"]')) {
      this.isHovering = true
    }
  }
  
  handleLeave(event) {
    const target = event.target
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-cursor-guide-target="magneticElement"]')) {
      this.isHovering = false
    }
  }

  createRipple(event) {
    if (window.innerWidth < 768 || !this.hasRippleTarget) return
    
    const ripple = this.rippleTargets[this.rippleIndex]
    this.rippleIndex = (this.rippleIndex + 1) % this.rippleTargets.length
    
    const x = event.clientX
    const y = event.clientY
    
    ripple.style.transform = `translate(${x}px, ${y}px) scale(0.2)`
    ripple.style.opacity = '0.8'
    ripple.style.borderColor = 'rgba(59, 130, 246, 0.8)'
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.transition = 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)'
      ripple.style.transform = `translate(${x}px, ${y}px) scale(4)`
      ripple.style.opacity = '0'
      ripple.style.borderColor = 'rgba(59, 130, 246, 0.2)'
    }, 10)
    
    setTimeout(() => {
      ripple.style.transition = 'none'
    }, 810)
    
    // Pulse cursor on click
    if (this.hasCursorRingTarget) {
      this.cursorRingTarget.style.transform = `translate(${this.ringX}px, ${this.ringY}px) scale(0.8)`
      setTimeout(() => {
        this.cursorRingTarget.style.transform = `translate(${this.ringX}px, ${this.ringY}px) scale(1)`
      }, 100)
    }
  }

  startAnimation() {
    const animate = () => {
      // Multi-layered smooth cursor follow with different easing speeds
      const ringEasing = 0.12
      const dotEasing = 0.25
      const glowEasing = 0.06
      
      this.ringX += (this.mouseX - this.ringX) * ringEasing
      this.ringY += (this.mouseY - this.ringY) * ringEasing
      
      this.dotX += (this.mouseX - this.dotX) * dotEasing
      this.dotY += (this.mouseY - this.dotY) * dotEasing
      
      this.glowX += (this.mouseX - this.glowX) * glowEasing
      this.glowY += (this.mouseY - this.glowY) * glowEasing

      // Update cursor elements
      if (this.hasCursorRingTarget) {
        const scale = this.isHovering ? 1.5 : 1
        const rotation = (Date.now() / 30) % 360
        this.cursorRingTarget.style.transform = `translate(${this.ringX}px, ${this.ringY}px) scale(${scale}) rotate(${rotation}deg)`
      }

      if (this.hasCursorDotTarget) {
        const scale = this.isHovering ? 1.5 : 1
        this.cursorDotTarget.style.transform = `translate(${this.dotX}px, ${this.dotY}px) scale(${scale})`
      }
      
      if (this.hasGlowRingTarget) {
        this.glowRingTarget.style.transform = `translate(${this.glowX}px, ${this.glowY}px) scale(${this.isHovering ? 1.3 : 1})`
        this.glowRingTarget.style.opacity = this.isHovering ? '0.8' : '0.6'
      }
      
      // Update particles
      if (this.hasParticleTarget) {
        this.particles.forEach((particle, index) => {
          if (particle.life > 0) {
            particle.x += particle.vx
            particle.y += particle.vy
            particle.life -= 0.02
            particle.vy += 0.1 // Gravity
            
            const element = this.particleTargets[index]
            element.style.transform = `translate(${particle.x}px, ${particle.y}px) scale(${particle.life})`
            element.style.opacity = particle.life
          }
        })
      }

      this.animationFrame = requestAnimationFrame(animate)
    }

    this.animationFrame = requestAnimationFrame(animate)
  }

  enterMagnetic(event) {
    this.isHovering = true
  }

  leaveMagnetic(event) {
    this.isHovering = false
  }
}
