export default class Component extends EventTarget {

  #children = new Map( );

  constructor(name, options) {
    super( );
    Object.defineProperty(this, 'name', {value: name});
    if(options.namespace != undefined) Object.defineProperty(this, 'namespace', {value: options.namespace});
    if(this.namespace) Object.defineProperty(this, 'body', {value: document.createElementNS(this.namespace, options.type || 'div', options)});
    else Object.defineProperty(this, 'body', {value: document.createElement(options.type || 'div', options)});
    this.unpackOptions(options);
  }

  #parseElement(text) {
    const type = text.match(/\w+/)[0];
    let id = text.match(/(?<=#)\w+/);
    if(id) id = id[0];
    const classes = text.match(/(?<=\.)[^\W]+/g);
    const attributes = { };
    const attrArray = text.match(/(?<=\()[^\)]+/).map( x => {let data = x.split(":"); return {name: data[0], value: data[1]}});
    for(const x of attrArray) Object.assign(attributes, x);
    return this.addComponent(attributes.name, config);
  }

  #parseContainer(container, content) {
    this.#parseElement(container);
  }

  #parseInject(text) {
    const container = this.#parseElement(text.match(/^[^{]*/));
      if(container) {
        const content = text.match(/(?<=\{)[^\}]+/)[0].split(',');
        if(content)
          for(const entry of content)
          container.setComponent(entry);
      }
  }

  #setAttributes(attributes) {
    for(const attr in attributes) {
      if(this.namespace) this.body.setAttributeNS(null, attr, attributes[attr]);
      else this.body.setAttribute(attr, attributes[attr]);
    }
  }

  #setClassName(className) {
    if(this.namespace) this.body.className.baseVal = className;
    else this.body.className = className;
  }

  addComponent(name, options = {}) {
    if(this.namespace) options.namespace = this.namespace;
    const component = new Component(name, options);
    return this.setComponent(component);
  }

  anchor(object) {
    if(object instanceof Component) return object.setComponent(this);
    else return object.appendChild(this.body);
  }

  get children( ) {
    return this.#children.values( );
  }

  inject(...params) {
    for(const param of params) this.#parseInject(param);
  }

  removeChild(name) {
    const component = this.#children.get(name);
    component.body.remove( );
    map.delete(name);
    delete this[name];
    return component;
  }

  removeChildren( ) {
    const it = this.#children.values( );
    const components = [ ];
    for(const component of it) {
      components.push(removeChild(component));
    }
    return components;
  }

  rewrite(text) {
    this.body.innerHTML = text;
  }

  get numChildren( ) {
    return this.#children.size;
  }

  setComponent(component) {
    this.body.appendChild(component.body);
    this.#children.set(component.name, component);
    Object.defineProperty(this, component.name, {value: component, configurable: true});
    return component;
  }

  write(text) {
    this.body.innerHTML += text;
  }

  unpackOptions(options) {
    if(options.id) this.body.id = options.id;
    if(options.className) this.#setClassName(options.className);
    if(options.attributes) this.#setAttributes(options.attributes);
    if(options.style) this.body.style.cssText = options.style;

  }

}
