import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest,fetchProductsSuccess,fetchProductsFailure } from "../redux/actions";
import { fetchProductByIdRequest,fetchProductByIdSuccess,fetchProductByIdFailure } from "../redux/actions";

export const useFetchProducts = (category) => {
  const dispatch = useDispatch();
  const { products, loading, error, productAdded } = useSelector(state => state);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductsRequest());
      try {
        let url = "https://fakestoreapi.com/products";
        if(category !== "all"){
          url = `https://fakestoreapi.com/products/category/${category}`;
        }
        const response = await axios.get(url,{
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
          }
      })
        const products = response.data.map(product => ({
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price
        }))
        dispatch(fetchProductsSuccess(products))
      } catch (error) {
        dispatch(fetchProductsFailure(error))
      }
    }
    fetchData();
    return () => {}
  },[category,dispatch]);

  const fetchProductById = async(productId) => {
    dispatch(fetchProductByIdRequest());
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      dispatch(fetchProductByIdSuccess(response.data))
    } catch (error) {
      dispatch(fetchProductByIdFailure(error))
    }
  };
  return {
    products,
    loading,
    error,
    productAdded,
    fetchProductById
  }
};