import emailjs from "@emailjs/browser";

// EmailJS configuration - these should be set in environment variables
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "default_service_id";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "default_template_id";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "default_public_key";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Omkar Gite",
      },
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};
