/**
 * Created by Klein on 2017/9/7.
 */
$(function () {
    if(typeof(Storage)!=="undefined") {

    }
    else
    {
        alert("对不起，您的操作记录暂时无法保存");
    }

});

function saveText(){
    if(typeof(text) != "undefined")
        localStorage.text=text;
}

function saveStyleText(){
    if(typeof(style_text) != "undefined")
        localStorage.style_text=style_text;
}

function loadValue(){
    if(localStorage.text){
        editor.setValue(localStorage.text);
    }
    if(localStorage.style_text){
        style_editor.setValue(localStorage.style_text);
    }
}

function clearLocalStorage(){
    localStorage.clear();
    /*editor.setValue('');
    style_editor.setValue('');
    alert("清除成功");*/
    location.href="/index.html";
}
