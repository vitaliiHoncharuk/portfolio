"use client";

export default function ContactParticles() {
  // Using CSS-only particles for better performance
  return (
    <div className="particles-container pointer-events-none absolute inset-0 overflow-hidden">
      {/* Only render 10 particles for better performance */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full opacity-0"
          style={{
            left: `${(i * 10) + (i % 3) * 5}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + (i % 3) * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        .particle {
          bottom: -20px;
          background: radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--secondary) / 0.4) 100%);
          animation: float-up 20s infinite linear;
          will-change: transform, opacity;
        }

        @keyframes float-up {
          0% {
            transform: translate3d(0, 0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
            transform: translate3d(10px, -10vh, 0) scale(1);
          }
          90% {
            opacity: 0.4;
            transform: translate3d(-10px, -90vh, 0) scale(1);
          }
          100% {
            transform: translate3d(0, -100vh, 0) scale(0);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none;
            opacity: 0.2;
            transform: translateY(-50vh);
          }
        }
      `}</style>
    </div>
  );
}