window.onload=function(){
	/*弹框*/
	var $bookPlay=$(".videoList ul li");
	var $fontPlay=$(".fontList ul")
	$.each($bookPlay, function() {    
		 $(this).find('a').on("click",function(){
		 	$('#videoPlay').css("display","block");
		 })
	});			
	$.each($fontPlay, function() {    
		 $(this).find('a').on("click",function(){
		 	$('#videoPlay').css("display","block");
		 })                                                        
	});
	$('.videoBack').click(function(){
		$("#videoPlay").css("display","none");
	});
	/*banner*/
	var i=0;
	var clone=$(".videoUl li").first().clone();
	$(".videoUl").append(clone);
	var size=$(".videoUl li").size();
	
	$(".bannerRight").click(function(){
		i++
		move();
	
	})
	
	$(".bannerLeft").click(function(){
		i--
		move();
	})
	function move(){
		if(i==size){
			$(".videoUl").css({left:0});
			i=1;
		}
		if(i==-1){
			$(".videoUl").css({left:-(size-1)*198})
			i=size-2;
		}
		$(".videoUl").stop().animate({left:-i*198},500)			
		
			
	}
}
	

