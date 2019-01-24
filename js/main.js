var text;
var editor;
var style_editor;
var style_text;

(function() {

    $(".editor-wrap").draggable();
    $(".editor-wrap").draggable("disable");
    $( ".editor-wrap" ).resizable({
        handles: "se"
    });
    /*$(".editor-wrap").dblclick(function(){
     if($(this).hasClass("ui-draggable-disabled"))
     {
     $(this).draggable("enable");
     }
     else
     $(this).draggable("disable");
     });*/

  $(function() {     //加载editor 和 style_editor
      /*var mixedMode = {
          name: "htmlmixed",
          scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
              mode: null},
              {matches: /(text|application)\/(x-)?vb(a|script)/i,
                  mode: "vbscript"}]
      };*/

      editor = CodeMirror.fromTextArea($('#editor').get(0), {
          mode: "htmlmixed",
          lineWrapping: true,
          lineNumbers: true,
          /*foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],*/
          styleActiveLine: true,
          showCursorWhenSelecting: true,
          theme: "duotone-light",
          selectionPointer: true,
          extraKeys: {
              "Ctrl": "htmlautocomplete",
              "F10": function (cm) {
                  if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                  else cm.setOption("fullScreen", true);
              },
              "Esc": function (cm) {
                  if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
              }},
          fullScreen:false
          /*viewportMargin: Infinity*/
      });
      CodeMirror.commands.htmlautocomplete = function (cm) {
          cm.showHint({hint: CodeMirror.hint.anyword});
      };
      editor.on('change', editorOnHandler2);

      style_editor= CodeMirror.fromTextArea($('#style-editor').get(0), {
          mode: 'text/css',
          lineNumbers: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
          lineWrapping: true,
          theme: "mdn-like",
          extraKeys: {"Ctrl": "autocomplete"}
          /*keyMap: 'sublime',
          extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},*/
      });
      style_editor.on('change', styleEditorOnHandler);

      $('#preview-style').text(style_editor.getValue());
      style_text=style_editor.getValue();
  });

  function editorOnHandler(cm, co) {
      //alert(co.from.line);
      $("#markdown-content").html(cm.getValue());

      $("#markdown-content *").mouseenter(function(){
          if(!$(this).hasClass("ui-draggable")) {
              $(this).draggable();
          }
          $(".ui-draggable").draggable({
              start:function(event, ui) {
                  ui.helper.addClass("chosen");
              },
              stop: function (event, ui) {
                  ui.helper.removeClass("chosen");
                  cm.setValue($("#markdown-content").html());
              }
          });
      });

      /*$("#markdown-content *").mouseleave(function(){
          $(this).removeClass("chosen");
      });*/

      $(".ui-draggable").draggable({
          stop: function (event, ui) {
             cm.setValue($("#markdown-content").html());
          }
      });
      text = cm.getValue();
      saveText();
  }

    function editorOnHandler2(cm, co) {
        $("#markdown-content").html(cm.getValue());
        text = cm.getValue();
        saveText();
    }

    function styleEditorOnHandler(cm, co) {
        $('#preview-style').text(cm.getValue());
        style_text = cm.getValue();
        saveStyleText();
    }

    function cssEdit(css){

    }

    document.onkeydown = function (event) {
        var event = event || window.event;
        var value= event.keyCode ;
        var key = String.fromCharCode(value);
        if (event.keyCode == 81 && event.ctrlKey) {  //ctrl+q   查看源代码
            alert($("#markdown-content").html());
        }
        if (event.keyCode == 77 && event.ctrlKey) {  //ctrl+m    显示背景demo
            $("#demo").fadeToggle();
        }
        if (event.keyCode == 66 && event.ctrlKey) {  //ctrl+b   设置所有内元素可拖动属性
            if(!$('#editor').hasClass("can-drag")){
                editor.on('change', editorOnHandler);
                editor.setValue(editor.getValue());
                $('#editor').addClass("can-drag");
            }
            else{
                editor.on('change', editorOnHandler2);
                editor.setValue(editor.getValue());
                $('#editor').removeClass("can-drag");
                disableAllDrag();
            }
            /*$( ".editor-wrap" ).draggable("destroy");
             disableAllDrag();*/
        }
        if (event.keyCode == 85 && event.ctrlKey) {  //ctrl+u   设置editor-wrap可拖动属性
            if($(".editor-wrap").hasClass("ui-draggable-disabled"))
            {
                $(".editor-wrap").draggable("enable");
            }
            else
                $(".editor-wrap").draggable("disable");
        }
        if (event.keyCode == 73 && event.ctrlKey) {  //ctrl+i   清楚浏览器缓存
            clearLocalStorage();
        }

        //alert("the key is "+key+" and the value is "+value);
    };

    function disableAllDrag(){
        $( ".ui-draggable" ).removeClass("ui-draggable");
        $( ".ui-draggable-handle" ).removeClass("ui-draggable-handle");
        $( ".ui-draggable-dragging" ).removeClass(" ui-draggable-dragging");
        editor.setValue($("#markdown-content").html().replace(' class=""',""));
    }

})();
