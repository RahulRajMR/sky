

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as $ from 'jquery'



let scene, camera, renderer;



function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(0,0,-900);


  

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const orbitControl = new OrbitControls( camera, renderer.domElement );
  // let controls = new THREE.OrbitControls(camera);
   orbitControl.addEventListener('change', renderer);
   orbitControl.minDistance = 500;
   orbitControl.maxDistance = 1500;
  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( 'arid2_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'arid2_bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'arid2_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'arid2_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'arid2_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'arid2_lf.jpg');

    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));



//video

const video = document.getElementById( 'video' );
const texture = new THREE.VideoTexture( video );
// const geometry = new THREE.PlaneGeometry(0.87, 0.55, 0.01);
 const geometry = new THREE.PlaneGeometry(6, 4);
const material = new THREE.MeshBasicMaterial({ map: texture , side:2});




const mesh = new THREE.Mesh(geometry,material);
mesh.scale.multiplyScalar(30);
console.log(mesh);
// mesh.rotation.set(0,-1.57,0);
mesh.position.set(0,0,-10);
mesh.scale.multiplyScalar(2);
// mesh.setSize(12);
scene.add(mesh);




const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 + 0.4;




  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray, );


 
  scene.add( skybox );  

 

  animate();
}
function animate() {
  // controls.autoRotate = autoRotate;
  
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


init();


  
  





  







    



    


 

