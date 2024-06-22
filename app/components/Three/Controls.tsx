import React from "react";
import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, ThreeEvent } from "@react-three/fiber";

extend({ OrbitControls });

interface ControlsProps {
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  enableRotate?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  rotateSpeed?: number;
  zoomSpeed?: number;
  panSpeed?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  minDistance?: number;
  maxDistance?: number;
  screenSpacePanning?: boolean;
  keyPanSpeed?: number;
  mouseButtons?: {
    LEFT?: number;
    MIDDLE?: number;
    RIGHT?: number;
  };
  touchRotateSpeed?: number;
  touchZoomSpeed?: number;
  touchPanSpeed?: number;
  enableKeys?: boolean;
  keys?: {
    LEFT?: number;
    UP?: number;
    RIGHT?: number;
    BOTTOM?: number;
  };
  enablePanOnMobile?: boolean;
  minZoom?: number;
  maxZoom?: number;
  minPan?: number;
  maxPan?: number;
  enableRotateOnMobile?: boolean;
  rotateOnMouseWheel?: boolean;
  rotateOnMouseDown?: boolean;
  rotateOnMouseUp?: boolean;
  rotateOnTouch?: boolean;
  dampingFactorRotate?: number;
  dampingFactorZoom?: number;
  dampingFactorPan?: number;
  mouseUpHandler?: (event: ThreeEvent<MouseEvent>) => void;
  mouseDownHandler?: (event: ThreeEvent<MouseEvent>) => void;
  mouseMoveHandler?: (event: ThreeEvent<MouseEvent>) => void;
  mouseWheelHandler?: (event: ThreeEvent<WheelEvent>) => void;
  contextMenuHandler?: (event: ThreeEvent<PointerEvent>) => void;
  touchStartHandler?: (event: ThreeEvent<TouchEvent>) => void;
  touchEndHandler?: (event: ThreeEvent<TouchEvent>) => void;
  touchMoveHandler?: (event: ThreeEvent<TouchEvent>) => void;
  changeHandler?: () => void;
  startHandler?: () => void;
  endHandler?: () => void;
  disposeHandler?: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  enableDamping = true,
  dampingFactor = 0.1,
  enableZoom = true,
  enableRotate = true,
  enablePan = true,
  autoRotate = false,
  autoRotateSpeed = 2.0,
  rotateSpeed = 0.8,
  zoomSpeed = 1.2,
  panSpeed = 0.8,
  minPolarAngle = 0,
  maxPolarAngle = Math.PI,
  minAzimuthAngle = -Infinity,
  maxAzimuthAngle = Infinity,
  minDistance = 0,
  maxDistance = Infinity,
  screenSpacePanning = true,
  keyPanSpeed = 7.0,
  mouseButtons = { LEFT: 0, MIDDLE: 1, RIGHT: 2 },
  touchRotateSpeed = 1.0,
  touchZoomSpeed = 1.2,
  touchPanSpeed = 0.8,
  enableKeys = true,
  keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 },
  enablePanOnMobile = true,
  minZoom = 0,
  maxZoom = Infinity,
  minPan = -Infinity,
  maxPan = Infinity,
  enableRotateOnMobile = true,
  rotateOnMouseWheel = true,
  rotateOnMouseDown = false,
  rotateOnMouseUp = false,
  rotateOnTouch = false,
  dampingFactorRotate = 0.25,
  dampingFactorZoom = 0.25,
  dampingFactorPan = 0.25,
  mouseUpHandler,
  mouseDownHandler,
  mouseMoveHandler,
  mouseWheelHandler,
  contextMenuHandler,
  touchStartHandler,
  touchEndHandler,
  touchMoveHandler,
  changeHandler,
  startHandler,
  endHandler,
  disposeHandler,
}) => {
  const { camera, gl } = useThree();
  const controlsRef = React.useRef<OrbitControls>();

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  React.useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;

    controls.enableDamping = enableDamping;
    controls.dampingFactor = dampingFactor;
    controls.enableZoom = enableZoom;
    controls.enableRotate = enableRotate;
    controls.enablePan = enablePan;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.rotateSpeed = rotateSpeed;
    controls.zoomSpeed = zoomSpeed;
    controls.panSpeed = panSpeed;
    controls.minPolarAngle = minPolarAngle;
    controls.maxPolarAngle = maxPolarAngle;
    controls.minAzimuthAngle = minAzimuthAngle;
    controls.maxAzimuthAngle = maxAzimuthAngle;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;
    controls.screenSpacePanning = screenSpacePanning;
    controls.keyPanSpeed = keyPanSpeed;
    controls.mouseButtons = mouseButtons;

    if (changeHandler) controls.addEventListener("change", changeHandler);
    if (startHandler) controls.addEventListener("start", startHandler);
    if (endHandler) controls.addEventListener("end", endHandler);
    if (disposeHandler) controls.addEventListener("dispose", disposeHandler);

    return () => {
      controls.dispose();
    };
  }, [
    camera,
    gl.domElement,
    enableDamping,
    dampingFactor,
    enableZoom,
    enableRotate,
    enablePan,
    autoRotate,
    autoRotateSpeed,
    rotateSpeed,
    zoomSpeed,
    panSpeed,
    minPolarAngle,
    maxPolarAngle,
    minAzimuthAngle,
    maxAzimuthAngle,
    minDistance,
    maxDistance,
    screenSpacePanning,
    keyPanSpeed,
    mouseButtons,
    touchRotateSpeed,
    touchZoomSpeed,
    touchPanSpeed,
    enableKeys,
    keys,
    enablePanOnMobile,
    minZoom,
    maxZoom,
    minPan,
    maxPan,
    enableRotateOnMobile,
    rotateOnMouseWheel,
    rotateOnMouseDown,
    rotateOnMouseUp,
    rotateOnTouch,
    dampingFactorRotate,
    dampingFactorZoom,
    dampingFactorPan,
    mouseUpHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseWheelHandler,
    contextMenuHandler,
    touchStartHandler,
    touchEndHandler,
    touchMoveHandler,
    changeHandler,
    startHandler,
    endHandler,
    disposeHandler,
  ]);

  return null;
};

export default Controls;
