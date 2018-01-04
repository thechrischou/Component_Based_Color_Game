import Component from './component.js';
import './card.css';


export default class Card extends Component {
  
    static getRootClass(root) {
        return '.card';
      }

    static randomColor() {
      
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      return "RGB(" + r + ", " + g + ", " + b + ")";
    }

    constructor(root) {
      super(root);
      root.addEventListener('click', this.handleDomClick.bind(this));
      this.reset();
      
    }

    reset() {
      this.color = Card.randomColor();
      this.fadeIn(this.color);
    }
    fadeIn(color) {
      this.root.style.opacity = 1;
      this.root.style.backgroundColor = color;

    }

    fadeOut() {
      this.root.style.opacity = 0;
    }
    handleDomClick(e) {
      this.fire('click', this.color);
      // 等於呼叫 card.handlers['click'](card<obj>, card.color)
    }

    getColor() {
      return this.color;
    }

}