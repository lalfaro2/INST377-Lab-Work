let slidePosition = 0;
const pics = document.querySelectorAll(".carousel_item");
const totalPics = pics.length;


document.querySelector('#next-button').addEventListener('click', function() {
    moveToNext();
})

document.querySelector('#prev-button').addEventListener('click', function() {
    moveToPrev();
})

function updateSlidePosition() {
    for (let pic of pics) {
        pic.classList.remove('first-item');
        pic.classList.add('carousel_item--hidden');
    }
    pics[slidePosition].classList.add('first-item');
}

function moveToNext() {
    if (slidePosition === totalPics - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrev() {
    if (slidePosition === 0) {
        slidePosition = totalPics - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition();
}
