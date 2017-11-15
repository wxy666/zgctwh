var Res = {
	c1Ename : request.get("ename"),
	second : request.get("second"),
	third : request.get("third"),
	four : request.get("four"),
	c1Name : '',
	c1SpellName : '',
	c2Name : '',
	c3Name : '',
	c4Name : '',
	plbfObject : undefined,
	init : function(){
		this.c1SpellName = all_spell[Public.indexOf(enames,this.c1Ename)];
		
		this.c1Name = names[Public.indexOf(enames,this.c1Ename)];
		//alert(this.c1Name)
		
		this.htmlView();
		this.loadjs();
		
	},
	getViewName : function(name){
		return name.indexOf('.') == -1 ? name : name.substring(name.indexOf('.') + 1,name.length);
	},
	htmlView : function(){
		var t_ename = this.getViewName(this.c1SpellName);
		$(".box-title span").html(t_ename.indexOf("ZHONGGUORENDE") != -1 ? t_ename.substring(t_ename.indexOf("ZHONGGUORENDE") + 13,t_ename.length) : t_ename);
		$(".box-title p").html(this.getViewName(this.c1Name));
	},
	loadjs : function(){
		
		Public.loadJs("../js/res/" + this.c1Ename + ".js");
		Public.jsIsComplete(function(){
			if(typeof data != "undefined"){
				Res.checkColumnGrade();
			}else{
				Public.jsIsComplete(arguments.callee);
			}
		});
	},
	checkColumnGrade : function(){
		console.log(this.c1Name)
		var column = columns[this.c1Name];
		console.log(column)
		if(column == ""){			
			this.genContent();//没有nav
		}else{
			this.genSecondColumns(column);
			
		}
	},
	genSecondColumns : function(column){
		var column2Str = "";
		var third_index = 0;
		var index = 0;
		var hasThird = false;
		$.each(column,function(k,v){
			var classs = "";		
			if(typeof v == "object"){
				
				$.each(v,function(kk,vv){
					if(third_index == 0 && index == 0 && !Public.isNotBlank(Res.second)){
						Res.c2Name = kk;
						classs = "active";
						hasThird = true;
					}else if(Public.isNotBlank(Res.second) && kk.equals(Res.second)){
						Res.c2Name = kk;
						classs = "active";
						hasThird = true;
					}
					column2Str += "<li pname='" + kk + "' class='" + classs + "'><a href='javascript:void(0);' onclick='clickSecond(this,true);'>" + Res.getViewName(kk) + "</a></li>/";
				});
				third_index++;
			}else{
				
				if(k == 0 && !Public.isNotBlank(Res.second)){
					
					Res.c2Name = v;
					
					classs = "active";
				}else if(Public.isNotBlank(Res.second) && v.equals(Res.second)){
					Res.c2Name = v;
					classs = "active";
				}
				column2Str += "<li pname='" + v + "' class='" + classs + "'><a href='javascript:void(0);' onclick='clickSecond(this,false);'>" + Res.getViewName(v) + "</a></li>/";
			}
			index++;
		});
		column2Str = column2Str.substring(0,column2Str.length-1);
		$(".second_ul").html(column2Str);
		
		if(hasThird){
			alert(this.c2Name+"11")
			this.genThirdColumns(this.genSecondObject()[this.c2Name]);
			
		}else{
			this.genContent();
			
		}
	},
	genSecondObject : function(){
		var tc = "";
		$.each(columns[this.c1Name],function(k,v){
			if(typeof v == "object"){
				$.each(v,function(kk,vv){
					if(kk.equals(Res.c2Name)){
						tc = v;
						return false;
					}
				});
			}
		});
		return tc;
	},
	genThirdColumns : function(column){
		var column3Str = "";
		var index = 0;
		$.each(column,function(k,v){
			var classs = "";
			if(typeof v == "object"){
				$.each(v,function(kk,vv){
					if(index == 0 && !Public.isNotBlank(Res.third)){
						Res.c3Name =  kk;
					} else if(Public.isNotBlank(Res.third) && kk.equals(Res.third)){
						Res.c3Name = kk;
					}
					column3Str += "<div><li><span pname='"+kk+"' style='font-weight:bold;'>"+Res.getViewName(kk)+"&nbsp;:</span>&nbsp;&nbsp;";
					
					$.each(vv,function(kkk,vvv){
						if(kkk == 0 && index == 0 && !Public.isNotBlank(Res.four)){
							classs = "active";
							Res.c4Name = vvv;
						} else if(Public.isNotBlank(Res.four) && vvv.equals(Res.four)){
							classs = "active";
							Res.c4Name = vvv;
						}
						column3Str += "<a pname='"+vvv+"' class='"+classs+" c4' style='font-size:12px;' href='javascript:void(0);' onclick='clickThird(this)'>"+Res.getViewName(vvv)+"</a>&nbsp;&nbsp;";
						classs = '';
					});
					column3Str += "</li></div>";
				});
			}else{
				if(k == 0 && index == 0 && !Public.isNotBlank(Res.third)){
					Res.c3Name =  v;
					classs = "active";
				} else if(Public.isNotBlank(Res.third) && v.equals(Res.third)){
					Res.c3Name = v;
					classs = "active";
				}
				column3Str += "<li pname='"+v+"' class='" + classs + " c3'><a href='javascript:void(0);' onclick='clickThird(this)'>"+Res.getViewName(v)+"</a></li>";
			}
			index++;
		});
		$(".third_ul").html(column3Str);
		this.genContent();
	},
	clickSecond : function(obj,flag){
		this.c4Name = "";
		this.c3Name = "";
		this.second = "";
		this.third = "";
		this.four = "";
		$(".third_ul").html("");
		$(obj).parent().addClass("active").siblings().removeClass("active");
		
		this.c2Name = $(obj).parent().attr("pname");
		if(flag){
			
			this.genThirdColumns(this.genSecondObject()[this.c2Name]);
		}else{
			
			this.genContent();
		}
	},
	clickThird : function(obj){
		this.c4Name = "";
		this.second = "";
		this.third = "";
		this.four = "";
		if(Public.isNotBlank($(obj).attr("pname"))){
			$(".third_ul div a").removeClass("active");
			$(".third_ul li").removeClass("active");
			$(obj).addClass("active");
			this.c3Name = $(obj).siblings("span").attr("pname");
			this.c4Name = $(obj).attr("pname");
			this.genContent();
		}else{
			$(".third_ul div a").removeClass("active");
			$(obj).parent().addClass("active").siblings().removeClass("active");
			this.c3Name = $(obj).parent().attr("pname");
			this.genContent();
		}
	},
	genContent : function(){
		// if(Public.isNotBlank(Res.third) && !Public.isNotBlank(Res.four)){
			// this.c4Name = '';
			// $(".c4").removeClass("active");
		// }
		// if(Public.isNotBlank(Res.second) && !Public.isNotBlank(Res.third)){
			// this.c3Name = '';
			// $(".c3").removeClass("active");
		// }
		// if(Public.isNotBlank(Res.first) && !Public.isNotBlank(Res.second)){
			// this.c2Name = '';
		// }
		// console.log(this.c1Name);
		// console.log(this.c2Name);
		// console.log(this.c3Name);
		// console.log(this.c4Name);
		var datas = data;
		//alert(JSON.stringify(datas))
		Test.object = questions[this.c1Name];
		//alert(JSON.stringify(Test.object))
		
		if(Public.isNotBlank(this.c2Name)){
			datas = data[this.c2Name];
			if(Test.object[this.c2Name] != undefined){
				Test.object = Test.object[this.c2Name];
				Test.name = this.c2Name;
			}
		}
		
		this.plbfObject = this.getPlbfObject(datas);
		
		if(Public.isNotBlank(this.c3Name)){
			datas = data[this.c2Name][this.c3Name];
		}
		if(Public.isNotBlank(this.c4Name)){
			datas = data[this.c2Name][this.c3Name][this.c4Name];
		}
		
		this.plbfObject = this.plbfObject.length > 50 ? datas : this.plbfObject;
		
		var globalSS="";
		var otherGLobalSS="";
		var _ul = $(".videoList ul");
		var  ul = $(".temList ul")
		var contentStr = "";
	
		$.each(datas,function(k,v){
			globalSS += "<li pid='"+v.id+"'><a class='pictureBox'><img src='"+v.imgUrl.split(";")[0]+"'/></a><span class='titleBox'><h1 title='"+v.fileName+"'>"+v.fileName+"</h1><div class='p-first'>"+v.detail+"</div></span></li>";	
			otherGLobalSS+="<li pid='"+v.id+"'><h1 title='"+v.fileName+"'>"+v.fileName+"</h1></li>";
		});
		
		_ul.html(globalSS);
		ul.html(otherGLobalSS);
		genClickEvent();
		Test.genTest();
	},
	getPlbfObject : function(obj){
		var temp_arr = new Array();
		$.each(obj,function(k,v){
			if(typeof k == 'string'){
				$.each(v,function(kk,vv){
					if(typeof kk == 'string'){
						$.each(vv,function(kkk,vvv){
							temp_arr.push(vvv);
						});
					}else{
						temp_arr.push(vv);
					}
				});
			}else{
				temp_arr.push(v);
			}
		});
		return temp_arr;
	},
	toPlay : function(id){
		var url = "tk.html?id="+id+"&c1Name="+encodeURI(this.c1Name)+"&c1Ename="+encodeURI(this.c1Ename);
		if(Public.isNotBlank(this.c2Name)){
			url += "&c2Name="+encodeURI(this.c2Name);
			
		}
		if(Public.isNotBlank(this.c3Name)){
			url += "&c3Name="+encodeURI(this.c3Name);
		}
		if(Public.isNotBlank(this.c4Name)){
			url += "&c4Name="+encodeURI(this.c4Name);
		}
		window.open(url);
	}
};

