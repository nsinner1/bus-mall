'use strict';

var imageOneEl = document.getElementById('picture1');
var imageTwoEl = document.getElementById('picture2');
var imageThreeEl = document.getElementById('picture3');
var sectionEl = document.getElementById('image-container');


var lastShown = [];
var allItems = [];
var numberArray = [];
var numberViewed = [];
var maxClicks = 25;

function BusMallItems(src, alt, title){
  this.src = src;
  this.alt = alt;
  this.title = title;
  this.clicked = 0;
  this.viewed = 0;

  allItems.push(this);
}

function random(max) {
  return Math.floor(Math.random() * max);
}

function imageGenerator(){
  var pic1 = random(allItems.length);
  var pic2 = random(allItems.length);
  var pic3 = random(allItems.length);

  while (pic1 === pic2 || pic2 === pic3 || pic1 === pic3 || lastShown.includes(pic1) || lastShown.includes(pic2) || lastShown.includes(pic3)) {
    pic1 = random(allItems.length);
    pic2 = random(allItems.length);
    pic3 = random(allItems.length);
    // console.log('currentPictures: ' + pic1+' '+ pic2+' ' + pic3);
    // console.log(lastShown);
  }
  // console.log('outofloop');
  // console.log(lastShown);
  lastShown = [];
  lastShown.push(pic1);
  lastShown.push(pic2);
  lastShown.push(pic3);

  imageOneEl.src = allItems[pic1].src;
  imageOneEl.title = allItems[pic1].title;
  imageOneEl.alt = allItems[pic1].alt;
  allItems[pic1].viewed++;

  imageTwoEl.src = allItems[pic2].src;
  imageTwoEl.alt = allItems[pic2].alt;
  imageTwoEl.title = allItems[pic2].title;
  allItems[pic2].viewed++;

  imageThreeEl.src = allItems[pic3].src;
  imageThreeEl.alt = allItems[pic3].alt;
  imageThreeEl.title = allItems[pic3].title;
  allItems[pic3].viewed++;
}


function handleClick(event) {
  // numberArray = [];
  var clickedItem = event.target.title;
  for (var i = 0; i < allItems.length; i++){
    if(clickedItem === allItems[i].title){
      allItems[i].clicked++;
      
      maxClicks--;
      // console.log(maxClicks);
      if(maxClicks === 0){
        sectionEl.removeEventListener('click', handleClick);
        timesClicked();
        timesViewed();
        chartDisplay();
        renderList();
      }
    }
  }
  imageGenerator();
}

function renderData(parentId, elem, elemContent) {
  var parentEL = document.getElementById(parentId);
  var pageEl = document.createElement(elem);
  pageEl.textContent = elemContent;
  parentEL.appendChild(pageEl);
}

function renderList(){
  for(var x = 0; x < allItems.length; x++){
    renderData('results', 'section', allItems[x].title+' was clicked: '+ allItems[x].clicked+' and viewed: '+allItems[x].viewed+ ' times.');
  }
}

var newArray = ['banana', 'breakfast', 'boots', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'img', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function timesClicked(){
  numberArray = [];
  for(var y = 0; y < allItems.length; y++){
    numberArray.push(allItems[y].clicked);
  }
}

function timesViewed(){
  numberViewed = [];
  for(var z = 0; z < allItems.length; z++){
    numberViewed.push(allItems[z].viewed);
  }
}

function chartDisplay(){
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: newArray,
      datasets: [{
        label: '# of Clicks',
        data: numberArray,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)'
        ,
        borderColor:
          'rgba(255, 99, 132, 1)'
        ,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: numberViewed,
        backgroundColor:
          'rgba(54, 162, 235, 0.2)'
        ,
        borderColor:
          'rgba(54, 162, 235, 1)'
        ,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

new BusMallItems('img/banana.jpg', 'banana', 'banana');
new BusMallItems('img/breakfast.jpg', 'breakfast', 'breakfast');
new BusMallItems('img/boots.jpg', 'boots', 'boots');
new BusMallItems('img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new BusMallItems('img/chair.jpg', 'chair', 'chair');
new BusMallItems('img/cthulhu.jpg', 'cthulhu', 'cthulhu');
new BusMallItems('img/dog-duck.jpg', 'dog-duck', 'dog-duck');
new BusMallItems('img/dragon.jpg', 'dragon', 'dragon');
new BusMallItems('img/img.jpg', 'img', 'img');
new BusMallItems('img/pen.jpg', 'pen', 'pen');
new BusMallItems('img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new BusMallItems('img/scissors.jpg', 'scissors', 'scissors');
new BusMallItems('img/shark.jpg', 'shark', 'shark');
new BusMallItems('img/sweep.png', 'sweep', 'sweep');
new BusMallItems('img/tauntaun.jpg', 'tauntaun', 'tauntaun');
new BusMallItems('img/unicorn.jpg', 'unicorn', 'unicorn');
new BusMallItems('img/usb.gif', 'usb', 'usb');
new BusMallItems('img/water-can.jpg', 'water-can', 'water-can');
new BusMallItems('img/wine-glass.jpg', 'wine-glass', 'wine-glass');



sectionEl.addEventListener('click', handleClick);

imageGenerator();

