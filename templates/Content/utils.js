$(function() {
	$( "#tabs" ).tabs();
});
$(document).ready(function(){
	$.get( "starttweets",function( data ) {
		$("#ExternalDiv").append(data);
	});
});

$(document).ready(function(){
	$(".set_url").click(function(){
		gifLoad();
		var tabs = $("#tabs").tabs();

		var url_text = $(".url_text").val();
		$.post( "getspreadsheetbyurl", { url: url_text }).done( function( data ) {
			var num_tabs = $("div#tabs ul li").length + 1;
			$("div#tabs ul").append("<li><a href='#tab" + num_tabs + "'> "+data.title+" </a></li>");
			var str = "<table>"
			$.each(data.dasta,function(index,value){
				str+="<tr>";
				$.each(value,function(index2,value2){
					str+="<td>"+value2+"</td>";
				});
				str+="</tr>";
			});
			str+="</table>";
			$("div#tabs").append("<div id='tab" + num_tabs + "'>" + str + "</div>");
			$("div#tabs").tabs("refresh");
			gifUnload();
		})
		.fail(function() {
			alert( "error!! Either url is incorrect or You don't have access!!" );
		});

	});
});

function gifLoad() {
	$("#ExternalDiv").show();
	$("#InternalDiv").fadeIn("slow");

}
function gifUnload() {
	$("#InternalDiv").fadeOut("slow");
	$("#ExternalDiv").hide();
}

if (!!window.EventSource) {
  var source = new EventSource('/');
  source.onmessage = function(e) {
    $("#tweetsdata").text(e.data);
  }
}