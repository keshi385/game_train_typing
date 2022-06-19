'use strict';
// 文字列ファイルのインポート
import { keySet } from './words.js';

{
  const v_msec = 50;  // タイマの計測単位[ms]
  let x_org = 0;      // 電車の左右位置
  let word;           // タイピング対象となる文字列
  let hintWord;       // 日本語表記のヒント 
  let loc = 0;        // 文字の位置
  let startTime;
  let isPlaying = false;
  let timeoutId;
  const target = document.querySelector('#target');
  const hint = document.querySelector('#hint');
  const replay = document.querySelector('#replay');
  const train = document.querySelector('#train');
  const popup = document.querySelector('#popup');

  /**
   * タイピングワードのセット
   */
  function setWord() {
    let row;

    // ランダムで行を選択
    row = keySet.splice(Math.floor(Math.random() * keySet.length), 1);

    // もしアイテムが存在しなければ、終了
    if (row.length === 0) {
        return;
    }
    word = row[0].q;
    hintWord = row[0].t;
    target.textContent = '_'.repeat(word.length);
    hint.textContent = hintWord;
    loc = 0;
    refleshImage(row);
  }

  /**
   * 電車画像の更新
   * @param row 該当列
   */
  function refleshImage(row) {
    let train = document.querySelector('.train');
    let trainImage = train.firstElementChild;

    trainImage.src = row[0].c;   
    console.log(trainImage.src); 
  }
  
  /**
   * ゲームの開始
   */
  document.addEventListener('click', () => {
      if (isPlaying === true) {
          return;
      }
      
      isPlaying = true;
      startTime = Date.now();
      replay.style.display = "none";
      setWord();
      x_org = 0;
      moveTrain();
  });

  /**
   * ゲームの再開
   */
  replay.addEventListener('click', () => {
    window.location.reload();
  });

  /**
   * タイピング結果の評価
   */
  document.addEventListener('keydown', e => {
    let bText;
    let eText;
      // 早期リターン
      if (e.key !== word[loc]) {
          return;
      }

      loc++;

      bText = word.substring(0, loc);
      eText = word.substring(loc);
      target.textContent = bText + '_'.repeat(eText.length);

      if (loc === word.length) {
          if (keySet.length === 0) {
              const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
              const result = document.getElementById('result');
              result.textContent = `${elapsedTime} 秒`;
              replay.style.display = "block";
              clearTimeout(timeoutId);
              return;
          } else {
            // ワードの更新
            clearTimeout(timeoutId);
            setWord();
            x_org = 0;
            moveTrain();
            return;
          }
      }
  });

  /**
   * 電車を左から右へ移動
   */
  function moveTrain() {
    let x_pos = train.getBoundingClientRect();
    let x_move = document.body.clientWidth - x_pos.left;
    if (x_org < (document.body.clientWidth - train.clientWidth)) {
      x_org = x_org + 10;
      train.style.left = x_org + 'px';
      // タイマーの実行（インターバル）
      timeoutId = setTimeout(moveTrain, v_msec);
    } else {
      // ゲームオーバー
      clearTimeout(timeoutId);
      console.log('ゲームオーバー!!!')
      popup.style.display = "block";
      replay.style.display = "block";
    }
  }

}