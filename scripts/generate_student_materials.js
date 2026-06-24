const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "materials", "student_printables");

const rounds = [
  {
    title: "Mapa tecnológico de la empresa",
    scenario: "Q = 120 | w = 10 | r = 10 | p = 4 | F = 0",
    options: ["Trabajo intensivo", "Capital intensivo", "Balanceada"],
    fields: [
      ["L elegido", "K elegido"],
      ["A propuesto", "Alpha / beta propuestos"],
      ["Una pista concreta del booklet", ""],
    ],
    note:
      "Objetivo: leer el booklet, clasificar la tecnología, inferir intensidad relativa de L/K y proponer A, alpha y beta.",
  },
  {
    title: "Beneficio: aceptar o rechazar la orden",
    scenario: "Q = 180 | w = 10 | r = 10 | p = 3.2 | F = 220",
    options: ["Aceptar la orden", "Rechazar la orden"],
    fields: [
      ["L elegido", "K elegido"],
      ["Coste estimado", "Beneficio estimado: pQ - C"],
      ["Razón económica", ""],
    ],
    note:
      "Objetivo: usar pi = pQ - C para decidir si la orden conviene; no basta con saber producir.",
  },
  {
    title: "Isocuanta contra isocoste",
    scenario: "Q = 150 | w = 10 | r = 10 | p = 4 | F = 0",
    options: ["Moverse hacia más L", "Moverse hacia más K", "Mezcla balanceada"],
    fields: [
      ["L elegido", "K elegido"],
      ["Coste variable", "Q esperado"],
      ["Cómo conectan isocuanta e isocoste", ""],
    ],
    note:
      "Objetivo: justificar la mezcla usando isocuanta, isocoste y precios de factores.",
  },
  {
    title: "Shock de precios relativos",
    scenario: "Q = 150 | w = 18 | r = 7 | p = 4 | F = 0",
    options: ["K/L sube", "K/L baja", "K/L casi igual"],
    fields: [
      ["L elegido", "K elegido"],
      ["Nuevo K/L", "Coste estimado"],
      ["Intuición del cambio", ""],
    ],
    note:
      "Objetivo: conectar precios relativos con demandas condicionadas cuando el trabajo se encarece y el capital se abarata.",
  },
  {
    title: "Corto plazo, coste medio y escala",
    scenario: "Q = 230 | w = 10 | r = 10 | p = 4 | F = 450",
    options: ["Aceptar escala", "Rechazar por CMe", "Recalcular CMe"],
    fields: [
      ["L elegido", "K elegido"],
      ["Coste total", "CMe estimado"],
      ["Decisión final y razón", ""],
    ],
    note:
      "Objetivo: observar cómo cambian C*, CMe*, beneficio y la ventaja de ajustar ambos factores cuando se reparte un coste fijo.",
  },
  {
    title: "Reveal y formalización",
    scenario: "Q = 150 | w = 10 | r = 10 | p = 4 | F = 0",
    options: [],
    fields: [
      ["Función revelada por el profesor", ""],
      ["¿Qué se acercó a nuestra hipótesis inicial?", ""],
      ["¿Qué error conceptual corregimos?", ""],
    ],
    note:
      "Esta ronda no es competitiva. El profesor pasa a Admin mode y revela las fórmulas oficiales.",
  },
];

