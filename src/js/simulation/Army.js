const _ = require('lodash');


export default class Army {
  constructor(units) {
    this.units = units;
    this._assignRegiments();
  }

  _assignRegiments() {
    _.each(units, (unit) => {
      var unregimented = unit.size;
      const numRegiments = Math.max(1, Math.ceil(unit.size / 1000));
      unit.reserveRegiments = _.map(_.range(numRegiments), (i) => {
        const regimentSize = unregimented >= 1000 ? 1000 : unregimented;
        unregimented -= regimentSize;
        return regimentSize;
      });
      unit.retreatedRegiments = [];
    });
  }

  totalReserves() {
    return _.reduce(this.units, (total, unit) => {
      return total + _.reduce(unit.reserveRegiments, (unitTotal, regiment) => {
        return unitTotal + regiment;
      });
    }, 0);
  }
}
