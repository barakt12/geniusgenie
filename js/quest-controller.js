'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide('slow')

  renderQuest()
  // DONE: show the quest section
  $('.quest').show('slow')
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest>h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.victory').modal('show')
      // DONE: improve UX
      setTimeout(() => {
        $('.victory').modal('hide')
        onRestartGame()
      }, 5000)
    } else {
      $('.lose').modal('show')
      // DONE: hide and show new-quest section
      $('.quest').hide('slow')
      $('.new-quest').show('slow')
    }
  } else {
    // DONE: update the lastRes global var
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // DONE: Get the inputs' values
  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess)
  onRestartGame()
}

function onRestartGame() {
  $('.quest').hide()
  $('.new-quest').hide('slow')
  $('.game-start').show('slow')
  gLastRes = null
  createQuestsTree()
}
