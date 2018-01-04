import Component from './component.js';

export default class Reset extends Component {
  
    static getRootClass(root) {
        return '.reset';
      }

    constructor(root) {
        super(root);

        this.resetDisplay = root.querySelector('.reset span');

        root.addEventListener('click', this.handleDomClick.bind(this));
        this.reset();
    }

    reset() {
        this.resetDisplay.textContent = 'New Color';
    }

    showPlayAgain(){
        this.resetDisplay.textContent = 'Play Again';
    }

    handleDomClick(e) {
        this.fire('click');
    }
    hideButton(){
        this.root.style.opacity = 0;
    }
    showButton(){
        this.root.style.opacity = 1;
    }
}