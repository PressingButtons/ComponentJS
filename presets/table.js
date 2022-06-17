import Component from '../component.js';

export default class TableComponent extends Component {

  constructor(name, options) {
    super(name, Object.assign(options, {type: 'table'}));
    Object.defineProperty(this, 'header', {value: document.createElement('thead')});
    Object.defineProperty(this, 'content', {value: document.createElement('tbody')});
    this.setTable(options);
  }


  addRow( ) {
    const tr = this.content.addComponent(`row:${this.content.body.rows.length}`, {type: 'tr'});
    for(const component of this.header.children) {
      const td = tr.addComponent(component.name, 'td');
      c++;
    }
  }

  setBody(n) {
    if(!n || n < 1) n = 1;
    this.content.removeChildren( );
    for(let i = 0; i < n; i++) this.addRow( );
  }

  setHeader(headers) {
    if(!headers) throw "Error: TableComponent requires an array of headers in configuration";
    this.header.removeChildren( );
    for(const tag of headers) {
      const th = this.header.addComponent(tag, 'th');
      th.write(tag);
    }
  }

  setTable(options) {
    this.setHeader(options.headers);
    this.setBody(options.rows);
  }

}
