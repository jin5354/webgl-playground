export default {
  html: `<script src="https://unpkg.com/@webglrun/wutils"></script>
<canvas id="webgl" width="400" height="400"></canvas>`,
  css: ``,
  js: `let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// 装载 shader
wutils.initProgramWithShadersSource(
    gl,
    $shaders.vertexShader,
    $shaders.fragmentShader,
)

// 取得变量并赋值
let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
gl.vertexAttrib1f(a_PointSize, 10.0)
gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)

// 在 Float32Array 类型化数组里定义三个点的位置
let count = 3
let vertices = new Float32Array(
  [0.0, 0.5, -0.5, -0.5, 0.5, -0.5]
)

// 1.创建缓冲区对象
let vertexBuffer = gl.createBuffer()

// 2.绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

// 3.将数据写入缓冲区对象
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

// 4.将缓冲区对象分配给一个 attribute 变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

// 5.开启 attribute 变量
gl.enableVertexAttribArray(a_Position)

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画点
gl.drawArrays(gl.POINTS, 0, 3)`,
  glsl: {
    vertexShader: `// 定义 attribute 变量
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}`,
    fragmentShader: `// 设置精度
precision mediump float;
// 定义 uniform 变量
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}`
  }
}