import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type PremiumHeroBackgroundProps = {
  speed?: number
  particleCount?: number
  meshDensity?: number
  primaryColor?: string
  secondaryColor?: string
}

const surfaceVertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uMouse;
  varying float vNoise;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float n1 = snoise(vec3(pos.x * 0.42, pos.y * 0.42, uTime * 0.2 * uSpeed));
    float n2 = snoise(vec3(pos.x * 0.26 + 8.3, pos.y * 0.26 - 3.1, uTime * 0.15 * uSpeed));
    float wave = n1 * 0.22 + n2 * 0.18;
    float centerCalm = smoothstep(0.35, 0.95, distance(uv, vec2(0.36, 0.56)));
    pos.z += wave * centerCalm;
    pos.x += uMouse.x * 0.12 * centerCalm;
    pos.y += uMouse.y * 0.08 * centerCalm;
    vNoise = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const surfaceFragmentShader = `
  uniform vec3 uPrimary;
  uniform vec3 uSecondary;
  varying float vNoise;
  varying vec2 vUv;

  void main() {
    float g = smoothstep(0.08, 1.0, vUv.y);
    float noiseBand = smoothstep(-0.25, 0.35, vNoise);
    vec3 base = mix(vec3(0.972, 0.984, 0.996), uPrimary, g * 0.15);
    vec3 tint = mix(base, uSecondary, noiseBand * 0.18);
    float edgeFade = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
    float alpha = 0.68 * edgeFade;
    gl_FragColor = vec4(tint, alpha);
  }
`

const particleVertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uMouse;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.18 * uSpeed + p.x * 0.08) * 0.08;
    p.x += sin(uTime * 0.12 * uSpeed + p.z * 0.1) * 0.05;
    p.xy += uMouse * 0.08;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vDepth = clamp(1.0 - abs(mvPosition.z) / 8.0, 0.0, 1.0);
    gl_PointSize = (1.8 + 1.8 * vDepth) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = `
  uniform vec3 uPrimary;
  uniform vec3 uSecondary;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    float a = smoothstep(0.52, 0.08, d) * vDepth;
    vec3 col = mix(uSecondary, uPrimary, vDepth * 0.65);
    gl_FragColor = vec4(col, a * 0.45);
  }
`

export default function PremiumHeroBackground({
  speed = 1,
  particleCount = 900,
  meshDensity = 130,
  primaryColor = '#3b82f6',
  secondaryColor = '#06b6d4',
}: PremiumHeroBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100)
    camera.position.set(0, 0.45, 4.3)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    const directional = new THREE.DirectionalLight(0xffffff, 0.42)
    directional.position.set(2, 3, 4)
    scene.add(ambient, directional)

    const mouse = new THREE.Vector2(0, 0)
    const smoothMouse = new THREE.Vector2(0, 0)

    const surfaceGeometry = new THREE.PlaneGeometry(8.4, 4.8, meshDensity, meshDensity)
    const surfaceMaterial = new THREE.ShaderMaterial({
      vertexShader: surfaceVertexShader,
      fragmentShader: surfaceFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uMouse: { value: smoothMouse },
        uPrimary: { value: new THREE.Color(primaryColor) },
        uSecondary: { value: new THREE.Color(secondaryColor) },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })

    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial)
    surface.rotation.x = -0.72
    surface.position.set(0.0, -0.42, -0.15)
    scene.add(surface)

    const grid = new THREE.GridHelper(18, 44, 0x60a5fa, 0xcbd5e1)
    grid.position.set(0, -1.3, -1.45)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.34
    scene.add(grid)

    const wireGroup = new THREE.Group()
    scene.add(wireGroup)

    const wireMatA = new THREE.MeshBasicMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
    const wireMatB = new THREE.MeshBasicMaterial({
      color: new THREE.Color(secondaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })

    const wireA = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), wireMatA)
    wireA.position.set(2.05, 0.78, -0.95)
    const wireB = new THREE.Mesh(new THREE.OctahedronGeometry(0.44, 1), wireMatB)
    wireB.position.set(-2.05, 0.36, -1.4)
    const wireC = new THREE.Mesh(new THREE.TetrahedronGeometry(0.32, 0), wireMatA)
    wireC.position.set(-0.35, -0.1, -1.9)
    wireGroup.add(wireA, wireB, wireC)

    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 4.2
      positions[i3 + 2] = -Math.random() * 5.2
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uMouse: { value: smoothMouse },
        uPrimary: { value: new THREE.Color(primaryColor) },
        uSecondary: { value: new THREE.Color(secondaryColor) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.position.set(0, 0.06, -0.55)
    scene.add(particles)

    const clock = new THREE.Clock()

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (width === 0 || height === 0) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      mouse.set((x - 0.5) * 2, -(y - 0.5) * 2)
    }

    let raf = 0
    const render = () => {
      const elapsed = clock.getElapsedTime()
      smoothMouse.lerp(mouse, 0.035)

      surfaceMaterial.uniforms.uTime.value = elapsed
      particlesMaterial.uniforms.uTime.value = elapsed

      wireA.rotation.x = elapsed * 0.1 * speed
      wireA.rotation.y = elapsed * 0.12 * speed
      wireB.rotation.x = -elapsed * 0.09 * speed
      wireB.rotation.z = elapsed * 0.11 * speed
      wireC.rotation.y = elapsed * 0.14 * speed

      wireGroup.position.x = smoothMouse.x * 0.22
      wireGroup.position.y = smoothMouse.y * 0.12
      particles.position.x = smoothMouse.x * 0.18
      particles.position.y = smoothMouse.y * 0.06

      camera.position.x = smoothMouse.x * 0.2
      camera.position.y = 0.45 + smoothMouse.y * 0.1
      camera.lookAt(0, -0.06, -0.85)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }

    resize()
    render()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)

      surfaceGeometry.dispose()
      surfaceMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      wireA.geometry.dispose()
      wireB.geometry.dispose()
      wireC.geometry.dispose()
      wireMatA.dispose()
      wireMatB.dispose()

      scene.clear()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [meshDensity, particleCount, primaryColor, secondaryColor, speed])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}
