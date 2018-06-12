var open_nav = document.querySelector('.nav-wrap-before');
var links = document.querySelectorAll('.nav-wrap a');
//var test = document.querySelectorAll(".nav-wrap-after")
for (let i = 0; i < links.length; i++) {

    open_nav.addEventListener( "click", function() {
        console.log("JE SUIS DANS MON EVENT");
        if ( links[i].className = "nav-wrap-before" ) {
            this.classList.toggle("nav-wrap-after");
            console.log("OK");
        }
    });



}


