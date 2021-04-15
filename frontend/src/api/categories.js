import axios from 'axios';

const url = 'http://localhost:5000/categories';

export const getCategories = () => axios.get(url);
export const getCategoryDetails = (id) => axios.get(`${url}/${id}`);
export const createCategory = (newCategory) => axios.post(url, newCategory);
export const updateCategory = (id, updateCategory) => axios.patch(`${url}/${id}`, updateCategory);
export const deleteCategory = (id) => axios.delete(`${url}/${id}`);