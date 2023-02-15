'use strict'

let isMouseDown = false;
let newOpacity = 0;
const mainGrid = document.querySelector('.main-grid');
const button = document.querySelector('.btn');
const buttonDelete = document.querySelector('.btn-delete');
const checkbox = document.querySelector('.checkbox');
const grey = document.querySelector('.grey');


// -------------CREATE A GRID--------------------
const createGrid = function(number) {
  mainGrid.style.gridTemplateColumns = "repeat(" + number + ", 1fr)";
  mainGrid.style.gridTemplateRows = "repeat(" + number + ", 1fr)";

  for (let i = 0; i < number * number; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add('grids');
    mainGrid.appendChild(gridCell);
  }

  changeColor();
}

// -------------CHANGE GRID COLOR--------------------
const changeColor = function() {
  const grids = document.querySelectorAll('.grids');

  for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener('mousedown', function() {
      isMouseDown = true;
      if (checkbox.checked) {
        grids[i].style.backgroundColor = getRandomColor(); 
      } else if (grey.checked) {
        let backgroundColor = getComputedStyle(grids[i]).getPropertyValue('background-color');
        let currentOpacity = parseFloat(backgroundColor.split(",")[3]);
        let newOpacity = currentOpacity + 0.1;
        let newBackgroundColor = backgroundColor.replace(/[^,]+(?=\))/, newOpacity);
        grids[i].style.backgroundColor = newBackgroundColor;
      } else {
        grids[i].style.backgroundColor = 'black';
      }
    })

    grids[i].addEventListener('mouseup', function() {
      isMouseDown = false;
    })

    grids[i].addEventListener('mouseover', function() {
      if (isMouseDown) {
        if (checkbox.checked) {
          grids[i].style.backgroundColor = getRandomColor(); 
        } else if (grey.checked) {
          let backgroundColor = getComputedStyle(grids[i]).getPropertyValue('background-color');
          let currentOpacity = parseFloat(backgroundColor.split(",")[3]);
          let newOpacity = currentOpacity + 0.1;
          let newBackgroundColor = backgroundColor.replace(/[^,]+(?=\))/, newOpacity);
          grids[i].style.backgroundColor = newBackgroundColor;
        } else {
          grids[i].style.backgroundColor = 'black';
        }
      }
    })
  }
}

// -------------GET RANDOM COLOR--------------------
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// -------------BUTTON EVENTS--------------------
button.addEventListener('click', function() {
  let input = prompt("Enter a number between 16 and 32:");
  if (input >= 16 || input <= 32) {
    mainGrid.innerHTML = "";
    createGrid(input);
  }
  while (input < 16 || input > 32) {
    input = prompt("Invalid input. Please enter a number between 16 and 32");
  }
})

buttonDelete.addEventListener('click', function() {
  const grids = document.querySelectorAll('.grids');
  for (let i = 0; i < grids.length; i++) {
    grids[i].classList.remove('hovered');
    grids[i].style.backgroundColor = 'white';
}})

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    grey.checked = false;
  }
});

grey.addEventListener('change', () => {
  if (grey.checked) {
    checkbox.checked = false;
  }
}); 

// -------------CREATE STANDARD GRID--------------------
createGrid(16);


