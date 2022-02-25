export const keySet = shuffle([
  {t: 'はんきゅう', q: 'hankyuu', c: '../img/hankyu.png'},
  {t: 'ひのとり', q: 'hinotori', c: '../img/hinotori.png'},
  {t: 'かがやき', q: 'kagayaki', c: '../img/kagayaki.png'},
  {t: 'やまのてせん', q: 'yamanotesen', c: '../img/yamanotesen.png'},
  {t: 'のぞみ', q: 'nozomi', c: '../img/nozomi.png'},
  {t: 'みずかぜ', q: 'mizukaze', c: '../img/mizukaze.png'},
]);

/**
 * 配列の順序をシャッフルする
 * @param {対象配列} arr 
 * @returns 
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  
  return arr;
}