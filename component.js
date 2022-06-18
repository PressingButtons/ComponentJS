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

  addComponent(name, options) {
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
    if(options.style) this.body.style = options.style;

  }

}
