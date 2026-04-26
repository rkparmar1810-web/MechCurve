import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './HeroBg.module.scss'

export default function HeroBg() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // ── Scene ────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 200)
    camera.position.set(0, 18, 32)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ── Very light color palette ─────────────
    const GRID_COLOR = 0xb8c4d8   // stronger blue-grey
    const DOT_COLOR  = 0xa0b0c8   // visible dots
    const LINE_COLOR = 0x9aacca   // clear lines

    // ── Full-screen wave grid ────────────────
    // A large plane subdivided into a grid — vertices wave over time
    const SEG_X = 80
    const SEG_Y = 50
    const planeGeo = new THREE.PlaneGeometry(80, 50, SEG_X, SEG_Y)
    planeGeo.rotateX(-Math.PI * 0.45) // tilt for perspective

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: GRID_COLOR,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
    const wireMesh = new THREE.Mesh(planeGeo, wireMat)
    scene.add(wireMesh)

    // Edge lines for crisper grid look
    const edgeGeo = new THREE.EdgesGeometry(planeGeo, 1)
    const edgeMat = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: 0.45,
    })
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat)
    // sync transforms
    edgeLines.rotation.copy(wireMesh.rotation)
    scene.add(edgeLines)

    // Store original Y positions for wave displacement
    const posAttr = planeGeo.getAttribute('position')
    const baseY = new Float32Array(posAttr.count)
    for (let i = 0; i < posAttr.count; i++) {
      baseY[i] = posAttr.getY(i)
    }

    // ── Floating particles across entire area ──
    const PCOUNT = 120
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(PCOUNT * 3)
    const pBaseY = new Float32Array(PCOUNT)
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 70
      pPos[i * 3 + 1] = Math.random() * 20 - 5
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 40
      pBaseY[i] = pPos[i * 3 + 1]
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: DOT_COLOR,
      size: 0.22,
      transparent: true,
      opacity: 0.60,
    })
    const dots = new THREE.Points(pGeo, pMat)
    scene.add(dots)

    // ── Hover state ──────────────────────────
    let isHovering = false
    let hoverT = 0

    // ── Mouse ────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onEnter = () => { isHovering = true }
    const onLeave = () => { isHovering = false }

    const hero = el.parentElement
    if (hero) {
      hero.addEventListener('mouseenter', onEnter)
      hero.addEventListener('mouseleave', onLeave)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ───────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ──────────────────────────────
    let raf = 0
    const clock = new THREE.Clock()
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth hover
      hoverT += ((isHovering ? 1 : 0) - hoverT) * 0.04

      // ── Wave displacement across entire grid ──
      const waveAmp = lerp(1.2, 2.8, hoverT)
      const waveSpeed = lerp(0.4, 0.8, hoverT)
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i)
        const z = posAttr.getZ(i)
        // Multiple sine waves create organic flowing motion
        const wave =
          Math.sin(x * 0.15 + t * waveSpeed) * waveAmp * 0.5 +
          Math.cos(z * 0.12 + t * waveSpeed * 0.7) * waveAmp * 0.4 +
          Math.sin((x + z) * 0.08 + t * waveSpeed * 0.5) * waveAmp * 0.3
        posAttr.setY(i, baseY[i] + wave)
      }
      posAttr.needsUpdate = true

      // ── Opacity shifts ──
      wireMat.opacity = lerp(0.55, 0.70, hoverT)
      edgeMat.opacity = lerp(0.45, 0.60, hoverT)
      pMat.opacity    = lerp(0.60, 0.75, hoverT)

      // ── Animate particles — gentle float across entire area ──
      const pArr = dots.geometry.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < PCOUNT; i++) {
        const px = pArr.getX(i)
        pArr.setY(
          i,
          pBaseY[i] + Math.sin(px * 0.1 + t * 0.3 + i * 0.5) * 1.5,
        )
      }
      pArr.needsUpdate = true
      dots.rotation.y = t * 0.005

      // ── Camera parallax ──
      const str = lerp(0.3, 0.9, hoverT)
      camera.position.x += (mouse.x * str * 3 - camera.position.x) * 0.015
      camera.position.y += (18 + -mouse.y * str * 1.5 - camera.position.y) * 0.015
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (hero) {
        hero.removeEventListener('mouseenter', onEnter)
        hero.removeEventListener('mouseleave', onLeave)
      }
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className={styles.canvas} />
}
