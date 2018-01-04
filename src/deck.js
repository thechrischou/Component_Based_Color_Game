import Component from './component.js';
import Card from './card.js';

export default class Deck extends Component {
  
    static getRootClass(root) {
        return '.deck';
      }

    constructor(root) {
        super(root);

        this.gameOver = false;        
        this.cards = [];
        this.mode = 'easy';        
        this.reset();        
    }
    
    buildCardsHtml() {
        let cardCounts;
        let cardsHtml = '';

        switch (this.mode) {
            case 'hard':
                cardCounts = 6;
            break;

            case 'nightmare':
                cardCounts = 9;
            break;

            default:
                cardCounts = 3;
            break; 
        }
        for (let i = 0 ; i < cardCounts ; i++){
            cardsHtml += '<div class="card"></div>';
        }
        return cardsHtml;

    }
    buildCards(root) {

        const els = root.querySelectorAll('.card');


        for (let i of els) {
            const card = new Card(i);
            card.on('click', this.handleCardClick.bind(this));
            // 等於設定 card.handlers['click'] = deck.handleCardClick
            // 在 card.js 裡透過了 fire()，指定了 this<card>.fire('click', this<card>.color)
            // 也就是指定 = card.handler['click'](card<obj>, card.color)
            // card.handlers['click'](card<obj>, card.color) ＝ deck.handleCardClick(card<obj>, card.color)

            this.cards.push(card);
        }
        
        this.pickedColor = this.pickColor();
    }
    selectedMode(mode) {
        this.mode = mode;
    }
    handleCardClick (firer, color) {
       
        if (this.gameOver)
            return;
        if (color === this.pickedColor) {
            this.end();
            this.fire('rightClick', this.pickedColor);
        } else {
            this.fire('wrongClick');
            firer.fadeOut();
        }
    }

    end() {
        for (let i of this.cards) {
            i.fadeIn('#FFF');
            
        }
        this.gameOver = true;
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }
    getPickedColor() {
        return this.pickedColor;
    }
    getCardsHtml() {
        this.innerHTML = this.cardsHtml;
        return this.querySelectorAll('.card');
        
        //  將會是一個物件 object，包括了所有的 .card 
    }

    reset() {
        this.gameOver = false;
        this.cards = [];
        
        this.root.innerHTML = this.buildCardsHtml();
        this.buildCards(this.root);
        console.log(this.cards);
        for (let i of this.cards) {
            i.reset();
        }
        this.pickedColor = this.pickColor();
    }
    
}