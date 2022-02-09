import * as THREE from "three";
import autoBind from "auto-bind";

class EffectShell {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        autoBind(this);

        this.init();
    }

    init() {
        this.camera.position.z = 5;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        document.body.appendChild(this.renderer.domElement);

        this.addEventListeners();
        this.createMesh();
        this.render();
    }

    addEventListeners() {
        window.addEventListener("resize", this.onResize);
    }

    createMesh() {
        const geometry = new THREE.BoxGeometry(2, 2, 2, 20, 20, 20);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
            roughness: 0.2,
            metalness: 0.6,
        });
        this.mesh = new THREE.Mesh(geometry, material);

        const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
        light1.position.set(3, 3, 2);
        light2.position.set(-3, -3, -2);

        this.scene.add(this.mesh, light1, light2);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render);
    }
}

new EffectShell();
