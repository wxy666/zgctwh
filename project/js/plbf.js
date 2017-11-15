//Res.plbfObject在res.js中定义。直接能使用

var Plbf = {
	isSelAll : false,	//是否全选状态
	isMore : false,		//是否多选播放
	idStr : "",			//批量播放ID串  ';'分割
	moreIndex : 1,		//点击“开始播放”：为1时播放‘播放列表’的第一个，否则执行播放器“播放”，“暂停”
	init : function(){
		this.idStr = "";
		this.moreIndex = 1;
		this.isMore = false;
		this.isSelAll = false;
		player.thePlayer.stop();
		$(".leftCenter li").eq(1).text("多选");
		$(".startPlay span").removeClass().text("开始播放");
	},
	selAll : function(){
		if($(".leftCenter li").eq(1).text().equals("多选")) $(".leftCenter li").eq(1).click();
		
		if(this.isSelAll){
			this.isSelAll = false;
			$("input[name='checkbox']").attr("checked",false);
		}else{
			this.isSelAll = true;
			$("input[name='checkbox']").attr("checked",true);
		}
	}
};

var player = {
	div_id : "jwplayer_play",
	thePlayer : undefined,		//jwplayer播放器对象
	_playList : undefined,		//播放列表json串
	isMp4 : undefined,			//是否是MP4
	cur_obj : undefined,		//当前播放列表对象<数组>
	seeks : undefined,			//跳过片头（秒）
	cur_play : 0,				//当前播放列表中的第几个
	INDEX : 1,					//为1时播放片头
	play : function(){
		setTimeout(function(){
			if(Res.plbfObject == undefined){
				player.play();
			}else{
				player.genPlayLists(Res.plbfObject);
				player.bindEvents();
			}
		},1);
	},
	genPlayLists : function(obj){
		this.genBatchPlayHtml();
		this.genContentForHtml(obj);
	},
	genBatchPlayHtml : function(){
		var htmlStr = '<div id="batchPlay">';
		htmlStr += '<div class="batch-bg">';
		htmlStr += '<p class="batch-back"></p>';
		htmlStr += '<div class="batchVideoLeft">';
		htmlStr += '<div class="leftTop"><span>播放列表</span></div>';
		htmlStr += '<ul class="leftCenter"><li>全选</li><li>多选</li></ul>';
		htmlStr += '<div class="checkList"><ul>';
		htmlStr += '</ul></div>';
		htmlStr += '<div class="startPlay"><span>开始播放</span></div>';
		htmlStr += '</div>';
		htmlStr += '<div class="BatchVideoRight">';
		htmlStr += '<div class="rightBox">';
		htmlStr += '<h1></h1>';
		htmlStr += '<div class="checkVideo" id="' + this.div_id + '"></div>';
		htmlStr += '</div>';
		htmlStr += '</div>';
		htmlStr += '</div>';
		htmlStr += '</div>';
		$(".content").after(htmlStr);
		$(".list").before("<em id='plbf'></em>");
		
		$("#plbf").on("click",function(){
			$("#batchPlay").css("display","block");
			$("body").css("overflow","hidden");
			player.genContentForHtml(Res.plbfObject);
		});
		$(".batch-back").on("click",function(){
			$("#batchPlay").css("display","none");
			$("body").css("overflow","");
			Plbf.init();
		});
	},
	genContentForHtml : function(obj){
		var contentStr = "";
		var _index = 0;
		$.each(obj,function(k,v){
			if(v.fileUrl != ''){
				var className = k == 0 ? "active" : "";
				contentStr += '<li class="'+className+'"><input type="checkbox" name="checkbox" id="checkbox_li_'+_index+'" value="'+v.id+'"/><label for="checkbox_li_'+_index+'" onclick="changeVideo('+_index+');">'+v.fileName+'</label></li>';
				_index++;
			}
		});
		$(".checkList ul").html(contentStr);
		$("input[name='checkbox']").css("display","none");
		this.genPlayList(obj);
	},
	genPlayList : function(obj){
		this.isMp4 = Res.c3Name.indexOf("民乐欣赏") != -1 ? false : true;
		this.seeks = (Res.c3Name.indexOf("民乐欣赏") != -1) ? 0 : 18;
		this.INDEX = 1;
		this.cur_play = 0;
		this.cur_obj = this.clearEmpty(obj);
		
		this._playList = "[";
		$.each(obj,function(k,v){
			if(player.isMp4){
				var img_url = v.imgUrl.split(";")[0];
				img_url = img_url.indexOf(" ") == -1 ? img_url : "../images/all_bg.jpg";
			}else{
				var img_url = "../images/ismp3.jpg";
			}
			if(v.fileUrl != '')
			player._playList += "{file: '"+v.fileUrl+"',image:'" + img_url + "'}" + (k != Res.plbfObject.length - 1 ? "," : "");
		});
		this._playList += "]";
		
		this.thePlayer = jwplayer(this.div_id).setup({
			autostart: false,
			controlbar: 'over',
			showeq: true,
			showvolume :true,
			overstretch:true,
			playlist: eval(player._playList),
			flashplayer: "jwplayer.flash.swf",
			shuffle:false,
			primary:"video",
			width:778,
			height:438,
			events: {
                onPlay : function(){
					if(Plbf.idStr.equals("") && Plbf.isMore && Plbf.moreIndex == 1){
						setTimeout(function(){
							player.thePlayer.stop();
						},100);
					}else{
						$(".startPlay span").removeClass().addClass("zt").text("暂停播放");
					}
				},
                onPause : function(){
					$(".startPlay span").removeClass().text("开始播放");
				}
            }
		});
		
		//列表循环播完后执行
		this.thePlayer.onPlaylistComplete(function(){
			// player.INDEX = 1;
			// player.cur_play = 0;
			// $(".startPlay span").removeClass().text("开始播放");
			player.genPlayList(obj);
			player.INDEX = 2;
			player.thePlayer.playlistItem(0);
		});
		
		//自动播放下一个
		this.thePlayer.onPlaylistItem(function(){
			if(player.INDEX != 1) player.thePlayer.seek(player.seeks);	//如果INDEX=1，不跳过片头
			$("#checkbox_li_" + player.cur_play).parent().addClass("active").siblings().removeClass();
			$(".rightBox h1").html(player.cur_obj[player.cur_play].fileName);
			player.INDEX++;
			player.cur_play++;
		});
	},
	changeVideo : function(e){
		this.INDEX = 1;
		this.cur_play = e; 
		$("#checkbox_li_" + e).parent().addClass("active").siblings().removeClass();
		$(".rightBox h1").html(this.cur_obj[e].fileName);
		this.thePlayer.playlistItem(e);
	},
	clearEmpty : function(obj){
		var arr = new Array();
		$.each(obj,function(k,v){
			if(v.fileUrl != '')arr.push(v);
		});
		return arr;
	},
	startPlay : function(){
		if(Plbf.isMore){
			$("input[name='checkbox']:checkbox:checked").each(function(){
				if($(this).css("display") != 'none')
				Plbf.idStr += $(this).val() + ";";
			});
			var arr = new Array();
			$.each(Res.plbfObject,function(k,v){
				if(Plbf.idStr.indexOf(v.id+";") != -1){
					arr.push(v);
				}
			});
			
			if(Plbf.idStr != "" && Plbf.moreIndex == 1){
				this.genContentForHtml(arr);
				this.thePlayer.playlistItem(0);
				Plbf.moreIndex++;
			}else if(Plbf.idStr != "" && Plbf.moreIndex != 1){
				if($(".startPlay span").hasClass("zt")){
					this.thePlayer.play();
				}else{
					this.thePlayer.pause();
				}
			}else{
				return;
			}
		}else{
			if(this.cur_play == 0){
				this.thePlayer.playlistItem(0);
			}else{
				if($(".startPlay span").hasClass("zt")){
					this.thePlayer.play();
				}else{
					this.thePlayer.pause();
				}
			}
		}
	},
	bindEvents : function(){
		//全选
		$(".leftCenter li").eq(0).click(function(){
			Plbf.selAll();
		});
		
		//开始播放
		$(".startPlay span").click(function(){
			player.startPlay();
		});
		
		//多选
		$(".leftCenter li").eq(1).click(function(){
			if($(this).text().equals("多选")){
				Plbf.isMore = true;
				Plbf.isSelAll = false;
				$(this).text("取消");
				player.thePlayer.stop();
				$(".startPlay span").removeClass().text("开始播放");
				$("input[name='checkbox']").attr("checked",false).css("display","inline-block");
				$(".checkList ul li").removeClass().find("label").removeAttr("onclick");
			}else{
				Plbf.init();
				player.genContentForHtml(Res.plbfObject);
			}
			
		});
	}
};

$(document).ready(function(){
	player.play();
});

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

function changeVideo(e){
	player.changeVideo(e);
}