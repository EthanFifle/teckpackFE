import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ClassNameProps {
  className?: string
}

const LogoAnimation: React.FC<ClassNameProps> = ({ className = '' }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (avatarRef.current === null) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, avatarRef.current.clientWidth / avatarRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(avatarRef.current.clientWidth, avatarRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    avatarRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(5, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.MeshBasicMaterial({ color: 0xFBA115 });

    const edgeLines = new THREE.LineSegments(edges);
    const edgeVertices = edgeLines.geometry.attributes.position.array;
    const numVertices = edgeVertices.length;

    // Create tubes along the edges
    for (let i = 0; i < numVertices; i += 6) {
      const start = new THREE.Vector3(edgeVertices[i], edgeVertices[i+1], edgeVertices[i+2]);
      const end = new THREE.Vector3(edgeVertices[i+3], edgeVertices[i+4], edgeVertices[i+5]);
      const path = new THREE.LineCurve3(start, end);
      const tubeGeometry = new THREE.TubeGeometry(path, 20, 0.17, 8, false);
      const mesh = new THREE.Mesh(tubeGeometry, material);
      scene.add(mesh);
    }

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.children.forEach(child => {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (avatarRef.current) {
        avatarRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      geometry.dispose();
      edges.dispose();
    };
  }, []);

  return <div ref={avatarRef} className={className} />;
};

export default LogoAnimation;
