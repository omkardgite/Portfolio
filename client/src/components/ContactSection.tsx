import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useToast } from "../hooks/use-toast";
import { sendEmail, type ContactFormData } from "../lib/emailjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      await sendEmail(data as ContactFormData);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/omkardgite",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/omkar-gite",
      label: "LinkedIn",
    },
    // {
    //   icon: <FaTwitter />,
    //   url: "https://twitter.com/alexjohnson",
    //   label: "Twitter",
    // },
  ];

  const openSocialLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-alternate"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            data-testid="contact-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        {/* Quick Contact Options */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
            <p className="text-muted-foreground">
              Choose your preferred way to connect
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://wa.me/+918459513054?text=Hi%20Omkar!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl magnetic-hover"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-testid="whatsapp-contact"
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/omkar-gite/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl magnetic-hover"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-testid="linkedin-contact"
            >
              <FaLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href="mailto:giteomkar17@gmail.com"
              className="flex items-center space-x-3 bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl magnetic-hover"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-testid="email-contact"
            >
              <FaEnvelope className="text-xl" />
              <span>Email Direct</span>
            </motion.a>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Or fill out the form below for a detailed message
            </p>
            <div className="w-24 h-px bg-border mx-auto mt-4"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3
                data-testid="contact-connect-title"
                className="text-2xl font-semibold mb-6"
              >
                Let's Connect
              </h3>
              <p
                data-testid="contact-connect-description"
                className="text-muted-foreground text-lg leading-relaxed"
              >
                I'm always interested in hearing about new opportunities,
                whether it's a freelance project, full-time position, or just a
                friendly chat about technology.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center" data-testid="contact-email">
                <FaEnvelope className="text-primary text-xl mr-4" />
                <span>giteomkar17@gmail.com</span>
              </div>

              <div className="flex items-center" data-testid="contact-location">
                <FaMapMarkerAlt className="text-primary text-xl mr-4" />
                <span>Maharashtra, IN</span>
              </div>
            </div>

            <div>
              <h4
                data-testid="social-title"
                className="text-lg font-semibold mb-4"
              >
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.button
                    key={social.label}
                    onClick={() => openSocialLink(social.url)}
                    data-testid={`social-${social.label.toLowerCase()}`}
                    className="w-12 h-12 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 text-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-effect rounded-xl p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              data-testid="contact-form"
            >
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  data-testid="input-name"
                  className="w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <span
                    data-testid="error-name"
                    className="text-destructive text-sm mt-1 block"
                  >
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                  className="w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <span
                    data-testid="error-email"
                    className="text-destructive text-sm mt-1 block"
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  data-testid="input-message"
                  className="w-full resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <span
                    data-testid="error-message"
                    className="text-destructive text-sm mt-1 block"
                  >
                    {errors.message.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-contact-form"
                className="w-full py-3 font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
