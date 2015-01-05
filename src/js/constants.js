const constantsObject = (...names) => {
  const constants = [];
  names.forEach((name) => {
    constants[name] = name;
  });
  return constants;
};

export const Sides = constantsObject(
  'ATTACKERS', 'DEFENDERS'
);

export const UnitTypes = constantsObject(
  'INFANTRY', 'CAVALRY', 'ARTILLERY'
);

export const ActionTypes = constantsObject(
  'COMP_ADD_UNIT', 'UPDATE_SETUP_FIELDS', 'UPDATE_SIDE_FIELDS'
);
