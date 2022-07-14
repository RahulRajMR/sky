import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
 renderer.setSize(window.innerWidth,window.innerHeight);
 renderer.setClearColor(0xffffff,0);
  const fov = 75;
  const aspect = window.innerWidth/window.innerHeight;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 50;
  const controls = new OrbitControls(camera, renderer.domElement)

  const scene = new THREE.Scene();
  //scene.background = new THREE.Color(0xffffff);
const ambientLight=new THREE.AmbientLight(0xfffffff,0.6);

scene.add (ambientLight);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  


  
  const boxWidth = 10;
  const boxHeight = 10;
  const boxDepth = 10;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  cube.position.x=-15;
  cube.position.y=20;

  scene.add(cube);


  const innerRadius = 2;  // ui: innerRadius
  const outerRadius = 7;  // ui: outerRadius
  const thetaSegments = 18;  // ui: thetaSegments
  const circlegeometry = new THREE.RingGeometry(
      innerRadius, outerRadius, thetaSegments);

      const circlematerial = new THREE.MeshBasicMaterial({color:0x00ff00});  // greenish blue

  const circlecube = new THREE.Mesh(circlegeometry,circlematerial);

  circlecube.position.x =10;
  circlecube.position.y =20;
  scene.add(circlecube);



  const radius = 7;  // ui: radius
  const trigeometry = new THREE.OctahedronGeometry(radius);
  const trimaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

  const tricube = new THREE.Mesh(trigeometry,trimaterial);
  scene.add(tricube);
  tricube.position.x =30;
  tricube.position.y =20;

  const tradius = 7;  // ui: radius
  const tgeometry = new THREE.TetrahedronGeometry(radius);
  const tmaterial = new THREE.MeshBasicMaterial({color: 0x000000});
  const tcube = new THREE.Mesh(tgeometry,tmaterial);
  scene.add(tcube);
  tcube.position.x=-15;
  tcube.position.y =-5;


const sradius = 3.5;  // ui: radius
const tubeRadius = 1.5;  // ui: tubeRadius
const radialSegments = 8;  // ui: radialSegments
const tubularSegments = 34;  // ui: tubularSegments
const p = 2;  // ui: p
const q = 3;  // ui: q
const sgeometry = new THREE.TorusKnotGeometry(
    sradius, tubeRadius, tubularSegments, radialSegments, p, q);

    const smaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    const scube = new THREE.Mesh(sgeometry,smaterial);
    scene.add(scube);
    
    scube.position.y =-5;
    scube.position.x =10;

    const cradius = 7;  // ui: radius
    const widthSegments = 12;  // ui: widthSegments
    const heightSegments = 8;  // ui: heightSegments
    const cgeometry = new THREE.SphereGeometry(cradius, widthSegments, heightSegments);
    const cmaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const ccube = new THREE.Mesh(cgeometry,cmaterial);
    scene.add(ccube);

    ccube.position.y =-5;
    ccube.position.x =30;


    const cornradius = 6;  // ui: radius
    const height = 8;  // ui: height
    const cornradialSegments = 16;  // ui: radialSegments
    const corngeometry = new THREE.ConeGeometry(cornradius, height, cornradialSegments);

    const cornmaterial = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const corncube = new THREE.Mesh(corngeometry,cornmaterial);
    scene.add(corncube);

    corncube.position.y =-20;
    corncube.position.x =-15;


    const width = 9;  // ui: width
    const squareheight = 9;  // ui: height
    const squaregeometry = new THREE.PlaneGeometry(width,  squareheight);

    const  squarematerial = new THREE.MeshBasicMaterial({color:0xAAAAAA});
    const  squarecube = new THREE.Mesh(squaregeometry, squarematerial);
    scene.add(squarecube);

    squarecube.position.y =-20;
    squarecube.position.x =10;



const planeradius = 5;  // ui: radius
const planetubeRadius = 2;  // ui: tubeRadius
const planeradialSegments = 8;  // ui: radialSegments
const planetubularSegments = 24;  // ui: tubularSegments
const planegeometry = new THREE.TorusGeometry(
    planeradius, planetubeRadius,
    planeradialSegments, planetubularSegments);

    const  planematerial = new THREE.MeshBasicMaterial({color:0x00ff00});
    const  planecube = new THREE.Mesh(planegeometry, planematerial);
    scene.add(planecube);

    planecube.position.y =-20;
    planecube.position.x =30;


  function render(time) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;
circlecube.rotation.x=time;
circlecube.rotation.y=time;
tricube.rotation.x=time;
tcube.rotation.x=time;
scube.rotation.x=time;
ccube.rotation.y=time;
ccube.rotation.x=time;
corncube.rotation.y=time;
corncube.rotation.x=time;
squarecube.rotation.x=time;
squarecube.rotation.y=time;
planecube.rotation.x=time;
planecube.rotation.y=time;

    renderer.render(scene, camera);
camera.updateProjectionMatrix();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

 
main();
