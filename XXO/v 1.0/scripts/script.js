// scripts/script.js

const grid = document.querySelector('.container')
const cells = document.querySelectorAll('.item')
const msg = document.getElementById('msg')

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
let currentPlayer = 'X'
let over = false

cells.forEach(cell => {
	cell.addEventListener('click', handleCellClick, { once: true })
})

function handleCellClick(e) {
	if (over) return

	const cell = e.target
	const cellPosition = cell.dataset.cell
	if (!state[cellPosition]) {
		state[cellPosition] = currentPlayer
		cell.textContent = currentPlayer
		cell.classList.add(currentPlayer.toLowerCase())

		if (checkWin()) {
			setTimeout(() => {
				msg.textContent = `${currentPlayer} wins!`
				over = true
				// alert(`${currentPlayer} wins!`)
				//resetGame()
			}, 100)
		} else if (isDraw()) {
			setTimeout(() => {
				msg.textContent = `It's a draw!`
				// alert(`It's a draw!`)
				//resetGame()
			}, 100)
		} else {
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
		}
	}
}

function checkWin() {
	// check rows
	if (
		state['0-0'] &&
		state['0-0'] === state['0-1'] &&
		state['0-1'] === state['0-2']
	) {
		return true
	} else if (
		state['1-0'] &&
		state['1-0'] === state['1-1'] &&
		state['1-1'] === state['1-2']
	) {
		return true
	} else if (
		state['2-0'] &&
		state['2-0'] === state['2-1'] &&
		state['2-1'] === state['2-2']
	) {
		return true
	}

	// check columns
	if (
		state['0-0'] &&
		state['0-0'] === state['1-0'] &&
		state['1-0'] === state['2-0']
	) {
		return true
	} else if (
		state['0-1'] &&
		state['0-1'] === state['1-1'] &&
		state['1-1'] === state['2-1']
	) {
		return true
	} else if (
		state['0-2'] &&
		state['0-2'] === state['1-2'] &&
		state['1-2'] === state['2-2']
	) {
		return true
	}

	// check diagonals
	if (
		state['0-0'] &&
		state['0-0'] === state['1-1'] &&
		state['1-1'] === state['2-2']
	) {
		return true
	} else if (
		state['0-2'] &&
		state['0-2'] === state['1-1'] &&
		state['1-1'] === state['2-0']
	) {
		return true
	}

	return false
}

function isDraw() {
	return Object.values(state).every(cell => cell)
}

function resetGame() {
	state = { ...initialState }
	over = false
	msg.textContent = ''

	cells.forEach(cell => {
		cell.textContent = ''
		cell.classList.remove('x', 'o')
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	currentPlayer = 'X'
}
