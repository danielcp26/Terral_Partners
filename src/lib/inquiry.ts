import { z } from "zod";
import type { Locale } from "./config";
export type InquiryType = "buyer" | "supplier";
export const fieldNames = [
  "name",
  "company",
  "email",
  "phone",
  "location",
  "category",
  "quantity",
  "timeline",
  "budget",
  "details",
  "coverage",
  "capacity",
  "support",
  "website",
] as const;
export type FieldName = (typeof fieldNames)[number];
export type InquiryValues = Record<FieldName, string> & {
  consent: boolean;
  honey: string;
};
export const emptyValues: InquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  category: "",
  quantity: "",
  timeline: "",
  budget: "",
  details: "",
  coverage: "",
  capacity: "",
  support: "",
  website: "",
  consent: false,
  honey: "",
};
export const categories = ["hvac", "furniture", "energy", "other"] as const;
export const timelines = ["soon", "quarter", "later", "exploring"] as const;
const field = z.string().trim().max(3000);
export const inquirySchema = z.object({
  type: z.enum(["buyer", "supplier"]),
  locale: z.enum(["es", "en"]),
  idempotencyKey: z.uuid(),
  values: z.object({
    name: field,
    company: field,
    email: field,
    phone: field,
    location: field,
    category: field,
    quantity: field,
    timeline: field,
    budget: field,
    details: field,
    coverage: field,
    capacity: field,
    support: field,
    website: field,
    consent: z.boolean(),
    honey: z.string().max(200),
  }),
});
export type Errors = Partial<Record<FieldName | "consent", string>>;
export function validateInquiry(
  values: InquiryValues,
  type: InquiryType,
  locale: Locale,
  step?: number,
): Errors {
  const es = locale === "es";
  const errors: Errors = {};
  const required = es ? "Complete este campo." : "Please complete this field.";
  const contactFields: FieldName[] = ["name", "company"];
  const projectFields: FieldName[] =
    type === "buyer"
      ? ["location", "category", "quantity", "timeline"]
      : ["category", "coverage", "capacity", "support"];
  const fields =
    step === 0
      ? contactFields
      : step === 1
        ? projectFields
        : [...contactFields, ...projectFields];
  fields.forEach((key) => {
    if (!values[key].trim()) errors[key] = required;
  });
  fieldNames.forEach((key) => {
    if (values[key].length > 3000)
      errors[key] = es
        ? "Use como máximo 3000 caracteres."
        : "Use no more than 3000 characters.";
  });
  if (step !== 1) {
    if (type === "supplier") {
      if (!values.email.trim()) errors.email = required;
      if (!values.phone.trim()) errors.phone = required;
    }
    if (type === "buyer" && !values.email.trim() && !values.phone.trim()) {
      errors.email = es
        ? "Indique un correo o un teléfono para contactarle."
        : "Provide an email or phone so we can contact you.";
    }
    if (
      values.email.trim() &&
      !z.email().safeParse(values.email.trim()).success
    )
      errors.email = es
        ? "Ingrese un correo electrónico válido."
        : "Enter a valid email address.";
    if (values.phone.trim() && !/^[+\d\s().-]{7,30}$/.test(values.phone.trim()))
      errors.phone = es
        ? "Ingrese un teléfono válido, con código de país."
        : "Enter a valid phone number, including country code.";
  }
  if (step !== 0) {
    if (!categories.includes(values.category as (typeof categories)[number]))
      errors.category = es ? "Seleccione una categoría." : "Choose a category.";
    if (
      type === "buyer" &&
      !timelines.includes(values.timeline as (typeof timelines)[number])
    )
      errors.timeline = es ? "Seleccione un plazo." : "Choose a timeline.";
    if (values.website.trim()) {
      try {
        const url = new URL(values.website.trim());
        if (!["https:", "http:"].includes(url.protocol)) throw new Error();
      } catch {
        errors.website = es
          ? "Use un enlace completo, como https://ejemplo.com."
          : "Use a full URL, such as https://example.com.";
      }
    }
    if (!values.consent)
      errors.consent = es
        ? "Confirme que ha leído la información de privacidad."
        : "Confirm you have read the privacy information.";
  }
  return errors;
}
type FormCopy = {
  buyerTitle: string;
  supplierTitle: string;
  buyerIntro: string;
  supplierIntro: string;
  nextTitle: string;
  buyerNext: string;
  supplierNext: string;
  steps: string[];
  contactTitle: string;
  projectTitle: string;
  supplierDetailsTitle: string;
  required: string;
  contactHint: string;
  optional: string;
  labels: Record<FieldName, string>;
  categoryOptions: string[];
  timelineOptions: string[];
  select: string;
  continue: string;
  back: string;
  send: string;
  sending: string;
  consent: string;
  privacy: string;
  unavailable: string;
  failed: string;
  successTitle: string;
  success: string;
  receipt: string;
  home: string;
  review: string;
  received: string;
};
export const formCopy: Record<Locale, FormCopy> = {
  es: {
    buyerTitle: "Cuéntenos sobre\nsu próximo proyecto.",
    supplierTitle: "Conectemos su oferta\ncon nuevas posibilidades.",
    buyerIntro:
      "Comparta lo que necesita. Este es el primer paso para explorar proveedores adecuados a su proyecto.",
    supplierIntro:
      "Queremos conocer su empresa y entender dónde sus capacidades pueden encontrar una oportunidad.",
    nextTitle: "¿Qué sucede después?",
    buyerNext:
      "Revisaremos sus necesidades y la cobertura disponible. Si existe un encaje, conversaremos para precisar los detalles antes de coordinar introducciones y propuestas.",
    supplierNext:
      "Revisaremos su oferta, cobertura y capacidad. Si identificamos un encaje, conversaremos sobre las condiciones comerciales antes de cualquier introducción.",
    steps: ["Su contacto", "Los detalles"],
    contactTitle: "Empecemos por conocernos.",
    projectTitle: "¿Qué necesita su proyecto?",
    supplierDetailsTitle: "Cuéntenos sobre su oferta.",
    required: "* Campos obligatorios",
    contactHint: "Indique al menos un correo o un teléfono.",
    optional: "opcional",
    labels: {
      name: "Nombre de contacto",
      company: "Empresa",
      email: "Correo electrónico",
      phone: "Teléfono",
      location: "Ubicación del proyecto",
      category: "Producto o servicio",
      quantity: "Cantidades aproximadas",
      timeline: "Plazo de compra",
      budget: "Presupuesto estimado y moneda",
      details: "Información adicional y requisitos",
      coverage: "Zonas de cobertura",
      capacity: "Capacidad y condiciones de entrega",
      support: "Instalación y garantías (o no aplica)",
      website: "Sitio web o catálogo",
    },
    categoryOptions: [
      "Climatización y HVAC",
      "Mobiliario y electrodomésticos",
      "Soluciones de energía",
      "Otra necesidad",
    ],
    timelineOptions: [
      "Lo antes posible",
      "En los próximos 3 meses",
      "Más adelante",
      "Aún en planificación",
    ],
    select: "Seleccione una opción",
    continue: "Continuar",
    back: "Volver",
    send: "Enviar consulta",
    sending: "Enviando…",
    consent: "He leído la",
    privacy: "información de privacidad",
    unavailable:
      "La recepción de consultas aún no está habilitada. Puede explorar el formulario, pero su información no se enviará por ahora.",
    failed:
      "No se pudo confirmar la recepción. Su información sigue en el formulario. Intente nuevamente más tarde.",
    successTitle: "Su consulta fue recibida.",
    success:
      "Revisaremos la información para evaluar el encaje y conversar sobre los próximos pasos. La recepción no confirma una relación comercial ni disponibilidad de proveedores.",
    receipt: "Referencia",
    home: "Volver al inicio",
    review: "Revise los campos indicados antes de continuar.",
    received: "Consulta recibida",
  },
  en: {
    buyerTitle: "Tell us about\nyour next project.",
    supplierTitle: "Connect your offering\nto new possibilities.",
    buyerIntro:
      "Share what you need. This is the first step toward exploring suppliers suited to your project.",
    supplierIntro:
      "We’d like to understand your business and where your capabilities could meet an opportunity.",
    nextTitle: "What happens next?",
    buyerNext:
      "We’ll review your requirements and available coverage. If there’s a fit, we’ll get in touch to clarify the details before coordinating introductions and proposals.",
    supplierNext:
      "We’ll review your offering, coverage and capabilities. If there’s a fit, we’ll discuss commercial terms before any introduction.",
    steps: ["Your contact", "The details"],
    contactTitle: "Let’s start with an introduction.",
    projectTitle: "What does your project need?",
    supplierDetailsTitle: "Tell us about your offering.",
    required: "* Required fields",
    contactHint: "Provide at least an email or phone number.",
    optional: "optional",
    labels: {
      name: "Contact name",
      company: "Company",
      email: "Email address",
      phone: "Phone number",
      location: "Project location",
      category: "Product or service",
      quantity: "Approximate quantities",
      timeline: "Purchasing timeline",
      budget: "Estimated budget and currency",
      details: "Additional information and requirements",
      coverage: "Areas served",
      capacity: "Capacity and delivery capabilities",
      support: "Installation and warranties (or not applicable)",
      website: "Website or catalog URL",
    },
    categoryOptions: [
      "Air conditioning & HVAC",
      "Furniture & appliances",
      "Energy solutions",
      "Another requirement",
    ],
    timelineOptions: [
      "As soon as possible",
      "In the next 3 months",
      "Further ahead",
      "Still planning",
    ],
    select: "Choose an option",
    continue: "Continue",
    back: "Back",
    send: "Send inquiry",
    sending: "Sending…",
    consent: "I have read the",
    privacy: "privacy information",
    unavailable:
      "Inquiry reception is not enabled yet. You can explore the form, but your information cannot be sent at this time.",
    failed:
      "We couldn’t confirm receipt. Your information is still in the form. Please try again later.",
    successTitle: "Your inquiry was received.",
    success:
      "We’ll review your information to assess the fit and discuss possible next steps. Receipt does not confirm a commercial relationship or supplier availability.",
    receipt: "Reference",
    home: "Back to home",
    review: "Review the highlighted fields before continuing.",
    received: "Inquiry received",
  },
};
