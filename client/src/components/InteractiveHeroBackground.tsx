import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export function InteractiveHeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize particles
  useEffect(() => {
    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.8)' : 'rgba(168, 85, 247, 0.6)'
    });

    const initialParticles = Array.from({ length: 30 }, (_, i) => createParticle(i));
    setParticles(initialParticles);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Animate particles based on mouse position
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Particles are attracted to cursor but with some randomness
          const attraction = Math.max(0, 150 - distance) / 150;
          const moveX = distance > 0 ? (dx / distance) * attraction * 0.5 + (Math.random() - 0.5) * particle.speed : (Math.random() - 0.5) * particle.speed;
          const moveY = distance > 0 ? (dy / distance) * attraction * 0.5 + (Math.random() - 0.5) * particle.speed : (Math.random() - 0.5) * particle.speed;
          
          let newX = particle.x + moveX;
          let newY = particle.y + moveY;
          
          // Keep particles within bounds
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: Math.min(0.8, particle.opacity + attraction * 0.3)
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-testid="interactive-hero-background"
    >
      {/* Gradient mesh that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(168, 85, 247, 0.1) 30%, 
            transparent 70%)`
        }}
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(168, 85, 247, 0.1) 30%, 
            transparent 70%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      
      {/* Interactive particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            left: particle.x,
            top: particle.y,
            scale: mousePosition.x && mousePosition.y ? [1, 1.2, 1] : 1,
          }}
          transition={{ type: "tween", duration: 0.1 }}
        />
      ))}
      
      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
          filter: 'blur(20px)',
        }}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "tween", duration: 0.2 },
          y: { type: "tween", duration: 0.2 },
          scale: { duration: 2, repeat: Infinity },
        }}
      />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[1, 2, 3, 4, 5].map(i => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-primary/20 dark:border-primary/30"
            style={{
              width: 60 + i * 20,
              height: 60 + i * 20,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4 + i, repeat: Infinity },
              x: { duration: 8 + i * 2, repeat: Infinity },
              y: { duration: 6 + i * 2, repeat: Infinity },
            }}
          />
        ))}
      </div>
    </div>
  );
}