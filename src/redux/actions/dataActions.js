import { SET_SCREAM, LOADING_DATA } from "../types";
import axios from "axios";

// Get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({ type: SET_SCREAM, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_SCREAM, payload: [] });
    });
};
