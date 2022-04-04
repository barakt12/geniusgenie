var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage('questTreeDB')
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gLastRes = res
  gPrevQuest = getCurrQuest()
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  const nextGuess = createQuest(newQuestTxt)
  nextGuess.yes = createQuest(newGuessTxt)
  nextGuess.no = gCurrQuest
  gPrevQuest[gLastRes] = nextGuess
  _saveQuestsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}
