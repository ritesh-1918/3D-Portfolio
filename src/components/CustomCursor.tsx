import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: -100, y: -100 });
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailCount = 5; // Number of trailing elements

  // Initialize trail refs
  useEffect(() => {
    trailsRef.current = Array(trailCount).fill(null);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const updateMousePosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Calculate velocity for dynamic effects
        const newVelocity = {
          x: x - lastPosition.x,
          y: y - lastPosition.y
        };
        setVelocity(newVelocity);
        setLastPosition({ x, y });
        setPosition({ x, y });
        
        // Direct DOM manipulation for lowest latency
        if (cursorOuterRef.current) {
          // Apply velocity-based scaling to outer cursor
          const speed = Math.sqrt(newVelocity.x ** 2 + newVelocity.y ** 2);
          const scale = Math.min(1 + speed * 0.01, 1.5); // Scale based on speed, with max limit
          
          cursorOuterRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : scale})`;
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
        
        // Update trail positions with delay
        trailsRef.current.forEach((trail, i) => {
          if (trail) {
            // Create delayed following effect
            setTimeout(() => {
              if (trail) {
                trail.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.5 - i * 0.1})`;
                trail.style.opacity = `${0.5 - i * 0.1}`;
              }
            }, i * 40); // Increasing delay for each trail element
          }
        });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTargetHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable');

      // Toggle hover class on cursor elements based on target
      if (cursorOuterRef.current && cursorDotRef.current) {
        if (isTargetHoverable) {
          cursorOuterRef.current.classList.add('hover');
          cursorDotRef.current.classList.add('hover');
        } else {
          cursorOuterRef.current.classList.remove('hover');
          cursorDotRef.current.classList.remove('hover');
        }
      }
      // Update state if needed for other logic, but not essential for visual hover effect now
      if (isTargetHoverable !== isHovering) {
         setIsHovering(!!isTargetHoverable);
      }
    };

    // Hide the default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', updateMousePosition);
    // Use mouseover/mouseout for more reliable hover detection across elements
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOver); // Re-check when mouse leaves an element

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOver);
      // Restore default cursor on cleanup
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
    // Dependency array simplified as position is handled directly
  }, [isHovering]); // Re-run effect if isHovering state changes (might be needed for other logic)

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Circle - Use CSS class */}
      <div
        ref={cursorOuterRef}
        className="custom-cursor-outer" // Use the class from index.css
        style={{
          willChange: 'transform',
          // Initial transform set via JS on first mouse move
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
        }}
      />
      {/* Inner Dot - Use CSS class */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot" // Use the class from index.css
        style={{
          willChange: 'transform',
          // Initial transform set via JS on first mouse move
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
        }}
      />
      {/* Cursor trails for kinetic effect */}
      {Array(trailCount).fill(null).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailsRef.current[i] = el)}
          className="custom-cursor-trail"
          style={{
            position: 'fixed',
            width: `${6 - i}px`,
            height: `${6 - i}px`,
            backgroundColor: 'var(--primary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998 - i,
            opacity: 0.5 - i * 0.1,
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${0.5 - i * 0.1})`,
            transition: `opacity 0.2s ease-out, transform 0.1s ease-out`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;