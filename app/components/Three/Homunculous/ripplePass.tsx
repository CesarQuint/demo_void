"use client";
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import * as STDLIB from "three-stdlib";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import css from "../../css/home.module.css";
import { OrbitControls, useTexture, Plane } from "@react-three/drei";
import { TextureLoader } from "three";

import { EffectComposer, RenderPass, ShaderPass } from "three-stdlib";

extend({ EffectComposer, RenderPass, ShaderPass });

//! Ripple Class

class RippleRenderer {
  private _scene: THREE.Scene;
  private _target: THREE.WebGLRenderTarget;
  private _camera: THREE.OrthographicCamera;
  private _meshs: THREE.Mesh[] = [];
  /** 波紋の最大描画数 */
  private _max = 100;
  /** 1フレームでマウスがどれだけ移動したら描画するか */
  private _frequency = 5;
  /** マウス座標 */
  private _mouse = new THREE.Vector2(0, 0);
  /** 前のフレームでのマウス座標 */
  private _prevMouse = new THREE.Vector2(0, 0);
  /** 現在のフレームで描画された波紋のインデックス */
  private _currentWave = 0;

  /**
   * コンストラクタ
   * @param _texture 波紋のテクスチャー
   */
  constructor(private _texture: THREE.Texture) {
    this._scene = new THREE.Scene();
    this._target = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    // camera
    const { width, height, near, far } = this._cameraProps();
    this._camera = new THREE.OrthographicCamera(
      -width,
      width,
      height,
      -height,
      near,
      far
    );
    this._camera.position.set(0, 0, 2);
    // mesh
    this._createMesh();
    // events
    window.addEventListener("mousemove", this._handleMouseMove);
    window.addEventListener("resize", this._handleResize);
  }

  private _cameraProps = () => {
    const frustumSize = window.innerHeight;
    const aspect = window.innerWidth / window.innerHeight;
    const [w, h] = [(frustumSize * aspect) / 2, frustumSize / 2];
    return { width: w, height: h, near: -1000, far: 1000 };
  };

  private _createMesh = () => {
    const size = 64;
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    for (let i = 0; i < this._max; i++) {
      const mesh = new THREE.Mesh(geometry.clone(), material.clone());
      mesh.rotateZ(2 * Math.PI * Math.random());
      mesh.visible = false;
      this._scene.add(mesh);
      this._meshs.push(mesh);
    }
  };

  private _handleMouseMove = (e: MouseEvent) => {
    this._mouse.x = e.clientX - window.innerWidth / 2;
    this._mouse.y = window.innerHeight / 2 - e.clientY;

    console.table(this._mouse);
  };

  private _handleResize = () => {
    const { width, height } = this._cameraProps();
    this._camera.left = -width;
    this._camera.right = width;
    this._camera.top = height;
    this._camera.bottom = -height;
    this._camera.updateProjectionMatrix();
    this._target.setSize(window.innerWidth, window.innerHeight);
  };

  private _setNewWave = () => {
    const mesh = this._meshs[this._currentWave];
    mesh.visible = true;
    mesh.position.set(this._mouse.x, this._mouse.y, 0);
    mesh.scale.x = mesh.scale.y = 0.2;
    (mesh.material as THREE.MeshBasicMaterial).opacity = 0.5;
  };

  private _trackMousePos = () => {
    // 今のマウス座標と前回のフレームのマウス座標の距離
    const distance = this._mouse.distanceTo(this._prevMouse);
    if (this._frequency < distance) {
      this._setNewWave();
      this._currentWave = (this._currentWave + 1) % this._max;
      // console.log(this._currentWave)
    }
    this._prevMouse.x = this._mouse.x;
    this._prevMouse.y = this._mouse.y;
  };

  /**
   * 描画を更新する
   * @param gl メインレンダラー
   * @param uTexture 波紋の描画結果を格納するuniform
   */
  update = (gl: THREE.WebGLRenderer, uTexture: THREE.IUniform<any>) => {
    this._trackMousePos();

    gl.setRenderTarget(this._target);
    gl.render(this._scene, this._camera);
    uTexture.value = this._target.texture;
    gl.setRenderTarget(null);
    gl.clear();

    this._meshs.forEach((mesh) => {
      if (mesh.visible) {
        const material = mesh.material as THREE.MeshBasicMaterial;
        mesh.rotation.z += 0.02;
        material.opacity *= 0.97;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.17;
        mesh.scale.y = mesh.scale.x;
        if (material.opacity < 0.002) mesh.visible = false;
      }
    });
  };

  /**
   * インスタンスを破棄する
   */
  dispose = () => {
    window.removeEventListener("mousemove", this._handleMouseMove);
    window.removeEventListener("resize", this._handleResize);
  };
}

type RipplePassType = {
  enabled?: boolean;
};

export const RipplePass: React.FC<RipplePassType> = (props) => {
  const { enabled = true } = props;

  return (
    <Suspense fallback={null}>
      <Ripple enabled={enabled} />
    </Suspense>
  );
};

type RippleType = {
  enabled?: boolean;
};

const Ripple: React.FC<RippleType> = (props) => {
  const { enabled = true } = props;

  const shaderRef = useRef<ShaderPass>(null);

  const rippleTexture = useTexture(
    "https://raw.githubusercontent.com/nemutas/r3f-homunculus/main/public/assets/textures/brush.png"
  );

  const effect = useMemo(
    () => new RippleRenderer(rippleTexture),
    [rippleTexture]
  );

  const shader: THREE.ShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        u_displacement: { value: null },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }, [rippleTexture]);

  useEffect(() => {
    return () => effect.dispose();
  }, [effect]);

  useFrame(({ gl }) => {
    effect.update(gl, shaderRef.current!.uniforms.u_displacement);
  });

  return (
    <shaderPass
      ref={shaderRef}
      args={[shader]}
      enabled={true}
    />
  );
};
// --------------------------------------------------------
const vertexShader = `
    varying vec2 v_uv;

    void main() {
      v_uv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `;

// ========================================================

// Fragment Shader
const fragmentShader = `
  uniform float time;
  uniform vec2 mousePositions[10]; // Array to hold multiple mouse positions
  uniform float mouseTimes[10];    // Array to hold the times when the mouse positions were updated
  uniform sampler2D tMap;
  uniform float rippleStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = texture2D(tMap, uv).rgb;

    for (int i = 0; i < 10; i++) {
      float age = time - mouseTimes[i];
      if (age < 1.0) {
        float dist = distance(uv, mousePositions[i]);
        if (dist < 0.1) { // Limit the area affected by the ripple
          float ripple = sin(dist * 40.0 - time * 10.0) * 0.02 / dist; // Adjust ripple effect magnitude
          ripple *= exp(-dist * 20.0) * rippleStrength * (1.0 - age); // Ripple fades out over a smaller distance
          uv.y += ripple;
          
          // Chromatic Aberration offsets based on ripple strength
          float aberrationStrength = clamp(ripple * 0.5, 0.0, 0.01); // Adjust the factor for strength
          vec3 offset = vec3(aberrationStrength, -aberrationStrength, aberrationStrength * 2.0); // Adjust these values for the desired effect

          color.r = texture2D(tMap, uv + offset.r).r;
          color.g = texture2D(tMap, uv + offset.g).g;
          color.b = texture2D(tMap, uv + offset.b).b;
        }
      }
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
