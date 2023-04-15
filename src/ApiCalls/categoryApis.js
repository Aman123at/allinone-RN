import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CONNECTION_URL } from '../config/ApiConfig'
export const getAllCategory =
createAsyncThunk(
    'getAllCategory',
async()=>{
    let res = await axios.get(`${CONNECTION_URL}/category/all`)
    return res.data
})

export const addCategory=async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/admin/category/add`,data,{withCredentials:true})
    return res.data
}



export const deleteCategory=async(id)=>{
    let res = await axios.delete(`${CONNECTION_URL}/admin/category/delete/${id}`,{withCredentials:true})
    return res.data
}


export const deleteSubCategories=async(data)=>{
    let res = await axios.post(`${CONNECTION_URL}/admin/category/deletesubcategory`,data,{withCredentials:true})
    return res.data
}




export const updateCategory=async(id,data)=>{
    let res = await axios.put(`${CONNECTION_URL}/admin/category/update/${id}`,data,{withCredentials:true})
    return res.data
}


export const updateSubCategory=async(catid,data)=>{
    let res = await axios.put(`${CONNECTION_URL}/admin/category/updatesubcategory/${catid}`,data,{withCredentials:true})
    return res.data
}