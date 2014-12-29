import {div, input, select, button, span} from '../lib/dom.js';
import {gfSubform, gfRow, gfField} from '../lib/gridforms.js';
import {compToEl} from '../lib/utils.js';

var React = require('react');


export default React.createClass({
  render() {
    return div({ className: 'comp' },
      gfSubform('Composition',
        gfRow(5,
          gfField(3, 'Type'),
          gfField(1, 'Count'),
          gfField(1, 'Add/remove')
        ),
        gfRow(gfField(span('Empty army'))),
        gfRow(5,
          gfField(3,
            select()
          ),
          gfField(1,
            input({
              'type': 'number',
              min: 0,
              max: 1000000,
              step: 1000
            })
          ),
          gfField(1,
            button('Add')
          )
        )
      )
    );
  }
});
