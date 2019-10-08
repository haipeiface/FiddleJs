var camera, scene, renderer, mesh, material, stats;
init();
animate(); 

function init() {
    // Renderer.
    renderer = new THREE.WebGLRenderer();
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Add renderer to page
    document.body.appendChild(renderer.domElement);

    // Create camera.
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Create scene.
    scene = new THREE.Scene();

    // Create material
    // material = new THREE.MeshPhongMaterial();
    // material.side = THREE.DoubleSide;
    var material = new THREE.ShaderMaterial( { 
        uniforms: {}, 
        //attributes: {
        //    'center': { type: 'v3', value: null,  boundTo: 'faceVertices' }
        //}, 
        vertexShader: document.getElementById('vertexShader').textContent, 
        fragmentShader: document.getElementById('fragmentShader').textContent 
    } );
    material.side = THREE.DoubleSide;


    // Create cube and add to scene.
    var geometry = new THREE.PlaneGeometry(200, 200);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Create ambient light and add to scene.
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);
    
    // Add stats to page.
    /* stats = new Stats();
    document.body.appendChild( stats.dom ); */
    renderer.render(scene,camera);
}
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    // stats.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}