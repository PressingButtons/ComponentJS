import Component from '../component.js';

export default class PanelComponent extends Component {

  constructor(name) {
    super(name, {type: 'div', style: "display:flex; flex-flow: column nowrap;", className: "panel_component"});
    this.addComponent('header', {type: 'div', style: "display: flex; justify-content: space-between;", className: "panel_header"});
    this.header.addComponent('title', {type: 'h1', className: "panel_title"});
    this.header.addComponent('ui', {type: 'div', style: 'display: flex'});
    this.ui.addComponent('close', {type: p, className: "panel_close"});
    this.addComponent('content', {type: "div", style: "flex: 1; padding: 6px;", className: "panel_content"});
  }

  get title( ) {return this.header.title.innerHTML};
  set title(text) {this.header.title.innerHTML = text};

}
