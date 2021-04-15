import * as actionTypes from "../constants/categoryConstants";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        categories: action.payload,
        loading: false,
      };
    case actionTypes.GET_CATEGORIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCategoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case actionTypes.GET_CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_CATEGORY_DETAILS_RESET:
      return {
        category: {},
      };
    
    default:
      return state;
  }
};

export const createCategoryReducer = (categories =[], action) => {
  try {
    return [...categories, action.payload];
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCategoryReducer = (categories =[], action) => {
  try {

    return categories.map((category) => category._id === action.payload.id ? action.payload : category);

  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategoryReducer = (categories = [], action) => {
  try {
    
    return categories.filter((category) => category._id !== action.payload);
    
  } catch (error) {
    console.log(error.message);
  }
}