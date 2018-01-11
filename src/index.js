const changeGraph = function (type) {
    let lastType = display.type;
    if (lastType !== type) {
        display.type = type;
        $("#" + lastType).css("display", "none");
        $($("#button" + lastType).parent()[0]).removeClass("active");
        $("#" + type).css("display", "block");
        $($("#button" + type).parent()[0]).addClass("active");
        display[type]();
    }
};

const display = {
    type : "TSP",

    TSP : function() {
        $.get('../data/TSP.json', function(data) {
            let trace = {
                // x: data[0],
                y: data[1],
                type: 'scatter'
            };
            let layout = {
                title:'Time Series Plot',
                height: window.innerHeight - 50,
                width: window.innerWidth
            };
            Plotly.newPlot('TSP', [ trace ], layout);
        });
    },

    "TSP-X" : function() {
        $.get('../data/TSP_X.json', function(data) {
            let trace1 = {
                x: data[0],
                y: data[1][0],
                type: 'scatter'
            };
            let trace2 = {
                x: data[0],
                y: data[1][1],
                type: 'scatter'
            };
            let layout = {
                title:'Time Series Plot Xmany',
                height: window.innerHeight - 50,
                width: window.innerWidth
            };
            Plotly.newPlot('TSP-X', [trace1, trace2], layout);
        });
    },

    SP2D : function() {
        $.get('../data/Xm2.json', function(data) {
            let trace = {
                x: data[0],
                y: data[1],
                mode: 'markers'
            }
            let layout = {
                title: 'Scatter Plot 2D',
                height: window.innerHeight - 50,
                width: window.innerWidth
            };
            Plotly.newPlot('SP2D', [trace], layout);
        });
    },

    SP3D : function() {
        $.get('../data/Xm3.json', function(data) {
            let trace = {
                x: data[0],
                y: data[1],
                z: data[2],
                mode: 'markers',
                marker: {
                    size: 1
                },
                type: 'scatter3d'
            };
            let layout = {
                title: 'Scatter Plot 3D',
                height: window.innerHeight - 50,
                width: window.innerWidth
            };
            Plotly.newPlot('SP3D', [trace], layout);
        });
    },

    G2D : function() {
        let nodes = []
        let len = 102
        let displayPercent = 0.5
        let zoom = 7

        $.get("../data/place.json", function(dataPlace) {
            for (let i = 0; i < len; i++) {
                nodes[i] = {};
                nodes[i].x = (parseFloat(dataPlace[i].x) + 50) * zoom;
                nodes[i].y = (parseFloat(dataPlace[i].y) + 50) * zoom;
            }
            console.log(nodes);

            let cv = $("#G2D canvas")[0].getContext('2d');
            for (i = 0; i < len; i++) {
                cv.beginPath();
                cv.arc(nodes[i].x, nodes[i].y, 5, 0, 2 * Math.PI, false);
                cv.fillText(i + 1, nodes[i].x - zoom, nodes[i].y - (zoom*0,5));
                cv.fill();
                cv.stroke();
            }

            $.get("../data/sortWeight.json", function(dataWeight) {
                let total = parseInt(len * len * displayPercent / 100);

                cv.strokeStyle = '#33F';
                // cv.fillStyle = 'rgb(255, 51, 51)';

                for (i = 0; i < total; i++) {
                    weight = dataWeight[i].weight;

                    let level = weight / dataWeight[0].weight;
                    cv.lineWidth = 3*level;
                    cv.globalAlpha = level;

                    cv.beginPath();
                    // cv.arrow(nodes[dataWeight[i].from].x * 7, nodes[dataWeight[i].from].y * 7, nodes[dataWeight[i].to].x * 7, nodes[dataWeight[i].to].y * 7, [0, 0.3, -20*level, 3*level, -25*level, 10*level]);
                    p0 = nodes[dataWeight[i]['from']];
                    p1 = nodes[dataWeight[i]['to']];

                    let degreesInRadians225 = 225*Math.PI/180;
                    let degreesInRadians135 = 135*Math.PI/180;

                    // calc the angle of the line
                    let dx = p1.x - p0.x;
                    let dy = p1.y - p0.y;
                    let headLength = Math.sqrt(dx * dx + dy * dy) * 0.05;

                    // calc arrowhead points
                    let x225 = p1.x + headLength * Math.cos(Math.atan2(dy, dx) + 225*Math.PI/180);
                    let y225 = p1.y + headLength * Math.sin(Math.atan2(dy, dx) + 225*Math.PI/180);
                    let x135 = p1.x + headLength * Math.cos(Math.atan2(dy, dx) + 135*Math.PI/180);
                    let y135 = p1.y + headLength * Math.sin(Math.atan2(dy, dx) + 135*Math.PI/180);

                    // draw the line from p0 to p1
                    cv.moveTo(p0.x , p0.y);
                    cv.lineTo(p1.x , p1.y);
                    // draw partial arrowhead at 225 degrees
                    cv.moveTo(p1.x , p1.y);
                    cv.lineTo(x225 , y225);
                    // draw partial arrowhead at 135 degrees
                    cv.moveTo(p1.x , p1.y);
                    cv.lineTo(x135 , y135);

                    cv.fill();
                    cv.stroke();
                }
            });
        });
    },

    G3D: async function() {
        await jsonData.getData('place3D2');
        const pointData = jsonData.resData;

        three = new ThreeRenderer('G3D');
        three.addPoint(pointData);

        await jsonData.getData('sortWeight');
        const lineData = jsonData.resData;

        three.addLine(lineData, pointData);
        three.animate();
    },

    MP3D: async function() {
        await jsonData.getData('brainFace3');
        const faceData = jsonData.resData;

        three = new ThreeRenderer('MP3D');
        three.addFace(faceData);
        three.animate();
    },

    MPlus: async function() {
        await jsonData.getData('place3D2');
        const pointData = jsonData.resData;

        await jsonData.getData('sortWeight');
        const lineData = jsonData.resData;

        await jsonData.getData('brainFace3');
        const faceData = jsonData.resData;

        three = new ThreeRenderer('MPlus');
        three.addPoint(pointData);
        three.addLine(lineData, pointData);
        three.addFace(faceData);
        three.animate();
    },
};

