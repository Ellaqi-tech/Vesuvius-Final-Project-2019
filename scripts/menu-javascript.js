//alert("hey");
window.onload = pageReady;
function pageReady () {
    //capture the element needed to do javascript
    var mainPicture = document.getElementById ("main-picture");
    console.log(mainPicture);
    var menuPictures = document.getElementsByClassName("menu-pictures");
    var appetizerPicture = document.getElementById("appetizer");
    //var entreePicture = document.getElementById("entree");
    var mainCoursePicture = document.getElementById("main-course");
    var dessertPicture = document.getElementById("dessert");
    
    //add Event Listener 
    appetizerPicture.onmouseover = changePic1;
    //entreePicture.onmouseover = changePic2;
    mainCoursePicture.onmouseover = changePic3;
    dessertPicture.onmouseover = changePic4;
    
    function changePic1 () {
        mainPicture.src = "image/big-appetizer.jpg";
    }
    /*function changePic2 () {
       mainPicture.src = "image/big-entree.jpg"; 
    }*/
    function changePic3 () {
        mainPicture.src = "image/big-main-course.jpg";
    }
    function changePic4 () {
        mainPicture.src = "image/big-dessert.jpg";
    }
}