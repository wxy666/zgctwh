//获取地址栏参数	request.get("");
var request = {
	get : function(val) { 
		var uri = window.location.search; 
		var re = new RegExp("" +val+ "=([^&?]*)", "ig"); 
		return decodeURI(((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null)); 
	}
};

var Public = {
	t_img : undefined,
	isLoad : true,
	/** 	判断图片是否加载完成
		className:类名 判断class包含className的所有图片
		callback:回调函数
	**/
	isImgLoad : function(className,callback){
		if(this.myBrowser() == "IE"){
			$('.'+className).each(function(){
				if($(this).height == 0){
					Public.isLoad = false;
					return false;
				}
			});
		}else{
			$('.'+className).each(function(){
				if(this.height == 0){
					Public.isLoad = false;
					return false;
				}
			});
		}
		if(this.isLoad){
			clearTimeout(this.t_img);
			callback();
		}else{
			this.isLoad = true;
			this.t_img = setTimeout(function(){
				Public.isImgLoad(className,callback);
			},500);
		}
	},
	//判断浏览器类型
	myBrowser : function(){
		var userAgent = navigator.userAgent;
		var isOpera = userAgent.indexOf("Opera") > -1;
		if (isOpera) {
			return "Opera"
		}
		if (userAgent.indexOf("Firefox") > -1) {
			return "FF";
		}
		if (userAgent.indexOf("Chrome") > -1){
			return "Chrome";
		}
		if (userAgent.indexOf("Safari") > -1) {
			return "Safari";
		}
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			return "IE";
		}
	},
	//动态加载JS,结合jsIsComplete()判断需要的数据是否加载完成
	loadJs : function(file) {
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var oScript = document.createElement("script");
		oScript.type = "text/javascript";
		oScript.src = file;
		oHead.appendChild(oScript);
	},
	/**判断JS是否加载完成  自调用jsIsComplete(arguments.callee);
		jsIsComplete(function(){
			if(typeof 需要的数据 != "undefined"){
				需要做的事情
			}else{
				jsIsComplete(arguments.callee);
			}
		});
	**/
	jsIsComplete : function(callback){
		setTimeout(function(){
			callback();
		},1);
	},
	/**	将指定数组分为多个数组
		array:需要分组的数组
		subGroupLength:长度
	**/
	group : function(array, subGroupLength) {
		var index = 0;
		var newArray = [];

		while(index < array.length) {
			newArray.push(array.slice(index, index += subGroupLength));
		}
		return newArray;
	},
	//判断arr数组中是否有str元素，没有返回-1
	indexOf : function(arr, str){
		// 如果可以的话，调用原生方法
		if(arr && arr.indexOf){
			return arr.indexOf(str);
		}
		var len = arr.length;
		for(var i = 0; i < len; i++){
			// 定位该元素位置
			if(arr[i] == str){
				return i;
			}
		}
		// 数组中不存在该元素
		return -1;
	},
	/**	判断图片是否存在
		path:需要检查的图片路径，相对于调用该方法的js或者html路径
		error_path:如果图片不存在，调用的图片（该图片必需存在，否则会导致内存溢出）
		exist:图片存在回调方法
		noexist:图片不存在回调方法
	**/
	imgIsExist : function(path,error_path,exist,noexist){
		$(".img_is_exist_20170512").remove();
		$("body").append("<img class='img_is_exist_20170512' style='display:none;' src='" + path + "' onerror=\"javascript:this.src='" + error_path + "'\"/>");
		
		isImgLoad('img_is_exist_20170512',function(){
			$(".img_is_exist_20170512").attr("src") == path ? exist() : noexist();
		});
	},
	//判断字符串是否为空
	isNotBlank : function(str){
		return (str != undefined && str != 'null' && str != '') ? true : false;
	}	
};

/** 在字符串末尾追加字符串 **/  
String.prototype.append = function (str) {  
    return this.concat(str);  
}

/** 比较两个字符串是否相等，也可以直接用 == 进行比较 **/
String.prototype.equals = function (str) {  
    if (this.length != str.length) {  
        return false;  
    }  
    else {  
        for (var i = 0; i < this.length; i++) {  
            if (this.charAt(i) != str.charAt(i)) {  
                return false;  
            }  
        }  
        return true;  
    }  
}

/** 检查字符串是否以subStr开头 **/  
String.prototype.startWith = function (subStr) {  
    if (subStr.length > this.length) {  
        return false;  
    }  
    return (this.indexOf(subStr) == 0) ? true : false;  
}

/** 检查字符串是否以subStr结尾 **/  
String.prototype.endWith = function (subStr) {  
    if (subStr.length > this.length) {  
        return false;  
    }  
    else {  
        return (this.lastIndexOf(subStr) == (this.length - subStr.length)) ? true : false;  
    }  
}

/** 判断字符串是否数字串 **/  
String.prototype.isAllNumber = function () {  
    for (var i = 0; i < this.length; i++) {  
        if (this.charAt(i) < '0' || this.charAt(i) > '9') {  
            return false;  
        }  
    }  
    return true;  
}

/** 将字符串反序排列 **/  
String.prototype.reserve = function () {  
    var temp = "";  
    for (var i = this.length - 1; i >= 0; i--) {  
        temp = temp.concat(this.charAt(i));  
    }  
    return temp;  
}

/** 去掉首尾空格 **/  
String.prototype.trim = function () {  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
} 

/** 保留数字 **/   
String.prototype.getNum = function () {  
    return this.replace(/[^d]/g, "");  
}

/** 保留字母 **/   
String.prototype.getEn = function () {  
    return this.replace(/[^A-Za-z]/g, "");  
}

/** 保留中文 **/   
String.prototype.getCn = function () {  
    return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");  
}

/*** 检查是否由数字组成 ***/   
String.prototype.isDigit = function() {   
  var s = this.Trim();   
  return (s.replace(/\d/g, "").length == 0);   
}