//deal with the json data
const jsonData = {
    filePath : '/k-connex/data/',
    resData : 'aaa',

    getData : function(fileName) {
        const file = this.filePath + fileName + '.json';
        return fetch(file).then(response => response.json()).then(jsondata => {
            this.resData = jsondata;
        });
    },
};

//deal with the threeJs
class ThreeRenderer {
    constructor(graphId) {
        //scene
        this.scene = new THREE.Scene();

        //renderer
        this.renderer = new THREE.WebGLRenderer( {antialias: true} ),
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById( graphId ).appendChild( this.renderer.domElement );

        //camera
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000),
        this.camera.position.set(15, 20, 30);
        this.scene.add(this.camera);

        // controls
        const controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        controls.minDistance = 20;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI / 2;

        this.scene.add( new THREE.AmbientLight( 0x222222 ) );

        // light
        const light = new THREE.PointLight( 0xffffff, 1 );
        this.camera.add( light );

        // helper
        this.scene.add( new THREE.AxesHelper( 20 ) );

        //group
        this.group = new THREE.Group(),
        this.scene.add(this.group);
        window.addEventListener('resize', this.onWindowResize, false);
    }

    addPoint(pointData) {
        let pointsGeometry = new THREE.DodecahedronGeometry(10);
        for (let i = 0; i < pointData.length; i++) {
            let point = new THREE.Vector3( pointData[i][0], pointData[i][2], pointData[i][1]);
            if (i < pointsGeometry.vertices.length) {
                pointsGeometry.vertices[ i ] = point.multiplyScalar( 2 ); // wiggle the points
            } else {
                pointsGeometry.vertices.push( point.multiplyScalar( 2 ) ); // wiggle the points
            }
        }

        // textures
        const loader = new THREE.TextureLoader();
        const texture = loader.load( 'src/disc.png' );

        const pointsMaterial = new THREE.PointsMaterial( {
            color: 0x0080ff,
            map: texture,
            size: 1,
            alphaTest: 0.5
        } );

        const points = new THREE.Points( pointsGeometry, pointsMaterial );
        this.group.add( points );
    }

    addLine(lineData, pointData) {
        const maxWeight = lineData[0]['weight'];
        const total = parseInt(pointData.length * pointData.length * 0.5 / 100);
        for (let i = 0; i < total; i++) {
            let lineGeo = new THREE.Geometry();
            let level = lineData[i]['weight'] / maxWeight;
            let lineMat = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: level * 3, transparent: true, opacity:level});
            let fromPoint = new THREE.Vector3( pointData[lineData[i]['from']][0], pointData[lineData[i]['from']][2], pointData[lineData[i]['from']][1]).multiplyScalar(2);
            let toPoint = new THREE.Vector3( pointData[lineData[i]['to']][0], pointData[lineData[i]['to']][2], pointData[lineData[i]['to']][1]).multiplyScalar(2);
            let direction = toPoint.clone().sub(fromPoint);
            let length = direction.length();
            let arrowHelper = new THREE.ArrowHelper(direction.normalize(), fromPoint, length, 0xff0000, 0.1*length);
            arrowHelper.line.material.copy(lineMat);
            this.group.add(arrowHelper);
        }
    }

    addFace(faceData) {
        const material = new THREE.MeshStandardMaterial( { color : 0xffffff, opacity : 1, transparent: true } );
        for (let i = 0; i < faceData.length; i++) {
        let geometry = new THREE.Geometry();
            geometry.vertices.push( new THREE.Vector3( faceData[i][0][0], faceData[i][0][1], faceData[i][0][2]));
            geometry.vertices.push( new THREE.Vector3( faceData[i][1][0], faceData[i][1][1], faceData[i][1][2]));
            geometry.vertices.push( new THREE.Vector3( faceData[i][2][0], faceData[i][2][1], faceData[i][2][2]));

            let face = new THREE.Face3( 0, 1, 2);

            //add the face to the geometry's faces array
            geometry.faces.push( face );
            //the face normals and vertex normals can be calculated automatically if not supplied above
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            this.group.add( new THREE.Mesh( geometry, material ) );
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }
}

display[display.type]();
