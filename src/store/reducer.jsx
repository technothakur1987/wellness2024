let reducer = (state, action) => {
  switch (action.type) {
    
    case "SET_DATA":
      // Handle setting allData and loader
      return { ...state, allData: action.payload, loader: false };

      case "SET_FILTERDATA":
        // Handle setting filterData and loader
        return { ...state, filterData: action.payload, loader: false };
      
    case "SET_LOADER":
      // Handle loader state
      return { ...state, loader: action.payload };
      
    case "SET_ERROR":
      // Handle error state
      return { ...state, error: action.payload, loader: false };

      case "SHOWRETREATDETAILPAGE":
      // handle SHOW detail page 
      return { ...state, showProductDetailpage:true, showProductDetailId:action.payload,loader: false };

      case "HIDERETREATDETAILPAGE":
        // handle hide detail page 
        return { ...state, showProductDetailpage:false, showProductDetailId:null,loader: false };
      
    default:
      // Return the current state if action type is unknown
      return state;
  }
};

export { reducer };
