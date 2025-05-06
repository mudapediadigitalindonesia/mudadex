<<<<<<< Updated upstream
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function WavePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Define renderer, scene, camera, controls, material
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let controls: OrbitControls;
    let material: THREE.ShaderMaterial;
    let animationId: number;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0.0, 1.0, 3.0);
    camera.lookAt(0, 0, 0);

    // Plane Geometry
    const aspect = width / height;
    const planeWidth = 12;
    const planeHeight = planeWidth / aspect;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 100, 100);

    // Shader Material
    material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform float speed;
        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          float amplitude = 0.1 + (sin(pos.x * 1.2) * cos(pos.y * 1.5)) * 0.1;
          float frequency = 3.0 + sin(pos.x * 0.5 + pos.y * 0.3) * 1.0;
          float wave = sin(pos.x * frequency + time * speed) * amplitude + cos(pos.y * frequency + time * speed * 0.8) * amplitude;
          pos.z += wave;
          vec3 tangent = vec3(1.0, 0.0, cos(pos.x * frequency + time) * amplitude);
          vec3 bitangent = vec3(0.0, 1.0, cos(pos.y * frequency + time * 0.8) * amplitude);
          vNormal = normalize(cross(tangent, bitangent));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float time;
        uniform bool wireframe;
        void main() {
          vec3 baseColor = vec3(0.055, 0.016, 0.290);
          vec3 lightPos = vec3(-40.0, -60.0, 20.0);
          vec3 lightDir = normalize(lightPos - vPosition);
          float diff = max(dot(normalize(vNormal), lightDir), 0.0);
          diff = smoothstep(0.1, 1.0, diff);
          vec3 finalColor = baseColor + diff * vec3(0.8, 0.8, 1.5);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0.0 },
        speed: { value: 0.5 },
        wireframe: { value: false },
      },
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;

    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      material.uniforms.time.value = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      controls.dispose();
      if (
        renderer.domElement &&
        containerRef.current?.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
=======
const background = ({ children }) => {
  return (
    <>
      <div>background</div>
      {children}
    </>
  );
};
>>>>>>> Stashed changes
