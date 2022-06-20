import Component from './component.js';
import Panel from './presets/panel.js';
import Table from './presets/table.js';
import Form from './presets/form.js';

Object.defineProperty(window, "ComponentLib", {value: { }});

 Object.defineProperties(ComponentLib, {
   Component: {value: Component},
   Panel: {value: Panel},
   Table: {value: Table},
   Form: {value: Form}
})
