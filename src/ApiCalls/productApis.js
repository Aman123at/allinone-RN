import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CONNECTION_URL } from '../config/ApiConfig'
export const fetchProducts =
createAsyncThunk(
    'fetchProducts',
async()=>{
   
         let res = await axios.get(`${CONNECTION_URL}/products`)
        
    
    return res.data
})



export const getOneProductById = async(id)=>{
    let res = await axios.get(`${CONNECTION_URL}/product/${id}`,{withCredentials:true})
    return res.data
}
export const addProduct = async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/admin/product/add`,data,{withCredentials:true})
    return res.data
}

export const deleteProduct = async(id)=>{
    let res = await axios.delete(`${CONNECTION_URL}/product/${id}`,{withCredentials:true})
    return res.data
}
export const removeProductImage = async(id,data)=>{
    let res = await axios.post(`${CONNECTION_URL}/admin/images/remove/${id}`,data,{withCredentials:true})
    return res.data
}
export const updateProduct = async(id,data)=>{
    let res = await axios.put(`${CONNECTION_URL}/admin/product/update/${id}`,data,{withCredentials:true})
    return res.data
}
export const getAreaByPinCode = async(code)=>{
    let res = await axios.get(`https://api.postalpincode.in/pincode/${code}`)
    return res.data
}
// export const logout =async()=>{
//     let res = await axios.get(`${CONNECTION_URL}/logout`,{withCredentials:true})
//     return res.data
// }