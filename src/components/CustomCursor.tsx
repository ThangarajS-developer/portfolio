import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Position references
  const targetPos = useRef({ x: -100, y: -100 });
  const corePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const lastMoved = useRef(Date.now());
  const speedRef = useRef(0);

  // Canvas and DOM element references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Particle & ripple stores
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const rippleIdCounter = useRef(0);

  // Check touch support on mount
  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return isCoarse || hasTouch;
    };

    const isTouch = checkTouch();
    setIsTouchDevice(isTouch);

    if (isTouch) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    if (isEnabled) {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isEnabled]);

  // Setup cursor event listeners and render loop
  useEffect(() => {
    if (isTouchDevice || !isEnabled) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    if (canvas) {
      ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorVisible) setCursorVisible(true);

      const dx = e.clientX - targetPos.current.x;
      const dy = e.clientY - targetPos.current.y;
      speedRef.current = Math.min(Math.sqrt(dx * dx + dy * dy), 40);

      targetPos.current = { x: e.clientX, y: e.clientY };
      lastMoved.current = Date.now();

      // Spawn subtle trailing particles if moving at sufficient speed
      if (speedRef.current > 3 && particles.current.length < 35) {
        // Neon purple color spectrum: deep violet to electric lilac
        const colors = [
          'rgba(192, 132, 252, ', // light neon purple
          'rgba(168, 85, 247, ',  // vivid purple
          'rgba(216, 180, 254, ', // bright lilac
          'rgba(147, 51, 234, '   // deep amethyst
        ];
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];

        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          size: Math.random() * 2.5 + 1.2,
          alpha: Math.min(0.7, 0.3 + (speedRef.current / 40) * 0.4),
          decay: Math.random() * 0.035 + 0.02,
          color: selectedColor
        });
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-target') ||
          target.closest('.project-card') ||
          target.closest('[data-cursor="interactive"]')
        );
        setIsHovered(isInteractive);

        const isText = Boolean(
          target.tagName === 'P' ||
          target.tagName === 'H1' ||
          target.tagName === 'H2' ||
          target.tagName === 'H3' ||
          target.tagName === 'SPAN'
        ) && !isInteractive;
        setIsTextHovered(isText);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      // Spawn ripple effect on clickable elements
      ripples.current.push({
        id: ++rippleIdCounter.current,
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: isHovered ? 45 : 32,
        alpha: 0.85
      });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop (lerp for magnetic / lag effect)
    let animationId: number;
    const render = () => {
      // Direct fast follow for core dot
      corePos.current.x += (targetPos.current.x - corePos.current.x) * 0.82;
      corePos.current.y += (targetPos.current.y - corePos.current.y) * 0.82;

      // Magnetic / smooth trailing lag for outer ring
      const lagFactor = isHovered ? 0.22 : 0.16;
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * lagFactor;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * lagFactor;

      // Update DOM transform for high efficiency (hardware accelerated)
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Render trailing particles and ripples on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render & update ripples
        for (let i = ripples.current.length - 1; i >= 0; i--) {
          const rip = ripples.current[i];
          rip.radius += (rip.maxRadius - rip.radius) * 0.18 + 0.5;
          rip.alpha -= 0.045;

          if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
            ripples.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(192, 132, 252, ${rip.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Render & update stardust trailing particles
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    rafRef.current = animationId;

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isEnabled, isHovered, cursorVisible]);

  if (isTouchDevice || !isEnabled) {
    return null;
  }

  return (
    <div
      id="custom-cursor-container"
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        cursorVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Trailing Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full"
      />

      {/* Outer Circular Ring with soft purple glow and magnetic lag */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full will-change-transform flex items-center justify-center transition-[width,height,border-color,background-color] duration-200 ease-out ${
          isHovered
            ? 'w-14 h-14 border border-purple-400/80 bg-purple-600/15 shadow-[0_0_25px_rgba(168,85,247,0.5)] backdrop-blur-[0.5px]'
            : isMouseDown
            ? 'w-6 h-6 border border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            : isTextHovered
            ? 'w-8 h-8 border border-purple-500/30 bg-purple-900/10'
            : 'w-9 h-9 border border-purple-500/50 bg-purple-950/10 shadow-[0_0_12px_rgba(147,51,234,0.3)]'
        }`}
      >
        {/* Subtle crosshair notches when hovering interactive element */}
        {isHovered && (
          <>
            <span className="absolute -top-1 w-1.5 h-0.5 bg-purple-300 shadow-[0_0_6px_#c084fc]" />
            <span className="absolute -bottom-1 w-1.5 h-0.5 bg-purple-300 shadow-[0_0_6px_#c084fc]" />
            <span className="absolute -left-1 w-0.5 h-1.5 bg-purple-300 shadow-[0_0_6px_#c084fc]" />
            <span className="absolute -right-1 w-0.5 h-1.5 bg-purple-300 shadow-[0_0_6px_#c084fc]" />
          </>
        )}
      </div>

      {/* Glowing Neon-Purple Core Dot as the main cursor */}
      <div
        ref={coreRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full will-change-transform transition-[width,height,background-color] duration-150 ease-out ${
          isHovered
            ? 'w-2 h-2 bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#c084fc]'
            : isMouseDown
            ? 'w-3 h-3 bg-purple-300 shadow-[0_0_15px_#c084fc]'
            : 'w-2 h-2 bg-purple-400 shadow-[0_0_8px_#c084fc,0_0_14px_#9333ea]'
        }`}
      />
    </div>
  );
};
