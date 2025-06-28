import React, { useRef, useEffect } from 'react';

const Globe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 40;
    canvas.width = size;
    canvas.height = size;

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Draw globe outline
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
      ctx.strokeStyle = '#2076bc';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw rotating meridians
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rotation);

      // Vertical meridians
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const radiusX = Math.abs((size / 2 - 2) * Math.cos(i * Math.PI / 4));
        ctx.ellipse(0, 0, radiusX, size / 2 - 2, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#6bb9e7';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Horizontal parallels
      for (let i = -1; i <= 1; i++) {
        if (i === 0) continue;
        ctx.beginPath();
        const y = i * (size / 4);
        const radiusSquared = (size / 2 - 2) ** 2 - y ** 2;
        if (radiusSquared > 0) {
          const radius = Math.sqrt(radiusSquared);
          ctx.ellipse(0, y, radius, radius * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#6bb9e7';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.restore();

      rotation += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default Globe3D;
