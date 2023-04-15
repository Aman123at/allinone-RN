import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CONNECTION_URL } from '../config/ApiConfig'
export const fetchAllCartItems =
createAsyncThunk(
    'fetchAllCartItems',
async()=>{
    let res = await axios.get(`${CONNECTION_URL}/cart`,{withCredentials:true})
    return res.data
})

export const addCartItem=async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/cart`,data,{withCredentials:true})
    return res.data
}
export const removeItemsFromCart=async(id)=>{
    let res = await axios.delete(`${CONNECTION_URL}/cart/${id}`,{withCredentials:true})
    return res.data
}
export const clearUsersCart=async(userid)=>{
    let res = await axios.delete(`${CONNECTION_URL}/cart/clear/${userid}`,{withCredentials:true})
    return res.data
}
export const fetchCountries = async()=>{
    let res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`)
    return res.data
}
export const fetchCities = async(data)=>{
    let res = await axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`,data)
    return res.data
}
export const fetchPinCodeByCity = async(cityName)=>{
    let res = await axios.get(`https://api.postalpincode.in/postoffice/${cityName}`)
    return res.data
}


export const fetchSavedAddresses =
createAsyncThunk(
    'fetchSavedAddresses',
async(userId)=>{
    let res = await axios.get(`${CONNECTION_URL}/address/${userId}`,{withCredentials:true})
    return res.data
})

export const addNewAddress=async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/address`,data,{withCredentials:true})
    return res.data
}
export const makeThisADefaultAddress=async(addressId)=>{
    let res = await axios.get(`${CONNECTION_URL}/address/default/${addressId}`,{withCredentials:true})
    return res.data
}
export const deleteAddressById=async(id)=>{
    let res = await axios.delete(`${CONNECTION_URL}/address/${id}`,{withCredentials:true})
    return res.data
}
export const changeDefaultAddress=async(id)=>{
    let res = await axios.get(`${CONNECTION_URL}/address/default/${id}`,{withCredentials:true})
    return res.data
}

export const getRazorpayKey=async()=>{
    let res = await axios.get(`${CONNECTION_URL}/razorpaykey`,{withCredentials:true})
    return res.data
}

export const getRazorpayOrder=async(amount)=>{
    let res = await axios.post(`${CONNECTION_URL}/capturerazorpay`,{amount:amount},{withCredentials:true})
    return res.data
}

