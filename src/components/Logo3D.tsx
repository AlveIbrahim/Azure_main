import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Logo3DProps {
  className?: string;
}

const Logo3D: React.FC<Logo3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const logoRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    const size = 80;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Load the custom logo texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      'https://i.imgur.com/3zhpy2z.png',
      (texture) => {
        // Create logo geometry - plane to display the image
        const geometry = new THREE.PlaneGeometry(1.8, 1.8);
        
        // Create material with the loaded texture
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.1,
          side: THREE.DoubleSide
        });

        const logo = new THREE.Mesh(geometry, material);
        logo.position.y = 0.2; // Move logo slightly up
        scene.add(logo);
        logoRef.current = logo;

        // Start animation after logo is loaded
        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading logo texture:', error);
        // Fallback: create a simple colored plane
        const geometry = new THREE.PlaneGeometry(1.8, 1.8);
        const material = new THREE.MeshBasicMaterial({
          color: 0x2076bc,
          transparent: true,
          opacity: 0.8
        });
        const logo = new THREE.Mesh(geometry, material);
        logo.position.y = 0.2; // Move logo slightly up
        scene.add(logo);
        logoRef.current = logo;
        animate();
      }
    );

    // Lighting (for better visual effect)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x2076bc, 0.4);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (logoRef.current) {
        // Smooth rotation
        logoRef.current.rotation.z += 0.02;
        
        // Subtle floating effect
        logoRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
        
        // Gentle scale pulsing
        const scale = 1 + Math.sin(Date.now() * 0.003) * 0.05;
        logoRef.current.scale.setScalar(scale);
      }

      renderer.render(scene, camera);
    };

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      if (logoRef.current) {
        if (logoRef.current.geometry) logoRef.current.geometry.dispose();
        if (logoRef.current.material) {
          if (Array.isArray(logoRef.current.material)) {
            logoRef.current.material.forEach(material => material.dispose());
          } else {
            logoRef.current.material.dispose();
          }
        }
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`${className}`}
      style={{ 
        width: '80px',
        height: '80px',
        background: 'transparent'
      }}
    />
  );
};

export default Logo3D;
