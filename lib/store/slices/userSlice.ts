import { User } from "@/lib/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStoreState {
  user: User | null;
}

const initialState: UserStoreState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice;
export const { setUser } = userSlice.actions;
