let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏 p5.js 預設產生的 HTML 影片元素
}

function draw() {
  background('#e7c6ff');
  
  // 計算影像寬高 (畫布的 60%)
  let imgWidth = width * 0.6;
  let imgHeight = height * 0.6;
  
  // 計算將影像置中的 X 與 Y 座標
  let x = (width - imgWidth) / 2;
  let y = (height - imgHeight) / 2;
  
  // 繪製攝影機影像
  image(capture, x, y, imgWidth, imgHeight);
}
