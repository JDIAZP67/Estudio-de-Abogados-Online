const LEX = {
  whatsapp: "51908644688",
  correo: "juliodiaz1167@gmail.com",
  citasAtendidas: 500,
  calendario: "julio-diaz-prado-l1btiq/consulta-juridica",
  calendarioClases: "julio-diaz-prado-l1btiq/consulta-juridica-copy",

  abogados: [
    { id: "luis-perez", nombre: "Dr. Luis Pérez", cal: "CAL 12345" },
    { id: "maria-lopez", nombre: "Dra. María López", cal: "CAL 23456" },
    { id: "ana-torres", nombre: "Dra. Ana Torres", cal: "CAL 34567" },
    { id: "jorge-mendez", nombre: "Dr. Jorge Méndez", cal: "CAL 45678" },
    { id: "carlos-rivas", nombre: "Dr. Carlos Rivas", cal: "CAL 56789" },
    { id: "sofia-castro", nombre: "Dra. Sofía Castro", cal: "CAL 67890" },
    { id: "miguel-quispe", nombre: "Dr. Miguel Quispe", cal: "CAL 78901" },
    { id: "carmen-diaz", nombre: "Dra. Carmen Díaz", cal: "CAL 89012" }
  ],

  especialidades: [
    { id: "penal", nombre: "Derecho Penal", descripcion: "Asesoría en procesos penales, defensa legal y consultas sobre causas judiciales.", duracion: "30 min", precio: 80, abogadosIds: ["luis-perez", "maria-lopez"] },
    { id: "financiero", nombre: "Derecho Financiero", descripcion: "Orientación en deudas, contratos financieros, SUNAT y tributación básica.", duracion: "30 min", precio: 90, abogadosIds: ["ana-torres", "jorge-mendez"] },
    { id: "propiedades", nombre: "Derecho de Propiedades", descripcion: "Consultas sobre inmuebles, contratos de arrendamiento y trámites registrales.", duracion: "30 min", precio: 85, abogadosIds: ["carlos-rivas", "sofia-castro"] },
    { id: "laboral", nombre: "Derecho Laboral", descripcion: "Despidos, liquidaciones, contratos de trabajo y conciliación laboral.", duracion: "30 min", precio: 80, abogadosIds: ["miguel-quispe"] },
    { id: "familia", nombre: "Derecho de Familia", descripcion: "Separación, alimentos, tenencia de menores y régimen de visitas.", duracion: "30 min", precio: 80, abogadosIds: ["carmen-diaz"] },
    { id: "corporativo", nombre: "Derecho Corporativo", descripcion: "Constitución de empresas, contratos mercantiles y sociedades.", duracion: "45 min", precio: 120, abogadosIds: ["jorge-mendez", "miguel-quispe"] }
  ],

  cursos: [
    { id: "curso-penal", nombre: "Derecho Penal Aplicado", modalidad: "Grabado", modulos: "12 videos", precio: 199, docenteId: "luis-perez", descripcion: "12 videos + PDF de apuntes + Certificado digital." },
    { id: "diplomado-finanzas", nombre: "Diplomado: Finanzas y Derecho", modalidad: "En vivo (Meet)", modulos: "8 módulos", precio: 450, docenteId: "ana-torres", descripcion: "8 módulos en vivo + Certificación con valor curricular." },
    { id: "curso-propiedades", nombre: "Contratos y Propiedades", modalidad: "Híbrido", modulos: "10 videos + 2 sesiones", precio: 240, docenteId: "carlos-rivas", descripcion: "Clases grabadas + 2 sesiones en vivo de resolución de casos." },
    { id: "curso-laboral", nombre: "Derecho Laboral para Empresas", modalidad: "En vivo (Meet)", modulos: "6 sesiones", precio: 320, docenteId: "miguel-quispe", descripcion: "6 sesiones en vivo + Certificado para gestión de RR.HH." }
  ],

  pagos: {
    yape: true,
    plin: true,
    transferencia: true,
    enlacesOnline: []
  },

  validarLex() {
    const problemas = [];
    const revisarIds = (arr, etiqueta) => {
      const vistos = new Set();
      arr.forEach((x) => {
        if (!x.id) problemas.push(`${etiqueta}: elemento sin id (${x.nombre || "?"})`);
        else if (vistos.has(x.id)) problemas.push(`${etiqueta}: id duplicado "${x.id}"`);
        vistos.add(x.id);
      });
      return vistos;
    };

    const idsAbogados = revisarIds(this.abogados, "abogados");
    const idsProductos = new Set([
      ...revisarIds(this.especialidades, "especialidades"),
      ...revisarIds(this.cursos, "cursos")
    ]);

    this.especialidades.forEach((e) => {
      if (!(e.precio > 0)) problemas.push(`especialidad "${e.id}": precio inválido`);
      if (!e.duracion) problemas.push(`especialidad "${e.id}": sin duración`);
      if (!Array.isArray(e.abogadosIds) || !e.abogadosIds.length) {
        problemas.push(`especialidad "${e.id}": sin abogados asignados`);
        return;
      }
      e.abogadosIds.forEach((id) => {
        if (!idsAbogados.has(id)) problemas.push(`especialidad "${e.id}": abogado inexistente "${id}"`);
      });
    });

    this.cursos.forEach((c) => {
      if (!(c.precio > 0)) problemas.push(`curso "${c.id}": precio inválido`);
      if (!idsAbogados.has(c.docenteId)) problemas.push(`curso "${c.id}": docente inexistente "${c.docenteId}"`);
    });

    (this.pagos.enlacesOnline || []).forEach((l) => {
      if (!idsProductos.has(l.productoId)) problemas.push(`enlaceOnline "${l.id}": productoId inexistente "${l.productoId}"`);
    });

    return problemas;
  }
};
