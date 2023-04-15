import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { CONNECTION_URL } from "../config/ApiConfig"


export const getAllOrders =
createAsyncThunk(
    'getAllOrders',
async()=>{
    let res = await axios.get(`${CONNECTION_URL}/orders`,{withCredentials:true})
    return res.data
})

export const createOrder=async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/order`,data,{withCredentials:true})
    return res.data
}