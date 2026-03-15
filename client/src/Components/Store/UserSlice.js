
import { createSlice } from "@reduxjs/toolkit";

// Helper to safely get user data from localStorage.
const getInitialUser = () => {
  const storedValue = localStorage.getItem("user");

  // 1. Handle common issues like empty/null or the bad string "undefined"
  if (storedValue === null || storedValue === "undefined") {
    return null;
  }

  // 2. Safely parse the value
  try {
    return JSON.parse(storedValue); 
  } catch (error) {
    // This catch block handles any *other* unexpected, corrupted data 
    // that isn't null or "undefined"
    console.error("Fatal Error: Found corrupted user data in localStorage:", error);
    return null; 
  }
};

const UserSlice = createSlice({
  name: "user",

  // Initialize state by safely retrieving the user object
  initialState: {
    user: getInitialUser(),
  },

  reducers: {
    // User login: Update Redux state and save to localStorage
    login: (state, action) => {
      state.user = action.payload; // Redux state update
      // Convert the user object to a JSON string and save
      localStorage.setItem("user", JSON.stringify(state.user)); 
    },

    // User logout: Clear Redux state and remove all data from localStorage
    logout: (state) => {
      state.user = null; // Remove from Redux
      localStorage.removeItem("user"); 
    },
  },
});

// Actions export (for dispatching in components)
export const { login, logout } = UserSlice.actions;

// Reducer export (for adding to the store)
export default UserSlice.reducer;