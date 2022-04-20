
//Greensock animation that adds transition each time a page loads
$(document).ready(function () {
    var intro = gsap.timeline()
    intro.from("header", .75, {opacity: .4, y: -100})
    intro.from("main", .5, {opacity: 0, y: -200})
});

//setter that opens easter egg
$("#easter-egg-bttn").click(function() { 
    $("#easter-egg").fadeIn();     
});
//setter which opens snapchat tooltip
$("#sc-bttn").click(function() { 
    $("#sc-no").fadeIn();       
});
//setter which opens address tooltip
$("#address-bttn").click(function() { 
    $("#address-no").fadeIn();      
});

//close button for all tooltips
$(".tooltip-close-bttn").click(function() { 
    $(this).parent().parent().fadeOut();    
});
//close button for join form
$(".form-close-bttn").click(function() { 
    $(".join-form-wrapper").fadeOut();      
});

//If anywhere is clicked outside of tooltip, close tooltip
$(document).mouseup(function(e) {
    var tooltip = $(".tooltip");
        if (!tooltip.is(e.target) && tooltip.has(e.target).length === 0) {
            tooltip.fadeOut();
        }
});

//If anywhere is clicked outside of the active news article, close it
$(document).mouseup(function(e) {
    var article = $(".news-article");
        if (!article.is(e.target) && article.has(e.target).length === 0) {
            closeArticle();
        }
});

//if anywhere is clicked outside of the form, close the form
$(document).mouseup(function(e) {
    var joinForm = $("#join-form");
        if (!joinForm.is(e.target) && joinForm.has(e.target).length === 0) {
            $(".join-form-wrapper").fadeOut();
        }
});



//global variable for articles JSON
var articlesArray;
//function retrieves json array and sends information to pages of website where it's requested
$.getJSON("js/articles.json", function(articles){
    //global variable is assigned value of array
    articlesArray = articles;

    //appends latest 3 news headlines to home page
    for (let i = 0; i < 3; i++) {
        var div = "<div onclick='openArticle(" + (i) + ")' class='news-highlight'><img src='" + articles[i].url + "'/><p>" + articles[i].title + "</p></a>"
        $(".latest-news-highlights").append(div);
    }

    //appends latest 3 news headlines to an automated carousel that opens news article when clicked on
    for (let i = 0; i < 3; i++) {
        //div content
        var div = "<div onclick='openArticle(" + (i) + ")' class='carousel-wrapper'><img src='" + articles[i].url + "'/><div class='carousel-content'><p>" + articles[i].title + "</p><p>" + articles[i].date + "</p></div></div>";
        $(".carousel-holder").append(div);
        //Adds a pip for each headline added to array that shows a different slide when clicked
        var pipSpan = "<span class='pip' onclick='currentSlide(" + (i+1) + ")'></span>"
        $(".pips").append(pipSpan);
    }
    //assigns first pip to be active, giving it a red color
    $(".pip").eq(0).addClass("active");
    
    //append all articles in JSON file to thumbnails in 3x3 grid for easy access and viewing
    for (let i = 0; i < articles.length; i++) {
        var articleThumbnail = "<div onclick='openArticle(" + i + ")' class='article-thumbnail'><img src='" + articles[i].url + "'/><p>" + articles[i].title + "</p></div>"
        $(".articles-wrapper").append(articleThumbnail);
        
    }
    

});

//When a thumbnail is clicked, It will open a full size version of the image and details of the news article requested
function openArticle(index) {
    var article = "<div class='news-article'><i class='article-exit fas fa-times' onclick='closeArticle()'></i><img src='"+ articlesArray[index].url + "'><div><h3>"+ articlesArray[index].title +"</h3><p>" + articlesArray[index].date + "</p><p>" + articlesArray[index].desc + "</p></div></div>";
    $(".news-article-wrapper").fadeIn();
    $(".news-article-wrapper").css("display", "flex");
    $(".news-article-wrapper").append(article);
}

//opens join form for people to fill in details
function openEnroll() {
    $(".join-form-wrapper").fadeIn();
    $(".join-form-wrapper").css("display", "flex");
}

//global variable for article index
var articleIndex = 1;
//call carousel function starting at first article
carousel(articleIndex);

//skips to next article
function nextArticle(i) {
  carousel(articleIndex += i);
}

//goes back to previous article
function currentSlide(i) {
  carousel(articleIndex = i);
}

//Main carousel function which sets article index and transitions between slides
function carousel(i) {
    var articles = document.getElementsByClassName("carousel-wrapper");
    var pips = document.getElementsByClassName("pip");
    if (i > articles.length) {
        articleIndex = 1
    }    
    if (i < 1) {
        articleIndex = articles.length
    }
    //changes slide
    for (j = 0; j < articles.length; j++) {
        $(articles[j]).fadeOut("slow");
    }
    //changes active pip
    for (j = 0; j < pips.length; j++) {
        $(pips[j]).removeClass("active")
    }
    $(articles[articleIndex-1]).fadeIn("slow");
    $(pips[articleIndex-1]).addClass("active")
}

//recursive function which puts carousel on endless loop
(function repeatarticles() {
    nextArticle(1)
    setTimeout(function() {
        repeatarticles();
    }, 5000);
})();

//when button is pressed, close article and remove content from div
function closeArticle() {
    $(".news-article-wrapper").fadeOut();
    $(".news-article").remove();
}

//when mobile-nav-bttn is shown for mobile navigation, if it is pressed; toggle the open and close of nav
$( ".mobile-nav-bttn" ).on( "click", function() {
    $('#header-nav').toggleClass("header-nav-hide");
});

//Modal function opens full width image to see easier
$("#stormRanks").click(function () { 
    $(".ranks-modal").fadeIn();
    $(".ranks-modal").css("display", "flex");
});

//if clicked anywhere outside of modal, close it
$(document).mouseup(function(e) {
    var stormRanks = $(".ranks-modal img");
        if (!stormRanks.is(e.target) && stormRanks.has(e.target).length === 0) {
           $(".ranks-modal").fadeOut();
        }
});

//if form is submitted succesfully, dont refresh and show "form success" tooltip. No information is submitted without PHP action file
$("form").submit(function(e) {
    e.preventDefault();
        $("#form-success").fadeIn();   
    console.log("FORM SUBMITTED SUCCESSFULLY");
})


