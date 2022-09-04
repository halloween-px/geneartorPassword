/*class Validation {
	constructor(selector) {
		this.el = document.querySelector(selector);
		this.box = document.querySelector('.color-block');

		this.charsets = {
			upperCaseSet: /[A-Z]/g,
			lowerCaseSet: /[a-z]/g,
			digitSet: /[0-9]/g,
		};

		this.defaults = Object.assign({
			minLength: 6,
			minUpperCase: 1,
			minLowerCase: 2,
			minDigits: 1,
			noUpper: false,
			noLower: false,
			noDigit: false,
			noSpecial: false
		}, params);

		this.blockColor = ['bad', 'normal', 'good'];

		this.difficulty = [
			{
				noLower: false,
				minLength: 3,
				color: 'bad'
			},
			{
				noUpper: false,
				noLower: false,
				minLength: 6,
				minUpperCase: 1,
				noDigit: false,
			},
			{
				minLength: 6,
				minUpperCase: 1,
				minLowerCase: 2,
				minDigits: 1,
				noUpper: false,
				noLower: false,
				noDigit: false,
				noSpecial: false,
				difficulty: 3
			}
		];

		this.run();
	}

	run() {
		let self = this;
		this.el.addEventListener('keyup', function () {
			self.validate();
		});
	}

	validate(difficulty = 2){


		if(this.isBadPass()) {
			this.setBadPass();
		}

		if (this.isNormalPass()) {
			this.setNormalPass()
		} else {
			this.noColorPass();
		}
	}

	isBadPass() {
		let inp = this.el.value,
			upLetterLength = inp.match(this.charsets.upperCaseSet) ? inp.match(this.charsets.upperCaseSet).length : 0,
			lowLetterLength = inp.match(this.charsets.lowerCaseSet) ? inp.match(this.charsets.lowerCaseSet).length : 0,
			digitSetLength = inp.match(this.charsets.digitSet) ? inp.match(this.charsets.digitSet).length : 0,
			errors = [];


		for (const [key, value] of Object.entries(this.defaults)) {
			if (key === 'minLength' && value >= inp.length) {
				errors.push({
					'type': 'minLength',
					'text': 'Недостаточно символов'
				});
			}

			if (key ==='minUpperCase' && upLetterLength < value) {
				errors.push({
					'type': 'minUpperCase',
					'text': 'Недостаточно символов верхнего регистра'
				});

				if (upLetterLength === value) {
					this.defaults.noUpper = true;
				}
			}

			if (key ==='minLowerCase' && lowLetterLength < value) {
				errors.push({
					'type': 'minLowerCase',
					'text': 'Недостаточно символов нижнего регистра',
				});

				if (lowLetterLength === value) {
					this.defaults.noLower = true;
				}
			}

			if (key ==='minDigits' && digitSetLength < value) {
				errors.push({
					'type': 'minDigits',
					'text': 'Недостаточно чисел',
				});

				if (digitSetLength === value) {
					this.defaults.noDigit = true;
				}
			}

			if (inp === '') {
				return false
			}
		}

		if (errors.length) {
			console.log(errors);
			return true;
		}
	}

	setBadPass() {
		this.box.classList.add('bad');
	}

	isNormalPass() {
		if (this.defaults.noUpper !== true && this.defaults.noLower !== true) {
			return true
		}
	}

	setNormalPass() {
		this.box.classList.add('normal');
	}

	goodPass() {
		this.box.classList.add('good');
	}

	noColorPass() {
		for (let item of this.blockColor) {
			this.box.classList.remove(item);
		}
	}
}

console.log(new Validation('#userPassword')).validate('light');*/

class VGPasswords {
	constructor() {
		this.charsets = {
			upperCaseSet: /[A-Z]/g,
			lowerCaseSet: /[a-z]/g,
			digitSet: /[0-9]/g,
		};

		this.difficulty = {
			light: {
				minLength: 3,
				minLowerCase: 2,
			},

			normal: {
				minLength: 6,
				minUpperCase: 1,
				minLowerCase: 2,
			},

			hard: {
				minLength: 10,
				minDigits: 1,
				minUpperCase: 1,
				minLowerCase: 2,
			}
		}
	}

