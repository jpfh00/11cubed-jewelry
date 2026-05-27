/**
 * Campo estelar plateado — toda la landing, parallax cinematográfico al scroll
 */
(function (global) {
  "use strict";

  const prefersReduced =
    global.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  let scene, camera, renderer, layers, rafId;
  let scrollProgress = 0;
  let time = 0;
  let pageSpan = 1;

  const LAYER_CFG = [
    { count: 520, spread: 1.05, parallax: 0.62, size: 0.06, opacity: 1.0, color: 0xe8eef8 },
    { count: 300, spread: 0.9, parallax: 0.42, size: 0.082, opacity: 0.85, color: 0xcdd9ea },
    { count: 140, spread: 0.72, parallax: 0.24, size: 0.11, opacity: 0.7, color: 0xaebed6 },
  ];

  function pageHeightWorld() {
    const h = Math.max(
      document.documentElement.scrollHeight,
      global.innerHeight
    );
    return h * 0.0022;
  }

  function buildLayer(cfg) {
    const span = pageSpan;
    const positions = new Float32Array(cfg.count * 3);
    const phases = new Float32Array(cfg.count);

    for (let i = 0; i < cfg.count; i++) {
      const i3 = i * 3;
      const r = (2.5 + Math.random() * 9) * cfg.spread;
      const theta = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(theta) * r;
      positions[i3 + 1] = (Math.random() - 0.12) * span;
      positions[i3 + 2] = Math.sin(theta) * r * 0.55;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color(cfg.color) },
        uBaseOpacity: { value: cfg.opacity },
        uSize: { value: cfg.size },
      },
      vertexShader: `
        attribute float phase;
        uniform float uTime;
        uniform float uScroll;
        uniform float uSize;
        varying float vAlpha;
        void main() {
          float tw = 0.5 + 0.5 * sin(uTime * 2.4 + phase + uScroll * 6.28);
          vAlpha = tw;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * (1.0 + tw * 0.45) * (460.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uBaseOpacity;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float core = 1.0 - smoothstep(0.0, 0.2, d);
          float halo = 1.0 - smoothstep(0.1, 0.5, d);
          float a = uBaseOpacity * (0.72 + vAlpha * 0.55) * (core + halo * 0.65);
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    points.userData.parallax = cfg.parallax;
    points.userData.baseY = 0;
    return points;
  }

  function rebuildLayers() {
    if (!scene || !global.THREE) return;
    layers?.forEach((l) => {
      scene.remove(l);
      l.geometry?.dispose();
      l.material?.dispose();
    });
    pageSpan = pageHeightWorld();
    layers = LAYER_CFG.map((cfg) => {
      const layer = buildLayer(cfg);
      scene.add(layer);
      return layer;
    });
  }

  function resize() {
    if (!renderer || !camera) return;
    const w = global.innerWidth;
    const h = global.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function bindScroll() {
    if (global.ScrollTrigger && global.gsap) {
      global.gsap.registerPlugin(global.ScrollTrigger);
      global.ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.15,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        },
      });
      global.ScrollTrigger.addEventListener("refreshInit", rebuildLayers);
    } else {
      global.addEventListener(
        "scroll",
        () => {
          const max =
            document.documentElement.scrollHeight - global.innerHeight;
          scrollProgress = max > 0 ? global.scrollY / max : 0;
        },
        { passive: true }
      );
    }
  }

  function animate() {
    rafId = global.requestAnimationFrame(animate);
    time += 0.016;

    const scrollY = global.scrollY || 0;
    const drift = scrollProgress * pageSpan * 1.15;

    layers?.forEach((layer) => {
      const p = layer.userData.parallax;
      layer.position.y = -drift * p - scrollY * 0.00085 * p;
      layer.position.x = Math.sin(time * 0.12 + p) * 0.08;
      layer.rotation.z = scrollProgress * 0.35 * p + time * 0.02;
      if (layer.material.uniforms) {
        layer.material.uniforms.uTime.value = time;
        layer.material.uniforms.uScroll.value = scrollProgress;
      }
    });

    if (camera) {
      camera.position.x = Math.sin(time * 0.15) * 0.06;
      camera.position.y = -drift * 0.12;
      camera.lookAt(0, -drift * 0.08, 0);
    }

    renderer?.render(scene, camera);
  }

  function init() {
    const canvas = document.getElementById("pageStarsCanvas");
    if (!canvas || prefersReduced || !global.THREE) return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010102, 0.012);

    camera = new THREE.PerspectiveCamera(
      52,
      global.innerWidth / global.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 6.5);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x010102, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    rebuildLayers();
    bindScroll();
    resize();
    global.addEventListener("resize", () => {
      resize();
      rebuildLayers();
    });

    canvas.classList.add("is-ready");
    animate();
  }

  function destroy() {
    if (rafId) global.cancelAnimationFrame(rafId);
    renderer?.dispose();
  }

  global.PageStars = { init, destroy };
})(window);
