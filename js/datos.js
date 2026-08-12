const LEX = {
  whatsapp: "51999999999",
  correo: "contacto@lexonline.com",
  especialidades: [
    { id: "penal", nombre: "Derecho Penal", descripcion: "Asesoría en procesos penales, defensa legal y consultas sobre causas judiciales.", abogados: ["Dr. Luis Pérez", "Dra. María López"], duracion: "30 min", precio: 80 },
    { id: "financiero", nombre: "Derecho Financiero", descripcion: "Orientación en deudas, contratos financieros, SUNAT y tributación básica.", abogados: ["Dra. Ana Torres", "Dr. Jorge Méndez"], duracion: "30 min", precio: 90 },
    { id: "propiedades", nombre: "Derecho de Propiedades", descripcion: "Consultas sobre inmuebles, contratos de arrendamiento y trámites registrales.", abogados: ["Dr. Carlos Rivas", "Dra. Sofía Castro"], duracion: "30 min", precio: 85 },
    { id: "laboral", nombre: "Derecho Laboral", descripcion: "Despidos, liquidaciones, contratos de trabajo y conciliación laboral.", abogados: ["Dr. Miguel Quispe"], duracion: "30 min", precio: 80 },
    { id: "familia", nombre: "Derecho de Familia", descripcion: "Separación, alimentos, tenencia de menores y régimen de visitas.", abogados: ["Dra. Carmen Díaz"], duracion: "30 min", precio: 80 },
    { id: "corporativo", nombre: "Derecho Corporativo", descripcion: "Constitución de empresas, contratos mercantiles y sociedades.", abogados: ["Dr. Jorge Méndez", "Dr. Miguel Quispe"], duracion: "45 min", precio: 120 }
  ],
  cursos: [
    { id: "curso-penal", nombre: "Derecho Penal Aplicado", modalidad: "Grabado", descripcion: "12 videos + PDF de apuntes + Certificado digital.", modulos: "12 videos", precio: 199, docente: "Dr. Luis Pérez" },
    { id: "diplomado-finanzas", nombre: "Diplomado: Finanzas y Derecho", modalidad: "En vivo (Meet)", descripcion: "8 módulos en vivo + Certificación con valor curricular.", modulos: "8 módulos", precio: 450, docente: "Dra. Ana Torres" },
    { id: "curso-propiedades", nombre: "Contratos y Propiedades", modalidad: "Híbrido", descripcion: "Clases grabadas + 2 sesiones en vivo de resolución de casos.", modulos: "10 videos + 2 sesiones", precio: 240, docente: "Dr. Carlos Rivas" },
    { id: "curso-laboral", nombre: "Derecho Laboral para Empresas", modalidad: "En vivo (Meet)", descripcion: "6 sesiones en vivo + Certificado para gestión de RR.HH.", modulos: "6 sesiones", precio: 320, docente: "Dr. Miguel Quispe" }
  ],
  abogados: [
    { nombre: "Dr. Luis Pérez", especialidad: "Derecho Penal", cal: "CAL 12345" },
    { nombre: "Dra. María López", especialidad: "Derecho Penal", cal: "CAL 23456" },
    { nombre: "Dra. Ana Torres", especialidad: "Derecho Financiero", cal: "CAL 34567" },
    { nombre: "Dr. Jorge Méndez", especialidad: "Financiero y Corporativo", cal: "CAL 45678" },
    { nombre: "Dr. Carlos Rivas", especialidad: "Derecho de Propiedades", cal: "CAL 56789" },
    { nombre: "Dra. Sofía Castro", especialidad: "Derecho de Propiedades", cal: "CAL 67890" },
    { nombre: "Dr. Miguel Quispe", especialidad: "Laboral y Corporativo", cal: "CAL 78901" },
    { nombre: "Dra. Carmen Díaz", especialidad: "Derecho de Familia", cal: "CAL 89012" }
  ]
};
