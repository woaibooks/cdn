var stui = {
	'browser': {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	'flickity': {
		'carousel': function() {		
			$('.carousel_center').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});
		}
	},	
	'images': {
		'lazyload': function() {
			$(".lazyload").lazyload({
				effect: "fadeIn",
				threshold: 200,
				failurelimit: 15,
				skip_invisible: false
			});
		}
	},
	'common': {
		'history': function() {
			if($("#stui_history").length){
				if($.cookie("recente")){
				    var json=eval("("+$.cookie("recente")+")");
				    var list="";
				    for(i=0;i<json.length;i++){
				        list = list + "<li><div class='img'><a class='stui-vodlist__thumb' href='"+json[i].vod_url+"' style='background-image: url("+json[i].vod_img+");'></a></div><div class='data'><h3><a href='"+json[i].vod_url+"'>"+json[i].vod_name+"</a></h3><p>播放至："+json[i].vod_part+"</p><p><a class='btn btn-primary' href='"+json[i].vod_url+"'>继续观看</a></p></div></li>";
				    }
				    $("#stui_history").append(list);
				}
				else
		            $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片哦</p>");
			   
			    $(".historyclean").on("click",function(){
			    	if(window.confirm('确定要清空记录吗？')){
		                $.cookie("recente",null,{expires:-1,path: '/'});
		           	}else{
		                return false;
		            }		    	
			    });
			}
		},
		'bootstrap': function() {
			$('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
				var b = $(a.target).text();
				$(a.relatedTarget).text();
				$("span.active-tab").html(b);
			});
		},
		'headroom': function() {
			if($("#header-top").length){
				$("#header-top", function() {
					(new Headroom(document.querySelector("#header-top"), {
						tolerance: 5,
						offset: 205,
						classes: {
							initial: "top-fixed",
							pinned: "top-fixed-up",
							unpinned: "top-fixed-down"
						}
					})).init();
				});			
			}
		},
		'popup': function() {
			$popblock = $(".popup");
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible");
				$("body").append('<div class="mask"></div>');
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible");
					$(".mask").remove();
					$("body").removeClass("modal-open");
				});
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible");
					$(this).remove();
					$("body").removeClass("modal-open");
				});
			});
		},
		'slide': function() {
			$(".type-slide").each(function(a) {
				$index = $(this).find('.active').index()*1;
				if($index > 3){
					$index = $index-3;
				}else{
					$index = 0;
				}
				$(this).flickity({
					cellAlign: 'left',
					freeScroll: true,
					contain: true,
					prevNextButtons: false,				
					pageDots: false,
					initialIndex: $index
				});
			});
		},
		'mshare': function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
				$(".mobile-share").click(function() {
					$(".mobile-share").remove();
					$("body").removeClass("modal-open");
				});
			});
		},
		'collapse': function() {
			$(".detail").on("click", ".detail-more", function() {
				$detailContent = $(".detail-content");
				$detailSketch = $(".detail-sketch");
				"none" == $detailContent.css("display") ? ($(this).html('\u6536\u8d77 <i class="icon iconfont icon-less"></i>'), $detailContent.show(), $detailSketch.hide()) : ($(this).html('\u8be6\u60c5 <i class="icon iconfont icon-moreunfold"></i>'), $detailContent.hide(), $detailSketch.show());
			});
		},
		'scrolltop': function() {
			var a = $(window);
			$scrollTopLink = $("a.backtop");
			a.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none");
			});
			$scrollTopLink.on("click", function() {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
				return !1
			});
		}
	}	
};
$(document).ready(function() {	
	stui.flickity.carousel();
	stui.images.lazyload();
	stui.common.history();
	stui.common.bootstrap();
	stui.common.headroom();
	stui.common.slide();
	stui.common.popup();
	stui.common.mshare();
	stui.common.collapse();
	stui.common.scrolltop();	
});