	validate(value, difficulty = 'light', params = {}) {
		let _difficulty = Object.assign(this.difficulty[difficulty], params),
			colorBlock = document.querySelector('.color-block'),
			textBlock = document.querySelector('.text-block'),
			valueLength = value.length,
			upCaseLength = value.match(this.charsets.upperCaseSet) ? value.match(this.charsets.upperCaseSet).length : 0,
			lowCaseLength = value.match(this.charsets.lowerCaseSet) ? value.match(this.charsets.lowerCaseSet).length : 0,
			digitLength = value.match(this.charsets.digitSet) ? value.match(this.charsets.digitSet).length : 0,
			errors = [];

		function checkDifficultyPass() {
			if (valueLength < _difficulty.minLength) {
				errors.push({
					'type': 'minLength',
					'text': 'Недостаточно символов'
				});
			}
			if (lowCaseLength <= _difficulty.minLowerCase) {
				errors.push({
					'type': 'minLowerCase',
					'text': 'Недостаточно букв нижнего регистра'
				});
			}
			if (upCaseLength < _difficulty.minUpperCase && _difficulty.minLowerCase !== 0) {
				errors.push({
					'type': 'minUpperCase',
					'text': 'Недостаточно букв верхнего регистра'
				});
			}
			if (digitLength <= _difficulty.minDigits) {
				errors.push({
					'type': 'minDigits',
					'text': 'Недостаточно чисел'
				})
			}
		}

		function ShowHideText() {
			if (errors.length !== 0) {
				textBlock.classList.add('active');

				for (let i = 0; i < errors.length; i++) {
					textBlock.innerHTML = errors[i].text;
				}
			}

			if (errors.length === 0 || value === '') {
				textBlock.classList.remove('active');
			}
		}

		function SelectsColorBlock() {
			if (valueLength !== 0) {
				switch (difficulty) {
					case "light":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((upCaseLength || digitLength) && (errors.length === 0) && (valueLength >= (_difficulty.minLength + 2) && lowCaseLength >= (_difficulty.minLowerCase + 2))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}
						break;

					case "normal":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase && upCaseLength < _difficulty.minUpperCase) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase && upCaseLength >= _difficulty.minUpperCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((digitLength) && (errors.length === 0) && (valueLength >= (_difficulty.minLength + 3) && lowCaseLength >= (_difficulty.minLowerCase + 3) && upCaseLength >= (_difficulty.minUpperCase + 1))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}

						break;

					case "hard":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase && upCaseLength < _difficulty.minUpperCase && digitLength < _difficulty.minDigits) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase && upCaseLength >= _difficulty.minUpperCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((errors.length === 0) && (valueLength >= (_difficulty.minLength + 4) && lowCaseLength >= (_difficulty.minLowerCase + 4) && upCaseLength >= (_difficulty.minUpperCase + 2) && digitLength >= (_difficulty.minDigits))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}
						break;
				}
			} else {
				colorBlock.classList.remove('bad', 'normal', 'good');
			}
		}

		function difficultyPass() {
			if (!difficulty) return false;
			checkDifficultyPass();
			ShowHideText();
			SelectsColorBlock();
		}

		difficultyPass();

		return {
			errors: errors,
		}
	}

	checkPassword(difficulty, params) {
		let value = document.getElementById('userPassword').value,
			repeatPass = document.getElementById('repeatPassword').value,
			textBlock = document.querySelector('.text-block');

		let errors = this.validate(value, difficulty, params).errors;

		if (value === repeatPass && repeatPass !== 0 && errors.length === 0) {
			return true
		} else {
			textBlock.classList.add('active');
			textBlock.innerText = 'Требования к паролю не выполнено';
		}

	}

	init(el, params) {
		let self = this;
		let difficulty = el.dataset.difficulty || 'normal';

		el.addEventListener('keyup', function (e) {
			let val = e.target.value;

			self.validate(val, difficulty, params);
		});

		document.getElementById('createPassword').addEventListener('click', () => {
			self.checkPassword(difficulty, params);
		});
	}

	// generate() {
	// 	function generatorPass() {
	// 		let num = document.getElementById('check-numbers').checked,
	// 			upCase = document.getElementById('check-upCase').checked,
	// 			lowCase = document.getElementById('check-lowCase').checked,
	// 			inputLength = +document.querySelector('.input-length').value,
	// 			result = document.querySelector('.result');
	//
	// 		if (num + upCase + lowCase <= 0) return false;
	//
	// 		function generator(min = 0, max = 0) {
	// 			return Math.floor(Math.random() * (max + 1 - min) + min)
	// 		}
	//
	// 		function generateRandomLowerCase() {
	// 			return String.fromCharCode(generator(97, 122));
	// 		}
	//
	// 		function generateRandomUpCase() {
	// 			return String.fromCharCode(generator(65, 90));
	// 		}
	//
	// 		function importantRandom() {
	// 			let randomValue = [];
	// 			for (let i = 0; i < 1; i++) {
	// 				if (lowCase) {
	// 					randomValue.push(generateRandomLowerCase());
	// 				}
	// 				if (upCase) {
	// 					randomValue.push(generateRandomUpCase());
	// 				}
	// 				if (num) {
	// 					randomValue.push(generator(0, 9));
	// 				}
	// 			}
	// 			return randomValue;
	// 		}
	//
	// 		function noImportantRandom(importantPassLength) {
	// 			let randomValue = [];
	// 			for (let i = 0; i < inputLength - importantPassLength; i++) {
	// 				let r = generator(0, 2);
	// 				if (lowCase && r === 0) {
	// 					randomValue.push(generateRandomLowerCase());
	// 				} else if (upCase && r === 1) {
	// 					randomValue.push(generateRandomUpCase());
	// 				} else if (num && r === 2) {
	// 					randomValue.push(generator(0, 9));
	// 				} else {
	// 					i--;
	// 				}
	// 			}
	// 			return randomValue;
	// 		}
	//
	// 		function shuffle(array) {
	// 			let currentIndex = array.length,
	// 				temporaryValue,
	// 				randomIndex;
	//
	// 			while (0 !== currentIndex) {
	//
	// 				randomIndex = Math.floor(Math.random() * currentIndex);
	// 				currentIndex -= 1;
	//
	// 				temporaryValue = array[currentIndex];
	// 				array[currentIndex] = array[randomIndex];
	// 				array[randomIndex] = temporaryValue;
	// 			}
	//
	// 			return array;
	// 		}
	//
	// 		let sImportantRandom = importantRandom();
	// 		let sNoImportantRandom = noImportantRandom(sImportantRandom.length);
	// 		result.textContent = shuffle(sImportantRandom.concat(sNoImportantRandom)).join('');
	//
	// 	}
	//
	// 	generatorPass();
	// }
}

