let capture;
let graphics;
let bubbles = [];

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
  
  // 在 graphics 圖層上繪製冒泡效果
  graphics.clear(); // 每次繪製前清除背景，維持透明

  // 每隔一段時間隨機產生新的泡泡
  if (random(1) < 0.3) {
    bubbles.push(new Bubble());
  }
  // 更新並顯示所有泡泡
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].show();
    if (bubbles[i].finished()) {
      bubbles.splice(i, 1); // 如果泡泡超出畫面，就從陣列中移除
    }
  }
  
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

// 定義泡泡的 class
class Bubble {
  constructor() {
    // 泡泡從 graphics 圖層的底部隨機位置出現
    this.x = random(graphics.width);
    this.y = graphics.height + random(20);
    this.r = random(5, 20); // 泡泡的半徑
    this.vx = random(-0.5, 0.5); // 水平漂移速度
    this.vy = random(-1, -4); // 垂直上升速度
    this.alpha = random(100, 200); // 透明度
  }

  // 檢查泡泡是否已超出畫面頂部
  finished() {
    return this.y < -this.r;
  }

  // 更新泡泡位置
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // 在 graphics 圖層上畫出泡泡
  show() {
    graphics.noFill();
    graphics.stroke(255, this.alpha);
    graphics.strokeWeight(2);
    graphics.ellipse(this.x, this.y, this.r * 2);
  }
}
