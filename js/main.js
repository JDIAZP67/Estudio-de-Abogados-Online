(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const problemasDatos =
    typeof LEX.validarLex === "function" ? LEX.validarLex() : [];
  if (problemasDatos.length) {
    console.warn("LexOnline · revisar js/datos.js:", problemasDatos);
  }

  const mapaAbogados = Object.fromEntries(
    LEX.abogados.map((a) => [a.id, a])
  );
  const nombreAbogado = (id) =>
    mapaAbogados[id] ? mapaAbogados[id].nombre : id;

  const tarjetaEspecialidad = (e) => `
    <article class="card">
      <span class="chip">Consultoría · ${e.duracion}</span>
      <div class="icono">⚖️</div>
      <h3>${e.nombre}</h3>
      <p class="meta">${e.descripcion}</p>
      <p class="abogados"><strong>Abogados:</strong> ${e.abogadosIds.map(nombreAbogado).join(", ")}</p>
      <p class="precio">S/ ${e.precio} <small>por sesión</small></p>
      <button class="btn btn-azul" data-cal-link="${LEX.calendario}" data-cal-config='{"layout":"month_view"}'>Agendar cita</button>
    </article>`;

  const tarjetaCurso = (c) => `
    <article class="card">
      <span class="chip">${c.modalidad}</span>
      <div class="icono">🎓</div>
      <h3>${c.nombre}</h3>
      <p class="meta">${c.descripcion}</p>
      <p class="meta"><strong>Docente:</strong> ${nombreAbogado(c.docenteId)}</p>
      <p class="precio">S/ ${c.precio} <small>· incluye certificado</small></p>
      <button class="btn btn-oro" data-cal-link="${LEX.calendarioClases}" data-cal-config='{"layout":"month_view"}'>Reservar mi clase</button>
    </article>`;

  const tarjetaMiembro = (m) => `
    <article class="miembro">
      <div class="avatar">${m.nombre.replace(/^(Dr\.|Dra\.) /, "").slice(0, 1)}</div>
      <h4>${m.nombre}</h4>
      <p>${m.especialidad}</p>
      <span class="cal">${m.cal}</span>
    </article>`;

  const formatearWhatsapp = (n) => {
    if (n.startsWith("+")) return n;
    return "+" + n;
  };

  const render = () => {
    $("#especialidades-grid").innerHTML = LEX.especialidades.map(tarjetaEspecialidad).join("");
    $("#cursos-grid").innerHTML = LEX.cursos.map(tarjetaCurso).join("");
    $("#staff-grid").innerHTML = LEX.abogados.map(tarjetaMiembro).join("");
    $("#stat-abogados").textContent = LEX.abogados.length;
    $("#stat-especialidades").textContent = LEX.especialidades.length;
    $("#stat-cursos").textContent = LEX.cursos.length;
    $("#stat-citas").textContent = "+" + LEX.citasAtendidas;
    const wa = formatearWhatsapp(LEX.whatsapp);
    $("#texto-whatsapp").textContent = wa;
    $(".whatsapp-float").href = "https://wa.me/" + LEX.whatsapp;
    $("#texto-correo").textContent = LEX.correo;
    $("#texto-correo").href = "mailto:" + LEX.correo;
  };

  const cerrarModal = (id) => {
    $("#modal-" + id).classList.remove("abierto");
    document.body.style.overflow = "";
  };

  window.enviarContacto = () => {
    const nombre = $("#contacto-nombre").value.trim();
    const correo = $("#contacto-correo").value.trim();
    const mensaje = $("#contacto-mensaje").value.trim();
    if (!nombre || !mensaje) {
      alert("Completa tu nombre y tu mensaje.");
      return;
    }
    const msg =
      `Hola LexOnline, soy ${nombre}` +
      (correo ? ` (${correo})` : "") +
      `. ${mensaje}`;
    window.open("https://wa.me/" + LEX.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  window.pedirDatosPago = () => {
    const msg =
      "Hola LexOnline, quisiera recibir los datos de pago " +
      "(Yape, Plin o transferencia bancaria) para mi consulta o curso.";
    window.open("https://wa.me/" + LEX.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  const renderEnlacesPago = () => {
    const cont = $("#enlaces-pagos");
    if (!cont) return;
    const enlaces = (LEX.pagos && LEX.pagos.enlacesOnline) || [];
    if (!enlaces.length) return;
    cont.innerHTML = enlaces
      .map((e) =>
        `<a class="btn btn-azul btn-enlace-pago" href="${e.url}" target="_blank" rel="noopener">💳 Pagar: ${e.nombre}</a>`
      )
      .join("");
    const badge = $("#badge-online");
    if (badge) badge.textContent = "💳 Pago online directo disponible";
  };

  const sala = (nombre) => {
    $$(".sala-tabs button").forEach((b) => b.classList.remove("activo"));
    $$(".sala-panel").forEach((p) => p.classList.remove("activo"));
    $("#tab-" + nombre).classList.add("activo");
    $("#panel-" + nombre).classList.add("activo");
  };

  window.cambiarSala = sala;

  const conectar = (inputId) => {
    const link = $("#" + inputId).value.trim();
    if (link.includes("meet.google.com")) {
      window.open(link, "_blank", "noopener");
    } else {
      alert("Ingresa un link válido de Google Meet (meet.google.com/xxx-xxxx-xxx).");
    }
  };

  window.unirseConsulta = () => conectar("link-consulta");
  window.unirseCurso = () => conectar("link-curso");

  $$(".cerrar").forEach((btn) =>
    btn.addEventListener("click", () => cerrarModal(btn.dataset.modal))
  );

  $$(".modal").forEach((mod) =>
    mod.addEventListener("click", (ev) => {
      if (ev.target === mod) cerrarModal(mod.id.replace("modal-", ""));
    })
  );

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      $$(".modal.abierto").forEach((mod) => cerrarModal(mod.id.replace("modal-", "")));
    }
  });

  $("#hamburguesa").addEventListener("click", () => {
    $("#nav-principal").classList.toggle("abierto");
  });

  $$("#nav-principal a").forEach((link) =>
    link.addEventListener("click", () =>
      $("#nav-principal").classList.remove("abierto")
    )
  );

  render();
  renderEnlacesPago();
})();
