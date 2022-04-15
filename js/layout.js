$(document).ready(function(){
	alert("test");
	// let entityMap = {
	// 	'&': '&amp;',
	// 	'<': '&lt;',
	// 	'>': '&gt;',
	// 	'"': '&quot;',
	// 	"'": '&#39;',
	// 	'/': '&#x2F;',
	// 	'`': '&#x60;',
	// 	'=': '&#x3D;'
	// };
	// let escapeHtml = function(string) {
	// 	return String(string).replace(/[&<>"'`=\/]/g, function (s) {
	// 		return entityMap[s];
	// 	});
	// }
	$("#load_header").load("header.html");
	$("#load_navigation").load("nav.html");
	$("#load_contents").load("contents.html",function(){
		$('pre code').each(function(i, block) {
			let code = $(this).find(":first-child")[0];
			let parse = $(code).prop('outerHTML');
			$(this).text(parse).html();
			// hljs.lineNumbersBlock(block);
		});
		hljs.initHighlightingOnLoad();
		// $('<script src="./js/highlightjs-line-numbers.min.js"></' + 'script>').appendTo("head");
		// hljs.initLineNumbersOnLoad();
		// $('pre code').each(function(i, block) {
		// 	hljs.lineNumbersBlock(block);
		// });
		//
	});
	$("#load_footer").load("footer.html");
});