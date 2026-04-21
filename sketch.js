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
  
  // 繪製攝影機影像（利用水平翻轉修正左右顛倒）
  push(); // 儲存目前的繪圖設定（避免影響到後續其他可能繪製的圖形）
  translate(width / 2, height / 2); // 將畫布座標原點移動到畫面正中央
  scale(-1, 1); // 將 X 軸縮放 -1，達到水平翻轉的效果
  imageMode(CENTER); // 設定影像繪製模式為「中心點對齊」
  image(capture, 0, 0, imgWidth, imgHeight); // 在新的原點 (0, 0) 畫出影像
  pop(); // 恢復先前的繪圖設定
}
