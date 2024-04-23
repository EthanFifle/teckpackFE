import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ClassNameProps {
  className?: string
}

const AvatarAnimation: React.FC<ClassNameProps> = ({ className = '' }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!avatarRef.current) {
      return; // Exit if ref is not set
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, avatarRef.current.clientWidth / avatarRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadow rendering
    avatarRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xFFAD2F);
    light.position.set(1, 1, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-1, 1.75, 1);
    scene.add(directionalLight);

    // Model variables
    let model1: THREE.Group | null = null;
    let model2: THREE.Group | null = null;

    // Rotating platform
    const platform = new THREE.Group()
    const ellipsePath = new THREE.EllipseCurve(0, 0, 32, 32, 0, 2 * Math.PI, false, 0);
    const ellipseShape = new THREE.Shape(ellipsePath.getPoints(50));
    const geometry = new THREE.ExtrudeGeometry(ellipseShape);
    const material = new THREE.MeshStandardMaterial({ color: 0xFEB23F, side: THREE.DoubleSide });
    const ellipse = new THREE.Mesh(geometry, material);
    ellipse.rotation.x = -Math.PI / 2; // Rotate to stand upright
    ellipse.position.y = -16;
    ellipse.receiveShadow = true;
    ellipse.castShadow = true;
    platform.add(ellipse);

    // Load models
    const loader = new GLTFLoader();
    loader.load('/models/female.gltf', (gltf) => {
      model1 = gltf.scene;
      model1.position.set(2, -15, 20); // Position model on one side of the circle
      model1.castShadow = true; // Model casts shadows
      platform.add(model1);
    });

    loader.load('/models/male.gltf', (gltf) => {
      model2 = gltf.scene;
      model2.position.set(-2, -15, -20); // Position model on the opposite side of the circle
      model2.rotation.y = Math.PI; // Rotate the model to face back-to-back
      model2.castShadow = true;
      platform.add(model2);
    });

    scene.add(platform);

    camera.position.set(0, 30, 100); // Elevate the camera and set back to view both models
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make the camera look at the center of the scene
    platform.position.y = -0.5;

    const onWindowResize = () => {

      if (!avatarRef.current) {
        return; // Exit if ref is not set
      }

      camera.aspect = avatarRef.current.clientWidth / avatarRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);

    };

    window.addEventListener('resize', onWindowResize);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate models if they are loaded
      if (model1) model1.rotation.y += 0.001;
      if (model2) model2.rotation.y += 0.001;

      platform.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      avatarRef.current && avatarRef.current.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={avatarRef} className={className} />;
};

export default AvatarAnimation;
