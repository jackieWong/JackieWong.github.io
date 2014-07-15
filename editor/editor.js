/*事件操作*/
var EventUtil = {

    addHandler: function(element, type, handler){
		element.addEventListener(type, handler, false);
       /* if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }*/
    },
	getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
	preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
	stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}
//shorten getElementById
function $_(id){
	return document.getElementById(id);
	}

 SimpleEditor={
	editorArea:$_("textarea"),//编辑区域
	editorOpera:{   //各种操作按钮
			opbold:$_("bbtn"),
			opUnderline:$_("ubtn"),
			opItalic:$_("ibtn"),
			opForeColor:$_("fcbtn"),
			opBgColor:$_("bcbtn"),
			opLink:$_("lbtn"),
			opFontType:$_("fonttype"),
			opFontSize:$_("fontsize"),
			opAddPic:$_("phbtn"),
			opSave:$_("savebtn"),
			opCut:$_("cbtn"),
			opCopy:$_("cobtn"),
			opSelAll:$_("selectall"),
			opPaste:$_("pasbtn"),
			opJustifyCenter:$_("jstcbtn"),
			opJustifyLeft:$_("jstlbtn"),
			opJustifyRight:$_("jstrbtn"),
			opIndent:$_("indbtn")
		},
	setUp:function(){   //初始化,注册事件,调用函数都是SimpleEditor.opera
			editorArea=$_("textarea");
			opbold=$_("bbtn");
			opUnderline=$_("ubtn");
			opItalic=$_("ibtn");
			opForeColor=$_("fcbtn");
			opBgColor=$_("bcbtn");
			opLink=$_("lbtn");
			opFontType=$_("fonttype");
			opFontSize=$_("fontsize");
			opAddPic=$_("phbtn");
			opSave=$_("savebtn");
			opCut=$_("cbtn");
			opCopy=$_("cobtn");
			opSelAll=$_("selectall");
			opPaste=$_("pasbtn");
			opJustifyCenter=$_("jstcbtn");
			opJustifyLeft=$_("jstlbtn");
			opJustifyRight=$_("jstrbtn");
			opIndent=$_("indbtn");

			EventUtil.addHandler(opbold,"click",SimpleEditor.opera);
			EventUtil.addHandler(opUnderline,"click",SimpleEditor.opera);
			EventUtil.addHandler(opItalic, "click", SimpleEditor.opera);
			EventUtil.addHandler(opForeColor, "click", SimpleEditor.opera);
			EventUtil.addHandler(opBgColor, "click", SimpleEditor.opera);
			EventUtil.addHandler(opLink, "click",SimpleEditor.opera);
			EventUtil.addHandler(opAddPic, "click", SimpleEditor.opera);
			EventUtil.addHandler(opSave, "click", SimpleEditor.opera);
			EventUtil.addHandler(opCut, "click", SimpleEditor.opera);
			EventUtil.addHandler(opCopy, "click", SimpleEditor.opera);
			EventUtil.addHandler(opSelAll, "click", SimpleEditor.opera);
			EventUtil.addHandler(opPaste, "click", SimpleEditor.opera);
			EventUtil.addHandler(opJustifyCenter, "click", SimpleEditor.opera);
			EventUtil.addHandler(opJustifyLeft, "click", SimpleEditor.opera);
			EventUtil.addHandler(opJustifyRight, "click", SimpleEditor.opera);
			EventUtil.addHandler(opIndent, "click", SimpleEditor.opera);
			EventUtil.addHandler(opFontType, "change", SimpleEditor.opera);
			EventUtil.addHandler(opFontSize, "change", SimpleEditor.opera);


		/*for(var opera in SimpleEditor.editorOpera){
			if(opera!="opFontType" && opera!="opFontSize"){
				EventUtil.addHandler(SimpleEditor.editorOpera[opera],"click",SimpleEditor.opera);//按钮注册点击事件
			}
			else{
				EventUtil.addHandler(SimpleEditor.editorOpera[opera],"change",SimpleEditor.opera);//下拉菜单注册变动事件
			}
		}*/
	},
	opera:function(event){  //根据发生的事件对象选择执行命令
			var event=EventUtil.getEvent(event),
				eventTarget=EventUtil.getTarget(event),
				type="", //命令名称
				optData=null; //附加属性值
			switch(eventTarget.id){
				case "bbtn":type="bold";break;
				case "ubtn":type="underline";break;
				case "ibtn":type="italic";break;
				case "fcbtn":optData=window.prompt("input color value:","#000000");
							type="forecolor";break;
				case "bcbtn":optData=window.prompt("input color value:","#000000");
							type="backcolor";break;
				case "lbtn":optData=window.prompt("URL:","http://");
							type="createlink";break;
				case "fonttype":optData=eventTarget.value;
							type="fontname";break;
				case "fontsize":optData=eventTarget.value;
							type="fontsize";break;	
				case "phbtn":SimpleEditor.textAreaFocus();//插入前必须让编辑区域获得焦点
							optData=window.prompt("picture url","http://");
							type="insertimage";break;
				case "savebtn"://另存为只有IE支持,在新窗口打开,不然保存的是整个页面而不是编辑区域里面的内容
							var content=SimpleEditor.editorArea.innerHTML,
							fileName=$_("filename").value,
							openWindow=window.open("","");
							openWindow.document.write(content);
							openWindow.document.execCommand("saveas",fileName+".html");
							break;
				case "cbtn":type="cut";break;
				case "cobtn":type="copy";break;
				case "selectall":SimpleEditor.textAreaFocus(); //同样先得获得焦点
							type="selectall";
							break;
				case "pasbtn":SimpleEditor.textAreaFocus();
							type="paste";
							break;
				case "jstcbtn":SimpleEditor.textAreaFocus();
							type="justifycenter";
							break;
				case "jstlbtn":SimpleEditor.textAreaFocus();
							type="justifyleft";
							break;
				case "jstrbtn":SimpleEditor.textAreaFocus();
							type="justifyright";
							break;
				case "indbtn":type="indent";break;	
			}	
			SimpleEditor.exeCommand(type,optData);
			EventUtil.preventDefault(event);//阻止事件冒泡和默认事件
			EventUtil.stopPropagation(event);
		},
	exeCommand:function(type,optData){  //执行命令,type为命令类型,optData为附加值
			if(document.queryCommandEnabled(type)){ //测试是否可以执行
			document.execCommand(type,false,optData); //第二参数默认为false
			}
		},
	textAreaFocus:function(){ //使编辑区域获取焦点
			SimpleEditor.editorArea =$_("textarea");
			SimpleEditor.editorArea.focus();
		}
}
//SimpleEditor.setUp();
