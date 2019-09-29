var width = window.innerWidth; // 画布的宽度
var height = window.innerHeight; // 画布的高度

// 渲染器
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width, height);
// 将canvas添加到指定元素
var element = document.getElementById('seaBackground');
element.appendChild(renderer.domElement);

// 场景
var scene = new THREE.Scene();
// 摄像机
var camera = new THREE.PerspectiveCamera(45, width/height, 1, 2000);
camera.position.set(0,0,360);
scene.add(camera);

// 传递给着色器的uniform参数
var uniforms = {
    iTime: { value: 1.0 },
    iResolution: { value: new THREE.Vector2(width * 1.0, height * 1.0)},
    iMouse: { value: new THREE.Vector2(0.0, 0.0) }
}
// 材质
var material = new THREE.ShaderMaterial( {
    // 着色器 uniform 参数
    uniforms: uniforms,
    // 顶点着色器文本内容
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    // 片元着色器文本内容
    fragmentShader: document.getElementById('fragmentShader').textContent
});
// 平面几何体
var geom = new THREE.PlaneBufferGeometry(width, height);
// 网格对象
var mesh = new THREE.Mesh( geom, material );
scene.add(mesh);


/* 利用requestAnimationFrame实现动画 */
var clock = new THREE.Clock(); // 时钟
(function animate() {
    requestAnimationFrame( animate );

    var delta = clock.getDelta(); // 获取本次和上次的时间间隔
    uniforms.iTime.value += delta; // 设置着色器使用的 iTime 参数
    renderer.render( scene, camera ); // 重新渲染
})();

/* 监听鼠标移动，并改变着色器使用的 iMouse 参数 */
var mouseStartPosition = null; // 鼠标起始位置
window.addEventListener("mousemove", function (event) {
    if (!mouseStartPosition) {
        mouseStartPosition = {x: event.clientX, y: event.clientY}
    } else {
        uniforms.iMouse.value.x = event.clientX - mouseStartPosition.x;
        uniforms.iMouse.value.y = event.clientY - mouseStartPosition.y;
    }
})