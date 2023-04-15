import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {CONNECTION_URL} from '../config/ApiConfig';
export const login = async data => {
  let res = await axios.post(`${CONNECTION_URL}/login`, data, {
    withCredentials: true,
  });
  return res.data;
};
export const registerUser = async data => {
  let res = await axios.post(`${CONNECTION_URL}/signup`, data, {
    withCredentials: true,
  });
  return res.data;
};
export const logout = async () => {
  let res = await axios.get(`${CONNECTION_URL}/logout`, {
    withCredentials: true,
  });
  return res.data;
};
export const changeMode = async darkmode => {
  let res = await axios.post(
    `${CONNECTION_URL}/user/mode`,
    {darkmode},
    {withCredentials: true},
  );
  return res.data;
};

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  let res = await axios.get(`${CONNECTION_URL}/user`, {withCredentials: true});
  return res.data;
});

export const fetchCountries = async () => {
  let res = await axios.get(
    'https://countriesnow.space/api/v0.1/countries/states',
  );
  return res.data;
};
