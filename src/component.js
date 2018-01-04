export default class Component {
  constructor(root) {
    this.root = root;
    this.handlers = {};
  }

  static getRootClass(root) {
    return '.component';
  }

  on(event, handler) {
    this.handlers[event] = handler;
  }

  fire(event, ...args) {
    this.handlers[event](this, ...args);
    //透過 fire()，會丟出 該物件（誰發動的fire）、以及其他參數
  }
}
