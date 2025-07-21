import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "RENTER" | "OWNER" | "ADMIN";

interface AuthState {
  token: string | null;
  role: Role | null;
  id: number | null;
  name: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  id: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        role: Role;
        id: number;
        name: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.name = action.payload.name;

      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.id = null;
      state.name = null;

      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
