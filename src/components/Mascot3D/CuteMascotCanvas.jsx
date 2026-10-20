import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CuteMascotCanvas - ASTRO BOT & CHARACTER RIG
 * 
 * Features:
 * - Default: "Astro Bot" - High-fidelity visionOS cyber drone with centered, symmetrical
 *   curved obsidian glass visor, glowing digital LED eyes, blue cyber collar, audio ear pods,
 *   and top antenna.
 * - Options:
 *   1. Astro Bot (Default - sleek visionOS floating cyber drone)
 *   2. Cyber Panda (Large rounded black ears, dual black eye patches, cute snout)
 *   3. Cyber Pup (Floppy drooping puppy ears, puppy snout, shiny button nose, wagging tail)
 *   4. Cyber Kitty (Triangular cat ears with pastel pink inner pads, cute pink nose, whiskers)
 * - Real-time Cursor / Pointer Tracking: Head and pupils follow cursor position smoothly.
 * - Reversed Looking Logic:
 *   - Username: Looks away whistling at the ceiling corner!
 *   - Password: Stares intently directly at the screen/user with laser focus!
 *   - Curious: Cocked head in suspense while submitting.
 *   - Happy: Joyful 3D bounce with smiling digital LED eyes (^ ^) and raised cheering paws!
 *   - Sad: Drooped head and sorrowful LED gaze (v v).
 */
