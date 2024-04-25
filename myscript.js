
var counter=1;
setInterval(function(){
	document.getElementById("radio" + counter).checked=true;
	counter++;
	if (counter>7){
		counter=1;
	}
},3500);

function openForm() {
	document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
	document.getElementById("myForm").style.display = "none";
  }