/**
 * Hero — diamante 3D → sticky chatbot al scroll
 */
(function (global) {
  "use strict";

  const isEn = document.documentElement.lang?.toLowerCase().startsWith("en");
  const prefersReduced =
    global.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const isMobile =
    global.matchMedia?.("(max-width: 899px)").matches ||
    global.matchMedia?.("(hover: none) and (pointer: coarse)").matches;

  let scene, camera, renderer, diamondGroup, facetLines, sparkleLight, rafId;
  let hero, container, canvas, fab, slot;
  let scrollProgress = 0;
  let stickyT = 0;
  let pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let orbit = 0;
  let hoverIntensity = 0;
  let hoverTarget = 0;
  let touchPulse = 0;
  let touchOrbit = 0;
  let touchTiltX = 0;
  let touchTiltY = 0;
  let isTouching = false;
  let lastPointer = null;
  let time = 0;
  let morphTween = null;

  const DIAMOND_HERO_SCALE = isMobile ? 0.64 : 0.58;
  const DIAMOND_STICKY_SCALE = 0.42;
  const POSE = { x: -0.14, y: 0.78, z: 0.08 };

  function createClassicBrilliantGeometry(segments) {
    const girdleR = 1;
    const tableR = girdleR * 0.57;
    const crownH = girdleR * 0.324;
    const pavilionD = girdleR * 0.862;

    const positions = [];
    const indices = [];
    const table = [];
    const girdle = [];

    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      table.push(new THREE.Vector3(c * tableR, crownH, s * tableR));
      girdle.push(new THREE.Vector3(c * girdleR, 0, s * girdleR));
    }

    const tableCenter = new THREE.Vector3(0, crownH, 0);
    const culet = new THREE.Vector3(0, -pavilionD, 0);

    function pushTri(a, b, c) {
      const base = positions.length / 3;
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      indices.push(base, base + 1, base + 2);
    }

    for (let i = 0; i < segments; i++) {
      const n = (i + 1) % segments;
      pushTri(tableCenter, table[i], table[n]);
      pushTri(table[i], girdle[i], girdle[n]);
      pushTri(table[n], girdle[i], girdle[n]);
      pushTri(girdle[i], girdle[n], culet);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  function createDiamond() {
    const group = new THREE.Group();
    const bodyGeo = createClassicBrilliantGeometry(isMobile ? 16 : 32);

    const body = new THREE.Mesh(
      bodyGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.04,
        transmission: 0.94,
        thickness: 2.4,
        ior: 2.417,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.5,
        flatShading: true,
        side: THREE.FrontSide,
      })
    );
    group.add(body);

    const facetGeo = new THREE.EdgesGeometry(bodyGeo, 1);
    facetLines = new THREE.LineSegments(
      facetGeo,
      new THREE.LineBasicMaterial({
        color: 0xf0f4fa,
        transparent: true,
        opacity: 0.45,
      })
    );
    group.add(facetLines);

    group.rotation.set(POSE.x, POSE.y, POSE.z);
    return group;
  }

  function setupLights() {
    scene.add(new THREE.AmbientLight(0x1b1a1a, 0.55));

    const key = new THREE.DirectionalLight(0xffffff, 1.55);
    key.position.set(3.4, 4.2, 4.8);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xd6b36f, 1.1);
    rim.position.set(-4.6, 1.6, -3);
    scene.add(rim);

    const back = new THREE.PointLight(0xbfd8ff, 0.68, 14);
    back.position.set(0, -1, -4);
    scene.add(back);

    const under = new THREE.PointLight(0xfff5e6, 0.55, 10);
    under.position.set(0, -2.2, 2.8);
    scene.add(under);

    sparkleLight = new THREE.PointLight(0xffffff, 0.85, 8);
    sparkleLight.position.set(1.2, 2.4, 3.6);
    scene.add(sparkleLight);
  }

  let cachedSlotRect = null;
  let cachedSlotRectAt = 0;

  function getSlotRect(force) {
    const now = performance.now();
    if (
      force ||
      !cachedSlotRect ||
      now - cachedSlotRectAt > (isMobile ? 48 : 16)
    ) {
      cachedSlotRect =
        slot?.getBoundingClientRect() || hero?.getBoundingClientRect();
      cachedSlotRectAt = now;
    }
    return cachedSlotRect;
  }

  function invalidateSlotRect() {
    cachedSlotRect = null;
  }

  function placeAtSlot(instant) {
    const r = getSlotRect(true);
    if (!r || !container) return;
    const props = {
      position: "fixed",
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      bottom: "auto",
      right: "auto",
      margin: 0,
      x: 0,
      y: 0,
      zIndex: 120,
    };
    if (instant || !global.gsap) {
      Object.assign(container.style, {
        position: "fixed",
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        bottom: "auto",
        right: "auto",
        margin: "0",
        zIndex: "120",
      });
    } else {
      global.gsap.set(container, props);
    }
  }

  function applyMorphPosition(t) {
    if (!container) return;
    const r = getSlotRect();
    if (!r) return;
    if (!r) return;
    const startTop = r.top;
    const startLeft = r.left;
    const startW = r.width;
    const startH = r.height;
    const endSize = isMobile ? 62 : 76;
    const inset = isMobile ? 14 : 22;
    const endTop = global.innerHeight - inset - endSize;
    const endLeft = global.innerWidth - inset - endSize;
    const eased = global.gsap ? global.gsap.parseEase("power3.inOut")(t) : t;

    const top = lerp(startTop, endTop, eased);
    const left = lerp(startLeft, endLeft, eased);
    const width = lerp(startW, endSize, eased);
    const height = lerp(startH, endSize, eased);

    Object.assign(container.style, {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      bottom: "auto",
      right: "auto",
      margin: "0",
      zIndex: "120",
    });
  }

  function morphToSticky() {
    if (!container || container.classList.contains("is-sticky")) return;
    placeAtSlot(true);
    container.classList.add("is-sticky");
    fab?.setAttribute(
      "aria-label",
      isEn ? "Open 11³ concierge" : "Abrir concierge 11³"
    );

    if (global.gsap) {
      morphTween?.kill();
      morphTween = global.gsap.to(container, {
        top: "auto",
        left: "auto",
        bottom: 22,
        right: 22,
        width: 76,
        height: 76,
        duration: 0.85,
        ease: "power3.inOut",
        overwrite: true,
      });
    }
  }

  function morphToHero() {
    if (!container || !container.classList.contains("is-sticky")) return;
    container.classList.remove("is-sticky");
    fab?.setAttribute(
      "aria-label",
      isEn
        ? "11³ concierge — scroll to pin"
        : "Concierge 11³ — desplázate para fijar"
    );

    const r = getSlotRect();
    if (!r) return;

    if (global.gsap) {
      morphTween?.kill();
      morphTween = global.gsap.to(container, {
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
        bottom: "auto",
        right: "auto",
        duration: 0.75,
        ease: "power3.inOut",
        onComplete: () => placeAtSlot(true),
      });
    } else {
      placeAtSlot(true);
    }
  }

  function initStickyMorph() {
    if (!global.ScrollTrigger || !global.gsap) return;

    global.gsap.registerPlugin(global.ScrollTrigger);

    const morphStart = isMobile ? 0.06 : 0.12;
    const morphSpan = isMobile ? 0.52 : 0.45;

    global.ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: isMobile ? 0.85 : 0.65,
      onUpdate: (self) => {
        scrollProgress = self.progress;
        stickyT = Math.min(
          1,
          Math.max(0, (self.progress - morphStart) / morphSpan)
        );
        applyMorphPosition(stickyT);
        container.classList.toggle("is-sticky", stickyT > 0.88);
      },
    });

    global.addEventListener(
      "resize",
      () => {
        invalidateSlotRect();
        if (stickyT >= 1 && container?.classList.contains("is-sticky")) {
          applyMorphPosition(1);
        } else {
          placeAtSlot(true);
        }
      },
      { passive: true }
    );
  }

  function resizeRenderer() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 2 || h < 2) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function updatePointerFromEvent(e) {
    const r = container.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const gain = isMobile ? 1.35 : 2;
    pointer.tx = Math.max(-1, Math.min(1, x * gain));
    pointer.ty = Math.max(-1, Math.min(1, y * gain));
  }

  function bindPointerInteraction() {
    if (isMobile) {
      const onPointerDown = (e) => {
        if (container.classList.contains("is-sticky")) return;

        isTouching = true;
        hoverTarget = 1;
        touchPulse = 1;
        lastPointer = { x: e.clientX, y: e.clientY };
        updatePointerFromEvent(e);
        container.classList.add("is-touch");
      };

      const onPointerMove = (e) => {
        if (!isTouching || container.classList.contains("is-sticky")) return;

        updatePointerFromEvent(e);

        if (lastPointer) {
          const dx = e.clientX - lastPointer.x;
          const dy = e.clientY - lastPointer.y;
          touchOrbit += dx * 0.0032;
          touchTiltY += dx * 0.0014;
          touchTiltX += dy * 0.0014;
        }
        lastPointer = { x: e.clientX, y: e.clientY };
      };

      const endPointer = () => {
        if (!isTouching) return;
        isTouching = false;
        hoverTarget = 0;
        lastPointer = null;
        container.classList.remove("is-touch");
      };

      container?.addEventListener("pointerdown", onPointerDown, { passive: true });
      container?.addEventListener("pointermove", onPointerMove, { passive: true });
      container?.addEventListener("pointerup", endPointer, { passive: true });
      container?.addEventListener("pointercancel", endPointer, { passive: true });
      container?.addEventListener("pointerleave", endPointer);
      return;
    }

    const onPointerMove = (e) => {
      if (container.classList.contains("is-sticky")) return;
      updatePointerFromEvent(e);
      hoverTarget = 1;
      container.classList.add("is-hover");
    };

    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      hoverTarget = 0;
      container.classList.remove("is-hover");
    };

    container?.addEventListener("pointermove", onPointerMove);
    container?.addEventListener("pointerleave", onPointerLeave);
  }

  function bindEvents() {
    hero = document.getElementById("hero");
    fab = document.getElementById("chatbotFab");
    slot = document.getElementById("heroDiamondSlot");

    bindPointerInteraction();

    fab?.addEventListener("click", (e) => {
      if (!container.classList.contains("is-sticky")) return;
      e.preventDefault();
      global.Chatbot?.toggle?.();
    });

    global.addEventListener("resize", resizeRenderer);
    initStickyMorph();
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    rafId = global.requestAnimationFrame(animate);
    time += 0.016;

    hoverIntensity += (hoverTarget - hoverIntensity) * (isMobile ? 0.14 : 0.08);
    touchPulse *= isTouching ? 0.9 : 0.88;
    if (!isTouching) {
      touchOrbit *= 0.96;
      touchTiltX *= 0.9;
      touchTiltY *= 0.9;
    }

    const sticky = container?.classList.contains("is-sticky");
    const energy = isMobile
      ? 1 + scrollProgress * 0.2 + hoverIntensity * 0.25
      : 1 + hoverIntensity * 0.5 + scrollProgress * 0.25;
    orbit += (isMobile ? 0.008 : 0.0095 + hoverIntensity * 0.008) * energy;

    const lerpSpeed = isMobile ? 0.12 + hoverIntensity * 0.08 : 0.05 + hoverIntensity * 0.07;
    pointer.x += (pointer.tx - pointer.x) * lerpSpeed;
    pointer.y += (pointer.ty - pointer.y) * lerpSpeed;

    const breathe =
      1 + Math.sin(time * 1.65) * 0.028 + Math.sin(time * 3.4) * 0.012;
    const snap = 1 + hoverIntensity * 0.08 + touchPulse * 0.05;
    const baseScale = lerp(DIAMOND_HERO_SCALE, DIAMOND_STICKY_SCALE, stickyT);

    if (diamondGroup) {
      const swayX =
        Math.sin(time * 0.45) * 0.2 + Math.sin(time * 0.17) * 0.09 - 0.04;
      const swayZ =
        Math.sin(time * 0.38) * 0.11 + Math.cos(time * 0.27) * 0.05;
      const swayY = Math.sin(time * 0.29) * 0.1;

      const touchRotGain = isMobile ? 0.14 : 0.1;
      diamondGroup.rotation.x =
        POSE.x +
        swayX -
        pointer.y * touchRotGain -
        touchTiltX +
        scrollProgress * 0.04;
      diamondGroup.rotation.y =
        POSE.y +
        orbit +
        touchOrbit +
        swayY +
        pointer.x * (sticky ? 0.14 : isMobile ? 0.2 : 0.24) +
        touchTiltY * 0.5;
      diamondGroup.rotation.z =
        POSE.z + swayZ + pointer.x * (isMobile ? 0.12 : 0.1);

      const floatAmp = sticky ? 0.04 : 0.1;
      diamondGroup.position.x =
        Math.sin(time * 0.45) * floatAmp + pointer.x * 0.04;
      diamondGroup.position.y =
        Math.sin(time * 0.58) * floatAmp + Math.cos(time * 0.36) * (floatAmp * 0.5);
      diamondGroup.position.z = Math.sin(time * 0.33) * 0.04;

      diamondGroup.scale.setScalar(baseScale * breathe * snap);
    }

    if (camera) {
      const camZ = lerp(4.05, 3.35, stickyT) - hoverIntensity * 0.15;
      camera.position.x =
        Math.sin(time * 0.22) * 0.12 + pointer.x * 0.08;
      camera.position.y =
        -0.12 + Math.sin(time * 0.31) * 0.05 - pointer.y * 0.04;
      camera.position.z = camZ;
      camera.lookAt(0, -0.06, 0);
    }

    if (sparkleLight) {
      sparkleLight.intensity =
        0.75 +
        Math.sin(time * 4.2) * 0.2 +
        hoverIntensity * (isMobile ? 0.28 : 0.4) +
        touchPulse * 0.15;
    }

    if (facetLines?.material) {
      facetLines.material.opacity =
        0.42 +
        Math.sin(time * 3.8) * 0.06 +
        hoverIntensity * 0.1 +
        touchPulse * 0.08;
    }

    renderer?.render(scene, camera);
  }

  function initStaticFallback() {
    container?.classList.add("hero__diamond--static");
  }

  function init() {
    container = document.getElementById("heroDiamond");
    canvas = document.getElementById("heroDiamondCanvas");
    if (!container || !canvas) return;

    if (prefersReduced || !global.THREE) {
      initStaticFallback();
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 4.05);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: isMobile ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(global.devicePixelRatio || 1, 2)
    );
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    diamondGroup = createDiamond();
    scene.add(diamondGroup);
    setupLights();
    bindEvents();

    placeAtSlot(true);
    resizeRenderer();

    if (isMobile) {
      container.style.willChange = "top, left, width, height";
    }

    container.classList.add("is-ready");
    animate();

    global.addEventListener("load", () => {
      if (!container.classList.contains("is-sticky")) placeAtSlot(true);
    });
  }

  function destroy() {
    if (rafId) global.cancelAnimationFrame(rafId);
    morphTween?.kill();
    renderer?.dispose();
  }

  global.HeroDiamond = { init, destroy, morphToSticky, morphToHero };
})(window);
