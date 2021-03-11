let switchButtons = document.querySelectorAll('.switch-btn')
let pianoKeys = document.querySelectorAll('.piano-key')
let piano = document.querySelector('.piano')
let fullscreenBtn = document.querySelector('.fullscreen')
let app = document.querySelector('body')

switchButtons.forEach(button => button.addEventListener('click', () => {
  // remove active class from every button
  switchButtons.forEach(b => b.classList.remove('btn-active'))
  // add active class to current button
  button.classList.add('btn-active')
  // execute sign changer function
  SetKeySign(button.dataset.sign)
}))

// Get active button type
// and set it as class to all keys
function SetKeySign(type) {
  pianoKeys.forEach(key => {
    //clear previous classes
    key.classList.remove('show-letter')
    key.classList.remove('show-note')
    // add class
    key.classList.add(type)
  })
}
// Get active button
let activeSignButton = document.querySelector('.switch-btn.btn-active')
// set the type of keys signs
SetKeySign(activeSignButton.dataset.sign)


window.addEventListener('keydown', PlayKeySound)
window.addEventListener('compositionstart', (e) => {
  console.log('test');
  console.log(e);
})

function PlayKeySound(e) {
  if (e.repeat) return
  console.log(e);
  let keyCode = e.keyCode
  let audio = document.querySelector(`audio[data-key='${keyCode}']`)
  if(audio == null) return
  let key = document.querySelector(`.piano-key[data-key='${keyCode}']`)
  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
}

function PlayMouseSound(e) {
  let key = e.target
  let audio = document.querySelector(`audio[data-letter=${key.dataset.letter}]`)
  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
}

pianoKeys.forEach(key => {
  key.addEventListener('mousedown', PlayMouseSound)
  key.addEventListener('mouseenter', (e) => {
    if (e.buttons == 1) PlayMouseSound(e)
  })
  key.addEventListener('transitionend', (e) => {
    if (e.propertyName != 'transform') return
    e.target.classList.remove('playing')
  })
})

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    app.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
})