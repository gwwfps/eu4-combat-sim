const constantsObject = (...names) => {
  const constants = [];
  names.forEach((name) => {
    constants[name] = name;
  });
  return constants;
};

export const Side = constantsObject(
  'ATTACKERS', 'DEFENDERS'
);

export const ActionTypes = constantsObject(
  'COMP_ADD_UNIT'
);
