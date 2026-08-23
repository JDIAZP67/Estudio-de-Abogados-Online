(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const tarjetaEspecialidad = (e) => `
    <article class="card">
      <span class="chip">Consultoría · ${e.duracion}</span>
      <div class="icono">⚖️</div>
      <h3>${e.nombre}</h3>
      <p class="meta">${e.descripcion}</p>
      <p class="abogados"><strong>Abogados:</strong> ${e.abogados.join(", ")}</p>
      <p class="precio">S/ ${e.precio} <small>por sesión</small></p>
      <button class="btn btn-azul" data-cal-link="${LEX.calendario}" data-cal-config='{"layout":"month_view"}'>Agendar cita</button>
    </article>`;

  const tarjetaCurso = (c) => `
    <article class="card">
      <span class="chip">${c.modalidad}</span>
      <div class="icono">🎓</div>
      <h3>${c.nombre}</h3>
      <p class="meta">${c.descripcion}</p>
      <p class="meta"><strong>Docente:</strong> ${c.docente}</p>
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

  const abrirModal = (id) => {
    $("#modal-" + id).classList.add("abierto");
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = (id) => {
    $("#modal-" + id).classList.remove("abierto");
    document.body.style.overflow = "";
  };

  window.abrirModalConsulta = (id) => {
    const e = LEX.especialidades.find((x) => x.id === id);
    const abogadoSel = $("#modal-consulta .select-abogado");
    abogadoSel.innerHTML = e.abogados.map((a) => `<option>${a}</option>`).join("");
    $("#modal-consulta .txt-especialidad").textContent = e.nombre;
    $("#modal-consulta .txt-precio").textContent = `S/ ${e.precio} · ${e.duracion}`;
    $("#modal-consulta").dataset.especialidad = e.nombre;
    $("#modal-consulta").dataset.precio = e.precio;
    $("#modal-consulta").dataset.duracion = e.duracion;
    $("#modal-consulta").dataset.precioTexto = `S/ ${e.precio}`;
    abrirModal("consulta");
  };

  window.abrirModalCurso = (id) => {
    const c = LEX.cursos.find((x) => x.id === id);
    $("#modal-curso .txt-curso").textContent = c.nombre;
    $("#modal-curso").dataset.curso = c.nombre;
    $("#modal-curso").dataset.modalidad = c.modalidad;
    $("#modal-curso").dataset.precioTexto = `S/ ${c.precio}`;
    abrirModal("curso");
  };

  const leerValor = (selector) => $("#modal-consulta " + selector).value.trim();

  window.enviarConsulta = () => {
    const m = $("#modal-consulta");
    const nombre = leerValor(".input-nombre");
    const whatsapp = leerValor(".input-whatsapp");
    const fecha = leerValor(".input-fecha");
    const hora = leerValor(".input-hora");
    const abogado = leerValor(".select-abogado");
    const especialidad = m.dataset.especialidad;
    const precio = m.dataset.precioTexto;
    if (!nombre || !fecha || !hora) {
      alert("Completa tu nombre, fecha y hora de la cita.");
      return;
    }
    const msg =
      `Hola LexOnline, quiero agendar una consulta de ${especialidad} (${precio}) ` +
      `con ${abogado} el ${fecha} a las ${hora}. Me llamo ${nombre}.` +
      (whatsapp ? ` Mi WhatsApp es ${whatsapp}.` : "");
    window.open("https://wa.me/" + LEX.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  window.enviarCurso = () => {
    const m = $("#modal-curso");
    const nombre = $("#modal-curso .input-nombre").value.trim();
    const correo = $("#modal-curso .input-correo").value.trim();
    const whatsapp = $("#modal-curso .input-whatsapp").value.trim();
    const curso = m.dataset.curso;
    const modalidad = m.dataset.modalidad;
    const precio = m.dataset.precioTexto;
    if (!nombre) {
      alert("Completa tu nombre.");
      return;
    }
    const msg =
      `Hola LexOnline, quiero inscribirme en "${curso}" (${precio}, ${modalidad}).` +
      ` Me llamo ${nombre}.` +
      (correo ? ` Mi correo es ${correo}.` : "") +
      (whatsapp ? ` Mi WhatsApp es ${whatsapp}.` : "");
    window.open("https://wa.me/" + LEX.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
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
})();
