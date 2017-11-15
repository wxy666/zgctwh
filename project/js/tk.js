var Tk = {
	id : request.get("id"),
	c1Ename : request.get("c1Ename"),
	c1Name : request.get("c1Name"),
	c2Name : request.get("c2Name"),
	c3Name : request.get("c3Name"),
	c4Name : request.get("c4Name"),
	isAll : request.get("isAll"),
	player_div_id : "video-box",
	fileName : undefined,
	fileUrl : undefined,
	detail : undefined,
	imgUrl : undefined,
	nomp4img : undefined,
	index : 0,
	_size : 0,
	init : function(){
		Public.loadJs("../js/res/" + this.c1Ename + ".js");
		Public.jsIsComplete(function(){
			if(typeof data != "undefined"){
				if(eval(Tk.isAll)){
					Tk.setColumns();
				}else{
					Tk.setObject();
				}
				if(Tk.fileName != undefined){
					$(".name").html("<a><img src='../images/resource_bgi/"+Tk.c1Name+"/"+Tk.fileName+".png' onerror=\"javascript:this.src='../images/onerror.png'\"/></a>");
				}
				// if(c1Ename != undefined && c1Ename != '' && c1Ename != 'null' && fileName != undefined){
					// imgIsExist("../images/project_bgi/"+c1Name+"/"+fileName+".jpg","../images/onerror.png",function(){
						// $("body").css("background-image","url(../images/project_bgi/"+c1Name+"/"+fileName+".jpg)");
					// },function(){
						// $("body").css("background-image","url(../images/project_bgi/bgi_"+c1Ename+".jpg)");
					// });
				// }
			}else{
				Public.jsIsComplete(arguments.callee);
			}
		});
	},
	getViewName : function(name){
		return name.indexOf('.') == -1 ? name : name.substring(name.indexOf('.') + 1,name.length);
	},
	isExist : function(obj){
		var flag = false;
		$.each(obj,function(k,v){
			if(v.id.equals(Tk.id)){
				flag = true;
			}
		});
		return flag;
	},
	setColumns : function(){
		$.each(data,function(k,v){
			if(!$.isArray(v)){
				$.each(v,function(kk,vv){
					if(!$.isArray(vv)){
						$.each(vv,function(kkk,vvv){
							if($.isArray(vvv)){
								if(Tk.isExist(vvv)){
									Tk.c2Name = k;
									Tk.c3Name = kk;
									Tk.c4Name = kkk;
								}
							}
						});
					}else{
						if(Tk.isExist(vv)){
							Tk.c2Name = k;
							Tk.c3Name = kk;
						}
					}
				});
			}else{
				if(Tk.isExist(v)) Tk.c2Name = k;
			}
		});
		this.setObject();
	},
	setObject : function(){
		var datas = data;
		if(Public.isNotBlank(this.c2Name)){
			datas = data[this.c2Name];
		}
		if(Public.isNotBlank(this.c3Name)){
			datas = data[this.c2Name][this.c3Name];
		}
		if(Public.isNotBlank(this.c4Name)){
			datas = data[this.c2Name][this.c3Name][this.c4Name];
		}
		// console.log("一级栏目："+this.c1Name+"\t\n二级栏目："+this.c2Name+"\t\n三级栏目："+this.c3Name+"\t\n四级栏目："+this.c4Name);
		// console.log(data);
		// console.log(datas);
		$.each(datas,function(k,v){
			if(v.id.equals(Tk.id)){
				Tk.fileName = v.fileName;
				Tk.fileUrl = v.fileUrl;
				Tk.detail = v.detail;
				Tk.imgUrl = v.imgUrl;
				Tk.nomp4img = v.noMp4Img;
			}
		});
		
		this.toPlay();
	},
	toPlay : function(){
		$(".videoRight .airt").html(this.detail);
		
		//生成专题名称
		var projectStr = "";
		for(j = 0;j < this.getViewName(this.c1Name).length;j++){
			projectStr += "<span class='logoName'>"+this.getViewName(this.c1Name)[j]+"</span>";
		}
		$(".tk_logo p").html(projectStr);
		
		//生成轮播图
		var ss = this.imgUrl.split(";");
		var imgList = ""; 
		var imgName = "";
		for(j = 0;j < ss.length-1;j++){
			imgName = ss[j].substring(ss[j].lastIndexOf("/") + 1,ss[j].length - 4);
			imgList += "<li><a class='group' dhref='" + ss[j] + "' dtitle='" + Tk.fileName + "'><div><img src='" + ss[j] + "' title='" + imgName + "'/></div></a></li>";
		}
		$(".videoUl").empty();
		$(".videoUl").html(imgList);
		
		$(".title").attr("title",this.fileName).text(this.fileName);
		this._play()
		
		//生成左右按钮
		var btn = "<div class='btn'>";
		btn +="<div class='preNext pre'></div>"+"<div class='preNext next'></div>";
		btn += "</div>";
		$(".banner").append(btn);
		
		//图片鼠标划过
		$('.videoUl li').hover(function(){
			$('.btn div.pre,.btn div.next').stop(true,false).animate({opacity:'0.8'},500);
		},function(){
			$('.btn div.pre,.btn div.next').stop(true,false).animate({opacity:'0.1'},500);
		});
		
		$('.preNext').hover(function(){
			$('.btn div.pre,.btn div.next').stop(true,false).animate({opacity:'0.8'},500);
		},function(){
			$('.btn div.pre,.btn div.next').stop(true,false).animate({opacity:'0.1'},500);
		});
			
		//上一页按钮
		$(".pre").click(function() {
			Tk.index--;
			Tk.move();
		});
		//下一页按钮
		$(".next").click(function() {
			Tk.index++;
			Tk.move();
		});	
		if(ss.length <= 2){
			$(".btn").css("display","none");
		}else{
			var clone=$(".videoUl li").first().clone();
			$(".videoUl").append(clone);
			this._size = $(".videoUl li").size();
			$(".btn").css("display","block");
		}
		
		$(".group").colorbox(800,560);
	},
	move : function(){
		if(this.index == this._size){
			$(".videoUl").css({left:0});
			this.index = 1;
		}
		if(this.index == -1){
			$(".videoUl").css({left:-(this._size - 1) * 452})
			this.index = this._size - 2;
		}
		$(".videoUl").stop(true,false).animate({left:-this.index * 452},500)			
	},
	_play : function(){
		if(Public.isNotBlank(this.fileUrl)){
			var bgiPath = "../images/all_bg.jpg";
			if(this.fileUrl.substring(this.fileUrl.lastIndexOf(".") + 1,this.fileUrl.length).equals("mp3")){
				bgiPath = "../images/ismp3.jpg";
			}
			var player = jwplayer(this.player_div_id).setup({
				autostart : false,
				controlbar : 'over',
				showeq : true,
				image : bgiPath,
				file : this.fileUrl,
				flashplayer : "../player/jwplayer.flash.swf",
				primary : "video",
				width : 452,
				height : 252
			});
		}else{
			$("#"+this.player_div_id).empty().removeClass().addClass(this.player_div_id).removeAttr("style").css("background-image","url('" + this.nomp4img + "')").css("background-size","100% 100%");
		}
	},
	goBack : function(){
		window.location.href = "../res/public.html?ename=" + this.c1Ename + (Public.isNotBlank(this.c2Name) ? "&second=" + encodeURI(this.c2Name) : "")
							+(Public.isNotBlank(this.c3Name) ? "&third=" + encodeURI(this.c3Name) : "")
							+(Public.isNotBlank(this.c4Name) ? "&four=" + encodeURI(this.c4Name) : "");
	}
};

$(function(){
	Tk.init();
	
	$("#returnProject").on("click",function(){
		Tk.goBack();
	});
	
	$(".cs").on("click",function(){
		$("#correctBox").css("display","block");
	});
	
	$(".videoBack").on("click",function(){
		$("#correctBox").css("display","none");
		$(".textSelect i").removeClass();
	});
});