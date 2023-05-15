/**
 * JSDocs記述方法
 * @type {変数・引数の型名} 記述した変数・引数の説明
 * @return {型名} 返り値の説明
 * データ型=>String(文字列) Number(数値) Array(配列) Object(オブジェクト) Boolean(真偽値) Function(関数)
 */

/**
 * 数字の席番号ブロックを表示するための元データになる配列を作成
 * 関数内で欠席者を取り除く処理も行う
 * @param {Number} studentNumber 生徒の人数を表示
 * @return {Array} 席番号ブロックに表示するための元データとなる配列(欠席者取り除き済)
 */

const setTargetStudents = function(studentNumber){
    let studentNumberList = [];

    for(let i=1; i<= studentNumber; i++){
        studentNumberList.push(i);
    }

    const absenteeNumbers = document.querySelector("#absence").value;
    const splitedAbsenteeNumbers = absenteeNumbers.split(",").map(function(item,index){
        return parseInt(item);
    });

    studentNumberList = studentNumberList.filter(function(student){
        return !splitedAbsenteeNumbers.includes(student);
    })

    return studentNumberList;
}

/**
 * 席番号ブロックの元データが入った配列の中身をシャッフルさせる
 * @type {Array} studentNumberList ・・・画面に表示対象となる生徒の学籍番号が格納されたもの
 * @return {Array} studentNumberListを基に中身の数字がシャッフルされた配列
 */

const shuffleArray = function(studentNumberList){
    for (let i = studentNumberList.length; i>0; i--){
        const randomNum = Math.floor(Math.random() * i);
        let tmp = studentNumberList[i-1];
        studentNumberList[i-1] = studentNumberList[randomNum];
        studentNumberList[randomNum] = tmp;
    }
    return studentNumberList;
}

/**
 * 数字がシャッフルされた席番号ブロックの元データとなる配列を画面上に表示
 * @type {Array} shuffleStudent ・・・生徒の学籍番号がシャッフルされた状態で格納された 
 */
const showSeatBoxes = function(shuffleStudent){
    let insertHTML ='';
    shuffleStudent.forEach(function(num){
        insertHTML += `<div class="seat__item">${num}</div>`;
    })

    document.querySelector('#seat').innerHTML = insertHTML;
}

/**
 * @type {Function} timer ・・・・・setInterval関数が格納されている
 * @type {Object} audioElement・・・音声データ 
 */
const soundPlay = function(timer){
    const audioElement = new Audio();
    audioElement.src = 'assets/audio/drum.mp3';
    audioElement.play();

    audioElement.addEventListener('ended', function(){
        clearInterval(timer);
    })
}

/**
 * モーダルないのスタートボタンが押された際の動作
 * @type {Number} studentNumber・・・入力欄に入力された人数
 * @type {Number} studentUpperlimit・・・人数の入力欄の上限値
 * @type {Boolean} studentNumberIsEmpty・・・人数の入力欄に数値が入力されたか
 */

document.querySelector('#btn-start').addEventListener('click', function(){
    const studentNumber = document.querySelector("#studentNumber").value;
    const studentUpperlimit = 50;
    const sutdentNubmerIsEmpty = studentNumber === "";
    
    if(sutdentNubmerIsEmpty){
        alert('人数が未入力です！入力してからスタートボタンを押してください。');
        return false;
    }

    if(studentNumber > studentUpperlimit){
        alert(`人数は${studentUpperlimit}人以内に設定してください`);
        return false;
    }

    document.querySelector('.c-overlay').classList.add("is-closed");

    const studentNumberList = setTargetStudents(studentNumber);
    const timer = setInterval(function(){
        const shuffleStudent = shuffleArray(studentNumberList);
        showSeatBoxes(shuffleStudent);
    },100);

    soundPlay(timer);
});