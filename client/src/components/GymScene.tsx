import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const GymScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1E2023);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Add renderer to the DOM
    const currentRef = mountRef.current;
    if (currentRef) {
      const { clientWidth: width, clientHeight: height } = currentRef;
      renderer.setSize(width, height);
      currentRef.appendChild(renderer.domElement);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minDistance = 2;
      controls.maxDistance = 7;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xff4500, 1, 10);
      pointLight.position.set(0, 2, 2);
      scene.add(pointLight);

      // Create the floor
      const floorGeometry = new THREE.PlaneGeometry(10, 10);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.8,
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      // Create gym equipment
      // Dumbbell rack
      const rackGeometry = new THREE.BoxGeometry(2, 1, 0.5);
      const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const rack = new THREE.Mesh(rackGeometry, rackMaterial);
      rack.position.set(-1.5, 0.5, -1);
      rack.castShadow = true;
      rack.receiveShadow = true;
      scene.add(rack);

      // Dumbbells
      for (let i = 0; i < 5; i++) {
        const dumbbellGroup = new THREE.Group();
        
        // Handle
        const handleGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 32);
        const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.rotation.x = Math.PI / 2;
        dumbbellGroup.add(handle);
        
        // Weights
        const weightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 32);
        const weightMaterial = new THREE.MeshStandardMaterial({ 
          color: [0xff4500, 0x00AFFF, 0xFFD700, 0x00FF00, 0x9932CC][i] 
        });
        
        const weight1 = new THREE.Mesh(weightGeometry, weightMaterial);
        weight1.position.set(0, 0, -0.15);
        weight1.rotation.x = Math.PI / 2;
        dumbbellGroup.add(weight1);
        
        const weight2 = new THREE.Mesh(weightGeometry, weightMaterial);
        weight2.position.set(0, 0, 0.15);
        weight2.rotation.x = Math.PI / 2;
        dumbbellGroup.add(weight2);
        
        dumbbellGroup.position.set(-2 + i * 0.5, 1.05, -1);
        dumbbellGroup.castShadow = true;
        scene.add(dumbbellGroup);
      }

      // Bench
      const benchGroup = new THREE.Group();
      
      // Bench pad
      const benchPadGeometry = new THREE.BoxGeometry(1.2, 0.15, 0.4);
      const benchPadMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const benchPad = new THREE.Mesh(benchPadGeometry, benchPadMaterial);
      benchPad.position.set(0, 0.4, 0);
      benchGroup.add(benchPad);
      
      // Bench legs
      const legGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
      
      const leg1 = new THREE.Mesh(legGeometry, legMaterial);
      leg1.position.set(-0.5, 0.2, 0.1);
      benchGroup.add(leg1);
      
      const leg2 = new THREE.Mesh(legGeometry, legMaterial);
      leg2.position.set(-0.5, 0.2, -0.1);
      benchGroup.add(leg2);
      
      const leg3 = new THREE.Mesh(legGeometry, legMaterial);
      leg3.position.set(0.5, 0.2, 0.1);
      benchGroup.add(leg3);
      
      const leg4 = new THREE.Mesh(legGeometry, legMaterial);
      leg4.position.set(0.5, 0.2, -0.1);
      benchGroup.add(leg4);
      
      benchGroup.position.set(1, 0, 0);
      benchGroup.castShadow = true;
      benchGroup.receiveShadow = true;
      scene.add(benchGroup);

      // Barbell
      const barbellGroup = new THREE.Group();
      
      // Bar
      const barGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2, 32);
      const barMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.rotation.z = Math.PI / 2;
      barbellGroup.add(bar);
      
      // Weights
      const plateGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
      const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
      
      const plate1 = new THREE.Mesh(plateGeometry, plateMaterial);
      plate1.position.set(-0.8, 0, 0);
      plate1.rotation.z = Math.PI / 2;
      barbellGroup.add(plate1);
      
      const plate2 = new THREE.Mesh(plateGeometry, plateMaterial);
      plate2.position.set(-0.7, 0, 0);
      plate2.rotation.z = Math.PI / 2;
      barbellGroup.add(plate2);
      
      const plate3 = new THREE.Mesh(plateGeometry, plateMaterial);
      plate3.position.set(0.8, 0, 0);
      plate3.rotation.z = Math.PI / 2;
      barbellGroup.add(plate3);
      
      const plate4 = new THREE.Mesh(plateGeometry, plateMaterial);
      plate4.position.set(0.7, 0, 0);
      plate4.rotation.z = Math.PI / 2;
      barbellGroup.add(plate4);
      
      barbellGroup.position.set(1, 0.6, 0);
      barbellGroup.castShadow = true;
      scene.add(barbellGroup);

      // Treadmill
      const treadmillGroup = new THREE.Group();
      
      // Base
      const baseGeometry = new THREE.BoxGeometry(1, 0.1, 2);
      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.set(0, 0.05, 0);
      treadmillGroup.add(base);
      
      // Belt
      const beltGeometry = new THREE.BoxGeometry(0.8, 0.02, 1.8);
      const beltMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
      const belt = new THREE.Mesh(beltGeometry, beltMaterial);
      belt.position.set(0, 0.11, 0);
      treadmillGroup.add(belt);
      
      // Console
      const consoleGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.3);
      const consoleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const console = new THREE.Mesh(consoleGeometry, consoleMaterial);
      console.position.set(0, 0.8, -0.8);
      treadmillGroup.add(console);
      
      // Handrails
      const handrailGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 32);
      const handrailMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
      
      const leftHandrail = new THREE.Mesh(handrailGeometry, handrailMaterial);
      leftHandrail.position.set(-0.3, 0.5, -0.5);
      treadmillGroup.add(leftHandrail);
      
      const rightHandrail = new THREE.Mesh(handrailGeometry, handrailMaterial);
      rightHandrail.position.set(0.3, 0.5, -0.5);
      treadmillGroup.add(rightHandrail);
      
      // Connect handrails to console
      const handrailConnectorGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 32);
      const handrailConnector = new THREE.Mesh(handrailConnectorGeometry, handrailMaterial);
      handrailConnector.position.set(0, 0.7, -0.5);
      handrailConnector.rotation.z = Math.PI / 2;
      treadmillGroup.add(handrailConnector);
      
      treadmillGroup.position.set(-1, 0, 1);
      treadmillGroup.castShadow = true;
      treadmillGroup.receiveShadow = true;
      scene.add(treadmillGroup);

      // Add simple "FLEXFIT" text in 3D
      const textLoader = new FontLoader();
      textLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
        const textGeometry = new TextGeometry('FLEXFIT', {
          font: font,
          size: 0.3,
          height: 0.05,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.005,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeometry.computeBoundingBox();
        const centerOffset = -0.5 * (textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x);
        
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500 });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.set(centerOffset, 1.2, -1.5);
        text.castShadow = true;
        scene.add(text);
      });

      // Animation
      let frameId: number;
      let elapsed = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        elapsed += 0.01;
        
        // Rotate dumbbells slightly
        scene.children.forEach((child, index) => {
          if (index >= 3 && index < 8) { // These are the dumbbells
            child.rotation.z = Math.sin(elapsed + index) * 0.1;
          }
        });
        
        // Make the point light pulse
        pointLight.intensity = 1 + Math.sin(elapsed * 2) * 0.3;
        
        controls.update();
        renderer.render(scene, camera);
      };
      
      animate();

      // Handle window resize
      const handleResize = () => {
        if (currentRef) {
          const { clientWidth: width, clientHeight: height } = currentRef;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };
      
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        if (currentRef) {
          currentRef.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', borderRadius: '1rem', overflow: 'hidden' }} />;
};

export default GymScene;