// class PasswordGenerator {
// 	constructor() {
// 		this.options = {
// 			num: {
// 				item: document.getElementById('check-numbers').checked,
// 				symbols: '0123456789',
// 			},
// 			upCase: {
// 				item: document.getElementById('check-upCase').checked,
// 				symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
// 			},
// 			lowCase: {
// 				item: document.getElementById('check-lowCase').checked,
// 				symbols: 'abcdefghijklmnopqrstuvwxyz',
// 			},
// 			inputLength: +document.querySelector('.input-length').value,
// 			result: document.querySelector('.result')
// 		}
// 	}
//
// 	random(min = 0, max = 0) {
// 		return Math.floor(Math.random() * (max + 1 - min) + min)
// 	}
//
// 	shuffle(array) {
// 		let currentIndex = array.length;
// 		let temporaryValue;
// 		let randomIndex;
//
// 		while (0 !== currentIndex) {
//
// 			randomIndex = Math.floor(Math.random() * currentIndex);
// 			currentIndex -= 1;
//
// 			temporaryValue = array[currentIndex];
// 			array[currentIndex] = array[randomIndex];
// 			array[randomIndex] = temporaryValue;
// 		}
//
// 		return array;
// 	}
//
// 	getSymbols() {
// 		let symbols = [];
// 		let randomSymbols = [];
// 		let lowCase = this.options.lowCase.symbols;
// 		let upCase = this.options.upCase.symbols;
// 		let numCase = this.options.num.symbols;
//
// 		if (this.options.lowCase.item + this.options.upCase.item + this.options.num.item <= 0) return false;
//
// 		for (let i = 0; i < this.options.inputLength; i++) {
// 			if (this.options.lowCase.item) {
// 				symbols = [...symbols, ...lowCase];
// 				randomSymbols.push(lowCase[this.random(0, lowCase.length - 1)]);
// 			}
// 			if (this.options.upCase.item) {
// 				symbols = [...symbols, ...upCase];
// 				randomSymbols.push(upCase[this.random(0, upCase.length - 1)]);
//
// 			}
// 			if (this.options.num.item) {
// 				symbols = [...symbols, ...numCase];
// 				randomSymbols.push(numCase[this.random(0, numCase.length - 1)]);
// 			}
// 		}
//
// 		console.log(randomSymbols);
// 		randomSymbols = randomSymbols.splice(0, this.options.inputLength);
//
// 		console.log(randomSymbols);
// 		/*let r1 = this.random(0 , this.options.inputLength);
// 		let r2 = this.random(0 , this.options.inputLength);
// 		let r3 = this.random(0 , this.options.inputLength);*/
// // Нужны специальные индексы!
// 		let ind = [];
//
//
//
// 		if (this.options.lowCase.item) {
// 			randomSymbols[ind[0]] = lowCase[this.random(0, lowCase.length - 1)];
// 		}
// 		if (this.options.upCase.item) {
// 			randomSymbols[ind[1]] = upCase[this.random(0, upCase.length - 1)];
// 		}
// 		if (this.options.num.item) {
// 			randomSymbols[ind[2]] = numCase[this.random(0, numCase.length - 1)];
// 		}
//
// 		this.shuffle(randomSymbols);
//
// 		this.options.result.textContent = randomSymbols.join('');
// 	}
// }

