// $.get('../data/brainFace.json', 'utf-8').done(function(faceData) {
$.get('../data/brainFace3.json', 'utf-8').done(function(faceData) {
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

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.3, 1000 );
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
// {
    // var pointsGeometry = new THREE.DodecahedronGeometry( 10 );

    // // for ( var i = 0; i < pointsGeometry.vertices.length; i ++ ) {
    // for ( var i = 0; i < pointData.length; i ++ ) {
        // // console.log(getPoint(i));
        // let point = getPoint(i);
        // if (i < pointsGeometry.vertices.length) {
            // pointsGeometry.vertices[ i ] = point.multiplyScalar( 2 ); // wiggle the points
        // } else {
            // pointsGeometry.vertices.push( point.multiplyScalar( 2 ) ); // wiggle the points
        // }
    // }

    // var pointsMaterial = new THREE.PointsMaterial( {

        // color: 0x0080ff,
        // map: texture,
        // size: 0.3,
        // alphaTest: 0.5

    // } );

    // var points = new THREE.Points( pointsGeometry, pointsMaterial );
    // group.add( points );
// }
    // convex hull

    var material = new THREE.MeshStandardMaterial( { color : 0xffffff, opacity : 1, transparent: true } );

    //create a triangular geometry
    // for (let i = 0; i < faceData.length; i++) {
    // for (let i = 0; i < 10; i++) {
        // var material = new THREE.MeshStandardMaterial( { color : 0xffffff, opacity : 0.5, transparent: true } );
        // var geometry = new THREE.Geometry();
        // let value = faceData[i];
        // console.log(value);
        // geometry.vertices.push( new THREE.Vector3( value[0][0], value[0][1], value[0][2]));
        // geometry.vertices.push( new THREE.Vector3( value[1][0], value[1][1], value[1][2]));
        // geometry.vertices.push( new THREE.Vector3( value[2][0], value[2][1], value[2][2]));
        // var face = new THREE.Face3( 0, 1, 2);
        // geometry.faces.push( face );
        // geometry.computeFaceNormals();
        // geometry.computeVertexNormals();
        // group.add( new THREE.Mesh( geometry, material ) );
    // }

    for (let i = 0; i < faceData.length; i++) {
    var geometry = new THREE.Geometry();
        // console.log(faceData[i]);
        geometry.vertices.push( new THREE.Vector3(faceData[i][0][0], faceData[i][0][1], faceData[i][0][2]));
        geometry.vertices.push( new THREE.Vector3( faceData[i][1][0], faceData[i][1][1], faceData[i][1][2]));
        geometry.vertices.push( new THREE.Vector3( faceData[i][2][0], faceData[i][2][1], faceData[i][2][2]));
    // geometry.vertices.push( new THREE.Vector3( -1, -2, 0 ) );
    // geometry.vertices.push( new THREE.Vector3(  3, 0, 0 ) );
    // geometry.vertices.push( new THREE.Vector3(  0,  2, 5 ) );

    //create a new face using vertices 0, 1, 2
    // var normal = new THREE.Vector3( 0, 1, 0 ); //optional
    // var color = new THREE.Color( 0xffaa00 ); //optional
    // var materialIndex = 0; //optional
    var face = new THREE.Face3( 0, 1, 2);

    //add the face to the geometry's faces array
    geometry.faces.push( face );

    //the face normals and vertex normals can be calculated automatically if not supplied above
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    group.add( new THREE.Mesh( geometry, material ) );
    }
    // var pointsGeometry = new THREE.Geometry();
    // pointsGeometry.vertices.push( getPoint(0));
    // pointsGeometry.vertices.push( getPoint(1));
    // pointsGeometry.vertices.push( getPoint(1));
    // // pointsGeometry.vertices.push( getPoint(1));

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
