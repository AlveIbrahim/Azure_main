import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });
  const geometriesRef = useRef<THREE.Mesh[]>([]);

  const geometryConfigs = useMemo(() => [
    { type: 'box', position: [-3, 2, -5] as [number, number, number], rotation: [0.5, 0.3, 0] as [number, number, number], scale: 0.8 },
    { type: 'sphere', position: [4, -1, -8] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: 0.6 },
    { type: 'octahedron', position: [-2, -3, -6] as [number, number, number], rotation: [0.2, 0.8, 0.3] as [number, number, number], scale: 0.7 },
    { type: 'tetrahedron', position: [3, 3, -7] as [number, number, number], rotation: [0.8, 0.2, 0.5] as [number, number, number], scale: 0.5 },
    { type: 'torus', position: [0, 1, -9] as [number, number, number], rotation: [0.3, 0.6, 0.1] as [number, number, number], scale: 0.4 },
    { type: 'dodecahedron', position: [-4, -1, -10] as [number, number, number], rotation: [0.1, 0.4, 0.7] as [number, number, number], scale: 0.6 },
  ], []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Materials
    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x2076bc, 
        transparent: true, 
        opacity: 0.1,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x6bb9e7, 
        transparent: true, 
        opacity: 0.08,
        shininess: 80
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xa8d5f0, 
        transparent: true, 
        opacity: 0.06,
        shininess: 60
      }),
    ];

    // Create geometries
    const geometries: THREE.Mesh[] = [];
    geometryConfigs.forEach((config, index) => {
      let geometry: THREE.BufferGeometry;
      
      switch (config.type) {
        case 'box':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.8, 16, 16);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.8);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(0.8);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.6, 0.2, 8, 16);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(0.8);
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }

      const material = materials[index % materials.length];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(config.position[0], config.position[1], config.position[2]);
      mesh.rotation.set(config.rotation[0], config.rotation[1], config.rotation[2]);
      mesh.scale.setScalar(config.scale);
      
      scene.add(mesh);
      geometries.push(mesh);
    });

    geometriesRef.current = geometries;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x2076bc, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x6bb9e7, 0.3, 100);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate geometries
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += 0.002 + index * 0.0005;
        mesh.rotation.y += 0.003 + index * 0.0003;
        mesh.rotation.z += 0.001 + index * 0.0002;

        // Gentle floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        
        // Subtle mouse interaction
        const mouseInfluence = 0.1;
        mesh.rotation.x += mouseRef.current.y * mouseInfluence * 0.01;
        mesh.rotation.y += mouseRef.current.x * mouseInfluence * 0.01;
      });

      // Camera gentle movement
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      geometries.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [geometryConfigs]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'transparent',
        overflow: 'hidden'
      }}
    />
  );
};

export default ThreeBackground;
