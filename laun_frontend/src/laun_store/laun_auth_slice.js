import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import launApi from "../laun_services/laun_api"

const initialState = {
  user: JSON.parse(localStorage.getItem("laun_user") || "null"),
  token: localStorage.getItem("laun_token"),
  loading: false,
  error: null,
}

export const launRegister = createAsyncThunk("launAuth/register", async (payload, { rejectWithValue }) => {
  try {
    const response = await launApi.post("/auth/register", payload)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || "Registration failed")
  }
})

export const launLogin = createAsyncThunk("launAuth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await launApi.post("/auth/login", payload)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || "Login failed")
  }
})

export const launLoadProfile = createAsyncThunk("launAuth/loadProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await launApi.get("/users/me")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.detail || "Profile loading failed")
  }
})

const launAuthSlice = createSlice({
  name: "launAuth",
  initialState,
  reducers: {
    launLogout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem("laun_user")
      localStorage.removeItem("laun_token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(launRegister.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(launRegister.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(launRegister.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(launLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(launLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.access_token
        localStorage.setItem("laun_user", JSON.stringify(action.payload.user))
        localStorage.setItem("laun_token", action.payload.access_token)
      })
      .addCase(launLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(launLoadProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(launLoadProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        localStorage.setItem("laun_user", JSON.stringify(action.payload))
      })
      .addCase(launLoadProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = null
        state.token = null
        localStorage.removeItem("laun_user")
        localStorage.removeItem("laun_token")
      })
  },
})

export const { launLogout } = launAuthSlice.actions
export default launAuthSlice.reducer
