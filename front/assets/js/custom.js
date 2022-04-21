var richnco = function(){
	var common = {
		init : function(){
			common.autoFocus();
			common.scroll();
			common.checkbox();
			common.radio();
			common.select();
			common.file();
			common.textarea();
			common.datepicker();
		},
		autoFocus : function(){
			$("[data-auto-focus] input[type=text]").each(function(){
				var maxLength = $(this).attr("maxlength");
				var nextIpt = $(this).nextAll("input")[0];
				var prevIpt = $(this).prevAll("input")[0];
				$(this).off().on("keyup", function(e){
					if (maxLength <= $(this).val().length && ( $(nextIpt).length && e.keyCode >= 48 && e.keyCode < 57 || e.keyCode >= 96 && e.keyCode < 105) ) {
						$(nextIpt).focus()
					} else if ( $(this).val().length == 0 && e.keyCode == 8 ) {
						$(prevIpt).focus()
					}
				});
			});
		},
		scroll : function(){
			$("[data-custom-scroll]").each(function(){
				$(this).find("> .inner").scrollbar();
			});
		},
		checkbox : function(){
			$("input[type=checkbox]").each(function(){
				if ($(this).closest(".checkbox").length) return;
				var $this = $(this);
				var $wrap = $this.wrap("<span class='checkbox'></span>").closest(".checkbox");
				$this.on("change", function(){
					common.checkboxView($this, $this.prop("checked"));
				}).change();
				if ($this.hasClass("favorites")) {
					$wrap.addClass("favorites");
				}
				common.hover(this);
			});
		},
		checkboxView : function(obj, state){
			var $wrap = obj.closest(".checkbox");
			if (state){
				$wrap.addClass("checked");
			} else {
				$wrap.removeClass("checked");
			}
			common.disabled(obj[0]);
		},
		radio : function(){
			$("input[type=radio]").each(function(){
				if ($(this).closest(".radio").length) return;
				$(this).wrap("<span class='radio'></span>");
				$(this).on("change", function(){
					$("input[type=radio][name="+$(this).attr("name")+"]").each(function(){
						var $wrap = $(this).closest(".radio");
						if ($(this).prop("checked")){
							$wrap.addClass("checked");
						} else {
							$wrap.removeClass("checked");
						}
					});
					common.disabled(this);
				}).change();
				common.hover(this);
			});
		},
		select : function(){
			$("select").each(function(){
				var thisWidth = $(this).outerWidth();
				$(this).selectmenu({
					width : thisWidth,
					change : function(event, ui) {
						$(this).change();
					},
					open : function(){
						$(this).selectmenu("menuWidget").width("auto").parent().width(thisWidth - 2);
						if ($(this).closest(".modal-dialog").length) {
							$(this).selectmenu("menuWidget").closest(".ui-selectmenu-menu").css({"z-index":"51000"})
						}
					}
				}).selectmenu("menuWidget").scrollbar();
			});
			$(window).off("resize.selectPosition").on("resize.selectPosition",function(){
				$("[role='combobox'][aria-expanded='true']").each(function(){
					$(this).prev().selectmenu("close").selectmenu("open");
				});
			});
		},
		file : function(){
			$("input[type=file]").each(function(){
				if ($(this).closest(".file").length) return;
				if ($(this).closest(".file2").length) return;
				if ($(this).closest(".file3").length) return;
				var title = (this.hasAttribute("data-title")) ? $(this).data("title") : "파일 업로드";
				var $this = $(this);
				var $wrap;
				var placeholder = this.hasAttribute("placeholder") ? $this.attr("placeholder") : "선택된 파일 없음";
				if($this.hasClass("cmt_file")){
					$wrap = $this.wrap("<span class='file2'></span>").closest(".file2");
					//placeholder = this.hasAttribute("placeholder") ? $this.attr("placeholder") : "선택된 파일 없음";
					$wrap.prepend("<span class='value'>"+placeholder+"</span><button type='button' disabled class='btn_default_sm'><span>"+title+"</span></button>");
				} else if($this.hasClass("cmt_file2")){
					$wrap = $this.wrap("<span class='file3 btn_fileImg'></span>").closest(".file3");
					//placeholder = this.hasAttribute("placeholder") ? $this.attr("placeholder") : "선택된 파일 없음";
					$wrap.prepend("<span class='value'>"+placeholder+"</span><button type='button' disabled class='btn_file-img'><span>"+title+"</span></button>");
				}else{
					$wrap = $this.wrap("<span class='file'></span>").closest(".file");
					//placeholder = this.hasAttribute("placeholder") ? $this.attr("placeholder") : "선택된 파일 없음";
					$wrap.prepend("<span class='value'>"+placeholder+"</span><button type='button' disabled class='btn_default'><span>"+title+"</span></button>");
				}
				if (this.hasAttribute("style")) $wrap.width($this.outerWidth());
				if (this.hasAttribute("data-btn_type")) $wrap.addClass("btn_type");
				if (this.hasAttribute("img-file") && this.hasAttribute("data-btn_type")) $wrap.addClass("f_img");
				fileChange($this);
				common.hover(this);
			});
			function fileChange($obj) {
				$obj.off("change.fileChange").on("change.fileChange", function(e){
					var placeholder = this.hasAttribute("placeholder") ? $obj.attr("placeholder") : "선택된 파일 없음";
					if (this.files.length === 0){
						$obj.siblings(".value").html(placeholder);
						$obj.closest(".file").removeClass("selected");
						$obj.closest(".file2").removeClass("selected");
						$obj.closest(".file3").removeClass("selected");
					} else if (this.files.length === 1) {
						$obj.siblings(".value").html(this.files[0].name);
						$obj.closest(".file").addClass("selected");
						$obj.closest(".file2").addClass("selected");
						$obj.closest(".file3").addClass("selected");
					} else if (this.files.length > 9) {
						alert("많음");
						var $clone = $(this).val('').clone(true);
						$(this).replaceWith($clone);
						$obj.siblings(".value").html(placeholder);
						fileChange($clone);
						$obj.closest(".file").removeClass("selected");
						$obj.closest(".file2").removeClass("selected");
						$obj.closest(".file3").removeClass("selected");
					} else {
						$obj.siblings(".value").html(this.files[0].name+"외 "+ (this.files.length - 1) +"개");
						$obj.closest(".file").addClass("selected");
						$obj.closest(".file2").addClass("selected");
						$obj.closest(".file3").addClass("selected");
					}
					common.disabled(this);
				}).change();
			}
		},
		hover : function(obj){
			if (obj.hasAttribute("disabled")) return;
			if (!$(obj).closest("label").length){
				$(obj).on("mouseenter focusin", function(){
					$(obj).parent().addClass("hover");
				}).on("mouseleave focusout", function(){
					$(obj).parent().removeClass("hover");
				});
			}
			try {
				var $target = $(obj).closest("label").length ? $(obj).closest("label") : $("label[for="+$(obj).attr("id")+"]");
				$target.on("mouseenter focusin", function(){
					$(obj).parent().addClass("hover");
				}).on("mouseleave focusout", function(){
					$(obj).parent().removeClass("hover");
				});
			} catch (e) {}
		},
		disabled : function(obj){
			if (obj.hasAttribute("disabled")){
				$(obj).parent().addClass("disabled");
				//$(obj).closest("label").addClass("disabled");
				//$("label[for="+$(obj).attr("id")+"]").addClass("disabled");
			}
		},
		textarea: function () {
			var byteChk = function(el, maxsize){
				var str = $(el).val();
				var size = 0;
				var text = '';
				var rIndex = str.length;
				var byteSize = function(str){
					var pattern = /[\u0000-\u007f]|([\u0080-\u07ff]|(.))/g;
					return str.replace(pattern,"$&$1").length; // 한글2Byte
					// return str.replace(pattern,"$&$1$2").length; // 한글3Byte
				};
				for (var i=0; i<str.length; i++){
					text += str.charAt(i);
					size = byteSize(text);
					if(size == maxsize) {
						rIndex = i + 1;
						break;
					} else if (size > maxsize){
						rIndex = i;
						break;
					}
				}
				$(el).val(str.substring(0, rIndex));
				return size;
			};
			var keyEvent = function(el){
				var max = $(el).attr('maxlength');
				//var current = byteChk(el, max); // Byte
				var current = $(el).val().length; // 글자수
				if(Number(max) >= Number(current)) {
					$(el).next('span.count').find("em").text(current);
				}
			};
			$.each($('textarea'), function(){
				if (!this.hasAttribute('maxlength')) return;
				if ($(this).closest(".textarea").length) return;
				var $wrap = $(this).wrap("<span class='textarea'></span>").closest(".textarea");
				if (this.hasAttribute("style")) $wrap.width($(this).outerWidth());
				$wrap.append("<span class='count'><em></em> / <span>"+$(this).attr("maxlength")+" 자</span></span>");
				keyEvent(this);
				$(this).on('input', function () { keyEvent(this); });
			});
		},
		datepicker : function(){

			$.datepicker.regional['ko'] = {
				closeText: '닫기',
				prevText: '이전달',
				nextText: '다음달',
				currentText: '오늘',
				monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
				dayNames: ['일','월','화','수','목','금','토'],
				dayNamesShort: ['일','월','화','수','목','금','토'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				weekHeader: '주',
				dateFormat: 'yy.mm.dd',
				firstDay: 0,
				isRTL: false,
				showMonthAfterYear: true,
				yearSuffix: '년',
				//showOn: "button",
				//buttonText: "날짜선택"
			};
			$.datepicker.setDefaults($.datepicker.regional['ko']);
			$("[data-datepicker]").each(function (){
				var $this = $(this);
				var max = $this.data("maxdate");
				var min = $this.data("mindate");
				var cleave = new Cleave($this, {
					date: true,
					datePattern: ['Y', 'm', 'd']
				});
				$this.datepicker({maxDate:max, minDate:min});
				if ($this.closest(".ipt-daterange").length){
					var minMax = $this.nextAll("[data-datepicker]").length ? "minDate" : "maxDate";
					var $siblingsIpt = $this.siblings("[data-datepicker]");
					$this.off("change.date").on("change.date", function() {
						var getDate = $(this).datepicker("getDate");
						$siblingsIpt.datepicker( "option", minMax, getDate );
					});
				}
				$(window).off("resize.datepicker").on("resize.datepicker", function(){
					$this.datepicker("hide");
				});
			});
		},
	};
	return common;
}();
$(function(){
	richnco.init();
});

