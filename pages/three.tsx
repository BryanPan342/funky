import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { TweenMax as TM } from 'gsap';

import styles from '../styles/three.module.scss';

class Scene {
  private perspective: number;
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private stars: THREE.Object3D;
  private mouse: THREE.Vector2;

  constructor() {
    this.perspective = 800;
    this.canvas = document.getElementById(styles.scene) as HTMLCanvasElement;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x020F17, 50, 2000);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.initLights();
    this.initCamera();

    this.stars = new THREE.Object3D();
    this.scene.add(this.stars);

    this.mouse = new THREE.Vector2(0, 0);
    window.addEventListener('mousemove', ev => {
      this.mouseMove(ev);
    });

    this.generateStars(200);

    this.update();
  }

  protected initLights(): void {
    // const ambientlight = new THREE.AmbientLight(0x131313, 1.5);
    // this.scene.add(ambientlight);
    const hemiLights = new THREE.HemisphereLight(0x020F17, 0x133735, 1.5);
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    // Set the direction of the light  
    shadowLight.position.set(150, 350, 350);
    
    // Allow shadow casting 
    shadowLight.castShadow = true;
    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    // define the resolution of the shadow; the higher the better, 
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = window.innerWidth;
    shadowLight.shadow.mapSize.height = window.innerHeight;

    this.scene.add(hemiLights);
    this.scene.add(shadowLight);
  }

  private initCamera(): void {
    const rad2Degrees = (num: number): number => num * 180 / Math.PI; 
    const fov = rad2Degrees(2 * Math.atan(window.innerHeight / 2 / this.perspective));
    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, this.perspective);
  }

  private mouseMove(ev): void {
    TM.to(this.mouse, 0.5, {
      x: (ev.clientX / window.innerWidth) * 2 - 1,
      y: -(ev.clientY / window.innerHeight) * 2 + 1,
    });

    TM.to(this.stars.rotation, 0.5, {
      x: -this.mouse.y * .025,
      y: this.mouse.x * (Math.PI / 64),
    });
  }

  public update(): void {
    if (!this.renderer || !this.camera || !this.scene) return;
    requestAnimationFrame(this.update.bind(this));

    this.renderer.render(this.scene, this.camera);
  }

  private generateStars(num: number): void {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xc4c4c4 });
    let vertices = new Float32Array(num * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const positions = geometry.attributes.position.array;
    Array(num).fill(0).map((_, i) => {
      const star = new THREE.Vector3();
      star.x = THREE.MathUtils.randFloatSpread(2000);
      star.y = THREE.MathUtils.randFloatSpread(2000);
      star.z = THREE.MathUtils.randFloatSpread(2000);

      positions[i * 3] = star.x;
      positions[i * 3 + 1] = star.y;
      positions[i * 3 + 2] = star.z;
    });

    const mesh = new THREE.Points(geometry, material);
    this.stars.add(mesh);
  }
}

function Three(): JSX.Element {
  const scene = useRef(null);

  useEffect(() => {
    scene.current = new Scene();
  }, []);

  return (
    <div>
      <canvas id={styles.scene}/>
    </div>
  )
}

export default Three;