
var maxChars = 144;
var textBox = document.getElementById('text_box');
textBox.addEventListener('keydown',function(){
    var note = document.getElementById('note');
    var text = "残り" + (maxChars - textBox.value.length) + "文字入力できます";
        note.textContent = text;
});

