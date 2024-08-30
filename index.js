let neurons = []
let timer
let minBrainLayers = 5
let intervalCounter = 0

document.addEventListener('DOMContentLoaded', function () {
    onBrainLoad();
    brainStorm();
});

const refreshIntervalId = setInterval(brainStorm(), 3000)

function onBrainLoad() {
    var len, i, j, neuron = {}
    var foreground = document.getElementsByClassName("foreground-neuron");
    len = foreground.length
    for (i = 0; i < len; i++) {
        neuron.x = foreground[i].getBoundingClientRect().x;
        neuron.y = foreground[i].getBoundingClientRect().y;
        neuron.parent =  parseInt((foreground[i].parentElement).parentElement.id);
        neurons[i] = JSON.parse(JSON.stringify(neuron))
    }
    background = document.getElementsByClassName("background-neuron");
    len = background.length
    for (j = 0; j < len; j++) {
        neuron.x = background[j].getBoundingClientRect().x;
        neuron.y = background[j].getBoundingClientRect().y;
        neuron.parent =  parseInt((background[j].parentElement).parentElement.id);
        neurons[i++] = JSON.parse(JSON.stringify(neuron))
    }
}

function brainStorm() {
    var thought = [], htmlThoughtPath = "", populatedRows = [], nimimumThoughtPathLen = 7, maximumThoughtPathLen=10,
        numOfNeurons = neurons.length,  neuronIndex, i;
    var thoughtPathLen = getRandom(nimimumThoughtPathLen, maximumThoughtPathLen);
    var htmlThought = document.getElementById("thought")
    //thinking
    if(numOfNeurons == 0)
        return
    for (i = 0; i < thoughtPathLen;) {
        do {
            neuronIndex = getRandom(0, numOfNeurons);
        }
        while (thought.indexOf(neuronIndex) != -1)
        if (populatedRows.indexOf(neurons[neuronIndex].parent) == -1){
            populatedRows.push(neurons[neuronIndex].parent)
            thought.push(neuronIndex)
            i++
        }
        else if(populatedRows.length < minBrainLayers){
            continue
        }
        else{
            thought.push(neuronIndex)
            i++
        }
    }
    htmlThoughtPath += "M" + Math.round(neurons[thought[0]].x) + " " + Math.round(neurons[thought[0]].y)
    for (i = 1; i < thoughtPathLen; i++) {
        htmlThoughtPath += " L" + Math.round(neurons[thought[i]].x) + " " + Math.round(neurons[thought[i]].y)
    }
    htmlThoughtPath+=" Z"
    // htmlThought.setAttribute("d",htmlThoughtPath)
    // htmlThought.setAttribute("path",htmlThoughtPath)
}

function getRandom(min, max) {
    const floatRandom = Math.random()
  
    const difference = max - min
  
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)
  
    const randomWithinRange = random + min
  
    return randomWithinRange
  }
  var header_height  = $('.navbar').height(),
  intro_height    = $('.intro-section').height(),
  offset_val = intro_height + header_height;
$(window).scroll(function() {
var scroll_top = $(window).scrollTop();
  if (scroll_top >= offset_val) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
          $(".navbar-fixed-top").removeClass("navbar-transparent");
  } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    $(".navbar-fixed-top").addClass("navbar-transparent");
  }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
});


