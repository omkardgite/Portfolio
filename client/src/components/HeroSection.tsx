import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import { InteractiveHeroBackground } from "./InteractiveHeroBackground";

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);

  const roles = [
    "Frontend Developer",
    "React & Next.js Specialist",
    "JavaScript & TypeScript Developer",
  ];
  useEffect(() => {
    const typeEffect = () => {
      const current = roles[currentRole];

      if (isDeleting) {
        setDisplayText(current.substring(0, currentChar - 1));
        setCurrentChar((prev) => prev - 1);
      } else {
        setDisplayText(current.substring(0, currentChar + 1));
        setCurrentChar((prev) => prev + 1);
      }

      if (!isDeleting && currentChar === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentChar === 0) {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    };

    const timeout = setTimeout(typeEffect, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentRole, roles]);

  const downloadResume = () => {
    const pdfUrl = "/Resume_OmkarGite.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Omkar-Gite-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Magnetic hover effect
  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    buttonRef: React.RefObject<HTMLButtonElement>
  ) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 50; // Maximum attraction distance

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      const moveX = deltaX * force * 0.3;
      const moveY = deltaY * force * 0.3;

      buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  const handleMouseLeave = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden section-bg-primary"
    >
      {/* Interactive background animation */}
      <InteractiveHeroBackground />
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            data-testid="hero-name"
          >
            <span className="block text-foreground">Omkar Gite</span>
          </motion.h1>

          <div className="text-xl md:text-2xl text-muted-foreground h-8">
            <span
              data-testid="typing-animation"
              className="border-r-2 border-primary"
            >
              {displayText}
            </span>
          </div>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            data-testid="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I specialize in creating beautiful, responsive user interfaces with
            modern JavaScript frameworks. Passionate about frontend development,
            performance optimization, and exceptional user experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              ref={downloadButtonRef}
              onClick={downloadResume}
              onMouseMove={(e) => handleMouseMove(e, downloadButtonRef)}
              onMouseLeave={() => handleMouseLeave(downloadButtonRef)}
              data-testid="view-my-work"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="inline mr-2" />
              Download Resume
            </motion.button>

            <motion.button
              ref={contactButtonRef}
              onClick={scrollToContact}
              onMouseMove={(e) => handleMouseMove(e, contactButtonRef)}
              onMouseLeave={() => handleMouseLeave(contactButtonRef)}
              data-testid="contact-cta"
              className="border border-border hover:bg-accent text-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaChevronDown
          data-testid="scroll-indicator"
          className="text-muted-foreground text-xl"
        />
      </motion.div>
    </section>
  );
}
