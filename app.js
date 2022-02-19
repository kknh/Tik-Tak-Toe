'use strict'

const modalOverlay = document.querySelector('.players-name-modal-overlay')
const playerOneNameInput = document.getElementById('player-one-name-input')
const playerTwoNameInput = document.getElementById('player-two-name-input')
const playerOneName = document.querySelector('.player-one-name')
const playerTwoName = document.querySelector('.player-two-name')
const boxes = document.querySelectorAll('.box')

window.onload = function () {
	playerOneNameInput.focus()
}

playerOneNameInput.addEventListener('keyup', (e) => {
	const playerOneNameValue = playerOneNameInput.value
	if (!playerOneNameValue) {
		alert('please enter a name')
		return
	}

	if (e.key === 'Enter') {
		playerOneName.innerText = `Player one: ${playerOneNameValue}`
		e.target.parentElement.classList.remove('active')
		playerTwoNameInput.parentElement.classList.add('active')
		playerTwoNameInput.focus()
	}
})

playerTwoNameInput.addEventListener('keyup', (e) => {
	const playerTwoNameValue = playerTwoNameInput.value
	if (!playerTwoNameValue) {
		alert('please enter a name')
		return
	}

	if (e.key === 'Enter' && playerTwoNameValue) {
		playerTwoName.innerText = `Player two: ${playerTwoNameValue}`
		modalOverlay.classList.add('display-none')
	}
})

const game = {
	playerOneScore: {
		A1: 0,
		A2: 0,
		A3: 0,
		B1: 0,
		B2: 0,
		B3: 0,
		C1: 0,
		C2: 0,
		C3: 0,
	},

	playerTwoScore: {
		A1: 0,
		A2: 0,
		A3: 0,
		B1: 0,
		B2: 0,
		B3: 0,
		C1: 0,
		C2: 0,
		C3: 0,
	},

	stepsTaken: 0,

	playerTurn: 1,

	winnerIS: '',

	play(e) {
		const box = e.target
		const marked = box.dataset.marked

		if (marked) {
			return
		}
		if (game.playerTurn) {
			box.innerText = 'X'
			box.setAttribute('data-marked', 'marked')
			game.stepsTaken++
			game.checkResult(box)
			game.playerTurn = 0
		} else if (!game.playerTurn) {
			box.innerText = 'O'
			box.setAttribute('data-marked', 'marked')
			game.stepsTaken++
			game.checkResult(box)
			game.playerTurn = 1
		}
	},

	checkResult(box) {
		const boxLabel = box.dataset.box

		if (game.playerTurn) {
			game.playerOneScore[`${boxLabel}`]++
			const result = game.checkWinner.call(this.playerOneScore)
			if (result.includes(true)) {
				game.winnerIS += 'Player One'
				alert('Player One Won')
				location.reload()
			}
		} else if (!game.playerTurn) {
			game.playerTwoScore[`${boxLabel}`]++
			const result = game.checkWinner.call(this.playerTwoScore)
			if (result.includes(true)) {
				game.winnerIS += 'Player Two'
				alert('Player Two Won')
				location.reload()
			}
		}

		if (game.stepsTaken === 9 && !game.winnerIS) {
			alert("It's a draw!")
			location.reload()
		}
	},

	checkWinner() {
		const rowA = this.A1 && this.A2 && this.A3 ? true : false
		const rowB = this.B1 && this.B2 && this.B3 ? true : false
		const rowC = this.C1 && this.C2 && this.C3 ? true : false
		const col1 = this.A1 && this.B1 && this.C1 ? true : false
		const col2 = this.A2 && this.B2 && this.C2 ? true : false
		const col3 = this.A3 && this.B3 && this.C3 ? true : false
		const diagonalA = this.A1 && this.B2 && this.C3 ? true : false
		const diagonalB = this.A3 && this.B2 && this.C1 ? true : false
		return [rowA, rowB, rowC, col1, col2, col3, diagonalA, diagonalB]
	},
}

boxes.forEach((box) => {
	box.addEventListener('click', game.play)
})
