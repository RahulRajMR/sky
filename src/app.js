import * as $ from "jquery";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'



let scene, camera, renderer, INTERSECTED;

const totalGroup = new THREE.Group();

const meshArr = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const video = document.getElementById("video");
var lastRaycasterObject = null;

window.addEventListener("pointermove", onPointerMove);
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(meshArr)[0];

  if (intersects) {
    if (lastRaycasterObject === null) {
      lastRaycasterObject = intersects.object;
    }

    if (INTERSECTED != intersects.object) {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      } else {
        INTERSECTED = intersects.object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xff0000);
      }

      var pos2D = Get2DPos(
        INTERSECTED,
        window.innerWidth,
        window.innerHeight,
        camera
      );
      console.log("callled", INTERSECTED);
      console.log(pos2D);

      $("#tooltip").text(INTERSECTED.name);
      $("#tooltip").css({
        display: "block",
        opacity: 0.0,
      });
      $("#tooltip").css({ top: pos2D.y + "px", left: pos2D.x + "px" });
      $("#tooltip").css({ opacity: "1" });
      $("html,body").css("cursor", "pointer");
    }
  } else {
    if (INTERSECTED) {
      INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    }

    if (lastRaycasterObject) {
      lastRaycasterObject.material.color.setRGB(0.8, 0.8, 0.8);
    }

    $("#tooltip").css({
      display: "none",
    });
    $("html,body").css("cursor", "default");

    INTERSECTED = null;
  }

  
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 0, 1);


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(totalGroup);

  const orbitControl = new OrbitControls(camera, renderer.domElement);
  // let controls = new THREE.OrbitControls(camera);
  orbitControl.addEventListener("change", renderer);
  orbitControl.minDistance = 1;
  orbitControl.maxDistance = 20;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0); // x, y, z
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2 + 0.4;

  video.play();

  loadVedios();
  loadSkyBox();
  loadModels();
  animate();

}



function loadVedios() {
  const texture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(6, 4);
  const material = new THREE.MeshBasicMaterial({ map: texture, side: 2 });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(6, 7, 5);
  mesh.position.set(9, -1, -36);
  mesh.rotation.set(0, -0.09, 0);

  totalGroup.add(mesh);
}

function loadSkyBox() {
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load("arid2_ft.jpg");
  let texture_bk = new THREE.TextureLoader().load("arid2_bk.jpg");
  let texture_up = new THREE.TextureLoader().load("arid2_up.jpg");
  let texture_dn = new THREE.TextureLoader().load("arid2_dn.jpg");
  let texture_rt = new THREE.TextureLoader().load("arid2_rt.jpg");
  let texture_lf = new THREE.TextureLoader().load("arid2_lf.jpg");

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);

    scene.add(skybox);
  }
}

// click function

window.addEventListener("click", clickmove);

var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function clickmove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(meshArr)[0];

  // console.log(intersects.object.name, "----------");
  if (intersects) {
    if (lastRaycasterObject === null) {
      lastRaycasterObject = intersects.object;
    }

    setTimeout(() => {
      $(".modal h1").text(intersects.object.name);

      toggleModal();
      // $(".modal").css("display", "block");
    }, 10);

    // alert("clicked")
  } else {
    //  $(".modal").text("")
    $(".modal").css("display", "block");
  }
}
function loadModels() {
  const fbxLoader = new FBXLoader();
  fbxLoader.load("../src/floor.fbx", (object) => {
    totalGroup.add(object);

    // object.scale.set(0.1,0.1,0.)
    object.scale.set(10, 10, 10);
    object.position.set(-3, -10, -20);

    // scene.add(object)
  });

  fbxLoader.load(
    "../src/door1.fbx",

    (object1) => {
      // object.scale.set(0.1,0.1,0.)
      object1.scale.set(7, 10, 5);
      object1.position.set(-7, -10, -40);
      // object1.name = "door2";
      // scene.add(object1)
      meshArr.push(object1);
      totalGroup.add(object1);

      
    }
  );

  fbxLoader.load("../src/door2.fbx", (object2) => {
    // object.scale.set(0.1,0.1,0.)
    object2.scale.set(7, 10, 5);
    object2.position.set(-12, -10, -40);

    //  object2.material.color.set( Math.random() * 0xffffff );
    totalGroup.add(object2);
    //  scene.add(object2)
    meshArr.push(object2);
  });

  fbxLoader.load("../src/door3.fbx", (object3) => {
    // object.scale.set(0.1,0.1,0.)
    object3.scale.set(7, 10, 7);
    object3.position.set(7, -9, -39);
    object3.rotation.set(0, -0.08, 0);
    // object3.name = "door";
    // scene.add(object3)
    meshArr.push(object3);
    totalGroup.add(object3);

  });
}
function animate() {
  // controls.autoRotate = autoRotate;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//two dimensional position
function Get2DPos(obj, cWidth, cHeight, camera) {
  var vector = new THREE.Vector3();
  var widthHalf = 0.4* cWidth;
  var heightHalf = 0.4 * cHeight;


  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);
  vector.x = vector.x * widthHalf + widthHalf - 100;
  vector.y = -(vector.y * heightHalf) + heightHalf - 100;
  return { x: vector.x, y: vector.y };

}
init();
