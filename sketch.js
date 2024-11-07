let images = []; // 画像を格納する配列
let correctAnswers = ["apple", "banana", "grape", "orange", "pear"]; // 正しい答えの配列
let currentQuestion = 0; // 現在の問題番号
let input;
let userAnswer = "";
let message1 = "この食べ物は何でしょう?"; // 質問
let message2 = "What is this food?"; // 質問
let resultMessage = ""; // 結果メッセージ
let isFinished = false; // クイズ終了フラグ
let startTime; // クイズ開始時間
let timer = 0; // タイマー
let isStarted = false; // クイズ開始フラグ
let startButton; // スタートボタンの参照
let checkButton; // チェックボタンの参照

function preload() {
  // 画像をロードして配列に保存
  images[0] = loadImage('https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg', onImageLoad, onImageError); // apple
  images[1] = loadImage('https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg', onImageLoad, onImageError); // banana
  images[2] = loadImage('https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg', onImageLoad, onImageError); // grape
  images[3] = loadImage('https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg', onImageLoad, onImageError); // orange
  images[4] = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pyrus_pyrifolia_fruit_on_tree_PS_2z_LR.jpg/640px-Pyrus_pyrifolia_fruit_on_tree_PS_2z_LR.jpg'); // pear
}

function setup() {
  createCanvas(400, 400);
  
  // スタートボタンを作成
  startButton = createButton('Start');
  startButton.position(150, 350);
  startButton.mousePressed(startQuiz); // スタートボタンをクリックしたときにstartQuiz関数が呼ばれる

  // テキスト入力フィールドを作成
  input = createInput();
  input.position(100, 300);
  input.hide(); // スタートするまで非表示

  // 答えをチェックするボタンを作成
  checkButton = createButton('Check Answer');
  checkButton.position(input.x + input.width + 10, 300);
  checkButton.mousePressed(checkAnswer); // ボタンクリックでcheckAnswer関数が呼ばれる
  checkButton.hide(); // スタートするまで非表示
}

function draw() {
  background(255);
  
  // タイマーを表示
  if (isStarted && !isFinished) {
    timer = floor((millis() - startTime) / 1000); // 秒単位で経過時間を計算
    textSize(24);
    fill(0);
    text("タイマー: " + timer + "秒", 150, 290);
  }
  
  // もしクイズが終了している場合
  if (isFinished) {
    textSize(50);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Finish", width / 2, height / 2); // 画面中央に「Finish」と表示
    textSize(24);
    text("Total Time: " + timer + " seconds", width / 2, height / 2 + 60); // 合計時間を表示
  } else if (isStarted) {
    // 現在の問題の画像を表示
    if (images[currentQuestion]) {
      image(images[currentQuestion], 100, 70, 190, 190);
    }

    // 質問メッセージを表示
    textSize(24);
    fill(0);
    text(message1, 100, 30);
    textSize(19);   
    text(message2, 100, 55);

    // 結果メッセージを表示
    textSize(20);
    fill(0);
    text(resultMessage, 100, 370);
  }
}

function checkAnswer() {
  // ユーザーの入力を取得して小文字に変換
  userAnswer = input.value().toLowerCase(); 
  
  // 答えが正しいかどうかをチェック
  if (userAnswer === correctAnswers[currentQuestion]) {
    resultMessage = "Correct! This is a " + correctAnswers[currentQuestion] + ".";
    currentQuestion++; // 次の問題に進む
    input.value(''); // 入力フィールドをクリア

    // もしすべての問題が終了したら
    if (currentQuestion >= correctAnswers.length) {
      isFinished = true; // クイズ終了フラグをセット
      input.hide(); // 入力フィールドを非表示
      checkButton.hide(); // チェックボタンを非表示
    }
  } else {
    resultMessage = "Try again!";
  }
}

function startQuiz() {
  isStarted = true;
  startTime = millis(); // クイズ開始時間を記録
  input.show(); // 入力フィールドを表示
  checkButton.show(); // チェックボタンを表示
  startButton.hide(); // スタートボタンを非表示
}

// 画像のロード成功時の処理
function onImageLoad() {
  console.log("Image loaded successfully.");
}

// 画像のロード失敗時の処理
function onImageError() {
  console.error("Failed to load image.");
}