var Test = {
	index : 1, //第几题
	totalNum : 0,	//总题数
	object : undefined,	//试题对象
	name : '',
	genTest : function(){
		this.totalNum = 0;
		this.index = 1;
		
		$.each(this.object,function(k,v){
			Test.totalNum = parseInt(k);
		});
		
		if(this.totalNum != 0){
			this.setQuestion(this.index);
			$(".cs").show();
		}else{
			$(".cs").hide();
		}
	},
	setQuestion : function(i){
		$(".position").html(Res.getViewName(this.name));
		$(".btn ul li").css("background-color","#e5d1b6");
		if(this.totalNum == 1){
			// $(".totalQuestions").empty();
			$(".btn ul li").hide();
		}else{
			$(".btn ul li").show();
			if(i == 1){
				$(".btn ul li").eq(0).css("background-color","#cccccc");
			}else if(i == this.totalNum){
				$(".btn ul li").eq(1).css("background-color","#cccccc");
			}else{
				$(".btn ul li").css("background-color","#e5d1b6");
			}
			// $(".totalQuestions").html(i+"/"+this.totalNum);
		}
		
		var question = Test.object[i].question;	//题目
		question = question.substring(question.indexOf('.'),question.length);
		question = i + question;
		var options = Test.object[i].option;	//选项串（未分割）
		var answer = Test.object[i].answer;		//答案
		var option_arr; //选项数组
		
		option_arr = options.split("B");
		
		//试题选项
		var a = option_arr[0];
		var b = ("B"+option_arr[1]).split("C")[0];
		var c = ("C"+("B"+option_arr[1]).split("C")[1]).split("D")[0];
		var d = ("C"+("B"+option_arr[1]).split("C")[1]).split("D")[1] == undefined ? "" : "D"+("C"+("B"+option_arr[1]).split("C")[1]).split("D")[1];
		
		option_arr[0] = a;
		option_arr[1] = b;
		option_arr[2] = c;
		if(d != ''){
			option_arr[3] = d;
		}
		
		var option_str = ""; //答案html
		for(i in option_arr){
			option_str += "<li><span answer='"+option_arr[i].substring(0,1)+"'><i></i></span>"+option_arr[i]+"</li>";
		}
		$(".textSelect").html(option_str);
		$(".testList p").html(question);
		
		$(".textSelect li").click(function(){
			$(".textSelect i").removeClass();
			if($(this).children().attr("answer").equals(answer)){
				$(this).children().children().addClass("true");
			}else{
				$(this).children().children().addClass("false");
			}
		});
	},
	pref : function(){
		if(this.index == 1){
			return;
		}else{
			this.index--;
			this.setQuestion(this.index);
		}
	},
	next : function(){
		if(this.index == this.totalNum){
			return;
		}else{
			this.index++;
			this.setQuestion(this.index);
		}
	},
	open : function(){
		this.setQuestion(this.index);
		$("#correctBox").css("display","block");
	},
	close : function(){
		this.index = 1;
		$("#correctBox").css("display","none");
		$(".textSelect i").removeClass();
	}
};

