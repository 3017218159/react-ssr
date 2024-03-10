import axios from 'axios';
import { CHANGE_USER_LIST } from './constants';

const changeUserList = (list) => {
  return {
    type: CHANGE_USER_LIST,
    list,
  };
};

export const getUserList = () => {
  return async (dispatch) => {
    return axios
      .get('https://reqres.in/api/users')
      .then((res) => {
        console.log('res', res.data.data);
        dispatch(changeUserList(res.data.data));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
};
