let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏 p5.js 預設產生的 HTML 影片元素
  
  // 使用 createGraphics 產生與縮放後視訊畫面相同寬高的圖層
  graphics = createGraphics(windowWidth * 0.6, windowHeight * 0.6);
}

function draw() {
  background('#e7c6ff');
  
  // 計算影像寬高 (畫布的 60%)
  let imgWidth = width * 0.6;
  let imgHeight = height * 0.6;
  
  // 在 graphics 圖層上繪製內容（以紅色邊框與中心圓形為例）
  graphics.clear(); // 每次繪製前清除背景，維持透明
  graphics.stroke(255, 0, 0); // 設定紅色線條
  graphics.strokeWeight(5); // 設定線條粗細
  graphics.noFill(); // 內部不填色
  graphics.rect(0, 0, graphics.width, graphics.height); // 畫一個與影片同尺寸的矩形外框
  graphics.circle(graphics.width / 2, graphics.height / 2, 100); // 畫一個位於正中央的圓形
  
  // 繪製攝影機影像（利用水平翻轉修正左右顛倒）
  push(); // 儲存目前的繪圖設定（避免影響到後續其他可能繪製的圖形）
  translate(width / 2, height / 2); // 將畫布座標原點移動到畫面正中央
  
  push(); // 針對影片翻轉再包一層，避免接下來的 graphics 也被翻轉
  scale(-1, 1); // 將 X 軸縮放 -1，達到水平翻轉的效果
  imageMode(CENTER); // 設定影像繪製模式為「中心點對齊」
  image(capture, 0, 0, imgWidth, imgHeight); // 在新的原點 (0, 0) 畫出影像
  pop(); // 恢復影片的翻轉設定
  
  // 疊加 graphics 圖片在視訊畫面的上方
  imageMode(CENTER);
  image(graphics, 0, 0, imgWidth, imgHeight);
  
  pop(); // 恢復先前的繪圖設定
}
