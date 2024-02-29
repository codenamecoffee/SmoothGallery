// Get the html elements:
const thumbnails = document.getElementsByClassName("img-thumbnail");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
let imgPortrait = document.getElementById("img-portrait");
let imgSideRight = document.getElementById("img-side-right");
let imgSideLeft = document.getElementById("img-side-left");

// Inicialize main images positions from thumbnails array:
let leftPos = 0;
let pos = 1; 
let rightPos = 2;


// Index handling in thumbnails array:
function correctIndexLeft (index) {
    index--;
    if (index < 0) {
        return thumbnails.length - 1;
    } else return index;
}

function correctIndexRight (index) {
    index++;
    if(index == thumbnails.length) {
        return 0;
    } else return index;
}


// Add click event to the thumbnails:
function clickThumbnails () {

    for (let i = 0; i < thumbnails.length; i++) {  // Changed to obtain an index easily.
        
        thumbnails[i].addEventListener("click", () => {
            imgPortrait.removeAttribute('src');
            pos = i;
            imgPortrait.setAttribute('src', thumbnails[i].getAttribute('src'));
            
            //Added so it's possible to also change the side images when selecting a thumbnail in any order.
            imgSideLeft.removeAttribute('src');
            leftPos = correctIndexLeft(i);
            imgSideLeft.setAttribute('src', thumbnails[leftPos].getAttribute('src'));
            
            imgSideRight.removeAttribute('src');
            rightPos = correctIndexRight(i);
            imgSideRight.setAttribute('src', thumbnails[rightPos].getAttribute('src'));
        })

    }
}


// Change images between left, center and right image:
function changeImage (leftPos, pos, rightPos) {

    imgSideLeft.removeAttribute('src');
    imgSideLeft.setAttribute('src', thumbnails[leftPos].getAttribute('src'));
    
    imgPortrait.removeAttribute('src');
    imgPortrait.setAttribute('src', thumbnails[pos].getAttribute('src'));

    imgSideRight.removeAttribute('src');
    imgSideRight.setAttribute('src', thumbnails[rightPos].getAttribute('src'));

}


// Add click event to the arrow buttons: 
function clickButtons (callback) {

    leftBtn.addEventListener("click", () => {
        leftPos = correctIndexLeft(leftPos);
        pos = correctIndexLeft(pos);
        rightPos = correctIndexLeft(rightPos);
        callback(leftPos, pos, rightPos);
    });

    rightBtn.addEventListener("click", () => {
        leftPos = correctIndexRight(leftPos);
        pos = correctIndexRight(pos);
        rightPos = correctIndexRight(rightPos);
        callback(leftPos, pos, rightPos);
    });

}


// Website workflow:
document.addEventListener("DOMContentLoaded", () => {

    clickThumbnails();
    clickButtons(changeImage); // Callback

});


// jQuery added: 
$(document).ready(function(){

    //Background-image change and effect:
    function changeBackground () {
        $(".bg-img").hide();
        $(".bg-img").css("background-image", `url(${imgPortrait.getAttribute("src")})`).fadeIn(500);
    }

    $(".box1").on({

        mouseenter: function () {
            $(".box1").animate({
                opacity: '0.8'
            },200);
        },

        mouseleave: function () {
            $(".box1").animate({
                opacity: '0.5'
            },200);
        }

    });


    $(leftBtn).on({

        mouseenter: function (){
            $(leftBtn).animate({
                scale: '150%',
                opacity: '0.8'
            },100);
        },

        mouseleave: function (){
            $(leftBtn).animate({
                scale: '100%',
                opacity: '0.4'
            },100);
        },

        click: function (){
            $(imgPortrait).hide();
            $(imgSideLeft).hide();
            $(imgSideRight).hide();
            $(imgSideLeft).fadeIn(1500);
            $(imgPortrait).fadeIn(1000);
            $(imgSideRight).fadeIn(1500);
            changeBackground();
        }

    });

    $(rightBtn).on({

        mouseenter: function (){
            $(rightBtn).animate({
                scale: '150%',
                opacity: '0.8'
            },100);
        },

        mouseleave: function (){
            $(rightBtn).animate({
                scale: '100%',
                opacity: '0.4'
            },100);
        },

        click: function (){
            $(imgPortrait).hide();
            $(imgSideLeft).hide();
            $(imgSideRight).hide();
            $(imgSideLeft).fadeIn(1500);
            $(imgPortrait).fadeIn(1000);
            $(imgSideRight).fadeIn(1500);
            changeBackground();
        }

    });

    $(thumbnails).click(function (){
        changeBackground();
    });
    
})