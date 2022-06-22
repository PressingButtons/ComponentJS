import Component from '../component.js';

export default class FormComponent extends Component {

  constructor(name) {
    super(name, {className: "form_component", style: "display:flex; flex-flow: column nowrap;"});
    this.addComponent('header', {className: "form_header", type: "h1"});
    this.header.write(name);
    this.addComponent("form", {type: 'form', attributes: {className: "form_form"}});
    this.form.addComponent('content', {className: "form_component"});
    this.form.addComponent("buttons", {className: "form_buttons"});
    this.form.buttons.addComponent("submit", {type: "button", attributes: {type: "submit"}, className: "form_submit"});
    this.sections =  {};
  }

  addSection(name, content) {
    const section = this.form.content.addComponent(name, {className: "form_section"});
    this.sections[name] = section;
    section.addComponent('header', {type: 'h1', className: "header"});
    section.header.write(name);
    section.addSection('content', {className: "content"});
  }

}
