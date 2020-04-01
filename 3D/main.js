import { AmbientLight } from './threejs/src/lights/AmbientLight.js'
import { Color } from './threejs/src/math/Color.js'
import { Mesh } from './threejs/src/objects/Mesh.js'
import { PerspectiveCamera } from './threejs/src/cameras/PerspectiveCamera.js'
import { PointLight } from './threejs/src/lights/PointLight.js'
import { Scene } from './threejs/src/scenes/Scene.js'
import { WebGLRenderer } from './threejs/src/renderers/WebGLRenderer.js'
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js'
import { Clock } from './threejs/src/core/Clock.js'
import { STLLoader } from "./threejs/examples/jsm/loaders/STLLoader.js"
import { BoxGeometry } from "./threejs/src/geometries/BoxGeometry.js"
import { MeshPhongMaterial } from "./threejs/src/materials/MeshPhongMaterial.js"

var scene, camera, renderer, controls;

var slideshow = document.getElementById("slideshow");
var renderer = new WebGLRenderer( {canvas: slideshow , antialias: true, alpha: true } );

var clock = new Clock();

function init(){

	scene = new Scene();
	//scene.background = new Color( 0x808080 );

	scene.add( new AmbientLight( 0x808080 ) );
	
	camera = new PerspectiveCamera(75, slideshow.width/slideshow.height, 0.1, 1000);
	camera.position.z = 6;
	
	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableZoom= false;
	controls.enablePan= false;

	renderer.setSize( slideshow.clientWidth, slideshow.clientHeight, false);

	var light = new PointLight(0xffffff, 1, 100);
	camera.add(light);
	scene.add(camera);

	var loader = new STLLoader();
	loader.load( './3D/metal_oc_typo2.stl', function ( geometry ) {
		geometry.center();
		var material = new MeshPhongMaterial( { color: 0x101010, specular: 0x111111, shininess: 200 } );
		var mesh = new Mesh( geometry, material );

		mesh.rotation.x= -3.141/2;
		scene.add(mesh);
		renderer.render(scene, camera);	
	} );
}

var mouseDown= false;

slideshow.ontouchstart= function(){
	mouseDown= true;
};
slideshow.ontouchend= function(){
	mouseDown= false;
};
slideshow.ontouchmove= function(){
	if(mouseDown){
		controls.update(clock.getDelta());
		renderer.render(scene, camera);	
	}
};

slideshow.onmousedown= function(){
	mouseDown= true;
};
slideshow.onmouseup= function(){
	mouseDown= false;
};
slideshow.onmousemove= function(){
	if(mouseDown){
		controls.update(clock.getDelta());
		renderer.render(scene, camera);	
	}
};

init();