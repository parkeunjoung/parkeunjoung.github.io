

/* ***********************************************************
 * 네임스페이스 생성
************************************************************ */
;(function(window, $){
	'use strict';

	var global = "$utils", nameSpace = "richnco.utils", nameSpaceRoot = null;

	function createNameSpace(identifier, module){
		var win = window, name = identifier.split('.'), p, i = 0;

		if(!!identifier){
			for (i = 0; i < name.length; i += 1){
				if(!win[ name[ i ] ]){
					if(i === 0){
						win[ name[ i ] ] = {};
						nameSpaceRoot = win[ name[ i ] ];
					} else {
						win[ name[ i ] ] = {};
					}
				}
				win = win[ name[ i ] ];
			}
		}
		if(!!module){
			for (p in module){
				if(!win[ p ]){
					win[ p ] = module[ p ];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return win;
	}

	if(!!window[ global ]){
		throw new Error("already exists global!> " + global);
	}

	/* ---------------------------------------------------------------------------
		namespace richnco.utils

		* 네임스페이스 생성
		* method namespace
		* memberof richnco.utils
		* param {Object} identifier 구분자
		* param {Object} module 네임스페이스 하위로 생성 할 객체
		* return createNameSpace
		* example

			$utils.namespace('a.b.c', {
				functionA: function(){
					console.log("call a!");
				},
				functionB: function {
					console.log("call b!");
				}
			});

			a.b.c.functionA(); // call a!
			a.b.c.functionB(); // call b!
	--------------------------------------------------------------------------- */
	window[ global ] = createNameSpace(nameSpace, {
		namespace : function(identifier, module){
			return createNameSpace(identifier, module);
		}
	});
})(window, jQuery);

var ui;
;(function(window, $) {
	'use strict';

	ui = $utils.namespace('richnco.common', {

		/* ---------------------------------------------------------------------------------
		 * ui script 초기화
		 * @methods init
		 * @memberof richnco.common
		--------------------------------------------------------------------------------- */

		/* ---------------------------------------------------------------------------------
			레이아웃 : navAside
		--------------------------------------------------------------------------------- */
		navAside : function(){
			var $aside = $('#nav');
			var $aside_area = $('#nav .wrap_nav');
			var $aside_snb = $aside.find('.nav_snb');
			var $aside_ctrl = $aside.find('.area_control a');

			//좌측영역 영역 디스플레이
			$(document).on("click", '#nav .area_control a', function(e) {
				e.preventDefault();
				if(!$('#wrap').hasClass('open_nav')) $('#wrap').addClass('open_nav');
				else $('#wrap').removeClass('open_nav');
			});

			//화면해상도 변경
			// $(window).on('load resize',function(e){
			// 	chkWinSize();
			// });

			function chkWinSize(){
				if($(window).width()>1400){
					$('#wrap').addClass('open_nav').removeClass('minwidth');
				}else{
					$('#wrap').removeClass('open_nav').addClass('minwidth');
				}
			}


			//snb 토글
			$(document).on("click", '.nav_snb a', function(e) {
				if($(this).next('ul').length){
					if(!$(this).parent('li').hasClass('open')) $(this).parent('li').addClass('open');
					else $(this).parent('li').removeClass('open');
				}else{
					$('.nav_snb li').removeClass('active');
					$(this).parent('li').addClass('active');
				}
			});

			$(document).on('click','.nav_snb a',function(){
				var _target = $(this).attr('data-target');
				$('html, body').animate({scrollTop : $('#'+_target).offset().top - 50} , 300);
				return false;
			});

			//좌측영역 스크롤디자인
			// $aside_area.mCustomScrollbar({theme:"minimal-dark"});
		},


		/* ---------------------------------------------------------------------------------
			기본 : onload 실행함수
		--------------------------------------------------------------------------------- */
		init: function() {
			/* 기본호출함수 */
			//ui.navGnb();
			ui.navAside();

			/* load contents */
			$("#load_header").load("header.html");
			$("#load_navigation").load("nav.html");
			$("#load_contents").load("contents.html");
			$("#load_footer").load("footer.html");
		}
	});

	$(document).ready(ui.init);

} )(window, jQuery);


