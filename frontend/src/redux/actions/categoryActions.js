import * as actionTypes from "../constants/categoryConstants";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CATEGORIES_REQUEST });

    //const { data } = await api.getCategories();
    const { data } = await axios.get("/api/categories");
    
    console.log(data);

    dispatch({
      type: actionTypes.GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/categories/${id}`);
    //const { data } = await api.getCategoryDetails(id);

    dispatch({
      type: actionTypes.GET_CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/categories/", category);
    //const { data } = await api.createCategory(category);
    console.log(data);
    dispatch({
      type: 'CREATE',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`/api/categories/${id}`, category);
    //const { data } = await api.updateCategory(id, category);
    dispatch({
      type: 'UPDATE',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/categories/${id}`);
    //await api.deleteCategory(id);
    console.log('DELETE CATEGORY');
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
