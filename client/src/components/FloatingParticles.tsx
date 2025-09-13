import { useEffect } from "react";

export function FloatingParticles() {
  useEffect(() => {
    const particleCount = 50;
    const container = document.getElementById('particles-container');
    
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = Math.random() * 4 + 4 + 's';
      
      container.appendChild(particle);
    }
    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      id="particles-container" 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
