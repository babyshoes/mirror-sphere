var THREE = require('three');
var OrbitControls = require('three-orbit-controls-loader');
OrbitControls(THREE);

var container,
    renderer,
    scene,
    camera,
    mesh,
    light,
    fov = 30;

window.addEventListener( 'load', function() {

    container = document.getElementById('container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#202020");
    
    light = new THREE.SpotLight("#fff", 0.8);
    light.position.y = 100;
    light.angle = 1.05;
    light.decacy = 2;
    light.penumbra = 1;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 100;
    light.shadow.camera.fov = 30;

    scene.add(light);

    camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.z = 100;
    
    // material = new THREE.MeshBasicMaterial(
    //     {
    //         color: 0x9e8dB9,
    //         wireframe: true
    //     }
    // );


    material = new THREE.MeshStandardMaterial(
        {
            color: 0x9e8dB9,
            roughness: 0
        }
    );

    var envMap = new THREE.TextureLoader().load('envMap.png');
    envMap.mapping = THREE.SphericalReflectionMapping;
    material.envMap = envMap;
    
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 20, 4 ),
        material
    );
    scene.add(mesh);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild( renderer.domElement );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    window.addEventListener( 'resize', onWindowResize() );
    render();
} );

function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function render() {
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}