const firms = [
  {
    team: 1,
    slug: "team1_la_aurora",
    name: "La Aurora",
    industry: "Puros: torcedores expertos y control manual.",
    title: "La tecnología detrás de un cigarro premium",
    accent: "#7a4a26",
    soft: "#fff7ed",
    coverAlt: "Taller de cigarros premium",
    hero: ["Hoja", "Selección", "Torcido", "Control", "Empaque"],
    context: [
      "<strong>La Aurora</strong> se presenta como una de las fábricas de cigarros más antiguas de la República Dominicana. Su historia se asocia con Santiago, el Cibao y la tradición tabaquera iniciada por Eduardo León Jimenes en 1903.",
      "El caso es útil para Microeconomía I porque combina escala exportadora, manufactura organizada y oficio artesanal. La empresa real puede ser grande, pero el producto premium sigue dependiendo de selección, torcido, control de humedad, inspección y experiencia acumulada.",
      "Para el simulador, la pista central es que la calidad visible del producto no sale solo de edificios o máquinas. Una mesa, un molde o una prensa ayudan, pero el valor final depende mucho de manos entrenadas y criterio técnico.",
    ],
    anchors: [
      "Origen histórico vinculado a 1903 y a Santiago.",
      "Industria: cigarros premium y manufactura tabaquera.",
      "Actividades clave: selección de hojas, fermentación, torcido, control de calidad y empaque.",
      "Pista didáctica: tecnología con fuerte peso del trabajo especializado.",
    ],
    production: [
      "En una firma de cigarros, el capital no desaparece: hay instalaciones, bancos de trabajo, moldes, prensas, zonas de fermentación, control de humedad, almacenaje, empaque y logística.",
      "Sin embargo, muchas etapas decisivas se parecen más a una tecnología de oficio que a una línea automática pura. Un trabajador nuevo no produce igual que un torcedor entrenado; una mesa adicional tampoco produce por sí sola si nadie la usa con criterio.",
    ],
    labor:
      "Torcedores, seleccionadores, supervisores de calidad, personal de empaque y mantenimiento artesanal.",
    capital:
      "Bancos, moldes, prensas, áreas de curado, control de humedad, almacenes y capacidad física de planta.",
    output: "Cigarros premium terminados, consistentes y vendibles.",
    guide:
      "Si la empresa comprara más bancos, prensas y moldes, pero no pudiera formar más torcedores expertos, ¿qué parte del proceso empezaría a limitar la producción primero?",
    sources: [
      ["La Aurora, sitio oficial", "historia, fábrica, tradición y experiencia de producción.", "https://www.laaurora.com.do/?lang=en"],
      ["La Aurora Factory Experience", "recorrido productivo y etapas del proceso del cigarro.", "https://www.laaurora.com/pages/factory-experience"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
  {
    team: 2,
    slug: "team2_induban",
    name: "Induban",
    industry: "Café industrial: tostado, molienda, empaque y maquinaria.",
    title: "Cómo produce valor Induban",
    accent: "#6f4e37",
    soft: "#fff8ef",
    coverAlt: "Factoría cafetalera",
    hero: ["Café verde", "Almacenaje", "Torrefacción", "Cata", "Empaque"],
    context: [
      "<strong>Industrias Banilejas, S.A.S. (Induban)</strong> es una empresa dominicana asociada al café y a la marca Café Santo Domingo. La compañía se presenta como una productora relevante de café en la República Dominicana.",
      "Induban fue fundada en 1945 por Manuel de Jesús Perelló Báez, con una operación vinculada a compra, elaboración y venta de café. Su cadena de valor conecta abastecimiento, torrefacción, control de calidad, empaque, distribución y marcas de consumo.",
      "Para el simulador, el caso sirve para pensar una tecnología donde maquinaria, torrefacción, molinos, líneas de empaque y capacidad de planta pesan mucho, aunque la cata y el control humano sigan importando.",
    ],
    anchors: [
      "Empresa dominicana fundada en 1945.",
      "Marca principal: Café Santo Domingo.",
      "Actividades clave: compra, elaboración, tostado, molienda, empaque, distribución y control de calidad.",
      "Pista didáctica: tecnología con fuerte papel de capital productivo especializado.",
    ],
    production: [
      "El producto final no aparece únicamente por tener café. La materia prima pasa por recepción y almacenamiento del grano, selección, torrefacción, molienda, empaque, control de calidad y distribución.",
      "La producción combina conocimiento humano, criterios de calidad, maquinaria industrial, infraestructura logística y capital físico especializado. La pregunta económica es qué factor se vuelve más difícil de sustituir cuando aumenta la escala.",
    ],
    labor:
      "Operarios, catadores, supervisión, logística, mantenimiento y control de calidad.",
    capital:
      "Torrefactores, molinos, líneas de empaque, sistemas de control, almacenes y vehículos.",
    output: "Café procesado y empacado con calidad vendible.",
    guide:
      "Si una empresa transforma café mediante torrefacción, molienda, empaque, control de calidad e infraestructura logística, ¿qué factor parece más difícil de reemplazar rápidamente cuando aumenta la escala?",
    sources: [
      ["Induban, página oficial Nosotros", "historia, marcas y datos institucionales.", "https://www.induban.com/es/nosotros"],
      ["Induban, Factorías", "descripción de factorías, torrefacción, molienda, empaque y control de calidad.", "https://www.induban.com/es/unidades-negocio/factorias"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
  {
    team: 3,
    slug: "team3_central_romana",
    name: "Central Romana",
    industry: "Azúcar: molinos, refinería, transporte y planta pesada.",
    title: "Cómo produce valor Central Romana",
    accent: "#1f7a45",
    soft: "#f0fdf4",
    coverAlt: "Ingenio azucarero",
    hero: ["Caña", "Transporte", "Molino", "Refinería", "Azúcar"],
    context: [
      "<strong>Central Romana</strong> es un grupo agroindustrial dominicano asociado históricamente a la producción azucarera en La Romana. Su operación combina campo, transporte, molienda, procesos industriales y logística.",
      "El caso es útil porque la producción de azúcar permite ver una tecnología de escala: grandes volúmenes de caña, molinos, calderas, refinería, energía, almacenamiento y movimiento continuo de materiales.",
      "Para el simulador, no piensen solo en trabajadores en el campo. Piensen en una cadena donde la capacidad instalada, el transporte y la planta pesada condicionan cuánto Q puede salir en una ronda.",
    ],
    anchors: [
      "Grupo agroindustrial con origen histórico en 1912.",
      "Industria: azúcar, agroindustria, molienda y refinación.",
      "Actividades clave: caña, transporte, molinos, calderas, refinería, almacenes y despacho.",
      "Pista didáctica: tecnología con peso alto de capital y coordinación logística.",
    ],
    production: [
      "La caña debe entrar a tiempo, molerse, extraer jugo, procesarse, cristalizarse, secarse, almacenarse y despacharse. Cada etapa tiene cuellos de botella físicos.",
      "El trabajo coordina, opera, mantiene y supervisa. Pero si no hay capacidad de molienda, transporte interno, energía, calderas y refinería, más horas de trabajo no convierten automáticamente más caña en azúcar vendible.",
    ],
    labor:
      "Operarios, técnicos de planta, supervisores, mantenimiento, logística agrícola e industrial.",
    capital:
      "Molinos, calderas, refinería, transporte, almacenes, energía, equipos de laboratorio y planta pesada.",
    output: "Azúcar y derivados procesados con calidad comercial.",
    guide:
      "Si llega más caña al ingenio pero la molienda y la refinería ya están cerca de capacidad, ¿qué factor limita más rápido el aumento de Q?",
    sources: [
      ["Central Romana, sitio oficial", "operación agroindustrial, zafra y producción azucarera.", "https://centralromana.com.do/en/"],
      ["World Sugar Research Organisation", "perfil institucional y referencia del grupo azucarero.", "https://wsro.org/member-organisation/Central-Romana-Corporation"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
  {
    team: 4,
    slug: "team4_pollo_cibao",
    name: "Pollo Cibao",
    industry: "Avícola industrial: galpones, refrigeración y bioseguridad.",
    title: "Cómo produce valor Pollo Cibao",
    accent: "#b45309",
    soft: "#fff7ed",
    coverAlt: "Planta avícola industrial",
    hero: ["Incubación", "Galpones", "Alimento", "Procesado", "Frío"],
    context: [
      "<strong>Pollo Cibao</strong> representa en la actividad una empresa avícola dominicana integrada: producción, incubación, crianza, engorde, procesamiento y distribución de pollo.",
      "El caso es útil porque la producción avícola moderna combina animales vivos, bioseguridad, alimentación, temperatura, galpones, procesamiento, refrigeración y una cadena de frío que no puede improvisarse en cuatro minutos.",
      "Para el simulador, la pista central es que la tecnología depende mucho de instalaciones y control físico. El trabajo es necesario, pero la escala queda atada a galpones, plantas, equipos y frío.",
    ],
    anchors: [
      "Empresa dominicana del sector avícola.",
      "Actividades clave: incubación, crianza, engorde, procesamiento y alimento para aves.",
      "Requiere bioseguridad, refrigeración y coordinación logística.",
      "Pista didáctica: tecnología capital-intensiva con trabajo de supervisión y operación.",
    ],
    production: [
      "La cadena avícola empieza antes del procesamiento: incubación, crianza, alimentación, sanidad, engorde y manejo de lotes. Luego vienen sacrificio, corte, empaque, refrigeración y distribución.",
      "El trabajo cuida, supervisa, opera y reacciona ante problemas. Pero el capital productivo define capacidad: galpones, líneas de procesamiento, equipos de frío, alimento, vehículos y sistemas de bioseguridad.",
    ],
    labor:
      "Cuidadores, técnicos de granja, veterinaria, operarios de planta, supervisores y logística.",
    capital:
      "Incubadoras, galpones, sistemas de ventilación, líneas de procesamiento, refrigeración, alimento y vehículos.",
    output: "Pollo procesado, empacado y mantenido en cadena de frío.",
    guide:
      "Si sube la demanda, ¿basta con contratar más personas o hace falta capacidad instalada para incubar, criar, procesar y refrigerar más producto?",
    sources: [
      ["WATT Poultry, perfil de Pollo Cibao", "descripción de producción, incubación, crianza, engorde y procesamiento.", "https://www.wattagnet.com/top-poultry-companies/company/pollo-cibao"],
      ["Dominican Republic Directory, Pollo Cibao", "resumen sectorial y actividades avícolas.", "https://www.dd.com.do/dominican-business-economy/livestock/pollo-cibao-l59970.html"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
  {
    team: 5,
    slug: "team5_grupo_puntacana",
    name: "Grupo Puntacana",
    industry: "Resort: capital hotelero con servicio humano clave.",
    title: "Cómo produce valor Grupo Puntacana",
    accent: "#0f766e",
    soft: "#ecfeff",
    coverAlt: "Resort turístico integrado",
    hero: ["Reserva", "Llegada", "Habitación", "Servicio", "Experiencia"],
    context: [
      "<strong>Grupo Puntacana</strong> representa un caso de turismo integrado: resort, comunidad, aeropuerto, infraestructura, sostenibilidad, servicios y experiencia del visitante.",
      "El caso es útil porque no encaja en una fábrica simple. Un hotel o resort necesita habitaciones, aeropuerto, vías, restaurantes, mantenimiento, energía, agua, jardinería, tecnología y activos físicos; pero el producto final se vive como servicio.",
      "Para el simulador, piensen en una tecnología relativamente balanceada: la inversión hotelera y aeroportuaria crea capacidad, mientras que el trabajo humano transforma esa capacidad en experiencia turística vendible.",
    ],
    anchors: [
      "Grupo turístico dominicano con desarrollo de resort, comunidad e infraestructura.",
      "Actividades clave: alojamiento, aeropuerto, alimentos y bebidas, mantenimiento, golf, servicios y sostenibilidad.",
      "El cliente compra una experiencia, no solo una habitación.",
      "Pista didáctica: capital hotelero importante con servicio humano clave.",
    ],
    production: [
      "En turismo, Q no es una caja que sale de una planta. Q puede interpretarse como noches, servicios o experiencias vendibles con calidad. La capacidad física fija un techo: habitaciones, restaurantes, aeropuerto, energía y transporte interno.",
      "Al mismo tiempo, más capital sin servicio humano produce una experiencia incompleta. Recepción, limpieza, cocina, mantenimiento, seguridad, operaciones, guías y atención al cliente convierten la infraestructura en valor.",
    ],
    labor:
      "Recepción, limpieza, cocina, mantenimiento, seguridad, guías, operaciones y atención al cliente.",
    capital:
      "Habitaciones, aeropuerto, restaurantes, cocinas, equipos, energía, agua, vías, golf e infraestructura comunitaria.",
    output: "Servicios turísticos y experiencias vendibles con calidad.",
    guide:
      "Si el resort ya tiene habitaciones y aeropuerto, ¿qué pasa con Q si falta personal de servicio? ¿Y si hay personal, pero no hay habitaciones disponibles?",
    sources: [
      ["Grupo Puntacana, historia", "desarrollo del resort, aeropuerto y comunidad.", "https://www.grupopuntacana.com.do/en/"],
      ["Puntacana, desarrollo sostenible", "infraestructura, sostenibilidad y comunidad turística.", "https://www.puntacana.com/en/about/sustainable-development"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
  {
    team: 6,
    slug: "team6_ron_barcelo_brugal",
    name: "Ron Barceló/Brugal",
    industry: "Destilería, barricas, embotellado e inventario envejecido.",
    title: "Cómo produce valor Ron Barceló/Brugal",
    accent: "#7c2d12",
    soft: "#fff7ed",
    coverAlt: "Destilería y barricas de ron",
    hero: ["Caña/melaza", "Fermentación", "Destilación", "Barricas", "Botella"],
    context: [
      "<strong>Ron Barceló/Brugal</strong> representa en la actividad la industria dominicana del ron: fermentación, destilación, envejecimiento, mezcla, embotellado, inventario y marca.",
      "El caso es útil porque enseña una tecnología donde el capital no es solo maquinaria visible. También cuentan barricas, almacenes, tiempo de envejecimiento, control de calidad, inventario y capacidad de embotellado.",
      "Para el simulador, la pista central es que más horas de trabajo ayudan, pero no reemplazan rápidamente años de barrica, destilería, tanques, almacenes ni líneas de embotellado.",
    ],
    anchors: [
      "Industria dominicana de ron y bebidas envejecidas.",
      "Actividades clave: fermentación, destilación, barricas, mezcla, control, embotellado e inventario.",
      "El tiempo y la capacidad de almacenamiento son parte de la tecnología.",
      "Pista didáctica: tecnología fuertemente capital-intensiva.",
    ],
    production: [
      "La cadena del ron pasa por materia prima, fermentación, destilación, maduración en barricas, selección, mezcla, filtrado, embotellado y distribución. No todo puede acelerarse con más personas.",
      "El trabajo experto importa en control, mezcla, laboratorio, mantenimiento y operación. Pero barricas, almacenes, destilería, líneas de embotellado e inventario envejecido hacen que K sea especialmente difícil de sustituir en el corto plazo.",
    ],
    labor:
      "Maestros roneros, laboratorio, operarios, mezcla, mantenimiento, empaque y logística.",
    capital:
      "Destilería, columnas, tanques, barricas, bodegas de envejecimiento, líneas de embotellado e inventario.",
    output: "Ron envejecido, mezclado, embotellado y listo para venta.",
    guide:
      "Si la marca recibe una orden grande hoy, ¿qué parte no se puede crear de inmediato solo contratando más personas: la mano de obra o el capital envejecido en barricas?",
    sources: [
      ["Ron Barceló, sitio oficial", "producción, caña propia, calidad y portafolio.", "https://ronbarcelo.com/en/"],
      ["Brugal, sitio oficial", "maestros roneros, selección de casks y proceso de añejamiento.", "https://www.brugal-rum.com/en"],
      ["Repositorio micro-firm-simulator", "mecánica de rondas, escenarios y scoring.", "../../micro-firm-simulator.html"],
    ],
  },
];

function esc(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

function commonCss() {
  return `
    :root{--ink:#17202a;--muted:#667085;--line:#d8dee8;--soft:#f6f8fb;--panel:#fff;--blue:#2563eb;--accent:#2563eb;--cream:#f8fafc;--shadow:0 16px 38px rgba(23,32,42,.12)}
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:linear-gradient(180deg,#eef3f8 0%,#fbfcfe 45%,#edf1f5 100%);line-height:1.48}
    .booklet{width:min(980px,calc(100% - 32px));margin:0 auto;padding:28px 0 44px}
    .cover,.page{background:rgba(255,255,255,.97);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow);padding:28px;margin:0 0 18px;overflow:hidden}
    .cover{display:grid;grid-template-columns:1.05fr .95fr;gap:24px;align-items:center;min-height:560px;background:radial-gradient(circle at 10% 10%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 32%),linear-gradient(135deg,#fff,var(--cream) 58%,#f3f6fb)}
    .eyebrow{margin:0 0 8px;color:var(--blue);font-size:.78rem;font-weight:850;text-transform:uppercase;letter-spacing:.08em}
    h1,h2,h3{margin:0;line-height:1.12}
    h1{font-size:3rem;letter-spacing:-.02em}
    h2{font-size:1.58rem;margin-bottom:14px}
    h3{font-size:1.05rem;margin:16px 0 8px;color:#344054}
    p{margin:0 0 11px}.subtitle{font-size:1.08rem;color:var(--muted);margin-top:14px}
    .badge-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}.badge{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:6px 10px;background:#fff;color:#344054;font-weight:750;font-size:.86rem}
    .hero-panel{width:100%;border-radius:8px;border:1px solid var(--line);background:#fff;overflow:hidden}.hero-panel svg{display:block;width:100%;height:auto}
    figure{margin:0}figcaption{color:var(--muted);font-size:.82rem;margin-top:7px}
    .note,.rule{border:1px solid var(--line);border-radius:8px;background:var(--soft);padding:12px 14px;color:#344054}
    .rule{border-color:#e6d6c3;background:var(--cream);margin-top:18px}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .card{border:1px solid var(--line);border-radius:8px;background:#fff;padding:14px}.metric{font-size:.8rem;color:var(--muted);font-weight:800;text-transform:uppercase;letter-spacing:.05em}.metric strong{display:block;color:var(--ink);font-size:1.05rem;text-transform:none;letter-spacing:0;margin-top:4px}
    ul{margin:0 0 12px 20px;padding:0}li{margin:5px 0}
    .flow{border:1px solid var(--line);border-radius:8px;background:#fff;padding:12px;margin:12px 0}svg text{font-family:Inter,Arial,sans-serif}
    table{width:100%;border-collapse:collapse;margin:10px 0 16px;font-size:.94rem}th,td{border:1px solid var(--line);padding:9px;vertical-align:top;text-align:left}th{background:#eef3f8;color:#475467;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em}
    .blank{height:34px}.longblank{height:62px}.checklist td:nth-child(odd){width:32px;text-align:center;color:var(--muted);font-size:1.05rem}.round{page-break-inside:avoid;border:1px solid var(--line);border-radius:8px;padding:14px;margin:14px 0;background:#fff}.round h3{margin-top:0;color:var(--blue)}.scenario{display:inline-block;background:#eef3f8;border:1px solid var(--line);border-radius:8px;padding:6px 9px;color:#344054;font-weight:780;font-size:.88rem;margin:4px 0 10px}.small{font-size:.86rem;color:var(--muted)}.source-list li{margin-bottom:7px}
    @media(max-width:760px){.cover,.grid-2,.grid-3{grid-template-columns:1fr}.cover,.page{padding:20px}h1{font-size:2.35rem}}
    @media print{@page{size:Letter;margin:.45in}body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.booklet{width:100%;padding:0}.cover,.page{box-shadow:none;border-radius:0;margin:0;min-height:auto;break-after:page}.page:last-child{break-after:auto}a{color:inherit;text-decoration:none}}
  `;
}

function heroSvg(firm) {
  const labels = firm.hero;
  const rects = labels.map((label, i) => {
    const x = 28 + i * 86;
    const fill = i % 2 === 0 ? firm.soft : "#ffffff";
    return `
      <rect x="${x}" y="74" width="70" height="64" rx="12" fill="${fill}" stroke="#d8dee8"/>
      <circle cx="${x + 35}" cy="55" r="${18 + (i % 2) * 4}" fill="${firm.accent}" opacity="${0.16 + i * 0.03}"/>
      <text x="${x + 35}" y="109" text-anchor="middle" font-size="10.5" font-weight="750" fill="#17202a">${esc(label)}</text>
    `;
  }).join("");
  const lines = labels.slice(0, -1).map((_, i) => {
    const x1 = 101 + i * 86;
    return `<line x1="${x1}" y1="106" x2="${x1 + 35}" y2="106" stroke="#667085" stroke-width="2" marker-end="url(#arrow)"/>`;
  }).join("");
  return `
    <div class="hero-panel" role="img" aria-label="${esc(firm.coverAlt)}">
      <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#667085"/></marker></defs>
        <rect width="500" height="300" fill="${firm.soft}"/>
        <path d="M0 230 C80 200 120 255 205 218 C280 186 340 210 500 178 L500 300 L0 300 Z" fill="#ffffff" opacity=".72"/>
        <text x="250" y="36" text-anchor="middle" font-size="18" font-weight="850" fill="${firm.accent}">${esc(firm.name)}</text>
        ${lines}
        ${rects}
        <rect x="64" y="194" width="372" height="48" rx="24" fill="#ffffff" stroke="#d8dee8"/>
        <text x="250" y="214" text-anchor="middle" font-size="12" fill="#475467">Diagrama generado para uso pedagógico.</text>
        <text x="250" y="231" text-anchor="middle" font-size="12" fill="#475467">Traducir el caso real a L, K y Q.</text>
      </svg>
    </div>
  `;
}

function processFlow(firm) {
  const labels = firm.hero;
  const nodes = labels.map((label, i) => {
    const x = 20 + i * 176;
    const w = i === labels.length - 1 ? 110 : 132;
    return `
      <rect x="${x}" y="32" width="${w}" height="82" rx="12" fill="${i % 2 ? "#ffffff" : firm.soft}" stroke="#d8dee8"/>
      <text x="${x + w / 2}" y="66" text-anchor="middle" font-size="14" font-weight="750" fill="#17202a">${esc(label)}</text>
      <text x="${x + w / 2}" y="90" text-anchor="middle" font-size="11.5" fill="#667085">etapa ${i + 1}</text>
    `;
  }).join("");
  const arrows = labels.slice(0, -1).map((_, i) => {
    const x = 156 + i * 176;
    return `<line x1="${x}" y1="73" x2="${x + 36}" y2="73" stroke="#667085" stroke-width="2" marker-end="url(#arrow2)"/>`;
  }).join("");
  return `
    <div class="flow" aria-label="Diagrama del proceso productivo">
      <svg viewBox="0 0 900 190" width="100%" height="190" role="img">
        <defs><marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#667085"/></marker></defs>
        ${nodes}
        ${arrows}
        <rect x="174" y="142" width="552" height="28" rx="14" fill="#f6f8fb" stroke="#d8dee8"/>
        <text x="450" y="161" text-anchor="middle" font-size="13" fill="#475467">La decisión del equipo consiste en traducir esta cadena real a L, K y Q dentro del simulador.</text>
      </svg>
    </div>
  `;
}

function roundBlock(round, index) {
  const optionCells = round.options.length
    ? `<table class="checklist"><tbody><tr>${round.options.map((o) => `<td>□</td><td>${esc(o)}</td>`).join("")}</tr></tbody></table>`
    : "";
  const rows = round.fields.map(([left, right], i) => {
    if (!right) {
      return `<tr><th>${esc(left)}</th><td colspan="3" class="${i === 0 ? "blank" : "longblank"}"></td></tr>`;
    }
    return `<tr><th>${esc(left)}</th><td class="blank"></td><th>${esc(right)}</th><td class="blank"></td></tr>`;
  }).join("");
  return `
    <div class="round">
      <h3>Ronda ${index + 1} - ${esc(round.title)}</h3>
      <span class="scenario">${esc(round.scenario)}</span>
      ${optionCells}
      <table><tbody>${rows}<tr><th>Nota de ronda</th><td colspan="3" class="small">${esc(round.note)}</td></tr></tbody></table>
    </div>
  `;
}

function bookletHtml(firm) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Micro Firm Simulator | Equipo ${firm.team}: ${esc(firm.name)}</title>
  <style>:root{--accent:${firm.accent};--cream:${firm.soft}}${commonCss()}</style>
</head>
<body>
  <main class="booklet">
    <section class="cover">
      <div>
        <p class="eyebrow">Micro Firm Simulator</p>
        <h1>Equipo ${firm.team}<br>${esc(firm.name)}</h1>
        <p class="subtitle">Booklet de empresa para inferir tecnología, costes y decisiones de producción.</p>
        <div class="badge-row">
          <span class="badge">Microeconomía I</span>
          <span class="badge">Tecnología</span>
          <span class="badge">Costes</span>
          <span class="badge">Decisiones en 4 minutos</span>
        </div>
        <div class="rule">
          <strong>Regla del juego.</strong> La empresa es real; la función de producción del simulador no es una estimación empírica de ${esc(firm.name)}. Es una función didáctica inspirada en rasgos productivos de la industria para practicar tecnología, beneficio, minimización de costes y curvas de costes.
        </div>
      </div>
      <figure>
        ${heroSvg(firm)}
        <figcaption>${esc(firm.coverAlt)}. Visual generado para impresión y discusión en clase.</figcaption>
      </figure>
    </section>

    <section class="page">
      <p class="eyebrow">1. Contexto real</p>
      <h2>La empresa real que van a representar</h2>
      <div class="grid-2">
        <div>${firm.context.map((p) => `<p>${p}</p>`).join("")}</div>
        <div>
          <div class="note">
            <strong>Datos para anclar el caso</strong>
            <ul>${firm.anchors.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
          </div>
          <div class="note" style="margin-top:12px">
            <strong>Descripción del simulador.</strong> ${esc(firm.industry)}
          </div>
        </div>
      </div>
    </section>

    <section class="page">
      <p class="eyebrow">2. Pistas productivas</p>
      <h2>${esc(firm.title)}</h2>
      ${firm.production.map((p) => `<p>${esc(p)}</p>`).join("")}
      ${processFlow(firm)}
      <div class="grid-3">
        <div class="card"><span class="metric">Trabajo productivo</span><strong>${esc(firm.labor)}</strong></div>
        <div class="card"><span class="metric">Capital productivo</span><strong>${esc(firm.capital)}</strong></div>
        <div class="card"><span class="metric">Producto Q</span><strong>${esc(firm.output)}</strong></div>
      </div>
      <div class="note" style="margin-top:14px">
        <strong>Pregunta guía.</strong> ${esc(firm.guide)}
      </div>
    </section>

    <section class="page">
      <p class="eyebrow">3. Simulador</p>
      <h2>Traducción al lenguaje del simulador</h2>
      <p>En el simulador, la empresa se resume con una función de producción de tipo Cobb-Douglas:</p>
      <div class="note" style="text-align:center;font-size:1.15rem"><strong>Q = A * L<sup>alpha</sup> * K<sup>beta</sup></strong></div>
      <p><strong>L</strong> representa trabajo productivo: personas que operan, supervisan, mantienen, transportan o atienden decisiones de producción. <strong>K</strong> representa capital productivo: maquinaria, planta, equipos, tecnología, infraestructura e inventario físico que ayudan a producir. <strong>Q</strong> representa la cantidad de producto final vendible.</p>
      <p>La función oficial del simulador está oculta hasta el final. Antes de jugar, propongan una hipótesis razonada. No intenten adivinar números perfectos; intenten que los números cuenten una historia coherente sobre la tecnología de su empresa.</p>
      <table>
        <thead><tr><th>Parámetro</th><th>Qué significa</th><th>Propuesta del equipo</th><th>Justificación breve</th></tr></thead>
        <tbody>
          <tr><td><strong>A</strong></td><td>Productividad total de la tecnología.</td><td class="blank"></td><td class="blank"></td></tr>
          <tr><td><strong>alpha</strong></td><td>Peso relativo del trabajo en la producción.</td><td class="blank"></td><td class="blank"></td></tr>
          <tr><td><strong>beta</strong></td><td>Peso relativo del capital en la producción.</td><td class="blank"></td><td class="blank"></td></tr>
        </tbody>
      </table>
      <div class="grid-2">
        <div class="card"><h3>Cómo pensar L</h3><p>${esc(firm.labor)}</p></div>
        <div class="card"><h3>Cómo pensar K</h3><p>${esc(firm.capital)}</p></div>
      </div>
    </section>

    <section class="page">
      <p class="eyebrow">4. Respuestas</p>
      <h2>Hojas de respuesta del Equipo ${firm.team}</h2>
      <p>En cada ronda tienen 4 minutos. Primero tomen la decisión conceptual que pide el simulador. Luego elijan L y K. Al final, comparen el resultado con el score, el beneficio y el feedback de coherencia.</p>
      ${rounds.slice(0, 3).map(roundBlock).join("")}
    </section>

    <section class="page">
      <p class="eyebrow">4. Respuestas</p>
      <h2>Hojas de respuesta del Equipo ${firm.team}, continuación</h2>
      ${rounds.slice(3).map((r, i) => roundBlock(r, i + 3)).join("")}
    </section>

    <section class="page">
      <p class="eyebrow">Fuentes</p>
      <h2>Fuentes consultadas</h2>
      <ul class="source-list">${firm.sources.map(([name, desc, url]) => `<li>${esc(name)}: ${esc(desc)} <a href="${esc(url)}">${esc(url)}</a></li>`).join("")}</ul>
      <div class="note">
        <strong>Recordatorio para el equipo.</strong> No están buscando la respuesta perfecta en internet. Están usando información real para construir una hipótesis económica. La nota importante no es memorizar datos, sino traducir el caso real a una tecnología con L, K, Q, costes y beneficio.
      </div>
    </section>
  </main>
</body>
</html>`;
}

function decisionSheetHtml() {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Micro Firm Simulator | Plantilla reusable de decisión</title>
  <style>:root{--accent:#2563eb;--cream:#f8fafc}${commonCss()}.cover{min-height:auto;display:block}.page.compact .round{margin:10px 0;padding:12px}.page.compact h2{margin-bottom:8px}</style>
</head>
<body>
  <main class="booklet">
    <section class="cover">
      <p class="eyebrow">Micro Firm Simulator</p>
      <h1>Plantilla reusable<br>de decisión</h1>
      <p class="subtitle">Una copia por equipo cuando quieran separar las respuestas del booklet de empresa.</p>
      <div class="rule"><strong>Regla del juego.</strong> La función oficial queda oculta hasta el cierre. Cada equipo registra una decisión conceptual y una decisión numérica por ronda.</div>
      <table>
        <tbody>
          <tr><th>Equipo</th><td class="blank"></td><th>Empresa</th><td class="blank"></td></tr>
          <tr><th>Integrantes</th><td colspan="3" class="longblank"></td></tr>
          <tr><th>Hipótesis inicial</th><td colspan="3" class="longblank">A = _____ | alpha = _____ | beta = _____</td></tr>
        </tbody>
      </table>
    </section>
    <section class="page compact">
      <p class="eyebrow">Rondas 1 a 3</p>
      <h2>Decisiones del equipo</h2>
      ${rounds.slice(0, 3).map(roundBlock).join("")}
    </section>
    <section class="page compact">
      <p class="eyebrow">Rondas 4 a 6</p>
      <h2>Decisiones del equipo, continuación</h2>
      ${rounds.slice(3).map((r, i) => roundBlock(r, i + 3)).join("")}
    </section>
  </main>
</body>
</html>`;
}

async function renderPdfs(files) {
  try {
    let chromium;
    try {
      ({ chromium } = require("playwright"));
    } catch (error) {
      const bundledCandidates = [
        "C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.61.0/node_modules/playwright",
        "C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
      ];
      const bundled = bundledCandidates.find((candidate) => fs.existsSync(candidate));
      if (!bundled) throw error;
      ({ chromium } = require(bundled));
    }
    const executablePath = localBrowserExecutable();
    const browser = await chromium.launch(executablePath ? { executablePath } : {});
    const page = await browser.newPage({ viewport: { width: 980, height: 1268 } });
    for (const file of files) {
      await page.goto("file:///" + file.html.replace(/\\/g, "/"), { waitUntil: "networkidle" });
      await page.pdf({
        path: file.pdf,
        format: "Letter",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      });
    }
    await browser.close();
  } catch (error) {
    renderPdfsWithChrome(files);
  }
}

function renderPdfsWithChrome(files) {
  const browserExe = localBrowserExecutable();
  if (!browserExe) {
    throw new Error("No local Chromium-based browser found for PDF rendering.");
  }
  const profileDir = path.join(outDir, ".chrome-pdf-profile");
  fs.mkdirSync(profileDir, { recursive: true });
  for (const file of files) {
    execFileSync(browserExe, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--allow-file-access-from-files",
      "--run-all-compositor-stages-before-draw",
      `--user-data-dir=${profileDir}`,
      "--print-to-pdf-no-header",
      `--print-to-pdf=${file.pdf}`,
      "file:///" + file.html.replace(/\\/g, "/"),
    ], { stdio: "ignore" });
  }
  fs.rmSync(profileDir, { recursive: true, force: true });
}

function localBrowserExecutable() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = [];
  for (const firm of firms) {
    const htmlPath = path.join(outDir, `${firm.slug}_booklet.html`);
    const pdfPath = path.join(outDir, `${firm.slug}_booklet.pdf`);
    fs.writeFileSync(htmlPath, bookletHtml(firm), "utf8");
    files.push({ html: htmlPath, pdf: pdfPath });
  }
  const sheetHtml = path.join(outDir, "decision_sheet_template.html");
  const sheetPdf = path.join(outDir, "decision_sheet_template.pdf");
  fs.writeFileSync(sheetHtml, decisionSheetHtml(), "utf8");
  files.push({ html: sheetHtml, pdf: sheetPdf });

  if (process.argv.includes("--pdf")) {
    await renderPdfs(files);
  }

  const manifest = [
    "# Student printables",
    "",
    "Generated from `scripts/generate_student_materials.js`.",
    "The PDFs are the print-ready versions; the HTML files are editable print sources.",
    "",
    ...files.map((file) => `- ${path.basename(file.html)} / ${path.basename(file.pdf)}`),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, "README.md"), manifest, "utf8");
  console.log(`Generated ${files.length} print sources in ${path.relative(root, outDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
