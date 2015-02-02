export default class Battlefield {
  constructor() {
    this.attackerSide = {};
    this.defenderSide = {};
  }

  deploy(attackerArmy, defenderArmy) {
    _retreatDepleted(this.attackerSide);
    _retreatDepleted(this.defenderSide);

    if (attackerArmy.totalReserves() > defenderArmy.totalReserves()) {
      _deployFewerSide(this.defenderSide, this.attackerSide, defenderArmy);
      _deployMoreSide(this.attackerSide, this.defenderSide, attackerArmy);
    } else {
      _deployFewerSide(this.attackerSide, this.defenderSide, attackerArmy);
      _deployMoreSide(this.defenderSide, this.attackerSide, defenderArmy);
    }
  }

  _deployFewerSide(thisSide, otherSide, army) {

  }

  _deployMoreSide(thisSide, otherSide,, army) {

  }

  _retreatDepleted(side) {

  }
}
