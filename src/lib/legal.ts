import type { Locale } from "./config";
type LegalCopy = {
  notice: string;
  privacy: { title: string; sections: { title: string; body: string }[] };
  terms: { title: string; sections: { title: string; body: string }[] };
};
export const legal: Record<Locale, LegalCopy> = {
  es: {
    notice:
      "Borrador para revisión antes del lanzamiento. Esta información debe completarse y ser aprobada antes de habilitar la recepción de consultas.",
    privacy: {
      title: "Información de privacidad",
      sections: [
        {
          title: "Información que solicita el formulario",
          body: "El formulario solicita información de contacto, empresa y necesidades del proyecto, o datos sobre la oferta y capacidad del proveedor. El presupuesto, sitio web y detalles adicionales son opcionales. No incluya datos sensibles ni información confidencial de terceros.",
        },
        {
          title: "Finalidad de la consulta",
          body: "La información se utilizaría para evaluar el encaje comercial, responder a la consulta y coordinar posibles próximos pasos. Cualquier introducción a un proveedor o comprador requeriría conversar previamente sobre la información pertinente a compartir.",
        },
        {
          title: "Envío y tratamiento",
          body: "Mientras la recepción de consultas esté deshabilitada, el formulario no envía su información. Cuando se habilite, la información se transmitirá a través del servidor al servicio de recepción configurado por Terral Partners. No se almacenan borradores en el navegador. Al salir de la página, los datos del formulario se pierden.",
        },
        {
          title: "Datos técnicos",
          body: "El sitio no incorpora publicidad, analítica ni cookies de seguimiento. El servidor puede tratar datos técnicos necesarios para operar el sitio y limitar solicitudes abusivas. Los proveedores de alojamiento pueden mantener registros técnicos según su configuración.",
        },
        {
          title: "Información pendiente de aprobación",
          body: "Antes de recibir datos personales se deben identificar el responsable del tratamiento y su contacto, los proveedores de tratamiento, el lugar y período de conservación, las medidas aplicables y el procedimiento para ejercer derechos de acceso, rectificación o supresión. Estos puntos están pendientes de definición y revisión; por ello la recepción de consultas permanece deshabilitada.",
        },
      ],
    },
    terms: {
      title: "Términos de uso",
      sections: [
        {
          title: "Propósito del sitio",
          body: "Este sitio presenta los servicios propuestos de búsqueda de proveedores y desarrollo comercial de Terral Partners, con enfoque inicial en Guanacaste, Costa Rica. Su contenido es informativo y no constituye una oferta vinculante.",
        },
        {
          title: "Alcance de nuestra participación",
          body: "Terral Partners evalúa oportunidades, coordina introducciones, propuestas y seguimiento comercial. El comprador y el proveedor negocian, contratan y facturan directamente entre sí. El proveedor es responsable de entrega, instalación, garantías y cumplimiento.",
        },
        {
          title: "Condiciones comerciales",
          body: "El modelo inicial contempla una comisión de éxito financiada por el proveedor, con condiciones acordadas de forma privada antes de las introducciones. Cualquier servicio pagado por separado requiere un acuerdo previo. Enviar una consulta no crea por sí solo una relación comercial ni una obligación de contratar.",
        },
        {
          title: "Disponibilidad y resultados",
          body: "La cobertura, los productos, los precios y los plazos dependen de cada oportunidad y proveedor. No se garantizan precios, disponibilidad ni resultados. Corresponde a las partes evaluar las propuestas y documentar sus acuerdos.",
        },
        {
          title: "Uso e imágenes",
          body: "Utilice los formularios únicamente para consultas comerciales legítimas y con información que tenga derecho a compartir. Las fotografías son ilustrativas y no representan clientes, proyectos realizados ni relaciones comerciales de Terral Partners.",
        },
        {
          title: "Revisión antes del lanzamiento",
          body: "La identidad legal, los datos de contacto, las condiciones aplicables y el mecanismo para resolver consultas deben completarse y revisarse antes del lanzamiento público. Estos términos son un borrador informativo sujeto a esa revisión.",
        },
      ],
    },
  },
  en: {
    notice:
      "Draft for review before launch. This information must be completed and approved before inquiry reception is enabled.",
    privacy: {
      title: "Privacy information",
      sections: [
        {
          title: "Information requested by the form",
          body: "The form requests contact and company information and project requirements, or details about a supplier’s offering and capabilities. Budget, website and additional details are optional. Do not include sensitive data or confidential third-party information.",
        },
        {
          title: "Purpose of an inquiry",
          body: "Information would be used to assess the commercial fit, respond to the inquiry and coordinate potential next steps. Any introduction to a supplier or buyer would require a prior discussion about the relevant information to share.",
        },
        {
          title: "Submission and processing",
          body: "While inquiry reception is disabled, the form does not send your information. When enabled, information will pass through the server to the receiving service configured by Terral Partners. Drafts are not stored in the browser. Form entries are lost when you leave the page.",
        },
        {
          title: "Technical information",
          body: "The site does not include advertising, analytics or tracking cookies. The server may process technical information needed to operate the site and limit abusive requests. Hosting providers may retain technical logs depending on their configuration.",
        },
        {
          title: "Information pending approval",
          body: "Before personal information is collected, the data controller and contact details, processing providers, storage location and retention period, applicable measures and procedures for access, correction or deletion requests must be identified. These matters are awaiting definition and review, so inquiry reception remains disabled.",
        },
      ],
    },
    terms: {
      title: "Terms of use",
      sections: [
        {
          title: "Purpose of this website",
          body: "This website presents Terral Partners’ proposed supplier sourcing and commercial development services, initially focused on Guanacaste, Costa Rica. Its content is informational and does not constitute a binding offer.",
        },
        {
          title: "Our role",
          body: "Terral Partners assesses opportunities and coordinates introductions, proposals and commercial follow-up. Buyers and suppliers negotiate, contract and invoice directly with each other. Suppliers are responsible for delivery, installation, warranties and fulfillment.",
        },
        {
          title: "Commercial terms",
          body: "The initial model is a supplier-funded success commission, with terms privately agreed before introductions. Any separately paid service requires prior agreement. Sending an inquiry does not itself establish a commercial relationship or an obligation to contract.",
        },
        {
          title: "Availability and outcomes",
          body: "Coverage, products, prices and timing depend on each opportunity and supplier. Prices, availability and outcomes are not guaranteed. Both parties are responsible for assessing proposals and documenting their agreements.",
        },
        {
          title: "Use and photography",
          body: "Use the forms only for legitimate commercial inquiries and information you are authorized to share. Photography is illustrative and does not represent Terral Partners’ clients, completed projects or commercial relationships.",
        },
        {
          title: "Review before launch",
          body: "Legal identity, contact details, applicable terms and the process for addressing inquiries must be completed and reviewed before public launch. These terms are an informational draft subject to that review.",
        },
      ],
    },
  },
};
