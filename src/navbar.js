import Component from './component.js';

export default class Navbar extends Component {
  
    static getRootClass(root) {
        return '.navbar';
      }

    constructor(root) {
        super(root);
        this.pickMode = 'easy';
        this.modes = [];
        const els = root.querySelectorAll('.mode');
        

        for (let i of els) {
            const mode = i.textContent.toLowerCase();
            i.addEventListener('click', this.handleDomClick.bind(this, i, mode));
            this.modes.push(i);
        }
    }
    
    handleDomClick(a, mode){
        this.pickMode = mode;
        this.removeActive();
        a.classList.add('active');
        this.fire('click', mode);
    }

    removeActive() {
        for (let i of this.modes) {
            i.classList.remove('active');
        }
    }

    
}