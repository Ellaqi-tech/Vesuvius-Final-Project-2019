//alert("hey");
window.onload = pageReady;
function pageReady () {
    //capture the element needed to do javascript
    var mainPicture = document.getElementById ("main-picture");
    console.log(mainPicture);
    var menuPictures = document.getElementsByClassName("menu-pictures");
    var appetizerPicture = document.getElementById("appetizer");
    var mainCoursePicture = document.getElementById("main-course");
    var brunchPicture = document.getElementById("brunch");
    var drinkPicture = document.getElementById("drink");    
    var dessertPicture = document.getElementById("dessert");   
    
    var appetizerMenu = document.getElementById("appetizer-list");
    var mainDishMenu = document.getElementById("main-dish-list");
    var dessertMenu = document.getElementById("dessert-list");
    var brunchMenu = document.getElementById("brunch-list");
    var drinkMenu = document.getElementById("drink-list");
    
    //add Event Listener
    //onmousover
    appetizerPicture.onmouseover = changePic1;
    mainCoursePicture.onmouseover = changePic2;
    dessertPicture.onmouseover = changePic3;
    brunchPicture.onmouseover = changePic4;
    drinkPicture.onmouseover = changePic5;
    
    //onclick
    appetizerPicture.onclick = displayMenu1;
    mainCoursePicture.onclick = displayMenu2;
    dessertPicture.onclick = displayMenu3;
    brunchPicture.onclick = displayMenu4;
    drinkPicture.onclick = displayMenu5;
    
    
    //function
    //onmousover
    function changePic1 () {
        mainPicture.src = "image/big-appetizer.jpg";
    }
    function changePic2 () {
        mainPicture.src = "image/big-main-course.jpg";
    }
    function changePic3 () {
        mainPicture.src = "image/big-dessert.jpg";
    }
    function changePic4 () {
        mainPicture.src = "image/big-brunch.jpg"
    }
    function changePic5 () {
        mainPicture.src = "image/big-drink.jpg"
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
    function displayMenu4 () {
        brunchMenu.style.display="block";        
    }
     function displayMenu5 () {
        drinkMenu.style.display="block";        
    }
    
    
}