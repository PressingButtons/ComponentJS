import Component from '../component.js';

export default class PanelComponent extends Component {

  constructor(name) {
    super(name, {type: 'div', style: "display:flex; flex-flow: column nowrap;", className: "component_panel"});
    this.addComponent('header', {type: 'div', style: "display: flex; justify-content: space-between;"});
    this.header.addComponent('title', {type: 'h1'});
    this.header.addComponent('ui', {type: 'div', style: 'display: flex'});
  }

  get title( ) {return this.header.title.innerHTML};
  set title(text) {this.header.title.innerHTML = text};

}
