var index = 0;
var projectNum = 1;	//每次加载几个专题
var groupEmenus = Public.group(enames,projectNum);
var groupMenus = Public.group(names,projectNum);

//加载数据
function appenData(_this){
	if(index == 0){
		for(i in groupEmenus[index]){
			var str = "<div class='videoSubject'><h1 class='logo'><img class='' src='../images/res/" + groupEmenus[index][i] + ".png' alt='"+ groupMenus[index][i] +"' ename='"+groupEmenus[index][i]+"'/></h1><ul>";
			var textstr = "<div class='textSubject'><h1 class='logo'><img class='' src='../images/res/" + groupEmenus[index][i] + ".png' alt='"+ groupMenus[index][i] +"' ename='"+groupEmenus[index][i]+"'/></h1><ul>";
			$.each(allmenu[groupEmenus[index][i]],function(k,v){
				str += "<li pid='"+v.id+"'><a class='pictureBox'><img class='' src='"+ v.imgUrl.split(";")[0] +"'/></a>";
				str += "<span class='titleBox'><h2>"+ v.fileName +"</h2><div class='p-first'>"+ v.detail +"</div></span></li>";
				textstr += "<li pid='"+v.id+"'><h3>"+ v.fileName +"</h3></li>";
			});
			str += "</ul></div>";
			textstr += "</ul></div>";
			$(".videoList").append(str);
			$(".temList").append(textstr);
		}
		
		index++;
		if(groupEmenus[index] == undefined){
			$(".more").hide();
		}
		window.scrollTo(0,0);
	}else{
		var tstr = "<div class='videoList hidden'>";
		var ttextstr = "<div class='temList hidden'>";
		var str = "";
		var textstr = "";
		$(_this).text("").parent().css("background","url('../images/loading6.gif') no-repeat center");
		for(i in groupEmenus[index]){
			str += "<div class='videoSubject'><h1 class='logo'><img class='' src='../images/res/" + groupEmenus[index][i] + ".png' alt='"+ groupMenus[index][i] +"' ename='"+groupEmenus[index][i]+"'/></h1><ul>";
			textstr += "<div class='textSubject'><h1 class='logo'><img class='' src='../images/res/" + groupEmenus[index][i] + ".png' alt='"+ groupMenus[index][i] +"' ename='"+groupEmenus[index][i]+"'/></h1><ul>";
			$.each(allmenu[groupEmenus[index][i]],function(k,v){
				str += "<li pid='"+v.id+"'><a class='pictureBox'><img class='' src='"+ v.imgUrl.split(";")[0] +"'/></a>";
				str += "<span class='titleBox'><h2>"+ v.fileName +"</h2><div class='p-first'>"+ v.detail +"</div></span></li>";
				textstr += "<li pid='"+v.id+"'><h3>"+ v.fileName +"</h3></li>";
			});
			str += "</ul></div>";
			textstr += "</ul></div>";
			tstr += str;
			ttextstr += textstr;
		}
		tstr += "</div>";
		ttextstr += "</div>";
		$(".videoList").after(tstr);
		$(".temList").after(ttextstr);
		
		Public.isImgLoad("cover",function(){
			$(".videoList").append(str);
			$(".temList").append(textstr);
			$(".videoList").eq(1).remove();
			$(".temList").eq(1).remove();
			$(_this).text("加载更多...").parent().css("background","");
			
			$(".videoList li").click(function(){
				var id = $(this).attr("pid");
				var projectName = $(this).parent().parent().find("h1").find("img").attr("alt");
				var projectEN = $(this).parent().parent().find("h1").find("img").attr("ename");
				toPlay(id,projectName,projectEN);
			});
			
			$(".temList li").click(function(){
				var id = $(this).attr("pid");
				var projectName = $(this).parent().parent().find("h1").find("img").attr("alt");
				var projectEN = $(this).parent().parent().find("h1").find("img").attr("ename");
				toPlay(id,projectName,projectEN);
			});
			
			index++;
			if(groupEmenus[index] == undefined){
				$(".more").hide();
			}
		});
	}
}

$(function(){
	appenData();

	var $select =$(".list li")
	$select.eq(0).on("click",function(){
		$(this).removeClass();
		$(this).addClass("tpSelect").siblings().removeClass("wzSelect").addClass("wz");
		$(".videoList").addClass("on").siblings().removeClass("on");
		this_on = "v";
	});
	$select.eq(1).on("click",function(){
		$(this).removeClass();
		$(this).addClass("wzSelect").siblings().removeClass("tpSelect").addClass("tp");
		$(".temList").addClass("on").siblings().removeClass("on");
		this_on = "t";
	});
	
	$(".videoList li").click(function(){
		var id = $(this).attr("pid");
		var projectName = $(this).parent().parent().find("h1").find("img").attr("alt");
		var projectEN = $(this).parent().parent().find("h1").find("img").attr("ename");
		toPlay(id,projectName,projectEN);
	});
	
	$(".temList li").click(function(){
		var id = $(this).attr("pid");
		var projectName = $(this).parent().parent().find("h1").find("img").attr("alt");
		var projectEN = $(this).parent().parent().find("h1").find("img").attr("ename");
		toPlay(id,projectName,projectEN);
	});
});

function toPlay(id,projectName,projectEN){
	var url = "tk.html?id="+id+"&c1Name="+encodeURI(projectName)+"&c1Ename="+encodeURI(projectEN)+"&isAll=true";
	window.open(url);
}