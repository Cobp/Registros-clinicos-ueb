declare module "three" {
  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }

  export class Color {
    constructor(color: string | number);
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: {
      setScalar(value: number): void;
      multiplyScalar(value: number): void;
    };
    add(...objects: Object3D[]): void;
    traverse(callback: (object: Object3D) => void): void;
  }

  export class Scene extends Object3D {
    background: Color | null;
  }

  export class PerspectiveCamera extends Object3D {
    aspect: number;
    constructor(
      fov?: number,
      aspect?: number,
      near?: number,
      far?: number,
    );
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    domElement: HTMLCanvasElement;
    constructor(parameters?: { antialias?: boolean; alpha?: boolean });
    setPixelRatio(value: number): void;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }

  export class Box3 {
    constructor();
    setFromObject(object: Object3D): this;
    getSize(target: Vector3): Vector3;
    getCenter(target: Vector3): Vector3;
  }

  export class Group extends Object3D {}

  export class DirectionalLight extends Object3D {
    constructor(color?: string | number, intensity?: number);
  }

  export class AmbientLight extends Object3D {
    constructor(color?: string | number, intensity?: number);
  }

  export class Mesh extends Object3D {
    constructor(geometry?: BoxGeometry, material?: MeshStandardMaterial | MeshStandardMaterial[]);
    geometry: { dispose(): void };
    material: { dispose(): void } | { dispose(): void }[];
  }

  export class BoxGeometry {
    constructor(width?: number, height?: number, depth?: number);
    dispose(): void;
  }

  export class MeshStandardMaterial {
    constructor(parameters?: Record<string, unknown>);
    dispose(): void;
  }

  export const MathUtils: {
    clamp(value: number, min: number, max: number): number;
  };
}

declare module "three/addons/controls/OrbitControls.js" {
  import type { PerspectiveCamera, Vector3 } from "three";

  export class OrbitControls {
    constructor(camera: PerspectiveCamera, domElement: HTMLCanvasElement);
    enableRotate: boolean;
    enablePan: boolean;
    enableZoom: boolean;
    minDistance: number;
    maxDistance: number;
    target: Vector3;
    update(): void;
    dispose(): void;
  }
}

declare module "three/addons/loaders/GLTFLoader.js" {
  import type { Object3D } from "three";

  export interface GLTF {
    scene: Object3D;
  }

  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (error: unknown) => void,
    ): void;
  }
}