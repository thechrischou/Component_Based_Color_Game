import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';


export default class Main extends Component {

  static getRootClass(root) {
    return '.main';
  }

  constructor(root) {
    super(root);
    this.mode = ['easy', 'hard', 'nightmare'];
    
    this.navbar = new Navbar(root.querySelector('.navbar'));
    this.navbar.on('click',this.handleModeClick.bind(this));

    
    // just show message

    this.deck = new Deck(root.querySelector('.deck'));
    this.deck.on('rightClick', this.handleRightClick.bind(this));
    this.deck.on('wrongClick', this.handleWrongClick.bind(this));

    this.board = new Board(root.querySelector('.board'),this.deck.getPickedColor());
    this.board.on('timeOut',this.setTimeOut.bind(this));
    this.board.on('blink',this.handleBlink.bind(this));

    this.reset = new Reset(root.querySelector('.reset'));
    this.reset.on('click', this.handleResetClick.bind(this));
    // reset games and stick with mode

  }

  setTimeOut(firer) {
    clearInterval(this.countDownId);
    this.reset.showButton();
    this.deck.end();
    this.reset.showPlayAgain();
  }
  handleModeClick(firer, activeMode) {
    this.activeMode = activeMode;
    this.deck.selectedMode(activeMode);
    this.handleResetClick();
  }

  handleNightmareMode() {

      clearInterval(this.countDownId);
      this.board.showTimerMessage();
      this.board.setCountDown(); 
      //let self = this;

    
      this.countDownId = setInterval(()=> {this.board.showCountDown();}, 1000);


      this.reset.hideButton();
  }

  handleRightClick(firer, color) {
    this.root.style.backgroundColor = color;
    this.board.showCorrectMessage();
    this.reset.showPlayAgain();
    if (this.activeMode === this.mode[2]) {
      this.setTimeOut();
    }
  }

  handleWrongClick(firer) {
    this.board.showWrongMessage();
  }

  handleResetClick(firer) {
    this.root.style.backgroundColor = '#232323';
    
    //不是 nightmare 模式時，停止倒數,
    if (this.activeMode === this.mode[2]) {
      this.handleNightmareMode();
    } else {
      this.setTimeOut();
      this.board.hideTimerMessage();
    }
    
    this.deck.reset();
    this.board.reset(this.deck.getPickedColor());
    this.reset.reset();
    //this.handleNightmareMode();



  }
  handleBlink() {
    this.root.style.backgroundColor = '#FFFFFF';
    let self = this;
    this.blinkId = setInterval(function() {
      self.blink();
    }, 100);
  }
  blink() {
    
    this.root.style.backgroundColor = '#232323';
    clearInterval(this.blinkId);
  }
}

window.onload = function() {
  const body = document.querySelector('body');
  new Main(body);
}