const constantsObject = (...names) => {
  const constants = [];
  names.forEach((name) => {
    constants[name] = name;
  });
  return constants;
};

export const VERSION = '0.1';

export const MAX_WORKERS = 10;
export const WORKER_SCRIPT = 'worker.js';
export const WORKER_TIMEOUT = 10000;

export const Sides = constantsObject(
  'ATTACKERS', 'DEFENDERS'
);

export const UnitTypes = constantsObject(
  'INFANTRY', 'CAVALRY', 'ARTILLERY'
);

export const ActionTypes = constantsObject(
  'COMP_ADD_UNIT', 'COMP_REMOVE_UNIT',
  'START_SIMULATION',
  'UPDATE_SETUP_FIELDS', 'UPDATE_SIDE_FIELDS'
);
