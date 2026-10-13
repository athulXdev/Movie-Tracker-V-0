import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../services/api'

export const getCurrentUser = createAsyncThunk('/auth/getCurrentUser',async (_,{rejectWithValue})=>{
    try {
        const res = await api.get('/user/get-current-user');
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user')
    }
})

export const userRegister = createAsyncThunk('/auth/userRegister',async (userDetatils,{rejectWithValue})=>{
    try {
        const user = await api.post('/user/user-register',userDetatils)
        return user.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Cant register try again')  
    }
})

export const userLogin = createAsyncThunk('/auth/userLogin',async (userDetatils,{rejectWithValue})=>{
    try {
        const user = await api.post('/user/user-login',userDetatils)
        return user.data.user
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'No user found Please register')
    }
})
export const userLogOut = createAsyncThunk('/auth/userLogOut',async (_,{rejectWithValue})=>{
    try {
         await api.post('/user/user-logout')
        return null
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'No user found Please register')
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false,
        error:null
    },
    reducers:{
        clearError:(state)=>{
            state.error = null
        }
    },
extraReducers:(builder)=>{
    builder
    .addCase(getCurrentUser.pending,(state)=>{
        state.loading = true,
        state.error = null
    })
    .addCase(getCurrentUser.fulfilled,(state,action)=>{
        state.loading = false,
        state.user = action.payload
    })
    .addCase(getCurrentUser.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload
    })
    .addCase(userRegister.pending,(state)=>{
        state.loading = true,
        state.error = null
    })
    .addCase(userRegister.fulfilled,(state,action)=>{
        state.loading = false,
        state.user = action.payload,
        state.error = null
    })
    .addCase(userRegister.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload
    })
    .addCase(userLogin.pending,(state)=>{
        state.loading = true,
        state.error = null
    })
    .addCase(userLogin.fulfilled,(state,action)=>{
        state.loading = false,
        state.user = action.payload,
        state.error = null
    })
    .addCase(userLogin.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload
    })
    .addCase(userLogOut.pending,(state)=>{
        state.loading = true,
        state.error = null
    })
    .addCase(userLogOut.fulfilled,(state,action)=>{
        state.loading = false,
        state.user = action.payload,
        state.error = null
    })
    .addCase(userLogOut.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.payload
    })
}
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;