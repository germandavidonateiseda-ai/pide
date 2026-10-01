(function () {
  var C = window.PINEDA_CONFIG || null;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

    if (C) {
    C.direccionCompleta = C.direccion + ", " + C.ciudad;
    C.celularHref = C.celularE164 ? "tel:" + C.celularE164 : "";
    C.emailHref = "mailto:" + C.email;
    C.mapsHref =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(C.direccionCompleta);
    C.whatsappHref = C.whatsapp
      ? "https://wa.me/" +
        C.whatsapp +
        "?text=" +
        encodeURIComponent(
          "Hola. Escribo desde el sitio de " +
            C.nombre +
            ". Deseo conversar sobre un proyecto de mobiliario." +
            (C.campanaId ? " ID de campaña: " + C.campanaId : "")
        )
      : "";
  }

  function bind() {
    if (!C) return;
    $all("[data-bind]").forEach(function (el) {
      var key = el.getAttribute("data-bind");
      if (C[key] == null) return;
      el.textContent = C[key];
    });
    $all("[data-bind-href]").forEach(function (el) {
      var key = el.getAttribute("data-bind-href");
      if (C[key]) el.setAttribute("href", C[key]);
    });
    $all('input[name="campana_id"]').forEach(function (el) {
      el.value = C.campanaId;
    });
    $all("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
    if (!C.whatsapp) {
      $all(".wa-float, a[data-bind-href='whatsappHref']").forEach(function (el) {
        var li = el.closest ? el.closest("li") : null;
        if (li) li.hidden = true;
        else el.hidden = true;
      });
      $all("a[data-bind-href='celularHref']").forEach(function (el) {
        var li = el.closest ? el.closest("li") : null;
        if (li) li.hidden = true;
        else if (el.parentElement && el.parentElement.tagName === "P") el.parentElement.hidden = true;
        else el.hidden = true;
      });
    }
    if (!C.campanaId) {
      $all(".footer-campaign").forEach(function (el) { el.hidden = true; });
      $all(".campana-inline").forEach(function (el) {
        var li = el.closest ? el.closest("li") : null;
        if (li) li.hidden = true;
      });
      $all(".hero-meta span").forEach(function (el) {
        if (el.textContent.indexOf("ID de campaña") !== -1) el.hidden = true;
      });
    }
    if (document.title.indexOf("MUEBLES DUARTE") !== -1 && C.nombre !== "MUEBLES DUARTE") {
      document.title = document.title.split("MUEBLES DUARTE").join(C.nombre);
    }
    var meta = $('meta[name="description"]');
    if (meta && meta.content.indexOf("MUEBLES DUARTE") !== -1 && C.nombre !== "MUEBLES DUARTE") {
      meta.content = meta.content.split("MUEBLES DUARTE").join(C.nombre);
    }
  }

  function renderHistoria() {
    var root = $("[data-historia]");
    if (!C || !root || !C.historia) return;
    root.innerHTML = C.historia.map(function (item, index) {
      return (
        '<li class="tl-item">' +
        '<figure class="zoom-media tl-media reveal">' +
        '<img src="' + esc(item.imagen) + '" alt="' + esc(item.alt || item.titulo) + '" width="900" height="1120">' +
        "</figure>" +
        '<div class="tl-copy reveal" style="--d:80ms">' +
        '<span class="tl-index">' + String(index + 1).padStart(2, "0") + "</span>" +
        '<p class="tl-year">' + esc(item.anio) + "</p>" +
        "<h3>" + esc(item.titulo) + "</h3>" +
        "<p>" + esc(item.texto) + "</p>" +
        "</div></li>"
      );
    }).join("");
  }

  function initReveal() {
    var nodes = $all(".reveal");
    if (!nodes.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (el) { observer.observe(el); });
  }

  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $(".nav");
    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
      var top = $(".to-top");
      if (top) top.classList.toggle("is-on", window.scrollY > 700);
      if (!reduce) {
        $all("[data-parallax]").forEach(function (el) {
          var rect = el.getBoundingClientRect();
          var shift = (rect.top - window.innerHeight / 2) * 0.08;
          el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0) scale(1.08)";
        });
      }
    }
    onScroll();
    window.addEventListener("scroll", function () {
      window.requestAnimationFrame(onScroll);
    }, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.body.classList.toggle("no-scroll", open);
      });
      $all("a", nav).forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        });
      });
    }

    var page = document.body.getAttribute("data-page");
    if (page) {
      $all(".nav a").forEach(function (a) {
        if (a.getAttribute("data-nav") === page) a.setAttribute("aria-current", "page");
      });
    }
  }

  function initHero() {
    var root = $(".hero");
    if (!root) return;
    var slides = $all(".hero-slide", root);
    if (!slides.length) return;
    var dotsWrap = $(".hero-dots", root);
    var index = 0;
    var timer;

    slides.forEach(function (_, idx) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (idx === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Ver imagen " + (idx + 1) + " de la portada");
      dot.addEventListener("click", function () { go(idx); });
      dotsWrap.appendChild(dot);
    });

    function go(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, idx) {
        slide.classList.toggle("is-active", idx === index);
      });
      $all(".hero-dot", root).forEach(function (dot, idx) {
        dot.classList.toggle("is-active", idx === index);
      });
      restart();
    }
    function restart() {
      window.clearInterval(timer);
      if (reduce) return;
      timer = window.setInterval(function () { go(index + 1); }, 7000);
    }
    var prev = $("[data-hero='prev']", root);
    var nextBtn = $("[data-hero='next']", root);
    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); });
    root.addEventListener("mouseenter", function () { window.clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
    restart();
  }

  function initCounters() {
    var nodes = $all("[data-count]");
    if (!nodes.length) return;
    function run(el) {
      var target = Number(el.getAttribute("data-count") || 0);
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduce) {
        el.textContent = target + suffix;
        return;
      }
      var start = performance.now();
      function frame(now) {
        var t = Math.min(1, (now - start) / 1400);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(run);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (el) { observer.observe(el); });
  }

  function initOficio() {
    var root = $(".oficio");
    if (!root) return;
    var items = $all(".oficio-item", root);
    var images = $all(".oficio-visual img", root);
    function activate(item) {
      var idx = items.indexOf(item);
      items.forEach(function (btn) {
        var on = btn === item;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-expanded", on ? "true" : "false");
      });
      images.forEach(function (img, imageIndex) {
        img.classList.toggle("is-on", imageIndex === idx);
      });
    }
    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () { activate(item); });
      item.addEventListener("focus", function () { activate(item); });
      item.addEventListener("click", function () { activate(item); });
    });
  }

  function initAccordion() {
    $all(".acc-item").forEach(function (item) {
      var btn = $("button", item);
      var panel = $(".acc-panel", item);
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        var group = item.parentElement;
        if (group) {
          $all(".acc-item", group).forEach(function (other) {
            other.classList.remove("is-open");
            var otherBtn = $("button", other);
            var otherPanel = $(".acc-panel", other);
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherPanel) otherPanel.hidden = true;
          });
        }
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  function initQuotes() {
    var root = $("[data-slider]");
    if (!root) return;
    var slides = $all(".quote-slide", root);
    if (!slides.length) return;
    var index = 0;
    var timer;
    function go(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, idx) {
        slide.classList.toggle("is-active", idx === index);
      });
    }
    function restart() {
      window.clearInterval(timer);
      if (reduce) return;
      timer = window.setInterval(function () { go(index + 1); }, 8000);
    }
    $all("[data-slide]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(index + Number(btn.getAttribute("data-slide")));
        restart();
      });
    });
    root.addEventListener("mouseenter", function () { window.clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
    restart();
  }

  function initLightbox() {
    var items = $all("[data-gallery]");
    var box = $(".lightbox");
    if (!items.length || !box) return;
    var image = $(".lightbox img", box);
    var caption = $(".lightbox figcaption", box);
    var index = 0;

    function show(next) {
      index = (next + items.length) % items.length;
      var item = items[index];
      image.src = item.getAttribute("data-src") || item.querySelector("img").src;
      image.alt = item.getAttribute("data-alt") || "";
      caption.textContent = item.getAttribute("data-caption") || "";
    }
    function open(next) {
      show(next);
      box.hidden = false;
      document.body.classList.add("no-scroll");
      var close = $(".lightbox-close", box);
      if (close) close.focus();
    }
    function close() {
      box.hidden = true;
      document.body.classList.remove("no-scroll");
      image.removeAttribute("src");
    }
    items.forEach(function (item, idx) {
      item.addEventListener("click", function () { open(idx); });
    });
    $(".lightbox-close", box).addEventListener("click", close);
    $(".lightbox-backdrop", box).addEventListener("click", close);
    $(".lightbox-nav.prev", box).addEventListener("click", function () { show(index - 1); });
    $(".lightbox-nav.next", box).addEventListener("click", function () { show(index + 1); });
    document.addEventListener("keydown", function (event) {
      if (box.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") show(index - 1);
      if (event.key === "ArrowRight") show(index + 1);
    });
  }

  function initForms() {
    $all(".js-form").forEach(function (form) {
      var alertBox = $(".form-alert", form);
      var success = $(".form-success", form);
      var fields = $(".form-fields", form);
      var checkbox = form.querySelector('input[name="acepta_terminos"]');

      function showError(message) {
        if (!alertBox) return;
        alertBox.hidden = !message;
        alertBox.textContent = message || "";
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        showError("");
        var honeypot = form.querySelector('input[name="sitio_web"]');
        if (honeypot && honeypot.value) return;

        var nombre = form.nombre.value.trim();
        var email = form.correo.value.trim();
        var telefono = form.telefono.value.trim();
        var tipo = form.tipo.value;
        var mensaje = form.mensaje.value.trim();

        if (nombre.length < 3) {
          showError("Escriba su nombre completo para que la tienda pueda dirigirse a usted.");
          form.nombre.focus();
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showError("Indique un correo electrónico válido. Allí daremos curso a la respuesta.");
          form.correo.focus();
          return;
        }
        if (telefono.replace(/\D/g, "").length < 7) {
          showError("Indique un número de teléfono o WhatsApp de contacto.");
          form.telefono.focus();
          return;
        }
        if (!tipo) {
          showError("Seleccione el tipo de encargo para orientar la conversación.");
          form.tipo.focus();
          return;
        }
        if (mensaje.length < 20) {
          showError("Cuéntenos el encargo con un poco más de detalle: espacio, uso o plazo.");
          form.mensaje.focus();
          return;
        }
        if (!checkbox || !checkbox.checked) {
          showError("Para enviar el formulario debe aceptar los Términos y condiciones. Sin esa aceptación, el mensaje no se envía.");
          if (checkbox) checkbox.focus();
          return;
        }

        var subject = "Consulta " + (C ? C.nombre : "MUEBLES DUARTE") + (C && C.campanaId ? " — campaña " + C.campanaId : "");
        var bodyLines = [
          "Nombre: " + nombre,
          "Correo: " + email,
          "Teléfono: " + telefono,
          "Tipo de encargo: " + tipo
        ];
        if (C && C.campanaId) bodyLines.push("ID de campaña: " + C.campanaId);
        bodyLines.push("Acepta términos: sí", "", mensaje);
        var body = bodyLines.join("\n");
        var href = "mailto:" + (C ? C.email : "yorgelisferre151@gmail.com") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

        if (fields) fields.hidden = true;
        if (success) {
          success.hidden = false;
          var link = $("[data-mailto]", success);
          if (link) link.setAttribute("href", href);
          var title = $("h3", success);
          if (title) title.focus();
        }
        window.location.href = href;
      });
    });
  }

  function initCookies() {
    var banner = $(".cookie-banner");
    var modal = $(".cookie-modal");
    if (!banner || !modal) return;
    var key = "pineda_cookie_consent";

    function read() {
      try { return JSON.parse(localStorage.getItem(key) || "null"); }
      catch (error) { return null; }
    }
    function write(prefs) {
      var data = {
        necessary: true,
        preferences: !!prefs.preferences,
        analytics: !!prefs.analytics,
        marketing: !!prefs.marketing,
        updated: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(data));
      document.cookie = "pineda_consent=" + encodeURIComponent(JSON.stringify(data)) + ";path=/;max-age=" + (60 * 60 * 24 * 180) + ";SameSite=Lax";
      document.documentElement.classList.add("cookies-set");
      closeModal();
    }
    function openModal() {
      var saved = read() || {};
      var pref = $("#ck-pref");
      var ana = $("#ck-ana");
      var mkt = $("#ck-mkt");
      if (pref) pref.checked = !!saved.preferences;
      if (ana) ana.checked = !!saved.analytics;
      if (mkt) mkt.checked = !!saved.marketing;
      modal.hidden = false;
      document.body.classList.add("no-scroll");
      var close = $(".modal-close", modal);
      if (close) close.focus();
    }
    function closeModal() {
      modal.hidden = true;
      if (!$(".lightbox") || $(".lightbox").hidden) document.body.classList.remove("no-scroll");
    }

    $("[data-cookie-accept]", banner).addEventListener("click", function () {
      write({ preferences: true, analytics: true, marketing: true });
    });
    $("[data-cookie-reject]", banner).addEventListener("click", function () {
      write({ preferences: false, analytics: false, marketing: false });
    });
    $("[data-cookie-config]", banner).addEventListener("click", openModal);
    $("[data-cookie-save]", modal).addEventListener("click", function () {
      write({
        preferences: $("#ck-pref").checked,
        analytics: $("#ck-ana").checked,
        marketing: $("#ck-mkt").checked
      });
    });
    $("[data-cookie-reject]", modal).addEventListener("click", function () {
      write({ preferences: false, analytics: false, marketing: false });
    });
    $("[data-cookie-accept]", modal).addEventListener("click", function () {
      write({ preferences: true, analytics: true, marketing: true });
    });
    $(".modal-close", modal).addEventListener("click", closeModal);
    $(".modal-backdrop", modal).addEventListener("click", closeModal);

    document.addEventListener("click", function (event) {
      var opener = event.target.closest("[data-cookie-open]");
      if (!opener) return;
      event.preventDefault();
      openModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) closeModal();
      if (event.key === "Escape") {
        var nav = $(".nav");
        var toggle = $(".nav-toggle");
        if (nav && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        }
      }
    });
  }

  function initTop() {
    var btn = $(".to-top");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  function initPreloader() {
    var node = $("#preloader");
    if (!node) return;
    function hide() {
      node.classList.add("is-done");
    }
    window.addEventListener("load", hide);
    window.setTimeout(hide, 2400);
  }

  renderHistoria();
  bind();
  initReveal();
  initHeader();
  initHero();
  initCounters();
  initOficio();
  initAccordion();
  initQuotes();
  initLightbox();
  initForms();
  initCookies();
  initTop();
  initPreloader();
})();
