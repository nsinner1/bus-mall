'use strict';

var imageOneEl = document.getElementById('picture1');
var imageTwoEl = document.getElementById('picture2');
var imageThreeEl = document.getElementById('picture3');
var sectionEl = document.getElementById('image-container');


var allItems = [];

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

//   while (pic1 === pic2){
//     pic2 = random(allItems.length);
//   }

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
  var clickedItem = event.target.title;
  for (var i = 0; i < allItems.length; i++){
    if(clickedItem === allItems[i].title){
      allItems[i].clicked++;
    }
  }
  imageGenerator();
}

new BusMallItems('img/banana.jpg', 'banana', 'banana');
new BusMallItems('img/breakfast.jpg', 'breakfast', 'breakfast');
new BusMallItems('img/boots.jpg', 'boots', 'boots');
new BusMallItems('img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new BusMallItems('img/chair.jpg', 'chair', 'chair');
new BusMallItems('img/cthulhu.jpg', 'cthulhu', 'cthulhu');

sectionEl.addEventListener('click', handleClick);

imageGenerator();