window.onload = function (){

var todayTag = document.getElementById('title');
var todaySpecial = document.getElementById('special');
var specialsImage = document.getElementById("special-image");
var date = new Date();
//var today = date.getDay()

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[date.getDay()];

todayTag.innerHTML += " "+n;

if (n == "Sunday"){
    todaySpecial.innerHTML += " Half Priced Appetizers"
    specialsImage.src = "image/big-appetizer.jpg";
    specialsImage.alt = "Picture of Appetizers"
}else if (n == "Monday"){
    todaySpecial.innerHTML += " Tomahawk Ribs for $11.99"
    specialsImage.src = "image/tomahawk.jpg";
    specialsImage.alt = "Picture of a Tomahawk Rib"
}else if (n == "Tuesday"){
    todaySpecial.innerHTML += " Pompeii Honey BBQ Chicken $14.99"
    specialsImage.src = "image/bbqchicken.jpeg";
    specialsImage.alt = "Picture of a Honey BBQ Chicken"
}else if (n == "Wednesday"){
    todaySpecial.innerHTML += " Free Molten Chocolate Cake with any meal choice"
    specialsImage.src = "image/dessert.jpg";
    specialsImage.alt = "Picture of Molten Chocolate Cake"
}else if (n == "Thursday"){
    todaySpecial.innerHTML += " Pompeii Brisket dinner $17.99"
    specialsImage.src = "image/brisket.jpg";
    specialsImage.alt = "Picture of Pompeii Brisket"
}else if (n == "Friday"){
    todaySpecial.innerHTML += " Half Priced Non-Alcholic Drinks"
    specialsImage.src = "image/drinks.jpg";
    specialsImage.alt = "Picture of Tropical Drinks"
}else if (n == "Saturday"){
    todaySpecial.innerHTML += " Free Italian Gelato with any meal choice"
    specialsImage.src = "image/gelato.jpg";
    specialsImage.alt = "Picture of Raspberry Gelato"
}

console.log(todayTag);
}