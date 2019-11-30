//alert("hey");
window.onload = pageReady;
function pageReady () {
    //capture the element needed to do javascript
    var mainPicture = document.getElementById ("main-picture");
    console.log(mainPicture);
    var menuPictures = document.getElementsByClassName("menu-pictures");
    var appetizerPicture = document.getElementById("appetizer");
    var mainCoursePicture = document.getElementById("main-course");
    var dessertPicture = document.getElementById("dessert");
    
    var appetizerMenu = document.getElementById("appetizer-list");
    var mainDishMenu = document.getElementById("main-dish-list");
    var dessertMenu = document.getElementById("dessert-list");
    
    
    //add Event Listener
    //onmousover
    appetizerPicture.onmouseover = changePic1;
    mainCoursePicture.onmouseover = changePic3;
    dessertPicture.onmouseover = changePic4;
    //onclick
    appetizerPicture.onclick = displayMenu1;
    mainCoursePicture.onclick = displayMenu2;
    dessertPicture.onclick = displayMenu3;
    //function
    //onmousover
    function changePic1 () {
        mainPicture.src = "image/big-appetizer.jpg";
    }
    function changePic3 () {
        mainPicture.src = "image/big-main-course.jpg";
    }
    function changePic4 () {
        mainPicture.src = "image/big-dessert.jpg";
    }
    
    //onclick
    function displayMenu1 () {
        appetizerMenu.style.display="block";        
    }
    function displayMenu2 () {
        mainDishMenu.style.display="block";        
    }
    function displayMenu3 () {
        dessertMenu.style.display="block";        
    }
    
    
    
}