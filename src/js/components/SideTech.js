import {input} from '../lib/dom.js';
import {gfSubform, gfRow, gfField} from '../lib/gridforms.js';

var React = require('react');


export default React.createClass({
  render() {
    return gfSubform('Tech',
      gfRow( 
        gfField('Discipline',
          input({ 'type': 'text' })        
        ),
        gfField('Morale',
          input({ 'type': 'text' })
        ),
        gfField('Tactics',
          input({ 'type': 'text' })
        ),
        gfField('Combat Width',
          input({ 'type': 'text' })
        )
      ),
      gfRow(
        gfField('Infantry type',
          input({ 'type': 'text' })
        ),
        gfField('Calvary type',
          input({ 'type': 'text' })
        ),
        gfField('Artillery type',
          input({ 'type': 'text' })
        )
      )
    );
  }
});
