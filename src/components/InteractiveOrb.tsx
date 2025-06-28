import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface InteractiveOrbProps {
  className?: string;
  size?: number;
}

const InteractiveOrb: React.FC<InteractiveOrbProps> = ({ 
  className = '',
  size = 200
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create orb geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create shader material for the orb
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        opacity: { value: 0.15 },
        color1: { value: new THREE.Color(0x2076bc) },
        color2: { value: new THREE.Color(0x6bb9e7) },
        color3: { value: new THREE.Color(0xa8d5f0) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        uniform float opacity;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec2 uv = vUv;
          
          // Create flowing patterns
          float wave1 = sin(uv.x * 10.0 + time * 2.0) * 0.5 + 0.5;
          float wave2 = sin(uv.y * 8.0 + time * 1.5) * 0.5 + 0.5;
          float wave3 = sin((uv.x + uv.y) * 6.0 + time * 3.0) * 0.5 + 0.5;
          
          // Mouse interaction
          vec2 mouseInfluence = mouse * 0.5;
          float mouseDistance = length(uv - 0.5 - mouseInfluence);
          float mouseEffect = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
          
          // Combine waves
          float pattern = (wave1 + wave2 + wave3) / 3.0;
          pattern += mouseEffect * 0.3;
          
          // Color mixing
          vec3 color = mix(color1, color2, pattern);
          color = mix(color, color3, wave3 * 0.5);
          
          // Fresnel effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          gl_FragColor = vec4(color, opacity * (0.5 + fresnel * 0.5 + pattern * 0.3));
        }
      `
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);
    orbRef.current = orb;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (orb && material.uniforms) {
        // Update time
        material.uniforms.time.value = Date.now() * 0.001;
        
        // Update mouse position
        material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
        
        // Gentle rotation
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.008;
        
        // Subtle scale pulsing
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
        orb.scale.setScalar(scale);
      }

      renderer.render(scene, camera);
    };

    // Event listeners
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div 
      ref={mountRef} 
      className={`${className}`}
      style={{ 
        width: size,
        height: size,
        background: 'transparent'
      }}
    />
  );
};

export default InteractiveOrb;
