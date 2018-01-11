// let scene = new THREE.Scene();

// let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
// camera.position.set(15, 20, 30);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// let renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 1.0);
// document.body.appendChild(renderer.domElement);

// let starsGeometry = new THREE.Geometry();

$.get("../data/brainPoint2.json", function(dataPoint) {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 4, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1.0);
    document.body.appendChild(renderer.domElement);

    let pointsGeometry = new THREE.Geometry();

    const displayPercent = 0.5;
    const len = 102;
    const total = parseInt(len * len * displayPercent / 100);
    // var lineMat = new THREE.LineBasicMaterial({color: 0xff0000});

    for (i = 0; i < total; i++) {
        let point = new THREE.Vector3();
        point.x = dataPoint[i][0];
        point.y = dataPoint[i][1];
        point.z = dataPoint[i][2];
        console.log(dataPoint[i]);
        pointsGeometry.vertices.push(point);
    }

    let pointsMaterial = new THREE.PointsMaterial({
        color: 0x000000,
        size: 1,
    });

    let pointField= new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointField);
    console.log("start");
    drawCoords(scene);

    renderer.render(scene, camera);
});

// for (let i = 0; i < 10; i++) {
    // let star = new THREE.Vector3();
    // star.x = THREE.Math.randFloatSpread(20);
    // star.y = THREE.Math.randFloatSpread(20);
    // star.z = THREE.Math.randFloatSpread(20);

    // starsGeometry.vertices.push(star);
// }
// let texture = new THREE.TextureLoader().load('disc.png');

// let starsMaterial = new THREE.PointsMaterial({
    // color: 0x000000,
    // size: 0.5,
    // // map: THREE.ImageUtils.loadTexture('disc.png'),
// });

// let starField = new THREE.Points(starsGeometry, starsMaterial);
// scene.add(starField);

// let group = new THREE.Group();
// scene.add(group);

//point
// let pointsGeometry = new THREE.DodecahedronGeometry(2);
// pointsGeometry.vertices[0].add(randomPoint().multiplyScalar(2));
// pointsGeometry.vertices[1].add(randomPoint().multiplyScalar(2));

// let loader = new THREE.TextureLoader();
// let texture = loader.load('./disc.png');

// let pointsMaterial = new THREE.PointsMaterial({
    // color : 0x0080ff,
    // map : texture,
    // size : 1,
    // alphaTest : 0.5
// });

// let points = new THREE.Points(pointsGeometry, pointsMaterial);
// group.add(points);

// let geometry = new THREE.Geometry();
// let material = new THREE.LineBasicMaterial({ color : 0x777777});
// let color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0x777777 );

// $.get("../data/sortWeight.json", function(dataWeight) {
    // const displayPercent = 0.5;
    // const len = 102;
    // const total = parseInt(len * len * displayPercent / 100);
    // var lineMat = new THREE.LineBasicMaterial({color: 0xff0000});
    // for (i = 0; i < total; i++) {
        // console.log(dataWeight);
        // die();
        // var lineGeo = new THREE.Geometry();
        // LineGeo.vertices.push(
            // // new THREE.Vector3()
        // )
    // }
    // renderer.render(scene, camera);
// });
function randomPoint() {
    return new THREE.Vector3( THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1), THREE.Math.randFloat(-1, 1));
}

function drawCoords(scene) {
    var xmat = new THREE.LineBasicMaterial({color: 0xff0000});
    var ymat = new THREE.LineBasicMaterial({color: 0x00ff00});
    var zmat = new THREE.LineBasicMaterial({color: 0x0000ff});

    var xgeo = new THREE.Geometry();
    xgeo.vertices.push(
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(5, 0, 0),
            new THREE.Vector3(4.8, 0.2, 0)
        );
    var ygeo = new THREE.Geometry();
    ygeo.vertices.push(
            new THREE.Vector3(0, -5, 0),
            new THREE.Vector3(0, 5, 0),
            new THREE.Vector3(0.2, 4.8, 0)
        );
    var zgeo = new THREE.Geometry();
    zgeo.vertices.push(
            new THREE.Vector3(0, 0, -5),
            new THREE.Vector3(0, 0, 5),
            new THREE.Vector3(0, 0.2, 4.8)
        );

    var xline = new THREE.Line(xgeo, xmat);
    var yline = new THREE.Line(ygeo, ymat);
    var zline = new THREE.Line(zgeo, zmat);

    scene.add(xline);
    scene.add(yline);
    scene.add(zline);
}

// drawCoords(scene);
// renderer.render(scene, camera);
