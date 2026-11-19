/* ===== Configuración: completá estos datos y listo =====
   whatsapp: número con código de país y sin signos, ej. "5429XXXXXXXX"
   instagram: usuario sin @, ej. "levelsbarber"
   Si los dejás vacíos, los botones no se muestran. */
const CONFIG = { whatsapp: "", instagram: "" };

(function () {
  const header = document.getElementById("header");
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  const floating = document.getElementById("floatingBtn");
  const hero = document.getElementById("top");
  const finalCta = document.getElementById("finalcta");

  /* Header con fondo al hacer scroll */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    toggle.textContent = open ? "✕" : "☰";
    document.body.classList.toggle("no-scroll", open);
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia("(min-width:1024px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* Botón flotante: aparece al salir del hero y se oculta en el cierre */
  if (floating && hero && finalCta && "IntersectionObserver" in window) {
    let heroVisible = true, finalVisible = false;
    const update = () => floating.classList.toggle("show", !heroVisible && !finalVisible);
    new IntersectionObserver((en) => { heroVisible = en[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver((en) => { finalVisible = en[0].isIntersecting; update(); }).observe(finalCta);
  }

  /* Estado "Abierto ahora" (hora de Argentina). Lunes a sábado, 11 a 21 hs */
  const OPEN_H = 11, CLOSE_H = 21;
  const DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  function estado(date) {
    const p = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(date);
    const get = (t) => p.find((x) => x.type === t).value;
    const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    const abreHoy = dow !== 0;
    if (abreHoy && mins >= OPEN_H * 60 && mins < CLOSE_H * 60) {
      return { abierto: true, texto: "Abierto ahora · hasta las " + CLOSE_H + " hs" };
    }
    if (abreHoy && mins < OPEN_H * 60) return { abierto: false, texto: "Cerrado · abre hoy a las " + OPEN_H + " hs" };
    const manana = (dow + 1) % 7;
    if (manana === 0) return { abierto: false, texto: "Cerrado · abre el lunes a las " + OPEN_H + " hs" };
    return { abierto: false, texto: "Cerrado · abre mañana a las " + OPEN_H + " hs" };
  }
  const st = document.getElementById("openStatus");
  if (st) {
    const e = estado(new Date());
    st.textContent = e.texto;
    st.classList.toggle("open", e.abierto);
  }

  /* WhatsApp e Instagram (solo si están configurados) */
  const wa = document.getElementById("waBtn");
  if (wa && /^\d{8,15}$/.test(CONFIG.whatsapp)) {
    wa.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Hola, quería consultar por un turno en Level's Barber.");
    wa.hidden = false;
  }
  const ig = document.getElementById("igLink");
  if (ig && /^[\w.]{1,30}$/.test(CONFIG.instagram)) {
    ig.href = "https://instagram.com/" + CONFIG.instagram;
    ig.hidden = false;
  }

  window.__estado = estado; /* solo para pruebas */
})();
