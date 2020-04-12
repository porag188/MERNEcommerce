import { GET_ERRORS, CLEAR_ERROR } from './types';

//Return Errors
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id
    }
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERROR
  };
};
