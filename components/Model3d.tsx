"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function ThreeScene() {
  // Referencia al contenedor HTML donde se insertara el canvas WebGL.
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Obtenemos el nodo real del DOM para montar la escena.
    const mount = mountRef.current;

    // Si el contenedor aun no existe, no podemos inicializar Three.js.
    if (!mount) {
      return;
    }

    // Escena principal donde viven camara, luces y modelo.
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fcf7f4");

    // Camara en perspectiva con FOV 60 y planos cercano/lejanos 0.1/100.
    const camera = new THREE.PerspectiveCamera(
      35,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    // Posicion inicial de la camara: un poco elevada y separada del origen.
    camera.position.set(0, 0, 0);

    // Renderer WebGL que dibuja la escena en un canvas.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Limitamos pixel ratio para equilibrar nitidez y rendimiento.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Ajustamos el canvas al tamano actual del contenedor.
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // Insertamos el canvas generado por Three.js dentro del div React.
    mount.appendChild(renderer.domElement);

    // Controles de camara para permitir zoom e impedir rotacion/pan.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    // Limites de distancia para el zoom.
    controls.minDistance = 2.5;
    controls.maxDistance = 6;
    // Punto al que mira la camara.
    controls.target.set(0, 0, 0);
    controls.update();

    // Cargador para archivos .glb/.gltf.
    const loader = new GLTFLoader();
    // Grupo contenedor del modelo para poder gestionarlo facilmente.
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Luz principal direccional (simula una fuente fuerte frontal/lateral).
    const light = new THREE.DirectionalLight("#ffffff", 2.2);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Luz ambiental suave para evitar sombras completamente oscuras.
    const ambientLight = new THREE.AmbientLight("#7c3aed", 0.9);
    scene.add(ambientLight);

    // Luz de relleno para mejorar volumen visual del modelo.
    const fillLight = new THREE.DirectionalLight("#8be9fd", 1.2);
    fillLight.position.set(-2, 1, 3);
    scene.add(fillLight);

    // IDs y referencias para limpiar recursos al desmontar.
    let frameId = 0;
    let modelRoot: THREE.Object3D | null = null;
    let resizeObserver: ResizeObserver | null = null;

    // Recalcula camara y renderer cuando cambia el tamano del contenedor.
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Listener global de resize de ventana.
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    // Observer para resize por cambios de layout (no solo de ventana).
    resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(mount);

    // Carga del modelo 3D desde /public.
    loader.load(
      "/boca_para_ortodoncia.glb",
      (gltf: GLTF) => {
        // Escena raiz del archivo GLB.
        modelRoot = gltf.scene;

        // Bounding box para calcular tamano y centro reales del modelo.
        const box = new THREE.Box3().setFromObject(modelRoot);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = maxDimension > 0 ? 2.4 / maxDimension : 1;

        modelRoot.scale.setScalar(scale);
        modelRoot.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale
        );
        modelRoot.rotation.set(0, 0, 0);
        modelGroup.add(modelRoot);

        // Reajuste de camara y limites de zoom segun el tamano final del modelo.
        controls.target.set(0, 0, 0);
        camera.position.set(0, 0.2, Math.max(4.5, maxDimension * scale * 1.9));
        controls.minDistance = Math.max(1.8, maxDimension * scale * 0.9);
        controls.maxDistance = Math.max(4, maxDimension * scale * 2.4);
        controls.update();
      },
      undefined,
      () => {
        // Si falla la carga, mostramos un cubo de respaldo para no dejar la escena vacia.
        const fallbackGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const fallbackMaterial = new THREE.MeshStandardMaterial({
          color: "#7dd3fc",
          metalness: 0.25,
          roughness: 0.35,
        });
        const fallbackCube = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        modelGroup.add(fallbackCube);
      },
    );

    // Bucle de renderizado continuo.
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      if (modelRoot) {
        // Limita desplazamiento horizontal del modelo (seguridad visual).
        modelRoot.position.x = THREE.MathUtils.clamp(
          modelRoot.position.x,
          -0.5,
          0.5,
        );
      }
      renderer.render(scene, camera);
    };

    // Sincroniza dimensiones iniciales y arranca el render loop.
    resize();
    animate();

    // Cleanup total al desmontar el componente.
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      controls.dispose();
      // Liberacion de geometrias y materiales para evitar fugas de memoria GPU.
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.dispose();
      // Quita el canvas del DOM si aun cuelga del contenedor.
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Contenedor full size del canvas de Three.js.
  return <div ref={mountRef} className="h-full w-full" />;
}

export default function Home() {
  // Layout principal que envuelve la escena 3D.
  return (
    <main className="min-h-screen w-full overflow-hidden text-white">
      <section className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-2xl shadow-cyan-950/30">
        <div className="absolute inset-0">
          <ThreeScene />
        </div>
      </section>
    </main>
  );
}
