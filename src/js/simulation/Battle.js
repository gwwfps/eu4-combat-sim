import Battlefield from './Battlefield.js';

const _ = require('lodash');


export default class Battle {
  constructor(setup, attackerArmy, defenderArmy) {
    this.attackerArmy = attackerArmy;
    this.defenderArmy = defenderArmy;
    this.battlefield = new Battlefield();
  }

  resolve() {
    var phase = 0;
    while (this.attackerArmy.totalReserves() > 0 && this.defenderArmy.totalReserves() > 0) {
      this._runPhase(phase % 2 === 0);
      phase++;
      if (phase > 100) {
        break;
      }
    }
  }

  _runPhase(isFire) {
    this.battlefield.deploy(this.attackerArmy, this.defenderArmy);
    _.each(this.battlefield.unitsWithTargets(), (unitWithTargets) => {
      const [unit, targets] = unitWithTargets;
    });
  }
}
