import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      localStorage.setItem("token", action.payload.token);
      return {
        ...action.payload,
        logged: true,
        roles : action.payload.roles
      };
    case types.logout:
      localStorage.removeItem("token");
      return {
        logged: false,
        roles : []
      };
    default:
      return state;
  }
};
