export default class Component extends EventTarget {

  #children = new Map( );

  constructor(name, options) {
    Object.defineProperty(this, 'name', {value: name});
    if(options.namespace) Object.defineProperty(this, 'namespace', {value: options.namespace});
    if(this.namespace) Object.defineProperty(this, 'body', {value: document.createElementNS(this.namespace, options.type || 'div', options)});
    else Object.defineProperty(this, 'body', {value: document.createElement(options.type || 'div', options)});
    this.unpackOptions(options);
  }

  addComponent(name, options) {
    if(this.namespace) options.namespace = this.namespace;
    const component = new Component(name, options);
    return this.setComponent(component);
  }

  anchor(object) {
    if(object instanceof Component) return object.setComponent(this);
    else return object.appendChild(this.body);
  }

  rewrite(text) {
    this.body.innerHTML = text;
  }

  setComponent(component) {
    this.body.appendChild(component.body);
    return component;
  }

  write(text) {
    this.body.innerHTML += text;
  }

  unpackOptions(options) {
    if(options.className) this.body.className = className;
    if(options.style) this.body.style = style;
  }

}
