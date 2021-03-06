$.get('../data/brainPoint3.json', 'utf-8').done(function(pointData) {
// $.get('../data/brainFace.json', 'utf-8').done(function(faceData) {
var group, camera, scene, renderer;

init();
animate();

function init() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // camera

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 15, 20, 30 );
    scene.add( camera );

    // controls

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    scene.add( new THREE.AmbientLight( 0x222222 ) );

    // light

    var light = new THREE.PointLight( 0xffffff, 1 );
    camera.add( light );

    // helper

    scene.add( new THREE.AxesHelper( 20 ) );

    // textures

    var loader = new THREE.TextureLoader();
    var texture = loader.load( '../src/img/disc.png' );

    group = new THREE.Group();
    scene.add( group );

    // points
    var pointsGeometry = new THREE.DodecahedronGeometry( 10 );

    // for ( var i = 0; i < pointsGeometry.vertices.length; i ++ ) {
    for ( var i = 0; i < pointData.length; i ++ ) {
        // console.log(getPoint(i));
        let point = getPoint(i);
        if (i < pointsGeometry.vertices.length) {
            pointsGeometry.vertices[ i ] = point.multiplyScalar( 2 ); // wiggle the points
        } else {
            pointsGeometry.vertices.push( point.multiplyScalar( 2 ) ); // wiggle the points
        }
    }

    var pointsMaterial = new THREE.PointsMaterial( {

        color: 0x0080ff,
        map: texture,
        size: 0.3,
        alphaTest: 0.5

    } );

    var points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );

    // convex hull
    // var meshGeometry = new THREE.ConvexBufferGeometry(pointsGeometry.vertices);

    // // meshGeometry.addAttribute('position', meshGeometry.vertices);
	// var meshMaterial = new THREE.MeshLambertMaterial( {
		// color: 0xffff00,
		// opacity: 0.5,
		// transparent: true
	// } );
    // var mesh = new THREE.Mesh(meshGeometry, meshMaterial);

	// var meshGeometry = new THREE.ConvexBufferGeometry( pointsGeometry.vertices );

    // var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    // mesh.material.side = THREE.BackSide; // back faces
    // mesh.renderOrder = 0;
    // group.add( mesh );

    // var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    // mesh.material.side = THREE.FrontSide; // front faces
    // mesh.renderOrder = 1;
    // group.add( mesh );

    window.addEventListener( 'resize', onWindowResize, false );
}

function getPoint(num) {

    // return new THREE.Vector3( THREE.Math.randFloat( - 4, 4 ), THREE.Math.randFloat( - 4, 4 ), THREE.Math.randFloat( - 4, 4 ) );
    return new THREE.Vector3(pointData[num][0], pointData[num][1], pointData[num][2]);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    // group.rotation.y += 0.005;

    render();

}

function render() {

    renderer.render( scene, camera );

}
// });
});
