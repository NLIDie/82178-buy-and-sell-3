import {
  v1 as uuidv1,
  v5 as uuidv5
} from 'uuid';

export const getUniqueID = (name = `UniqueID`): string => {
  return uuidv5(name, uuidv1());
};
