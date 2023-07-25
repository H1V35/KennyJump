const Game = {
	gameScreen: document.querySelector('#game-screen'),
	gameSize: {
		w: window.innerHeight + 200,
		h: window.innerHeight,
	},
	framesCounter: 0,
	player: undefined,
	currentLevel: 0,

	keys: {
		UP: {
			code: 'Space',
			pressed: false,
		},
		LEFT: {
			code: 'ArrowLeft',
			pressed: false,
		},
		RIGHT: {
			code: 'ArrowRight',
			pressed: false,
		},
	},

	init() {
		this.setDimensions()
		this.setEventListeners()
		this.start()
	},

	setDimensions() {
		this.gameScreen.style.width = `${this.gameSize.w}px`
		this.gameScreen.style.height = `${this.gameSize.h}px`
	},

	start() {
		this.createElements()
		this.gameLoop()
	},

	setEventListeners() {
		addEventListener('click', e => {
			const clickX = e.clientX
			const clickY = e.clientY
			const rect = this.gameScreen.getBoundingClientRect()
			const divX = rect.left
			const divY = rect.top
			const offsetX = clickX - divX
			const offsetY = clickY - divY
			this.player.playerPos.x = offsetX
			this.player.playerPos.y = offsetY
			this.player.onGround = false
		})

		addEventListener('keyup', e => {
			switch (e.code) {
				case this.keys.UP.code:
					this.keys.UP.pressed = false
					break
				case this.keys.LEFT.code:
					this.keys.LEFT.pressed = false
					break
				case this.keys.RIGHT.code:
					this.keys.RIGHT.pressed = false
					break
			}
		})
		addEventListener('keydown', e => {
			switch (e.code) {
				case this.keys.UP.code:
					this.keys.UP.pressed = true
					break
				case this.keys.LEFT.code:
					this.keys.LEFT.pressed = true
					break
				case this.keys.RIGHT.code:
					this.keys.RIGHT.pressed = true
					break
			}
		})
	},

	createElements() {
		this.player = new Player(this.gameScreen, this.gameSize, this.keys)
		this.level = new Level(
			this.gameScreen,
			this.gameSize,
			this.player.playerLevel,
			this.player
		)
		this.lifes = new Lifes(this.player, this.player.lifesCount, this.gameScreen)
	},

	gameLoop() {
		this.drawAll()
		this.level.checkCollision()
		window.requestAnimationFrame(() => this.gameLoop())
	},

	drawAll() {
		this.player.move()
	},

	gameOver() {
		setTimeout(() => {
			gameOverScreen.style.display = 'block'
		}, 400)
	},
}
