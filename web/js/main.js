/**
 * 11³ Landing MVP — interactions
 */
(function () {
  "use strict";

  const { img, hq, fallback } = window.IMAGES_11C;
  const fallbackSrc = hq(fallback);
  const locale = (() => {
    const l = document.documentElement.lang?.toLowerCase().slice(0, 2);
    return l === "en" || l === "fr" ? l : "es";
  })();

  const COPY = {
    es: {
      priceOnRequest: "Bajo consulta",
      priceFrom: "Desde",
      select: "Seleccionar",
      consult: "Consultar",
      requestDesign: "Solicitar diseño",
      piecesId: "piezas",
      cartAria: (n) => `Abrir bolsa, ${n} artículos`,
      cartEmpty: "Tu bolsa está vacía.",
      numberLocale: "es-MX",
      chatbotReplies: [
        "Podemos curar una selección privada según perfil de colección, rango y ocasión.",
        "Nuestra mesa trabaja únicamente gemas certificadas y piezas de disponibilidad limitada.",
        "Si lo prefieres, coordinamos una consulta privada para presentar opciones en detalle.",
      ],
    },
    en: {
      priceOnRequest: "Upon request",
      priceFrom: "From",
      select: "Select",
      consult: "Consult",
      requestDesign: "Request design",
      piecesId: "pieces",
      cartAria: (n) => `Open bag, ${n} items`,
      cartEmpty: "Your bag is empty.",
      numberLocale: "en-US",
      chatbotReplies: [
        "We can curate a private selection based on collection profile, range, and occasion.",
        "Our desk works exclusively with certified gems and limited-availability pieces.",
        "If you prefer, we can arrange a private consultation to present options in detail.",
      ],
    },
    fr: {
      priceOnRequest: "Sur demande",
      priceFrom: "À partir de",
      select: "Sélectionner",
      consult: "Consulter",
      requestDesign: "Demander un modèle",
      piecesId: "pieces",
      cartAria: (n) => `Ouvrir le panier, ${n} article${n === 1 ? "" : "s"}`,
      cartEmpty: "Votre panier est vide.",
      numberLocale: "fr-FR",
      chatbotReplies: [
        "Nous pouvons composer une sélection privée selon votre profil de collection, budget et occasion.",
        "Notre desk ne travaille qu'avec des gemmes certifiées et des pièces en disponibilité limitée.",
        "Si vous le souhaitez, nous organisons une consultation privée pour présenter les options en détail.",
      ],
    },
  };
  const T = COPY[locale];

  const PRODUCTS = [
    {
      id: "r1",
      name: "Tourbillon Perpetual Platino",
      category: "relojes",
      price: 285000,
      badge: "Haute Horlogerie",
      gems: "Calibre suizo · Reserva 72h · Edición 01/08",
      imageKey: "relojHero",
    },
    {
      id: "r2",
      name: "Minute Repeater Oro Rosa",
      category: "relojes",
      price: 412000,
      badge: "Grande Complication",
      gems: "Sonnería de minutos · Esqueleto · Certificado COSC",
      imageKey: "relojAlt",
    },
    {
      id: "c1",
      name: "Collar Constellation D-FL",
      category: "cadenas",
      price: 168000,
      badge: "Alta Joyería",
      gems: "47 diamantes VVS1 · Platino 950 · GIA",
      imageKey: "collar",
    },
    {
      id: "c2",
      name: "Maille Royale 24k",
      category: "cadenas",
      price: 89000,
      badge: "Museum Grade",
      gems: "Oro 999.9 · 240g · Engaste microscópico",
      imageKey: "cadena",
    },
    {
      id: "d1",
      name: "Solitario Type IIa 5.2ct",
      category: "diamantes",
      price: 340000,
      badge: "D · IF · Excellent",
      gems: "Diamante Type IIa · GIA # certificado",
      imageKey: "diamanteSolitario",
    },
    {
      id: "d2",
      name: "Riviera Pavé VVS1",
      category: "diamantes",
      price: 127000,
      badge: "Alta Joyería",
      gems: "132 diamantes · Platino · Corte Ashoka",
      imageKey: "diamanteMacro",
    },
    {
      id: "e1",
      name: "Esmeralda Muzo 8.4ct",
      category: "esmeraldas",
      price: 295000,
      badge: "Colombia · Sin aceite",
      gems: "Gübelin & GIA · Oro 18k · Pieza única",
      imageKey: "esmeraldaAnillo",
    },
    {
      id: "e2",
      name: "Parure Verde Imperial",
      category: "esmeraldas",
      price: 580000,
      badge: "Colección Museo",
      gems: "Esmeraldas + diamantes D/VVS · Diseño exclusivo",
      imageKey: "esmeraldaGema",
    },
    {
      id: "a1",
      name: "Chandelier VVS Esmeralda",
      category: "aretes",
      price: 72000,
      badge: "Alta Joyería",
      gems: "Esmeraldas pear · Diamantes baguette · Platino",
      imageKey: "aretes",
    },
    {
      id: "a2",
      name: "Studs Ashoka 3.1ctw",
      category: "aretes",
      price: 48000,
      badge: "Certificado GIA",
      gems: "Par diamantes E/VVS2 · Oro blanco 18k",
      imageKey: "areteDiamante",
    },
    {
      id: "b1",
      name: "Comisión Tríada",
      category: "amedida",
      price: 0,
      badge: "Diseño personalizado",
      gems: "Diamante + esmeralda + oro · Atelier privado 11³",
      imageKey: "atelier",
    },
    {
      id: "b2",
      name: "Reloj Esqueleto a Medida",
      category: "amedida",
      price: 0,
      badge: "Bespoke",
      gems: "Movimiento a pedido · Grabado · Entrega 6–9 meses",
      imageKey: "relojEsqueletoRender",
      animated: true,
    },
  ].map((p) => ({
    ...p,
    image: img(p.imageKey, 1200, 1500),
  }));

  const PRODUCT_I18N = {
    en: {
    r1: {
      name: "Platinum Perpetual Tourbillon",
      gems: "Swiss caliber · 72h reserve · Edition 01/08",
    },
    r2: {
      name: "Rose Gold Minute Repeater",
      gems: "Minute repeater · Skeleton · COSC certificate",
    },
    c1: {
      name: "Constellation D-FL Necklace",
      badge: "High Jewelry",
      gems: "47 VVS1 diamonds · Platinum 950 · GIA",
    },
    c2: {
      name: "Maille Royale 24k",
      gems: "999.9 gold · 240g · Microscopic setting",
    },
    d1: {
      gems: "Type IIa diamond · GIA certified",
    },
    d2: {
      badge: "High Jewelry",
      gems: "132 diamonds · Platinum · Ashoka cut",
    },
    e1: {
      name: "Muzo Emerald 8.4ct",
      badge: "Colombia · No oil",
      gems: "Gübelin & GIA · 18k gold · One of a kind",
    },
    e2: {
      name: "Imperial Green Parure",
      badge: "Museum Collection",
      gems: "Emeralds + D/VVS diamonds · Exclusive design",
    },
    a1: {
      name: "VVS Emerald Chandelier",
      badge: "High Jewelry",
      gems: "Pear emeralds · Baguette diamonds · Platinum",
    },
    a2: {
      gems: "E/VVS2 diamond pair · 18k white gold",
    },
    b1: {
      name: "Triad Commission",
      badge: "Custom design",
      gems: "Diamond + emerald + gold · Private 11³ atelier",
    },
    b2: {
      name: "Bespoke Skeleton Watch",
      gems: "Commissioned movement · Engraving · 6–9 month delivery",
    },
    },
    fr: {
      r1: {
        name: "Tourbillon perpétuel platine",
        gems: "Calibre suisse · Réserve 72 h · Édition 01/08",
      },
      r2: {
        name: "Minute répétition or rose",
        gems: "Répétition minutes · Squelette · Certificat COSC",
      },
      c1: {
        name: "Collier Constellation D-FL",
        badge: "Haute joaillerie",
        gems: "47 diamants VVS1 · Platine 950 · GIA",
      },
      c2: {
        name: "Maille Royale 24k",
        gems: "Or 999,9 · 240 g · Sertissage microscopique",
      },
      d1: {
        gems: "Diamant Type IIa · Certifié GIA",
      },
      d2: {
        badge: "Haute joaillerie",
        gems: "132 diamants · Platine · Taille Ashoka",
      },
      e1: {
        name: "Émeraude Muzo 8,4 ct",
        badge: "Colombie · Sans huile",
        gems: "Gübelin & GIA · Or 18k · Pièce unique",
      },
      e2: {
        name: "Parure Vert Impérial",
        badge: "Collection musée",
        gems: "Émeraudes + diamants D/VVS · Design exclusif",
      },
      a1: {
        name: "Chandelier VVS émeraude",
        badge: "Haute joaillerie",
        gems: "Émeraudes poire · Diamants baguette · Platine",
      },
      a2: {
        gems: "Paire diamants E/VVS2 · Or blanc 18k",
      },
      b1: {
        name: "Commission Triade",
        badge: "Design sur mesure",
        gems: "Diamant + émeraude + or · Atelier privé 11³",
      },
      b2: {
        name: "Montre squelette sur mesure",
        gems: "Mouvement commande spéciale · Gravure · Livraison 6–9 mois",
      },
    },
  };

  function localizeProduct(p) {
    if (locale === "es") return p;
    const row = PRODUCT_I18N[locale]?.[p.id];
    return row ? { ...p, ...row } : p;
  }

  const CATEGORY_LABELS = {
    es: {
      relojes: "Alta relojería",
      cadenas: "Alta joyería",
      diamantes: "Diamantes certificados",
      esmeraldas: "Esmeraldas de museo",
      aretes: "Aretes de gala",
      amedida: "Diseño a medida",
    },
    en: {
      relojes: "High watchmaking",
      cadenas: "High jewelry",
      diamantes: "Certified diamonds",
      esmeraldas: "Museum emeralds",
      aretes: "Gala earrings",
      amedida: "Bespoke design",
    },
    fr: {
      relojes: "Haute horlogerie",
      cadenas: "Haute joaillerie",
      diamantes: "Diamants certifiés",
      esmeraldas: "Émeraudes de musée",
      aretes: "Boucles d'oreille de gala",
      amedida: "Création sur mesure",
    },
  }[locale];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let cart = [];
  let lenis;

  // ——— Preloader ———
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const minTime = reducedMotion ? 0 : 1800;

    setTimeout(() => {
      preloader?.classList.add("is-done");
      document.body.classList.add("is-loaded");
      window.PageStars?.init();
      window.HeroDiamond?.init();
      initAnimations();
      initChatbot();
    }, minTime);
  }

  // ——— Chatbot (diamante sticky) ———
  function initChatbot() {
    const panel = document.getElementById("chatbotPanel");
    const fab = document.getElementById("chatbotFab");
    const closeBtn = document.getElementById("chatbotClose");
    const form = document.getElementById("chatbotForm");
    const messages = document.getElementById("chatbotMessages");

    if (!panel || !fab) return;

    const replies = T.chatbotReplies;

    function openPanel() {
      panel.hidden = false;
      panel.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      panel.querySelector("input")?.focus();
    }

    function closePanel() {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        if (!panel.classList.contains("is-open")) panel.hidden = true;
      }, 350);
    }

    function toggle() {
      if (panel.classList.contains("is-open")) closePanel();
      else openPanel();
    }

    closeBtn?.addEventListener("click", closePanel);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="msg"]');
      const text = input?.value?.trim();
      if (!text) return;

      const userBubble = document.createElement("p");
      userBubble.className = "chatbot-panel__bubble chatbot-panel__bubble--user";
      userBubble.textContent = text;
      messages?.appendChild(userBubble);

      const botBubble = document.createElement("p");
      botBubble.className = "chatbot-panel__bubble chatbot-panel__bubble--bot";
      botBubble.textContent = replies[Math.floor(Math.random() * replies.length)];
      messages?.appendChild(botBubble);

      form.reset();
      messages.scrollTop = messages.scrollHeight;
    });

    document.getElementById("chatbotConsult")?.addEventListener("click", () => {
      closePanel();
      document.getElementById("consultModal")?.showModal?.();
    });

    window.Chatbot = { open: openPanel, close: closePanel, toggle };
  }

  // ——— Hero canvas particles (legacy — estrellas en page-stars.js) ———
  function initHeroCanvas() {
    return;
    const canvas = document.getElementById("heroCanvas");
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    let w, h, particles, animId;
    const count = 80;

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = cw;
      h = ch;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.5 + 0.1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 98, ${p.a})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(201, 169, 98, ${0.08 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    });
  }

  // ——— Custom cursor ———
  function initCursor() {
    const cursor = document.getElementById("cursor");
    if (!cursor || window.innerWidth < 1025 || reducedMotion) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const hoverables =
      "a, button, .collection-card, .product-card, input, select, textarea";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove("is-hover");
    });

    function tick() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursor.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ——— Lenis + GSAP ———
  function initSmoothScroll() {
    if (reducedMotion || typeof Lenis === "undefined") return;

    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function initAnimations() {
    if (typeof gsap === "undefined" || reducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // Horizontal collections
    const wrap = document.getElementById("collectionsWrap");
    const track = document.getElementById("collectionsTrack");
    const progress = document.getElementById("collectionsProgress");

    if (wrap && track) {
      const getScroll = () => track.scrollWidth - wrap.offsetWidth;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.width = `${self.progress * 100}%`;
          },
        },
      });
    }

    // Edition counter
    const counter = document.getElementById("editionCounter");
    if (counter) {
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            counter,
            { innerText: 3 },
            {
              innerText: 1,
              duration: 2,
              snap: { innerText: 1 },
              ease: "power2.out",
            }
          );
        },
      });
    }
  }

  // ——— Nav ———
  function initNav() {
    const nav = document.getElementById("nav");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const onScroll = () => {
      nav?.classList.toggle("is-scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    menuBtn?.addEventListener("click", () => {
      const open = menuBtn.classList.toggle("is-open");
      mobileMenu?.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      mobileMenu?.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileMenu?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menuBtn?.classList.remove("is-open");
        mobileMenu?.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // ——— Products ———
  function formatPrice(n) {
    if (!n || n <= 0) return T.priceOnRequest;
    return new Intl.NumberFormat(T.numberLocale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function renderProducts(filter = "all") {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map((raw) => {
      const p = localizeProduct(raw);
      const hidden = filter !== "all" && p.category !== filter;
      const priceLabel =
        p.price > 0
          ? `${T.priceFrom} ${formatPrice(p.price)}`
          : formatPrice(0);
      const canAdd = p.price > 0;
      const imgWrapClass = p.animated ? " product-card__img-wrap--render" : "";
      const imgFallback = p.animated ? img("relojHero", 1200, 1500) : fallbackSrc;
      return `
        <article class="product-card${hidden ? " is-hidden" : ""}" data-category="${p.category}" data-id="${p.id}">
          <div class="product-card__img-wrap${imgWrapClass}">
            <img src="${p.image}" alt="${p.name} — ${p.gems}" loading="lazy" decoding="async" data-fallback="${imgFallback}" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.onerror=null;}" />
            <span class="product-card__badge">${p.badge}</span>
          </div>
          <div class="product-card__body">
            <span class="product-card__cat">${CATEGORY_LABELS[p.category]}</span>
            <h3>${p.name}</h3>
            <p class="product-card__gems">${p.gems}</p>
            <p class="product-card__price">${priceLabel}</p>
            <div class="product-card__actions">
              ${canAdd ? `<button type="button" class="btn btn--outline" data-add="${p.id}">${T.select}</button>` : ""}
              <button type="button" class="btn btn--gold" data-modal="consult">${canAdd ? T.consult : T.requestDesign}</button>
            </div>
          </div>
        </article>`;
    }).join("");

    grid.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => addToCart(btn.dataset.add));
    });
  }

  function initFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = () => document.querySelectorAll(".product-card");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        cards().forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !show);
        });
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      });
    });

    document.querySelectorAll("[data-filter]").forEach((link) => {
      if (link.classList.contains("collection-card__link")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const f = link.dataset.filter;
          const btn = document.querySelector(`.filter-btn[data-filter="${f}"]`);
          btn?.click();
          const piecesId = T.piecesId;
          document.getElementById(piecesId)?.scrollIntoView({ behavior: "smooth" });
        });
      }
    });
  }

  // ——— Cart ———
  function addToCart(id) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    if (!product.price || product.price <= 0) {
      document.querySelector("[data-modal='consult']")?.click();
      return;
    }
    const existing = cart.find((c) => c.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ ...localizeProduct(product), qty: 1 });
    updateCartUI();
    openCart();
  }

  function updateCartUI() {
    const countEl = document.getElementById("cartCount");
    const itemsEl = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    const toggle = document.getElementById("cartToggle");

    const totalQty = cart.reduce((s, c) => s + c.qty, 0);
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

    if (countEl) countEl.textContent = totalQty;
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        T.cartAria(totalQty)
      );
    }

    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = `<li class="drawer__empty">${
        T.cartEmpty
      }</li>`;
    } else {
      itemsEl.innerHTML = cart
        .map(
          (c) => `
        <li class="drawer__item">
          <img src="${c.image}" alt="" width="64" height="80" />
          <div class="drawer__item-info">
            <h4>${c.name}</h4>
            <p>${formatPrice(c.price)} × ${c.qty}</p>
          </div>
        </li>`
        )
        .join("");
    }

    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  function openCart() {
    document.getElementById("cartDrawer")?.classList.add("is-open");
    document.getElementById("cartDrawer")?.setAttribute("aria-hidden", "false");
  }

  function closeCart() {
    document.getElementById("cartDrawer")?.classList.remove("is-open");
    document.getElementById("cartDrawer")?.setAttribute("aria-hidden", "true");
  }

  function initCart() {
    document.getElementById("cartToggle")?.addEventListener("click", openCart);
    document.getElementById("cartClose")?.addEventListener("click", closeCart);
    document.getElementById("cartBackdrop")?.addEventListener("click", closeCart);
    updateCartUI();
  }

  // ——— Modal ———
  function initModal() {
    const modal = document.getElementById("consultModal");
    const form = document.getElementById("consultForm");
    const success = document.getElementById("formSuccess");
    const closeBtn = document.getElementById("modalClose");
    let closeTimer = null;

    function openModal() {
      if (!modal) return;
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      modal.classList.remove("is-closing");
      if (!modal.open) modal.showModal();
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          "#consultModal .modal__ornament, #consultModal h2, #consultModal .modal__box > p",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.2,
          }
        );
        gsap.fromTo(
          "#consultModal .modal__form label, #consultModal .modal__form .btn--full",
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.38,
          }
        );
      }
    }

    function closeModalAnimated() {
      if (!modal?.open) return;
      modal.classList.add("is-closing");
      closeTimer = setTimeout(() => {
        modal.classList.remove("is-closing");
        modal.close();
      }, 450);
    }

    document.querySelectorAll("[data-modal='consult']").forEach((el) => {
      el.addEventListener("click", () => {
        closeCart();
        openModal();
      });
    });

    closeBtn?.addEventListener("click", closeModalAnimated);

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModalAnimated();
    });

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      form.hidden = true;
      success.hidden = false;
      setTimeout(() => {
        closeModalAnimated();
        form.hidden = false;
        success.hidden = true;
        form.reset();
      }, 2200);
    });
  }

  function bindStaticImageFallbacks() {
    const fb = fallbackSrc;
    document.querySelectorAll("img[src*='images.unsplash.com']").forEach((el) => {
      if (!el.dataset.fallback) el.dataset.fallback = fb;
      el.addEventListener("error", function onErr() {
        if (el.dataset.fallback && el.src !== el.dataset.fallback) {
          el.src = el.dataset.fallback;
          el.removeEventListener("error", onErr);
        }
      });
    });
  }

  // ——— Init ———
  function init() {
    bindStaticImageFallbacks();
    initPreloader();
    initHeroCanvas();
    initCursor();
    initSmoothScroll();
    initNav();
    renderProducts();
    initFilters();
    initCart();
    initModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
