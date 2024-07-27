import { createContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer.jsx";

let AppContext = createContext();

let AppProvider = ({ children }) => {
  let initialState = {
    name: "Vikram",
    allData: [],
    filterData:[],
    loader: true,
    error: null,
    showProductDetailpage:false,
    showProductDetailId:null,
  };

  let [state, dispatch] = useReducer(reducer, initialState);

  const getAllData = async () => {
    try {
      let res = await fetch(
        "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
      );
      let value = await res.json();

      dispatch({ type: "SET_DATA", payload: value });
      dispatch({ type: "SET_FILTERDATA", payload: value });
      dispatch({ type: "SET_LOADER", payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    console.log("State in store:", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
