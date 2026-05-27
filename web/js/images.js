/**
 * Catálogo de imágenes — IDs verificados (HTTP 200 en Unsplash).
 */
(function (global) {
  "use strict";

  const catalog = {
    relojHero: "assets/images/reloj-pave.png",
    relojAlt: "photo-1614162686458-4s8bfcc6d1d5",
    relojEsqueletoRender: "assets/images/reloj-esqueleto-render.gif",
    collar: "photo-1573408301185-9146fe634ad0",
    cadena: "photo-1705575518997-82a71bcc75a2",
    cadenaAlt: "photo-1599643478518-a784e5dc4c8f",
    diamanteSolitario: "photo-1603561591411-07134e71a2a9",
    diamanteMacro: "photo-1515562141207-7a88fb7ce338",
    diamanteDark: "photo-1603561591411-07134e71a2a9",
    diamantesPave: "photo-1721919850259-2a15f09caeb2",
    esmeraldaGema: "photo-1600119612651-0db31b3a7baa",
    esmeraldaAnillo: "photo-1613945409199-1b5527d31fe8",
    aretes: "photo-1599707367072-cd6ada2bc375",
    areteDiamante: "photo-1605100804763-247f67b3557e",
    atelier: "photo-1603561591411-07134e71a2a9",
    anilloMano: "photo-1515562141207-7a88fb7ce338",
  };

  function hq(photoId, w = 1400, h = null) {
    if (
      photoId.startsWith("assets/") ||
      photoId.startsWith("/") ||
      photoId.startsWith("file:///") ||
      photoId.startsWith("data:")
    ) {
      return photoId;
    }
    if (!/^https?:\/\/images\.unsplash\.com\/|^photo-/.test(photoId)) {
      return photoId;
    }
    const id = photoId.replace(/^https?:\/\/images\.unsplash\.com\//, "");
    const params = new URLSearchParams({
      w: String(w),
      q: "90",
      auto: "format",
      fit: "crop",
      crop: "center",
    });
    if (h) params.set("h", String(h));
    return `https://images.unsplash.com/${id}?${params.toString()}`;
  }

  function img(key, w = 1400, h = null) {
    const id = catalog[key];
    if (!id) return hq(catalog.diamanteSolitario, w, h);
    return hq(id, w, h);
  }

  global.IMAGES_11C = {
    catalog,
    hq,
    img,
    fallback: catalog.diamanteSolitario,
  };
})(typeof window !== "undefined" ? window : globalThis);
