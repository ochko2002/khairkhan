import * as actionTypes from "../constants/productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

export const createProductReducer = (products =[], action) => {
  try {
    return [...products, action.payload];
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProductReducer = (products =[], action) => {
  try {

    return products.map((product) => product._id === action.payload.id ? action.payload : product);

  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProductReducer = (products = [], action) => {
  try {
    
    return products.filter((product) => product._id !== action.payload);
    
  } catch (error) {
    console.log(error.message);
  }
}