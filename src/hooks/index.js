import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest,fetchProductsSuccess,fetchProductsFailure } from "../redux/actions";

export const useFetchProducts = (category) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductsRequest());
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
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

  return {
    products,
    loading,
    error
  }
};