$(function(){
	Res.init();
	
	var $select =$(".list li")
	$select.eq(0).on("click",function(){
		$(this).removeClass();
		$(this).addClass("tpSelect").siblings().removeClass("wzSelect").addClass("wz");
		$(".videoList").addClass("on").siblings().removeClass("on");
	});
	
	$select.eq(1).on("click",function(){
		$(this).removeClass();
		$(this).addClass("wzSelect").siblings().removeClass("tpSelect").addClass("tp");
		$(".temList").addClass("on").siblings().removeClass("on");
	});
	
	$(".cs").on("click",function(){
		Test.open();
	});
	
	$(".videoBack").on("click",function(){
		Test.close();
	});
	
	//上一题
	$(".btn ul li").eq(0).click(function(){
		Test.pref();
	});
	
	//下一题
	$(".btn ul li").eq(1).click(function(){
		Test.next();
	});
});

function genClickEvent(){
	$(".videoList li").click(function(){
		$(this).find("h1").css("color","#333333");
		var id = $(this).attr("pid");
		Res.toPlay(id);
	});
	
	$(".temList li").click(function(){
		var id = $(this).attr("pid");
		Res.toPlay(id);
	});
}

function clickSecond(obj,flag){
	Res.clickSecond(obj,flag);
}

function clickThird (obj){
	Res.clickThird (obj);
}