export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const FETCH_PRODUCT_BY_ID_REQUEST = "FETCH_PRODUCT_BY_ID_REQUEST";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const FETCH_PRODUCT_BY_ID_FAILURE = "FETCH_PRODUCT_BY_ID_FAILURE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const CLEAR_CART = "CLEAR_CART";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST
}) 
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
}) 
export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error
}) 
export const fetchProductByIdRequest = () => ({
  type: FETCH_PRODUCT_BY_ID_REQUEST
}) 
export const fetchProductByIdSuccess = (product) => ({
  type: FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product
}) 
export const fetchProductByIdFailure = (error) => ({
  type: FETCH_PRODUCT_BY_ID_FAILURE,
  payload: error
}) 
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
}) 
export const removeToCart = (product) => ({
  type: REMOVE_TO_CART,
  payload: product
}) 
export const clearCart = (product) => ({
  type: CLEAR_CART,
}) 