export default function CuteMascotCanvas({
  mascotState = 'idle',
  character = 'astro_bot',
  caretPosition = 0,
  theme = 'light',
  className = '',
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({ mascotState, character, caretPosition, theme });

  useEffect(() => {
    stateRef.current = { mascotState, character, caretPosition, theme };
  }, [mascotState, character, caretPosition, theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const blueFill = new THREE.DirectionalLight(0x38bdf8, 0.8);
    blueFill.position.set(-3.5, 1, 2.5);
    scene.add(blueFill);

    const emeraldRim = new THREE.DirectionalLight(0x34d399, 0.7);
    emeraldRim.position.set(0, 3, -3);
    scene.add(emeraldRim);

    // --- 3. Shared Materials ---
    const isDark = stateRef.current.theme === 'dark';

    // Pearl / Obsidian Ceramic Shell (Head & Body base)
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0f172a : 0xf8fafc,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    // Dark Accent Material (Panda patches, puppy nose)
    const darkAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Soft Pink Material (Kitty inner ears & nose, puppy tongue)
    const pinkMaterial = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.4,
      metalness: 0.05,
    });

    // Astro Bot Metallic Blue Collar Material
    const cyberBlueMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
    });

    // Chrome Metallic Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.2,
    });

    // Symmetrical Obsidian Visor Glass Material
    const visorGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x030712,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.5,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });

    // Visor Backing Plate (Deep rich contrast behind eyes)
    const visorBackingMaterial = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.2,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });

    // Digital Glowing LED Cyan Material for Eyes & Indicators
    const ledCyan = 0x38bdf8;
    const ledEyeMaterial = new THREE.MeshBasicMaterial({
      color: ledCyan,
    });

    const ledPupilMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.9,
    });

    // Thruster Blue Plasma Glow
    const thrusterGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });

    // --- 4. Hierarchy Construction ---
    const mascotRoot = new THREE.Group();
    scene.add(mascotRoot);

    // Astro Bot Body (Aerodynamic rounded egg capsule)
    const bodyGeo = new THREE.SphereGeometry(0.72, 32, 32);
    bodyGeo.scale(1, 0.88, 0.85);
    const bodyMesh = new THREE.Mesh(bodyGeo, shellMaterial);
    bodyMesh.position.set(0, -0.62, 0);
    bodyMesh.castShadow = true;
    mascotRoot.add(bodyMesh);

    // Floating Anti-Gravity Thruster Ring & Cone
    const thrusterRingGeo = new THREE.TorusGeometry(0.38, 0.055, 16, 32);
    thrusterRingGeo.rotateX(Math.PI * 0.5);
    const thrusterRing = new THREE.Mesh(thrusterRingGeo, chromeMaterial);
    thrusterRing.position.set(0, -1.15, 0);
    mascotRoot.add(thrusterRing);

    const thrusterConeGeo = new THREE.ConeGeometry(0.28, 0.38, 24, 1, true);
    thrusterConeGeo.rotateX(Math.PI);
    const thrusterCone = new THREE.Mesh(thrusterConeGeo, thrusterGlowMaterial);
    thrusterCone.position.set(0, -1.3, 0);
    mascotRoot.add(thrusterCone);

    // Head Group (Rotates for looking around & cursor tracking)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.22, 0);
    mascotRoot.add(headGroup);

    // Main Helmet / Head Mesh
    const headGeo = new THREE.SphereGeometry(0.86, 36, 36);
    headGeo.scale(1.06, 0.98, 1.02);
    const headMesh = new THREE.Mesh(headGeo, shellMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // =========================================================================
    // CHARACTER 1: ASTRO BOT GROUP (Default)
    // =========================================================================
    const astroGroup = new THREE.Group();
    headGroup.add(astroGroup);

    // Symmetrical Centered Curved Obsidian Visor
    // Centered exactly on the front face (phi centered at PI/2, theta centered at PI/2)
    const visorWidth = 1.36; // Horizontal sweep (~78 degrees)
    const visorHeight = 0.62; // Vertical sweep (~35 degrees)
    const visorPhiStart = Math.PI * 0.5 - visorWidth * 0.5;
    const visorThetaStart = Math.PI * 0.5 - visorHeight * 0.5;

    // Backing plate for deep contrast
    const visorBackingGeo = new THREE.SphereGeometry(
      0.885,
      36,
      24,
      visorPhiStart,
      visorWidth,
      visorThetaStart,
      visorHeight
    );
    const visorBackingMesh = new THREE.Mesh(visorBackingGeo, visorBackingMaterial);
    astroGroup.add(visorBackingMesh);

    // Front curved glass visor
    const visorGeo = new THREE.SphereGeometry(
      0.895,
      36,
      24,
      visorPhiStart,
      visorWidth,
      visorThetaStart,
      visorHeight
    );
    const visorMesh = new THREE.Mesh(visorGeo, visorGlassMaterial);
    astroGroup.add(visorMesh);

    // Astro Bot Signature Blue Cyber Collar Ring (Between Head and Body)
    const collarGeo = new THREE.TorusGeometry(0.56, 0.08, 16, 36);
    collarGeo.rotateX(Math.PI * 0.5);
    const collarMesh = new THREE.Mesh(collarGeo, cyberBlueMaterial);
    collarMesh.position.set(0, -0.76, 0);
    headGroup.add(collarMesh);

    // Side Ear Audio Pods (Left & Right)
    const earPodGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
    earPodGeo.rotateZ(Math.PI * 0.5);

    const leftPod = new THREE.Group();
    leftPod.position.set(-0.92, 0.05, 0);
    const leftPodMesh = new THREE.Mesh(earPodGeo, shellMaterial);
    leftPod.add(leftPodMesh);
    const leftPodRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.022, 12, 24), ledEyeMaterial);
    leftPodRing.rotation.y = Math.PI * 0.5;
    leftPod.add(leftPodRing);
    astroGroup.add(leftPod);

    const rightPod = new THREE.Group();
    rightPod.position.set(0.92, 0.05, 0);
    const rightPodMesh = new THREE.Mesh(earPodGeo, shellMaterial);
    rightPod.add(rightPodMesh);
    const rightPodRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.022, 12, 24), ledEyeMaterial);
    rightPodRing.rotation.y = Math.PI * 0.5;
    rightPod.add(rightPodRing);
    astroGroup.add(rightPod);

    // Top Cyber Antenna
    const antennaStemGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.32, 12);
    const antennaStem = new THREE.Mesh(antennaStemGeo, chromeMaterial);
    antennaStem.position.set(0, 1.05, 0);
    astroGroup.add(antennaStem);

    const antennaTipGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const antennaTip = new THREE.Mesh(antennaTipGeo, ledEyeMaterial);
    antennaTip.position.set(0, 1.22, 0);
    astroGroup.add(antennaTip);

    // =========================================================================
    // CHARACTER 2: CYBER PANDA GROUP
    // =========================================================================
    const pandaGroup = new THREE.Group();
    pandaGroup.visible = false;
    headGroup.add(pandaGroup);

    // Panda Large Rounded Black Ears
    const pandaEarGeo = new THREE.SphereGeometry(0.24, 20, 20);
    pandaEarGeo.scale(1.05, 0.95, 0.55);

    const leftPandaEar = new THREE.Mesh(pandaEarGeo, darkAccentMaterial);
    leftPandaEar.position.set(-0.62, 0.82, 0);
    leftPandaEar.rotation.z = 0.25;
    pandaGroup.add(leftPandaEar);

    const rightPandaEar = new THREE.Mesh(pandaEarGeo, darkAccentMaterial);
    rightPandaEar.position.set(0.62, 0.82, 0);
    rightPandaEar.rotation.z = -0.25;
    pandaGroup.add(rightPandaEar);

    // Panda Dual Black Eye Patches (Angled outward symmetrically around eyes)
    const pandaEyePatchGeo = new THREE.SphereGeometry(0.22, 24, 24);
    pandaEyePatchGeo.scale(1.25, 0.95, 0.22);

    const leftPandaPatch = new THREE.Mesh(pandaEyePatchGeo, darkAccentMaterial);
    leftPandaPatch.position.set(-0.28, 0.03, 0.82);
    leftPandaPatch.rotation.z = -0.25;
    pandaGroup.add(leftPandaPatch);

    const rightPandaPatch = new THREE.Mesh(pandaEyePatchGeo, darkAccentMaterial);
    rightPandaPatch.position.set(0.28, 0.03, 0.82);
    rightPandaPatch.rotation.z = 0.25;
    pandaGroup.add(rightPandaPatch);

    // Panda Muzzle & Black Button Nose
    const pandaSnoutGeo = new THREE.SphereGeometry(0.2, 20, 20);
    pandaSnoutGeo.scale(1.2, 0.85, 0.7);
    const pandaSnout = new THREE.Mesh(pandaSnoutGeo, shellMaterial);
    pandaSnout.position.set(0, -0.16, 0.82);
    pandaGroup.add(pandaSnout);

    const pandaNoseGeo = new THREE.SphereGeometry(0.065, 16, 16);
    pandaNoseGeo.scale(1.2, 0.8, 0.8);
    const pandaNose = new THREE.Mesh(pandaNoseGeo, darkAccentMaterial);
    pandaNose.position.set(0, -0.12, 0.95);
    pandaGroup.add(pandaNose);

    // Panda Shoulder Black Collar Band
    const pandaCollarGeo = new THREE.TorusGeometry(0.65, 0.1, 16, 32);
    pandaCollarGeo.rotateX(Math.PI * 0.5);
    const pandaCollar = new THREE.Mesh(pandaCollarGeo, darkAccentMaterial);
    pandaCollar.position.set(0, -0.65, 0);
    mascotRoot.add(pandaCollar);
    pandaCollar.visible = false;

    // =========================================================================
    // CHARACTER 3: CYBER PUP GROUP
    // =========================================================================
    const pupGroup = new THREE.Group();
    pupGroup.visible = false;
    headGroup.add(pupGroup);

    // Pup Floppy Drooping Ears (Hang gracefully down head sides)
    const pupEarGeo = new THREE.SphereGeometry(0.22, 20, 20);
    pupEarGeo.scale(0.65, 1.8, 0.45);

    const leftPupEar = new THREE.Mesh(pupEarGeo, shellMaterial);
    leftPupEar.position.set(-0.84, 0.16, 0.05);
    leftPupEar.rotation.z = 0.32;
    leftPupEar.rotation.x = 0.15;
    pupGroup.add(leftPupEar);

    const rightPupEar = new THREE.Mesh(pupEarGeo, shellMaterial);
    rightPupEar.position.set(0.84, 0.16, 0.05);
    rightPupEar.rotation.z = -0.32;
    rightPupEar.rotation.x = 0.15;
    pupGroup.add(rightPupEar);

    // Pup Snout, Shiny Nose, and Tongue
    const pupSnoutGeo = new THREE.SphereGeometry(0.22, 20, 20);
    pupSnoutGeo.scale(1.15, 0.92, 1.05);
    const pupSnout = new THREE.Mesh(pupSnoutGeo, shellMaterial);
    pupSnout.position.set(0, -0.15, 0.8);
    pupGroup.add(pupSnout);

    const pupNoseGeo = new THREE.SphereGeometry(0.08, 16, 16);
    pupNoseGeo.scale(1.1, 0.9, 0.8);
    const pupNose = new THREE.Mesh(pupNoseGeo, darkAccentMaterial);
    pupNose.position.set(0, -0.09, 0.98);
    pupGroup.add(pupNose);

    const pupTongueGeo = new THREE.SphereGeometry(0.06, 12, 12);
    pupTongueGeo.scale(0.9, 0.5, 1.2);
    const pupTongue = new THREE.Mesh(pupTongueGeo, pinkMaterial);
    pupTongue.position.set(0, -0.22, 0.92);
    pupGroup.add(pupTongue);

    // Wagging Puppy Tail
    const pupTailGroup = new THREE.Group();
    pupTailGroup.position.set(0, -0.72, -0.65);
    const pupTailGeo = new THREE.CylinderGeometry(0.045, 0.03, 0.35, 12);
    pupTailGeo.rotateX(-Math.PI * 0.35);
    const pupTailMesh = new THREE.Mesh(pupTailGeo, shellMaterial);
    pupTailGroup.add(pupTailMesh);
    mascotRoot.add(pupTailGroup);
    pupTailGroup.visible = false;

    // =========================================================================
    // CHARACTER 4: CYBER KITTY GROUP
    // =========================================================================
    const kittyGroup = new THREE.Group();
    kittyGroup.visible = false;
    headGroup.add(kittyGroup);

    // Kitty Pointed Triangular Ears with Soft Pink Inner Pads
    const catEarOuterGeo = new THREE.ConeGeometry(0.26, 0.46, 16);
    catEarOuterGeo.scale(1, 1, 0.5);

    const catEarInnerGeo = new THREE.ConeGeometry(0.18, 0.34, 16);
    catEarInnerGeo.scale(0.9, 0.9, 0.35);

    const leftCatEar = new THREE.Group();
    leftCatEar.position.set(-0.62, 0.88, 0.05);
    leftCatEar.rotation.z = 0.34;
    leftCatEar.rotation.x = -0.1;
    leftCatEar.add(new THREE.Mesh(catEarOuterGeo, shellMaterial));
    const leftInnerMesh = new THREE.Mesh(catEarInnerGeo, pinkMaterial);
    leftInnerMesh.position.set(0, -0.02, 0.06);
    leftCatEar.add(leftInnerMesh);
    kittyGroup.add(leftCatEar);

    const rightCatEar = new THREE.Group();
    rightCatEar.position.set(0.62, 0.88, 0.05);
    rightCatEar.rotation.z = -0.34;
    rightCatEar.rotation.x = -0.1;
    rightCatEar.add(new THREE.Mesh(catEarOuterGeo, shellMaterial));
    const rightInnerMesh = new THREE.Mesh(catEarInnerGeo, pinkMaterial);
    rightInnerMesh.position.set(0, -0.02, 0.06);
    rightCatEar.add(rightInnerMesh);
    kittyGroup.add(rightCatEar);

    // Kitty Small Pink Nose & Muzzle
    const catNoseGeo = new THREE.SphereGeometry(0.05, 16, 16);
    catNoseGeo.scale(1.1, 0.8, 0.8);
    const catNose = new THREE.Mesh(catNoseGeo, pinkMaterial);
    catNose.position.set(0, -0.11, 0.88);
    kittyGroup.add(catNose);

    // Whisker Studs
    const whiskerGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.28, 8);
    whiskerGeo.rotateZ(Math.PI * 0.5);

    const leftWhiskerTop = new THREE.Mesh(whiskerGeo, chromeMaterial);
    leftWhiskerTop.position.set(-0.32, -0.1, 0.84);
    leftWhiskerTop.rotation.y = -0.15;
    kittyGroup.add(leftWhiskerTop);

    const rightWhiskerTop = new THREE.Mesh(whiskerGeo, chromeMaterial);
    rightWhiskerTop.position.set(0.32, -0.1, 0.84);
    rightWhiskerTop.rotation.y = 0.15;
    kittyGroup.add(rightWhiskerTop);

    // =========================================================================
    // DIGITAL GLOWING LED EYES SYSTEM (Shared Across All Characters)
    // =========================================================================
    const eyesContainer = new THREE.Group();
    eyesContainer.position.set(0, 0.03, 0.87);
    headGroup.add(eyesContainer);

    // Left Eye
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.28, 0, 0);
    eyesContainer.add(leftEyeGroup);

    // Right Eye
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.28, 0, 0);
    eyesContainer.add(rightEyeGroup);

    // Eye Geometry 1: Normal Concentric LED Rings + Center Pupil
    const eyeRingGeo = new THREE.TorusGeometry(0.11, 0.028, 16, 32);
    const eyePupilGeo = new THREE.SphereGeometry(0.07, 16, 16);

    const leftEyeRing = new THREE.Mesh(eyeRingGeo, ledEyeMaterial);
    const leftEyePupil = new THREE.Mesh(eyePupilGeo, ledPupilMaterial);
    leftEyeGroup.add(leftEyeRing);
    leftEyeGroup.add(leftEyePupil);

    const rightEyeRing = new THREE.Mesh(eyeRingGeo, ledEyeMaterial);
    const rightEyePupil = new THREE.Mesh(eyePupilGeo, ledPupilMaterial);
    rightEyeGroup.add(rightEyeRing);
    rightEyeGroup.add(rightEyePupil);

    // Eye Geometry 2: Happy Glowing LED Arcs (^ ^)
    const happyArcCurve = new THREE.EllipseCurve(0, 0, 0.11, 0.08, Math.PI * 0.15, Math.PI * 0.85, false);
    const happyArcPoints = happyArcCurve.getPoints(24);
    const happyArcGeo = new THREE.BufferGeometry().setFromPoints(happyArcPoints.map((p) => new THREE.Vector3(p.x, p.y, 0)));
    const happyArcMat = new THREE.LineBasicMaterial({ color: ledCyan, linewidth: 3 });

    const leftHappyArc = new THREE.Line(happyArcGeo, happyArcMat);
    leftHappyArc.visible = false;
    leftEyeGroup.add(leftHappyArc);

    const rightHappyArc = new THREE.Line(happyArcGeo, happyArcMat);
    rightHappyArc.visible = false;
    rightEyeGroup.add(rightHappyArc);

    // Eye Geometry 3: Sad / Sorrowful Droop Arcs (v v)
    const sadArcCurve = new THREE.EllipseCurve(0, 0, 0.11, 0.07, Math.PI * 1.15, Math.PI * 1.85, false);
    const sadArcPoints = sadArcCurve.getPoints(24);
    const sadArcGeo = new THREE.BufferGeometry().setFromPoints(sadArcPoints.map((p) => new THREE.Vector3(p.x, p.y, 0)));
    const sadArcMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 3 });

    const leftSadArc = new THREE.Line(sadArcGeo, sadArcMat);
    leftSadArc.visible = false;
    leftEyeGroup.add(leftSadArc);

    const rightSadArc = new THREE.Line(sadArcGeo, sadArcMat);
    rightSadArc.visible = false;
    rightEyeGroup.add(rightSadArc);

    // =========================================================================
    // FLOATING MAGNETIC HANDS / PAWS
    // =========================================================================
    const handGeo = new THREE.SphereGeometry(0.18, 20, 20);
    handGeo.scale(1, 0.75, 1.15);

    const leftHand = new THREE.Group();
    leftHand.position.set(-0.75, -0.45, 0.45);
    const leftHandMesh = new THREE.Mesh(handGeo, shellMaterial);
    leftHand.add(leftHandMesh);
    const leftHandGlow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), ledEyeMaterial);
    leftHandGlow.position.set(0, 0, 0.12);
    leftHand.add(leftHandGlow);
    mascotRoot.add(leftHand);

    const rightHand = new THREE.Group();
    rightHand.position.set(0.75, -0.45, 0.45);
    const rightHandMesh = new THREE.Mesh(handGeo, shellMaterial);
    rightHand.add(rightHandMesh);
    const rightHandGlow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), ledEyeMaterial);
    rightHandGlow.position.set(0, 0, 0.12);
    rightHand.add(rightHandGlow);
    mascotRoot.add(rightHand);

    // --- Pointer / Cursor Coordinates Tracking ---
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      // Normalize cursor across full window [-1, 1]
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // --- Animation Kinematics Engine ---
    let animId;
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let blinkScale = 1.0;

    const current = {
      headRotX: 0,
      headRotY: 0,
      headRotZ: 0,
      headY: 0.22,
      eyeX: 0,
      eyeY: 0,
      eyeScaleY: 1.0,
      mascotBounceY: 0,
      leftHandX: -0.75,
      rightHandX: 0.75,
      leftHandY: -0.45,
      rightHandY: -0.45,
      leftHandZ: 0.45,
      rightHandZ: 0.45,
    };

    const target = { ...current };

    // --- Render Loop ---
    const render = () => {
      animId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const { mascotState: state, character: char, theme: curTheme } = stateRef.current;

      // Update Theme Shell Color
      const activeIsDark = curTheme === 'dark';
      shellMaterial.color.setHex(activeIsDark ? 0x0f172a : 0xf8fafc);

      // Character visibility switching
      const isAstro = char === 'astro_bot';
      const isPanda = char === 'panda';
      const isPup = char === 'pup';
      const isKitty = char === 'kitty';

      astroGroup.visible = isAstro;
      collarMesh.visible = isAstro;

      pandaGroup.visible = isPanda;
      pandaCollar.visible = isPanda;

      pupGroup.visible = isPup;
      pupTailGroup.visible = isPup;
      if (isPup) {
        // Wag puppy tail smoothly
        pupTailGroup.rotation.y = Math.sin(time * 8) * 0.45;
      }

      kittyGroup.visible = isKitty;

      // Smooth pointer tracking interpolation
      const pointerLerp = Math.min(delta * 5.0, 0.2);
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * pointerLerp;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * pointerLerp;

      // Natural Anti-Gravity Floating Oscillation
      const hover = Math.sin(time * 2.5) * 0.04;
      target.mascotBounceY = hover;
      thrusterCone.scale.y = 1.0 + Math.sin(time * 12) * 0.15;

      // Digital Blink
      blinkTimer += delta;
      if (blinkTimer > 3.5 + Math.sin(time) * 1.5) {
        isBlinking = true;
        blinkTimer = 0;
      }
      if (isBlinking) {
        blinkScale -= delta * 14;
        if (blinkScale <= 0.05) {
          blinkScale = 0.05;
          isBlinking = false;
        }
      } else if (blinkScale < 1.0) {
        blinkScale = Math.min(blinkScale + delta * 12, 1.0);
      }

      // Eye shapes visibility flags
      let showHappyArc = false;
      let showSadArc = false;

      // --- REVERSED Gaze & Emotional Reaction Behavior ---
      switch (state) {
        case 'typing_username': {
          // REVERSED: USERNAME FOCUS -> MASCOT LOOKS AWAY!
          // Turns head up and sharply sideways whistling innocently away from input
          target.headRotX = -0.32; // looks up at ceiling
          target.headRotY = 0.85; // turns head away to the right!
          target.headRotZ = 0.14;
          target.headY = 0.26;

          // Eyes dart away into top corner
          target.eyeX = 0.08;
          target.eyeY = 0.08;
          target.eyeScaleY = 0.9;

          // Paws raised innocently
          target.leftHandY = -0.22;
          target.rightHandY = -0.28;
          target.leftHandZ = 0.62;
          target.rightHandZ = 0.55;
          target.leftHandX = -0.48;
          target.rightHandX = 0.52;
          break;
        }

        case 'typing_password': {
          // REVERSED: PASSWORD FOCUS -> MASCOT STARES INTENTLY AT SCREEN!
          // Leans right forward against the screen, eyes wide open locked on user!
          target.headRotX = 0.26; // leaning forward
          target.headRotY = pointerCurrent.x * 0.15; // tracks user subtly while staring
          target.headRotZ = 0.0;
          target.headY = 0.28;
          target.mascotBounceY = 0.12; // leaning close to glass

          // Wide alert eyes locked directly on screen
          target.eyeX = pointerCurrent.x * 0.04;
          target.eyeY = -0.04;
          target.eyeScaleY = 1.25; // wide alert unblinking eyes

          // Paws poised forward on desk
          target.leftHandY = -0.35;
          target.rightHandY = -0.35;
          target.leftHandZ = 0.68;
          target.rightHandZ = 0.68;
          target.leftHandX = -0.52;
          target.rightHandX = 0.52;
          break;
        }

        case 'curious': {
          // SUBMITTING: CURIOUS & SUSPENSEFUL
          target.headRotX = 0.18;
          target.headRotY = -0.05;
          target.headRotZ = -0.25; // quizzical cocked head tilt
          target.headY = 0.28;
          target.mascotBounceY = 0.14;

          target.eyeX = 0.0;
          target.eyeY = 0.02;
          target.eyeScaleY = 1.15;

          target.leftHandY = -0.22;
          target.rightHandY = -0.25;
          target.leftHandZ = 0.65;
          target.rightHandZ = 0.65;
          break;
        }

        case 'happy': {
          // SUCCESS: JOYFUL CELEBRATION BOUNCE!
          const jump = Math.abs(Math.sin(time * 7)) * 0.35;
          target.mascotBounceY = jump;
          target.headRotX = -0.1 + Math.sin(time * 7) * 0.08;
          target.headRotY = Math.sin(time * 4) * 0.18;
          target.headRotZ = Math.sin(time * 5) * 0.1;
          target.headY = 0.28;

          showHappyArc = true; // Switch to happy glowing arcs (^ ^)
          target.eyeX = 0;
          target.eyeY = 0.02;

          // Hands throw up in the air cheering!
          target.leftHandY = 0.38 + Math.sin(time * 7) * 0.14;
          target.rightHandY = 0.38 - Math.sin(time * 7) * 0.14;
          target.leftHandX = -0.78;
          target.rightHandX = 0.78;
          target.leftHandZ = 0.45;
          target.rightHandZ = 0.45;
          break;
        }

        case 'sad': {
          // FAILURE: DROOPED HEAD & SORROWFUL GAZE
          target.headRotX = 0.42; // drooped downward
          target.headRotY = -0.06;
          target.headRotZ = 0.08;
          target.headY = 0.08;
          target.mascotBounceY = -0.08;

          showSadArc = true; // Switch to sad droop arcs (v v)
          target.eyeX = 0;
          target.eyeY = -0.06;
          target.eyeScaleY = 0.6;

          // Hands hang limp
          target.leftHandY = -0.65;
          target.rightHandY = -0.65;
          target.leftHandZ = 0.4;
          target.rightHandZ = 0.4;
          break;
        }

        case 'idle':
        default: {
          // IDLE: DYNAMICALLY TRACKS USER CURSOR / POINTER ACROSS SCREEN!
          target.headRotY = pointerCurrent.x * 0.48; // yaw follows cursor left/right
          target.headRotX = -pointerCurrent.y * 0.36; // pitch follows cursor up/down
          target.headRotZ = pointerCurrent.x * 0.06;
          target.headY = 0.22 + hover;

          target.eyeX = pointerCurrent.x * 0.09;
          target.eyeY = pointerCurrent.y * 0.08;
          target.eyeScaleY = blinkScale;

          target.leftHandY = -0.45 + hover;
          target.rightHandY = -0.45 + hover;
          target.leftHandZ = 0.45;
          target.rightHandZ = 0.45;
          target.leftHandX = -0.75;
          target.rightHandX = 0.75;
          break;
        }
      }

      // Smooth Lerping
      const lerpFactor = Math.min(delta * 9.0, 0.28);
      current.headRotX += (target.headRotX - current.headRotX) * lerpFactor;
      current.headRotY += (target.headRotY - current.headRotY) * lerpFactor;
      current.headRotZ += (target.headRotZ - current.headRotZ) * lerpFactor;
      current.headY += (target.headY - current.headY) * lerpFactor;
      current.eyeX += (target.eyeX - current.eyeX) * lerpFactor;
      current.eyeY += (target.eyeY - current.eyeY) * lerpFactor;
      current.eyeScaleY += (target.eyeScaleY - current.eyeScaleY) * lerpFactor;
      current.mascotBounceY += (target.mascotBounceY - current.mascotBounceY) * (lerpFactor * 1.5);

      current.leftHandX += (target.leftHandX - current.leftHandX) * lerpFactor;
      current.rightHandX += (target.rightHandX - current.rightHandX) * lerpFactor;
      current.leftHandY += (target.leftHandY - current.leftHandY) * lerpFactor;
      current.rightHandY += (target.rightHandY - current.rightHandY) * lerpFactor;
      current.leftHandZ += (target.leftHandZ - current.leftHandZ) * lerpFactor;
      current.rightHandZ += (target.rightHandZ - current.rightHandZ) * lerpFactor;

      // Apply Transforms
      mascotRoot.position.y = current.mascotBounceY;

      headGroup.rotation.x = current.headRotX;
      headGroup.rotation.y = current.headRotY;
      headGroup.rotation.z = current.headRotZ;
      headGroup.position.y = current.headY;

      // Digital Eyes Tracking & Morphing
      leftEyeGroup.position.x = -0.28 + current.eyeX;
      leftEyeGroup.position.y = current.eyeY;
      rightEyeGroup.position.x = 0.28 + current.eyeX;
      rightEyeGroup.position.y = current.eyeY;

      if (showHappyArc) {
        leftEyeRing.visible = false;
        leftEyePupil.visible = false;
        rightEyeRing.visible = false;
        rightEyePupil.visible = false;
        leftSadArc.visible = false;
        rightSadArc.visible = false;
        leftHappyArc.visible = true;
        rightHappyArc.visible = true;
      } else if (showSadArc) {
        leftEyeRing.visible = false;
        leftEyePupil.visible = false;
        rightEyeRing.visible = false;
        rightEyePupil.visible = false;
        leftHappyArc.visible = false;
        rightHappyArc.visible = false;
        leftSadArc.visible = true;
        rightSadArc.visible = true;
      } else {
        leftEyeRing.visible = true;
        leftEyePupil.visible = true;
        rightEyeRing.visible = true;
        rightEyePupil.visible = true;
        leftHappyArc.visible = false;
        rightHappyArc.visible = false;
        leftSadArc.visible = false;
        rightSadArc.visible = false;

        leftEyeGroup.scale.set(1.0, current.eyeScaleY, 1.0);
        rightEyeGroup.scale.set(1.0, current.eyeScaleY, 1.0);
      }

      // Hands
      leftHand.position.set(current.leftHandX, current.leftHandY, current.leftHandZ);
      rightHand.position.set(current.rightHandX, current.rightHandY, current.rightHandZ);

      renderer.render(scene, camera);
    };

    render();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeo.dispose();
      headGeo.dispose();
      visorGeo.dispose();
      visorBackingGeo.dispose();
      shellMaterial.dispose();
      visorGlassMaterial.dispose();
      visorBackingMaterial.dispose();
      ledEyeMaterial.dispose();
      ledPupilMaterial.dispose();
      darkAccentMaterial.dispose();
      pinkMaterial.dispose();
      cyberBlueMaterial.dispose();
      chromeMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`mascot-canvas-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
      aria-label="Interactive 3D Astro Bot reacting to your pointer and input"
      role="img"
    />
  );
}
