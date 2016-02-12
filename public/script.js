window.onload=function(){
	var sendBtn = document.querySelector('.send-button');
	sendBtn.addEventListener('click', postThread);

	var deleteBtn = document.querySelector('.delete-button');
	deleteBtn.addEventListener('click', deleteThread);

	var changeBtn = document.querySelector('.change-button');
	changeBtn.addEventListener('click', putThread);
};

// Hämtar ny data på 200 ms

setInterval(function getThreads() {    
		$.ajax({
	  		url: "api/threads"
		}).done(function (data){
			// DATA = Data från servern, alltså vår threads-array!!

			var src = document.getElementById("template").innerHTML;
			var render = Handlebars.compile(src); 
			var html = render(data);
			document.getElementById("ul").innerHTML = html;
		});
}, 200)	
//////////////////////////////////////////////////


//funktion för att skicka ny tråd

function postThread() {
	var title = document.getElementById("titleinput").value; 
  	var text = document.getElementById("textinput").value;
  	var textValue = textinput.value;
  	var textValueLength = textinput.value.length;
  	var titleValue = titleinput.value;
  	var titleValueLength = titleinput.value.length;

  	// If sats som förhindrar att man kan skicka tomma meddelanden
  	// Förhindrar även från att skicka meddelanden utan namn.
 	if(textValue !== '' && textValueLength > 0) {
		if(titleValue !== '' && titleValueLength > 0) {


			$.ajax({
			  	url: "api/threads",
			  	method: "POST",
			  	data: {title: title, text: text} // data till servern!
			}).done(function (data){
		  		textinput.value = '';
			})
		}	
	}
}

// Post med hjälp av enter!!
$(document).ready(function(){
    $('#textinput').keypress(function(e){
      	if(e.keyCode==13)
      	$('.send-button').click();
   	});
});

// funktion för att ändra tråd.
function putThread() {
  	var title = document.getElementById("titleinput").value; 
  	var text = document.getElementById("textinput").value; 
	var id = prompt("vilken tråd vill du ändra?")

	$.ajax({
	  	url: "api/threads/" +id,
	  	method: "PUT",
	  	data: {title: title, text: text} // nya data till server!
	}).done(function (data){
			
	})
}
////////////////////////////////////////////////////////


/// funktion för att ta bort en hel tråd
function deleteThread() {
	var id = prompt("vilket id vill du radera?");

	$.ajax({
	  	url: "api/threads/" +id,
	  	type: "DELETE",
	}).done(function (data){	

	})
}