class generatorPass {
	constructor(arg = {}) {
		this.isInit = true;
		this.result = null;

		let cases = {
				num: arg.num || true,
				lowCase: arg.lowCase ||  true,
				upCase: arg.upCase || true,
				length: arg.length || 8,
				specialSymbol: arg.specialSymbol || true,
			};

		this.option = Object.assign(cases, this.option);

		const $result = document.querySelectorAll('.genPassResult');
		if (!$result) {
			this.isInit = false;
		}

		this.result = $result;

		const container = document.querySelector('.vg-generate');
		if (container && !arg.length) {
			let sets = container.querySelectorAll('[data-set]');
			if (sets.length) {
				for (let setDom of sets) {
					let set = setDom.dataset.set;

					if(setDom.getAttribute('type') === 'checkbox'){
						cases[set] = setDom.checked
					} else if (setDom.getAttribute('type') === 'number') {
						let value = +setDom.value;
						cases[set] = value;

						let max = setDom.getAttribute('max');
						let min = setDom.getAttribute('min');
						if (value > max) {
							cases[set] = max;
							setDom.value = max;
						} else if (value < min) {
							cases[set] = min;
							setDom.value = min;
						}
					}
				}
			}

			this.option = Object.assign(cases, this.option);
			console.log(this.option)
		}
	}

	generator(min = 0, max = 0) {
		return Math.floor(Math.random() * (max + 1 - min) + min)
	}

	generateRandomLowerCase() {
		if(this.option.lowCase !== false) {
			return String.fromCharCode(this.generator(97, 122));
		}
	}

	generateRandomUpCase() {
		if(this.option.upCase !== false) {
			return String.fromCharCode(this.generator(65, 90));
		}
	}

	generateRandomSymbol() {
		if(this.option.specialSymbol !== false) {
			let symbol = '!"#$%&()*+,-./:;<=>?@[]^`{|}~';
			let num = this.generator(0, symbol.length);
			return symbol[num];
		}
	}

	importantRandom() {
		let randomValue = [];

		for (let i = 0; i < 1; i++) {
			if (this.option.lowCase) {
				randomValue.push(this.generateRandomLowerCase());
			}
			if (this.option.upCase) {
				randomValue.push(this.generateRandomUpCase());
			}
			if (this.option.specialSymbol) {
				randomValue.push(this.generateRandomSymbol());
			}
			if (this.option.num) {
				randomValue.push(this.generator(0, 9));
			}
		}
		return randomValue;
	}

	noImportantRandom(importantPassLength) {
		let randomValue = [];
		console.log(importantPassLength);
		for (let i = 0; i < this.option.length - importantPassLength; i++) {
			let r = this.generator(0, 3);
			if (this.option.lowCase && r === 0) {
				randomValue.push(this.generateRandomLowerCase());
			} else if (this.option.upCase && r === 1) {
				randomValue.push(this.generateRandomUpCase());
			} else if(this.option.specialSymbol && r === 2) {
				randomValue.push(this.generateRandomSymbol());
			} else if (this.option.num && r === 3) {
				randomValue.push(this.generator(0, 9));
			} else {
				i--;
			}
		}

		return randomValue;
	}

	shuffle(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	getResult() {
		if (!this.isInit) return false;

		if (this.option.num + this.option.upCase + this.option.lowCase + this.option.specialSymbol <= 0) return false;

		let sImportantRandom = this.importantRandom();
		let sNoImportantRandom = this.noImportantRandom(sImportantRandom.length);
		let result = this.shuffle(sImportantRandom.concat(sNoImportantRandom)).join('');

		for(let item of this.result) {
			if(item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
				item.value = result;
			} else {
				item.textContent = result;
			}
		}
	}
}

document.getElementById('generatePassword').addEventListener('click', function () {
	new generatorPass().getResult();
});

document.addEventListener('DOMContentLoaded', function () {
	new generatorPass({
		num: true,
		lowCase: true,
		upCase: true,
		specialSymbol: true,
		length: 16,
	}).getResult();
});