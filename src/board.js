import Component from './component.js';

export default class Board extends Component {
  
    static getRootClass(root) {
        return '.board';
      }

    constructor(root, color) {
        super(root);

        this.colorDisplay = root.querySelector('#color-picked');
        this.messageDisplay = root.querySelector('#message');
        this.timerDisplay = root.querySelector('#countDown');

        this.setCountDown();

        this.reset(color);
    }

    reset(color) {
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the color?";
        this.setCountDown();
    }
    setCountDown() {
        this.setTimer = 5;
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }
    showWrongMessage() {
        this.messageDisplay.textContent = 'CHOSE WRONG! TRY AGAIN';
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = 'CORRECT!';
    }

    showTimerMessage() {
        this.timerDisplay.textContent = 'COUNT DOWN IN ' + this.setTimer + ' SEC';
    }
    hideTimerMessage() {
        this.timerDisplay.textContent = '';
    }
    showCountDown() {
        this.timerDisplay.textContent = 'COUNT DOWN IN ' + --this.setTimer + ' SEC';
        if (this.setTimer === 0) {
            this.timerDisplay.textContent = 'TIME OUT';
            this.fire('timeOut');
        } else {
            this.fire('blink');
        }
    }

}