const stateX = document.getElementById('player-x')
const stateO = document.getElementById('player-o')
const stateTies = document.getElementById('ties')
const turn = document.querySelector('.turn')

const grid = document.querySelector('.game-board')
const fieldElements = document.querySelectorAll('.game-board__field')
const dataFieldState = document.querySelectorAll('[data-field-state]')
const dataFieldTurn = document.querySelectorAll('[data-field-turn]')

const initialState = {
	'0-0': '',
	'0-1': '',
	'0-2': '',
	'1-0': '',
	'1-1': '',
	'1-2': '',
	'2-0': '',
	'2-1': '',
	'2-2': '',
}

let state = { ...initialState }
let currentPlayer = 'x'
let over = false

function updateTurn() {
	dataFieldTurn.forEach(field => {
		field.setAttribute('data-field-turn', `turn-${currentPlayer}`)
	})
	turn.textContent = `${currentPlayer.toUpperCase()} TURN`
}

updateTurn()

fieldElements.forEach(field => {
	field.addEventListener('click', handleFieldClick)
})

function handleFieldClick(e) {
	if (over) return

	const field = e.currentTarget.querySelector('.game-board__state')
	if (!field) return // Safety check

	const fieldIndex = e.currentTarget.getAttribute('data-index')

	if (state[fieldIndex]) return

	state[fieldIndex] = currentPlayer
	field.setAttribute('data-field-state', `set-${currentPlayer}`)

	if (checkWin()) {
		over = true
		updateScore(currentPlayer)
	} else if (isDraw()) {
		over = true
		updateScore('tie')
	} else {
		currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
		updateTurn()
	}
}

function checkWin() {
	const winPatterns = [
		['0-0', '0-1', '0-2'],
		['1-0', '1-1', '1-2'],
		['2-0', '2-1', '2-2'],
		['0-0', '1-0', '2-0'],
		['0-1', '1-1', '2-1'],
		['0-2', '1-2', '2-2'],
		['0-0', '1-1', '2-2'],
		['0-2', '1-1', '2-0'],
	]

	return winPatterns.some(pattern => {
		const [a, b, c] = pattern
		return state[a] && state[a] === state[b] && state[a] === state[c]
	})
}

function isDraw() {
	return Object.values(state).every(cell => cell)
}

function updateScore(result) {
	if (result === 'x') {
		stateX.textContent = parseInt(stateX.textContent) + 1
		turn.textContent = 'X WIN'
	} else if (result === 'o') {
		stateO.textContent = parseInt(stateO.textContent) + 1
		turn.textContent = 'O WIN'
	} else if (result === 'tie') {
		stateTies.textContent = parseInt(stateTies.textContent) + 1
		turn.textContent = 'DRAW'
	}
}

document.querySelector('.restart-btn').addEventListener('click', resetGame)

function resetGame() {
	state = { ...initialState }
	over = false
	currentPlayer = 'x'

	dataFieldState.forEach(field => {
		field.setAttribute('data-field-state', '')
	})
	dataFieldTurn.forEach(field => {
		field.setAttribute('data-field-turn', '')
	})

	updateTurn()
}
