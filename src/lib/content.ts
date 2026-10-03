import type { Locale } from "./config";
export type Content = {
  meta: { title: string; description: string };
  skip: string;
  home: string;
  menu: string;
  close: string;
  language: string;
  nav: string[];
  inquiry: string;
  buyerCta: string;
  supplierCta: string;
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    footnote: string;
    imageAlt: string;
    caption: string;
    explore: string;
  };
  audiences: {
    label: string;
    title: string;
    intro: string;
    buyer: { label: string; title: string; items: string[] };
    supplier: { label: string; title: string; items: string[] };
  };
  sectors: { label: string; items: string[] };
  categories: {
    label: string;
    title: string;
    intro: string;
    items: { title: string; description: string; tag: string }[];
    note: string;
    other: string;
  };
  process: {
    label: string;
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
    note: string;
  };
  why: {
    label: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  partnership: {
    label: string;
    title: string;
    description: string;
    items: string[];
    imageAlt: string;
  };
  about: { label: string; title: string; paragraphs: string[] };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  contact: { label: string; title: string; description: string; next: string };
  footer: {
    descriptor: string;
    navigation: string;
    explore: string;
    location: string;
    privacy: string;
    terms: string;
    rights: string;
    illustrative: string;
  };
};
const es: Content = {
  meta: {
    title: "Terral Partners | Proveedores para su próximo proyecto",
    description:
      "Conectamos empresas en Guanacaste con proveedores adecuados para sus proyectos. Búsqueda de proveedores, desarrollo comercial y seguimiento coordinado.",
  },
  skip: "Ir al contenido",
  home: "Terral Partners — Inicio",
  menu: "Abrir menú",
  close: "Cerrar menú",
  language: "Idioma",
  nav: ["Compradores", "Proveedores", "Cómo funciona", "Nosotros", "Contacto"],
  inquiry: "Conversemos",
  buyerCta: "Encontrar proveedores",
  supplierCta: "Ser proveedor",
  hero: {
    eyebrow: "CONEXIONES QUE IMPULSAN PROYECTOS",
    title: "Los proveedores adecuados para",
    accent: "su próximo proyecto.",
    description:
      "Conectamos desarrolladores, hoteles, constructoras y administradores de propiedades con proveedores alineados a sus necesidades.",
    footnote: "Con enfoque en Guanacaste. Con visión de largo plazo.",
    imageAlt:
      "Vista aérea de la costa de Guanacaste, Costa Rica, con una bahía, hoteles y viviendas; fotografía ilustrativa",
    caption: "EL PUNTO DE ENCUENTRO ENTRE UNA NECESIDAD Y UNA OPORTUNIDAD.",
    explore: "Descubra cómo trabajamos",
  },
  audiences: {
    label: "DOS CAMINOS. UN MISMO PROPÓSITO.",
    title: "Conectamos lo que necesita\ncon quienes lo hacen posible.",
    intro:
      "Cada proyecto empieza con una buena conversación. Encuentre su punto de partida.",
    buyer: {
      label: "PARA COMPRADORES",
      title: "Su proyecto, bien acompañado.",
      items: [
        "Comparta sus necesidades de compra.",
        "Explore opciones de proveedores adecuados.",
        "Cuente con seguimiento comercial coordinado.",
      ],
    },
    supplier: {
      label: "PARA PROVEEDORES",
      title: "Nuevas oportunidades, con sentido.",
      items: [
        "Explore oportunidades comerciales relevantes.",
        "Conecte con compradores afines a su capacidad.",
        "Acuerde condiciones claras antes de cada introducción.",
      ],
    },
  },
  sectors: {
    label: "TRABAJAMOS CON",
    items: [
      "Desarrolladores",
      "Constructoras",
      "Hoteles y hospitalidad",
      "Administradores de propiedades",
      "Proveedores",
    ],
  },
  categories: {
    label: "LO QUE CONECTAMOS",
    title: "Soluciones para espacios\nque toman forma.",
    intro:
      "Nos enfocamos en categorías esenciales para equipar, operar y desarrollar su proyecto.",
    items: [
      {
        title: "Climatización y HVAC",
        description:
          "Equipos y soluciones de climatización según el tipo de espacio, su uso y sus requerimientos técnicos.",
        tag: "CONFORT Y OPERACIÓN",
      },
      {
        title: "Mobiliario y electrodomésticos",
        description:
          "Opciones para equipar espacios residenciales, comerciales y de hospitalidad con intención.",
        tag: "ESPACIOS Y EQUIPAMIENTO",
      },
      {
        title: "Soluciones de energía",
        description:
          "Alternativas solares y energéticas cuando la demanda y la cobertura de proveedores lo permitan.",
        tag: "ENERGÍA Y EFICIENCIA",
      },
    ],
    note: "La disponibilidad depende de los requisitos del proyecto y de la cobertura de proveedores.",
    other: "¿Busca algo más? Conversemos",
  },
  process: {
    label: "UN PROCESO CLARO",
    title: "De la necesidad\na la conexión adecuada.",
    intro: "Le acompañamos en la coordinación comercial, paso a paso.",
    steps: [
      {
        title: "Cuéntenos qué necesita",
        description:
          "Comparta los productos, cantidades, ubicación, plazos y presupuesto de su proyecto.",
      },
      {
        title: "Evaluamos la oportunidad",
        description:
          "Identificamos proveedores adecuados y acordamos con ellos las condiciones comerciales antes de presentarlos.",
      },
      {
        title: "Conectamos y coordinamos",
        description:
          "Facilitamos las introducciones, las propuestas y una comunicación organizada entre las partes.",
      },
      {
        title: "Avance con su compra",
        description:
          "Damos seguimiento comercial para ayudar a las partes a avanzar hacia un acuerdo directo.",
      },
    ],
    note: "El comprador contrata y paga directamente al proveedor. El proveedor es responsable de la entrega, instalación, garantías y cumplimiento.",
  },
  why: {
    label: "EL VALOR DE UNA BUENA CONEXIÓN",
    title: "Más claridad.\nMejores conversaciones.",
    description:
      "Un aliado comercial para ordenar la búsqueda y mantener las oportunidades en movimiento.",
    items: [
      {
        title: "Introducciones relevantes",
        description:
          "Partimos de las necesidades del proyecto y de las capacidades del proveedor.",
      },
      {
        title: "Requisitos claros",
        description:
          "Reunimos la información que permite conversar con un objetivo compartido.",
      },
      {
        title: "Comunicación organizada",
        description:
          "Coordinamos propuestas, consultas y próximos pasos entre las partes.",
      },
      {
        title: "Seguimiento constante",
        description:
          "Acompañamos el proceso comercial sin sustituir la relación directa de compra.",
      },
    ],
  },
  partnership: {
    label: "CREZCAMOS CON BUENAS CONEXIONES",
    title: "Su oferta puede ser\nla pieza que falta.",
    description:
      "Buscamos conocer proveedores interesados en oportunidades comerciales en Guanacaste. Para evaluar el encaje, queremos entender:",
    items: [
      "Sus productos y servicios",
      "Cobertura geográfica y capacidad de entrega",
      "Capacidad operativa y disponibilidad",
      "Soporte de instalación y garantías, cuando aplique",
      "Su contacto comercial",
    ],
    imageAlt:
      "Espacio de estar con mobiliario contemporáneo; fotografía ilustrativa",
  },
  about: {
    label: "SOBRE TERRAL PARTNERS",
    title: "Conexiones con propósito.\nRelaciones con futuro.",
    paragraphs: [
      "Terral Partners nace de una iniciativa conjunta de dos socios con un propósito compartido: facilitar conexiones comerciales entre empresas y proveedores adecuados a sus necesidades.",
      "Comenzamos con un enfoque en Guanacaste, Costa Rica. Nuestro trabajo combina búsqueda de proveedores, coordinación comercial y seguimiento, con condiciones claras y una relación directa entre comprador y proveedor.",
      "Somos un aliado de abastecimiento y desarrollo comercial. No mantenemos inventario, operamos bodegas, prestamos servicios de transporte ni financiamos compras.",
    ],
  },
  faq: {
    label: "ANTES DE CONVERSAR",
    title: "Preguntas, con respuestas claras.",
    items: [
      {
        q: "¿Quién puede presentar un proyecto?",
        a: "Desarrolladores, constructoras, hoteles, administradores de propiedades y otras empresas que necesiten equipos, mobiliario o servicios relacionados. Revisamos cada solicitud según sus necesidades y el encaje con nuestra cobertura.",
      },
      {
        q: "¿Qué zonas cubren?",
        a: "Nuestro enfoque inicial es Guanacaste, Costa Rica. La cobertura concreta depende de la categoría y de la capacidad de los proveedores. Puede compartir otra ubicación para que evaluemos su solicitud.",
      },
      {
        q: "¿Cómo se evalúan los proveedores?",
        a: "Consideramos su oferta, cobertura, capacidad, condiciones de entrega y soporte de instalación y garantías cuando corresponda. La evaluación se realiza en función de cada oportunidad; no constituye una certificación ni sustituye la revisión del comprador.",
      },
      {
        q: "¿Quién paga a Terral Partners?",
        a: "Nuestro modelo inicial es una comisión de éxito financiada por el proveedor, negociada antes de realizar las introducciones. Las condiciones específicas se conversan en privado. Cualquier servicio con un costo separado para el comprador requeriría un acuerdo previo.",
      },
      {
        q: "¿Quién cotiza, entrega, instala y responde por las garantías?",
        a: "El proveedor cotiza, contrata y factura directamente al comprador. También es responsable de la entrega, instalación, garantías y cumplimiento. Terral Partners coordina la relación comercial y el seguimiento.",
      },
      {
        q: "¿Puedo continuar con mis proveedores actuales?",
        a: "Sí. Puede seguir trabajando con sus proveedores actuales. Nuestra participación busca ampliar opciones relevantes y apoyar necesidades específicas, sin imponer exclusividad al comprador.",
      },
      {
        q: "¿Se garantizan precios, disponibilidad o resultados?",
        a: "No. Los precios, plazos y disponibilidad dependen de cada proveedor y de las condiciones de la oportunidad. Las introducciones y el seguimiento no garantizan un acuerdo ni un resultado comercial.",
      },
    ],
  },
  contact: {
    label: "EL SIGUIENTE PASO EMPIEZA AQUÍ",
    title: "Hablemos de lo\nque viene.",
    description:
      "Un proyecto por equipar. Una oferta por conectar. Cuéntenos en qué está trabajando.",
    next: "Revisaremos su información para evaluar el encaje y conversar sobre los próximos pasos.",
  },
  footer: {
    descriptor: "Conexión de proveedores\ny desarrollo comercial.",
    navigation: "NAVEGACIÓN",
    explore: "EMPECEMOS",
    location: "NUESTRO ENFOQUE",
    privacy: "Privacidad",
    terms: "Términos de uso",
    rights: "Todos los derechos reservados.",
    illustrative:
      "Fotografías ilustrativas. No representan proyectos realizados por Terral Partners.",
  },
};
const en: Content = {
  meta: {
    title: "Terral Partners | The right suppliers for your next project",
    description:
      "Connecting businesses in Guanacaste with suppliers suited to their projects. Supplier sourcing, commercial development and coordinated follow-up.",
  },
  skip: "Skip to content",
  home: "Terral Partners — Home",
  menu: "Open menu",
  close: "Close menu",
  language: "Language",
  nav: ["For buyers", "For suppliers", "How it works", "About", "Contact"],
  inquiry: "Let’s talk",
  buyerCta: "Find suppliers",
  supplierCta: "Become a supplier",
  hero: {
    eyebrow: "CONNECTIONS THAT MOVE PROJECTS FORWARD",
    title: "The right suppliers for",
    accent: "your next project.",
    description:
      "We connect developers, hotels, construction companies and property managers with suppliers suited to their purchasing needs.",
    footnote: "Focused on Guanacaste. Built for lasting relationships.",
    imageAlt:
      "Aerial view of Guanacaste’s coastline in Costa Rica, with a bay, hotels and homes; illustrative photography",
    caption: "WHERE A PROJECT’S NEEDS MEET THE RIGHT OPPORTUNITY.",
    explore: "Discover how we work",
  },
  audiences: {
    label: "TWO PATHS. ONE SHARED PURPOSE.",
    title: "Connecting what you need\nwith those who make it possible.",
    intro:
      "Every project starts with a good conversation. Find your starting point.",
    buyer: {
      label: "FOR BUYERS",
      title: "Your project, in good company.",
      items: [
        "Share your purchasing requirements.",
        "Explore suitable supplier options.",
        "Receive coordinated commercial follow-up.",
      ],
    },
    supplier: {
      label: "FOR SUPPLIERS",
      title: "New opportunities. A better fit.",
      items: [
        "Explore relevant commercial opportunities.",
        "Meet buyers whose needs fit your capabilities.",
        "Agree clear terms before each introduction.",
      ],
    },
  },
  sectors: {
    label: "WHO WE WORK WITH",
    items: [
      "Property developers",
      "Construction companies",
      "Hotels & hospitality",
      "Property managers",
      "Suppliers",
    ],
  },
  categories: {
    label: "WHAT WE CONNECT",
    title: "Solutions for spaces\ncoming to life.",
    intro:
      "We focus on essential categories to equip, operate and develop your project.",
    items: [
      {
        title: "Air conditioning & HVAC",
        description:
          "Climate solutions and equipment suited to your space, its purpose and its technical requirements.",
        tag: "COMFORT & OPERATIONS",
      },
      {
        title: "Furniture & appliances",
        description:
          "Considered options for furnishing residential, commercial and hospitality spaces.",
        tag: "SPACES & EQUIPMENT",
      },
      {
        title: "Energy solutions",
        description:
          "Solar and energy alternatives where demand and supplier coverage support them.",
        tag: "ENERGY & EFFICIENCY",
      },
    ],
    note: "Availability depends on project requirements and supplier coverage.",
    other: "Looking for something else? Let’s talk",
  },
  process: {
    label: "A CLEAR WAY FORWARD",
    title: "From a purchasing need\nto the right connection.",
    intro: "Commercial coordination that supports you, step by step.",
    steps: [
      {
        title: "Share your requirements",
        description:
          "Tell us about your products, quantities, location, timing and budget.",
      },
      {
        title: "We assess the fit",
        description:
          "We identify suitable suppliers and agree commercial terms with them before making introductions.",
      },
      {
        title: "Connect and review proposals",
        description:
          "We coordinate introductions, proposals and organized communication between both parties.",
      },
      {
        title: "Move the purchase forward",
        description:
          "We follow up on the commercial process to help both parties work toward a direct agreement.",
      },
    ],
    note: "Buyers contract with and pay suppliers directly. Suppliers are responsible for delivery, installation, warranties and fulfillment.",
  },
  why: {
    label: "THE VALUE OF A GOOD CONNECTION",
    title: "More clarity.\nBetter conversations.",
    description:
      "A commercial partner to bring structure to your search and keep opportunities moving.",
    items: [
      {
        title: "Relevant introductions",
        description:
          "We start with the project’s requirements and the supplier’s capabilities.",
      },
      {
        title: "Clear requirements",
        description:
          "We bring together the details that give each conversation a shared purpose.",
      },
      {
        title: "Organized communication",
        description:
          "We coordinate proposals, questions and next steps between the parties.",
      },
      {
        title: "Consistent follow-up",
        description:
          "We support the commercial process while preserving the direct purchasing relationship.",
      },
    ],
  },
  partnership: {
    label: "GROW THROUGH GOOD CONNECTIONS",
    title: "Your offering could be\nthe missing piece.",
    description:
      "We want to meet suppliers interested in commercial opportunities in Guanacaste. To assess the fit, we’d like to understand:",
    items: [
      "Your products and services",
      "Geographic coverage and delivery capabilities",
      "Operating capacity and availability",
      "Installation and warranty support, where applicable",
      "Your commercial contact",
    ],
    imageAlt:
      "Living space with contemporary furnishings; illustrative photography",
  },
  about: {
    label: "ABOUT TERRAL PARTNERS",
    title: "Purposeful connections.\nLasting possibilities.",
    paragraphs: [
      "Terral Partners is a joint initiative by two partners with a shared purpose: to connect businesses with suppliers suited to their needs.",
      "Our initial focus is Guanacaste, Costa Rica. We bring together supplier sourcing, commercial coordination and follow-up, with clear terms and a direct relationship between buyer and supplier.",
      "We are a sourcing and commercial development partner. We do not hold inventory, operate warehouses, provide freight services or finance purchases.",
    ],
  },
  faq: {
    label: "BEFORE WE TALK",
    title: "Good questions. Clear answers.",
    items: [
      {
        q: "Who can submit a project?",
        a: "Developers, construction companies, hotels, property managers and other businesses seeking equipment, furnishings or related services. We review each inquiry based on its requirements and our supplier coverage.",
      },
      {
        q: "Which areas do you cover?",
        a: "Our initial focus is Guanacaste, Costa Rica. Specific coverage depends on the category and supplier capabilities. You can share another location for us to assess.",
      },
      {
        q: "How are suppliers assessed?",
        a: "We consider their offering, coverage, capacity, delivery terms and installation and warranty support where applicable. Assessment is specific to each opportunity; it is not certification and does not replace the buyer’s own review.",
      },
      {
        q: "Who pays Terral Partners?",
        a: "Our initial model is a supplier-funded success commission, negotiated before introductions. Specific commercial terms are discussed privately. Any separately paid service for a buyer would require prior agreement.",
      },
      {
        q: "Who provides quotations, delivery, installation and warranties?",
        a: "Suppliers quote, contract with and invoice buyers directly. They are also responsible for delivery, installation, warranties and fulfillment. Terral Partners coordinates commercial communication and follow-up.",
      },
      {
        q: "Can I continue using my existing suppliers?",
        a: "Yes. You can keep working with your current suppliers. Our involvement is intended to add relevant options and support specific requirements, without imposing buyer exclusivity.",
      },
      {
        q: "Are prices, availability or outcomes guaranteed?",
        a: "No. Prices, timing and availability depend on each supplier and the opportunity’s conditions. Introductions and follow-up do not guarantee a purchasing agreement or commercial outcome.",
      },
    ],
  },
  contact: {
    label: "YOUR NEXT STEP STARTS HERE",
    title: "Let’s talk about\nwhat’s next.",
    description:
      "A project to equip. An offering to connect. Tell us what you’re working on.",
    next: "We’ll review your information to assess the fit and discuss possible next steps.",
  },
  footer: {
    descriptor: "Supplier sourcing &\ncommercial representation.",
    navigation: "EXPLORE",
    explore: "LET’S BEGIN",
    location: "OUR FOCUS",
    privacy: "Privacy",
    terms: "Terms of use",
    rights: "All rights reserved.",
    illustrative:
      "Illustrative photography. Images do not represent projects completed by Terral Partners.",
  },
};
export const content: Record<Locale, Content> = { es, en };
