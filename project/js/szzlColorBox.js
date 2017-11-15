/// <reference path="jquery.js" />*
/// szzlColorBox_1.3

(function ($) {
    var colorbox = "colorbox", prefix = '', aIndex = 0, aCnt = 0, aNO = 0, error = 0, errorCnt = 5;

    $.fn.colorbox = function () {

        var $a = $(this);
        height = $(document).height();

        css = { "width": "100%", "height": height };

        $div = $tag("div", colorbox).css(css);


        $Photo = $tag("div").addClass("cboxPhoto");
        $Wrapper = $tag("div").addClass("cboxWrapper");

        $Title = $tag("div").addClass("cboxTitle");


        $Close = $tag("a").addClass("cboxClose").html("&nbsp;");

        $Next = $tag("a", "aNext");

        $Pic = $tag("div").addClass("cboxPic");
        $Img = $tag("img", "cboxImg")
        //$Txt = $tag("div").addClass("cboxTxt");


        aCnt = $(".group").length-1;     
		if(aCnt != 0){
			$Title.html("<h1></h1><span>(<font id='photoIndex'></font>/" + aCnt + ")</span>");
			 console.log(aCnt)
		}else{
			$Title.html("<h1></h1><span>(<font id='photoIndex'></font>/" + (aCnt+1) + ")</span>");
		}
        $Title.append($Close);
        $Wrapper.append($Title);
        $Wrapper.append($Pic);
        //$Wrapper.append($Txt);

		if(aCnt > 1){
			$lBtn = $tag("a").addClass("cboxlBtn");
			$rBtn = $tag("a").addClass("cboxrBtn");
			$Photo.append($lBtn);
			$Photo.append($rBtn);
			
			$lBtn.click(function ($e) {
				aIndex -= 1;
				if (aIndex < 0) {
					aIndex = aCnt - 1;
				}
				aNO = aIndex + 1;
				showPic($($a).eq(aIndex));
				$e.preventDefault();
			});
			
			$rBtn.click(function ($e) {
				aIndex += 1;
				if (aIndex >= aCnt) {
					aIndex = 0;
				}
				aNO = aIndex + 1;
				showPic($($a).eq(aIndex));
				$e.preventDefault();
			});
		}

        $Next.append($Img);
        $Pic.append($Next);
        $Photo.append($Wrapper);

        $(document.body).append($Photo);

        $div.click(function () {
            $Photo.fadeOut(300);
            $div.fadeOut(300);
        });
        $Close.click(function () {
            $Photo.fadeOut(300);
            $div.fadeOut(300);
        });
        $(document.body).append($div);

        $Next.click(function ($e) {

            aIndex += 1;

            if (aIndex >= aCnt) {
                aIndex = 0;
            }
            aNO = aIndex + 1;


            showPic($($a).eq(aIndex));


            $e.preventDefault();
        });

        $($a).each(function ($e) {

            $(this).click(function ($d) {
				aIndex = $e;
				console.log("aIndex:"+aIndex+"   $e:"+$e+"    aCnt:"+aCnt);
				if($e == aCnt){
					aIndex = 0;
					aNO = 1;
				}else{
					aNO = aIndex + 1;
				}
				
                $div.fadeIn(100);
                $Photo.fadeIn(100);

                showPic($(this));

                $d.preventDefault();
            });
        });

        function showPic($this) {

            var t = $this.attr("dtitle");
            var src = $this.attr("dhref");
            //var txt = $this.attr("piccontent");

            setPic(src);

            $Title.find("h1").text(t);
            $Title.find("font").text(aNO);
            //$Txt.text(txt);
        }

        function setPic(src) {
            var img = new Image();
			var name = src.substring(src.lastIndexOf("/")+1,src.length-4);
            img.src = src;
            $($Img).attr("src", src);
            $($Img).attr("title", name);
            $($Img).css("width", "auto");
            $($Img).css("height", "auto");
            $($Img).css("max-width", "850px");
            $($Img).css("max-height", "570px");
        }
        
        function $tag(tag, id) {
            var element = document.createElement(tag);

            if (id) {
                element.id = prefix + id;
            }

            return $(element);
        }
    }
})(jQuery);
