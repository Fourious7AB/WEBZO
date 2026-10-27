import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Application } from '@splinetool/runtime'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Primary remote scene with local fallback for 100% offline reliability
const REMOTE_SCENE = 'https://prod.spline.design/2UYhSFkgsX2m-zwM/scene.splinecode'
const LOCAL_SCENE = '/models/scene.splinecode'

export default function SplineCanvas() {
  const containerRef = useRef(null)
  const splineCanvasRef = useRef(null)
  const threeCanvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const splineCanvas = splineCanvasRef.current
    const threeCanvas = threeCanvasRef.current
    if (!container || !splineCanvas || !threeCanvas) return

    let splineApp = null
    let animId = null
    let masterTimeline = null
    let isDisposed = false
    let mainObject = null

    // Transform state scrubbed dynamically by GSAP ScrollTrigger
    const transformState = {
      x: -300,
      y: 15,
      z: 0,
      rotX: 0.2,
      rotY: 0.45,
      rotZ: -0.15,
      scale: 0.2,
      opacity: 0,
      particleSpeed: 1,
      haloScale: 1,
      haloOpacity: 0.35,
    }

    // Strict Spline watermark, badge, text and pass purge
    function purgeWatermarks() {
      // 1. Selector-based DOM purge
      const selectors = [
        '#spline-logo',
        '#spline-viewer-logo',
        'a[href*="spline.design"]',
        'a[href*="spline.com"]',
        'a[href*="spline"]',
        '[class*="spline-watermark"]',
        '[class*="spline-logo"]',
        '[class*="spline"]',
        'div[data-spline-logo]',
        'div[style*="spline"]',
      ]
      selectors.forEach((sel) => {
        try {
          document.querySelectorAll(sel).forEach((el) => {
            el.style.display = 'none'
            el.remove()
          })
        } catch (e) {}
      })

      // 2. Text-content scanning across all elements to remove "Built with Spline" text
      try {
        const textNodes = document.querySelectorAll('a, div, span, p')
        textNodes.forEach((node) => {
          const text = (node.textContent || '').trim().toLowerCase()
          if (text.includes('built with spline') || text === 'built with spline') {
            node.style.display = 'none'
            node.remove()
          }
        })
      } catch (e) {}

      // 3. Remove non-canvas children inside containerRef
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((ch) => {
          if (ch !== splineCanvasRef.current && ch !== threeCanvasRef.current) {
            ch.remove()
          }
        })
      }

      // 4. Disable WebGL watermark render pass inside Spline runtime
      if (splineApp) {
        if (typeof splineApp.setWatermark === 'function') {
          splineApp.setWatermark(null)
        }
        const p = splineApp._pipeline || splineApp.pipeline || splineApp._renderer?.pipeline
        if (p?.logoOverlayPass) {
          p.logoOverlayPass.enabled = false
          p.logoOverlayPass.texture = null
        }
      }
    }

    const observer = new MutationObserver(() => {
      purgeWatermarks()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Mouse coordinates with smooth lerping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.targetX = x
      mouse.targetY = y
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ----------------------------------------------------
    // 1. Three.js Particle Atmosphere & Energy Field Setup
    // ----------------------------------------------------
    const threeScene = new THREE.Scene()
    const threeCamera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    threeCamera.position.z = 6

    const isMobileDevice = window.innerWidth < 768
    const threeRenderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true,
      antialias: !isMobileDevice,
      powerPreference: 'high-performance',
    })
    threeRenderer.setSize(window.innerWidth, window.innerHeight)
    threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2))

    // Dual-spectrum cyber particle constellation
    const particleCount = isMobileDevice ? 65 : 150
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color('#00f0ff')
    const colorIndigo = new THREE.Color('#818cf8')

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.1 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi)
      particlePositions[i * 3 + 1] = radius * Math.sin(phi)
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi)

      const mixedColor = colorCyan.clone().lerp(colorIndigo, Math.random())
      particleColors[i * 3] = mixedColor.r
      particleColors[i * 3 + 1] = mixedColor.g
      particleColors[i * 3 + 2] = mixedColor.b
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    )
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    )

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobileDevice ? 0.03 : 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particlePoints = new THREE.Points(particleGeometry, particleMaterial)
    threeScene.add(particlePoints)

    // Orbital Energy Rings
    const ringGroup = new THREE.Group()
    threeScene.add(ringGroup)

    const ringCount = isMobileDevice ? 12 : 18
    const ringRadius = 1.35
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      const petalGeo = new THREE.RingGeometry(0.035, 0.16, 16)
      const petalMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#00f0ff' : '#6366f1',
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })
      const petal = new THREE.Mesh(petalGeo, petalMat)
      petal.position.set(
        Math.cos(angle) * ringRadius,
        Math.sin(angle) * ringRadius,
        Math.sin(angle * 2) * 0.12
      )
      petal.rotation.z = angle + Math.PI / 4
      petal.rotation.x = 0.35
      ringGroup.add(petal)
    }

    // ----------------------------------------------------
    // 2. Initialize Spline 3D Scene
    // ----------------------------------------------------
    async function initSpline() {
      try {
        splineApp = new Application(splineCanvas)

        // Intercept renderer to neutralize Spline logoOverlayPass before it can ever execute
        const origEnsure = splineApp._ensureRenderer?.bind(splineApp)
        if (origEnsure) {
          splineApp._ensureRenderer = async function () {
            const renderer = await origEnsure()
            if (renderer?.pipeline) {
              renderer.pipeline.setWatermark = function () {
                if (this.logoOverlayPass) {
                  this.logoOverlayPass.enabled = false
                  this.logoOverlayPass.texture = null
                }
              }
              if (renderer.pipeline.logoOverlayPass) {
                renderer.pipeline.logoOverlayPass.enabled = false
                renderer.pipeline.logoOverlayPass.texture = null
              }
            }
            return renderer
          }
        }

        // Load the local watermark-free binary scene directly
        try {
          await splineApp.load(LOCAL_SCENE)
        } catch (localErr) {
          console.warn('Loading remote fallback:', localErr)
          await splineApp.load(REMOTE_SCENE)
        }

        if (isDisposed) {
          splineApp.dispose()
          return
        }

        setIsLoaded(true)
        purgeWatermarks()

        // Disable WebGL logoOverlayPass immediately after load
        if (typeof splineApp.setWatermark === 'function') {
          splineApp.setWatermark(null)
        }
        const p = splineApp._pipeline || splineApp.pipeline || splineApp._renderer?.pipeline
        if (p?.logoOverlayPass) {
          p.logoOverlayPass.enabled = false
          p.logoOverlayPass.texture = null
        }
        if (splineApp._scene?.publish) {
          splineApp._scene.publish.logo = false
        }

        // Find primary flower/star 3D mesh
        const allObjects = splineApp.getAllObjects()
        mainObject =
          splineApp.findObjectByName('Star') ||
          splineApp.findObjectByName('Star Event') ||
          allObjects.find((o) => o.name && o.name.toLowerCase().includes('star')) ||
          allObjects.find((o) => o.name && o.name.toLowerCase().includes('flower')) ||
          allObjects[0]

        setupScrollAnimation()
        startAnimationLoop()

        // Initial entrance animation: smoothly scales into the left-side hero position
        const w = window.innerWidth
        const initialScale = w < 768 ? 0.75 : w < 1024 ? 0.98 : 1.20
        gsap.to(transformState, {
          scale: initialScale,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        })
      } catch (err) {
        console.error('Failed to initialize Spline scene:', err)
      }
    }

    // ----------------------------------------------------
    // 3. Screen-Adaptive GSAP ScrollTrigger Choreography
    // Choreography specification:
    // 1. Starts with zoom out and in the LEFT side
    // 2. Reduces some size and comes to the CENTER
    // 3. Zooms out again in the RIGHT side at LARGE size
    // 4. Reduces the size and vanishes totally at the end
    // ----------------------------------------------------
    function setupScrollAnimation() {
      if (masterTimeline) masterTimeline.kill()

      const w = window.innerWidth
      const isMobile = w < 768
      const isTablet = w >= 768 && w < 1024

      // Config tailored across Desktop, Tablet, and Mobile screens
      const cfg = isMobile
        ? {
            // Mobile (Compact, centered, responsive)
            // 1. Start in left side / hero
            hero: { x: 0, y: -35, z: 0, scale: 0.75, opacity: 1, rotX: 0.2, rotY: 0.45, rotZ: -0.15 },
            work: { x: 0, y: -20, z: 20, scale: 0.70, opacity: 1, rotX: 0.35, rotY: Math.PI * 0.75, rotZ: 0.2 },
            // 2. Reduce size and come to center
            showcase: { x: 0, y: 0, z: 25, scale: 0.65, opacity: 1, rotX: 0.1, rotY: Math.PI * 1.35, rotZ: 0.05 },
            // 3. Right side at large size
            services: { x: 0, y: -20, z: 40, scale: 0.88, opacity: 1, rotX: 0.38, rotY: Math.PI * 1.9, rotZ: 0.15 },
            process: { x: 0, y: -25, z: 45, scale: 0.95, opacity: 1, rotX: 0.5, rotY: Math.PI * 2.45, rotZ: 0 },
            // 4. Reduce size and vanish totally at the end
            pricing: { x: 0, y: 25, z: -80, scale: 0.52, opacity: 0.6, rotX: -0.1, rotY: Math.PI * 3.1, rotZ: 0.25 },
            footer: { x: 0, y: 0, z: 0, scale: 0, opacity: 0, rotX: 0.25, rotY: Math.PI * 3.75, rotZ: -0.1 },
          }
        : isTablet
        ? {
            // Tablet
            // 1. Start with zoom out and in the LEFT side
            hero: { x: -170, y: 15, z: 0, scale: 0.98, opacity: 1, rotX: 0.2, rotY: 0.45, rotZ: -0.15 },
            work: { x: -60, y: -15, z: 30, scale: 0.82, opacity: 1, rotX: 0.35, rotY: Math.PI * 0.75, rotZ: 0.2 },
            // 2. Reduce size and come to center
            showcase: { x: 0, y: 0, z: 40, scale: 0.75, opacity: 1, rotX: 0.1, rotY: Math.PI * 1.35, rotZ: 0.05 },
            // 3. Right side at large size
            services: { x: 140, y: 15, z: 50, scale: 1.15, opacity: 1, rotX: 0.38, rotY: Math.PI * 1.9, rotZ: 0.15 },
            process: { x: 200, y: -20, z: 65, scale: 1.25, opacity: 1, rotX: 0.5, rotY: Math.PI * 2.45, rotZ: 0 },
            // 4. Reduce size and vanish totally at the end
            pricing: { x: 0, y: 35, z: -120, scale: 0.65, opacity: 0.65, rotX: -0.1, rotY: Math.PI * 3.1, rotZ: 0.25 },
            footer: { x: 0, y: 0, z: 0, scale: 0, opacity: 0, rotX: 0.25, rotY: Math.PI * 3.75, rotZ: -0.1 },
          }
        : {
            // Desktop
            // 1. Start with zoom out and in the LEFT side
            hero: { x: -300, y: 15, z: 0, scale: 1.20, opacity: 1, rotX: 0.2, rotY: 0.45, rotZ: -0.15 },
            work: { x: -120, y: -20, z: 40, scale: 0.98, opacity: 1, rotX: 0.35, rotY: Math.PI * 0.75, rotZ: 0.2 },
            // 2. Reduce some size and come to its CENTER
            showcase: { x: 0, y: 0, z: 50, scale: 0.85, opacity: 1, rotX: 0.1, rotY: Math.PI * 1.35, rotZ: 0.05 },
            // 3. Zoom out again in RIGHT side at LARGE size
            services: { x: 280, y: 20, z: 70, scale: 1.40, opacity: 1, rotX: 0.38, rotY: Math.PI * 1.9, rotZ: 0.15 },
            process: { x: 350, y: -20, z: 90, scale: 1.55, opacity: 1, rotX: 0.5, rotY: Math.PI * 2.45, rotZ: 0 },
            // 4. Reduce the size and vanished totally at the end
            pricing: { x: 0, y: 45, z: -180, scale: 0.65, opacity: 0.6, rotX: -0.1, rotY: Math.PI * 3.1, rotZ: 0.25 },
            footer: { x: 0, y: 0, z: 0, scale: 0, opacity: 0, rotX: 0.25, rotY: Math.PI * 3.75, rotZ: -0.1 },
          }

      transformState.x = cfg.hero.x
      transformState.y = cfg.hero.y
      transformState.z = cfg.hero.z
      transformState.rotX = cfg.hero.rotX
      transformState.rotY = cfg.hero.rotY
      transformState.rotZ = cfg.hero.rotZ

      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.3,
          invalidateOnRefresh: true,
        },
      })

      // 1 -> 2: Hero to Work (Begins reducing size toward center)
      masterTimeline.to(transformState, {
        ...cfg.work,
        particleSpeed: 1.2,
        haloScale: 1.1,
        ease: 'power1.inOut',
        duration: 1.5,
      })

      // 2 -> 3: Work to Showcase (CAME TO ITS CENTER WITH REDUCED SIZE)
      masterTimeline.to(transformState, {
        ...cfg.showcase,
        particleSpeed: 1.1,
        haloScale: 1.0,
        ease: 'power1.inOut',
        duration: 2.0,
      })

      // 3 -> 4: Showcase to Services (Moves across toward right side, expanding)
      masterTimeline.to(transformState, {
        ...cfg.services,
        particleSpeed: 1.4,
        haloScale: 1.3,
        ease: 'power1.inOut',
        duration: 2.0,
      })

      // 4 -> 5: Services to Process (ZOOM OUT AGAIN IN RIGHT SIDE AT LARGE SIZE!)
      masterTimeline.to(transformState, {
        ...cfg.process,
        particleSpeed: 1.6,
        haloScale: 1.5,
        ease: 'power1.inOut',
        duration: 2.0,
      })

      // 5 -> 6: Process to Pricing (REDUCES SIZE AND RECEDES)
      masterTimeline.to(transformState, {
        ...cfg.pricing,
        particleSpeed: 0.8,
        haloScale: 0.75,
        ease: 'power1.inOut',
        duration: 2.0,
      })

      // 6 -> 7: Pricing to Footer (VANISHED TOTALLY AT THE END!)
      masterTimeline.to(transformState, {
        ...cfg.footer,
        particleSpeed: 0,
        haloScale: 0,
        haloOpacity: 0,
        ease: 'power1.inOut',
        duration: 1.5,
      })
    }

    // ----------------------------------------------------
    // 4. Unified 60–120 FPS Animation Loop
    // ----------------------------------------------------
    function startAnimationLoop() {
      const startTime = performance.now()
      let lastTime = startTime
      let frameCount = 0

      const animate = (currentTime) => {
        animId = requestAnimationFrame(animate)
        frameCount++

        // Continual watermark purge & pipeline neutralization
        if (splineApp) {
          const p = splineApp._pipeline || splineApp.pipeline || splineApp._renderer?.pipeline
          if (p?.logoOverlayPass?.enabled) {
            p.logoOverlayPass.enabled = false
            p.logoOverlayPass.texture = null
          }
        }
        if (frameCount < 120 && frameCount % 10 === 0) {
          purgeWatermarks()
        }

        // Delta-time clamping to guarantee stutter-free motion during frame spikes
        const delta = Math.min((currentTime - lastTime) * 0.001, 0.05)
        lastTime = currentTime
        const elapsedTime = (currentTime - startTime) * 0.001

        // Smooth mouse lerp
        mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.05)
        mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.05)

        // Sinusoidal ambient floating & orbital drift
        const floatY = Math.sin(elapsedTime * 1.45) * 15
        const floatRotZ = Math.cos(elapsedTime * 1.1) * 0.04
        const idleRotY = elapsedTime * 0.18

        // 1. Update Spline 3D Object Transforms
        if (mainObject) {
          if (mainObject.position) {
            mainObject.position.x = transformState.x + mouse.x * 35
            mainObject.position.y = transformState.y + floatY - mouse.y * 25
            mainObject.position.z = transformState.z
          }
          if (mainObject.rotation) {
            mainObject.rotation.x = transformState.rotX - mouse.y * 0.22
            mainObject.rotation.y = transformState.rotY + idleRotY + mouse.x * 0.32
            mainObject.rotation.z = transformState.rotZ + floatRotZ
          }
          if (mainObject.scale) {
            const s = Math.max(0, transformState.scale)
            mainObject.scale.x = s
            mainObject.scale.y = s
            mainObject.scale.z = s
          }
        }

        // Subtly tilt and control opacity of Spline canvas
        if (splineCanvas) {
          const tiltX = -mouse.y * 3.2
          const tiltY = mouse.x * 4.0
          splineCanvas.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
          splineCanvas.style.opacity = String(transformState.opacity)
          splineCanvas.style.visibility = transformState.opacity <= 0.005 ? 'hidden' : 'visible'
        }

        // 2. Update Three.js Particle Halo & Dust
        particleMaterial.opacity = 0.65 * transformState.opacity
        particlePoints.visible = transformState.opacity > 0.005
        particlePoints.rotation.y = elapsedTime * 0.045 * transformState.particleSpeed
        particlePoints.rotation.x = Math.sin(elapsedTime * 0.03) * 0.07
        particlePoints.position.x = mouse.x * 0.35
        particlePoints.position.y = -mouse.y * 0.35

        const hScale = Math.max(0, transformState.haloScale * transformState.scale)
        ringGroup.visible = transformState.opacity > 0.005 && transformState.scale > 0.05
        ringGroup.scale.set(hScale, hScale, hScale)
        ringGroup.rotation.z = elapsedTime * 0.28
        ringGroup.rotation.x = Math.sin(elapsedTime * 0.35) * 0.18
        ringGroup.position.x = (transformState.x / window.innerWidth) * 3.8 + mouse.x * 0.18
        ringGroup.position.y = (transformState.y / window.innerHeight) * 3.8 - mouse.y * 0.18
        ringGroup.children.forEach((mesh) => {
          if (mesh.material) {
            mesh.material.opacity = 0.28 * transformState.opacity
          }
        })

        threeRenderer.render(threeScene, threeCamera)
      }

      animId = requestAnimationFrame(animate)
    }

    // ----------------------------------------------------
    // 5. Window Resize Handler
    // ----------------------------------------------------
    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      threeCamera.aspect = width / height
      threeCamera.updateProjectionMatrix()
      threeRenderer.setSize(width, height)
      threeRenderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2)
      )

      setupScrollAnimation()
    }
    window.addEventListener('resize', onResize)

    initSpline()

    // ----------------------------------------------------
    // 6. Cleanup on Unmount
    // ----------------------------------------------------
    return () => {
      isDisposed = true
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (animId) cancelAnimationFrame(animId)
      if (masterTimeline) masterTimeline.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())

      particleGeometry.dispose()
      particleMaterial.dispose()
      threeRenderer.dispose()

      if (splineApp) {
        try {
          splineApp.dispose()
        } catch (e) {
          console.warn('Error disposing Spline app:', e)
        }
      }
    }
  }, [])

  return (
    <>
      {/* 3D Loading Pulse Indicator */}
      {!isLoaded && (
        <div
          className="pointer-events-none fixed bottom-8 right-8 z-30 flex items-center gap-3 rounded-full border border-cyan-400/30 bg-slate-950/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-opacity duration-500"
          aria-hidden="true"
        >
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-400" />
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Initializing 3D Core...
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`pointer-events-none fixed inset-0 z-[4] overflow-hidden transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {/* Three.js Ambient Particle & Halo Layer */}
        <canvas
          ref={threeCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full block"
        />

        {/* Spline 3D Object Canvas */}
        <canvas
          ref={splineCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full block transition-transform duration-300 ease-out"
        />
      </div>
    </>
  )
}
