document.getElementById('edit-button').onclick = function() {
  document.getElementById('popup').classList.add('popup__open');
}

document.getElementById('popup__button-close').onclick = function() {
  document.getElementById('popup').classList.remove('popup__open');
}

// document.getElementById('like').onclick = function() {
//   document.getElementById('like').classList.toggle('like_active');
// }