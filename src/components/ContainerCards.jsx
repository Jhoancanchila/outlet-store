import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } from '../redux/actions';
import Card from './Card';

const ContainerCards = ({
  products,
  loading,
  error,
  fetchProducts,
  title,
  description
}) => {
  useEffect(() => {
    fetchProducts();
  },[fetchProducts])

  if(loading) return <div>Cargando</div>
  if(error) return <div>Error {error.message}</div>

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{title}</h2>

          <p className="mt-4 max-w-md text-gray-500">
            {
              description
            }
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {
            products?.map(product => (
              <Card key={product.id} {...product}/>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  products: state.products,
  loading: state.loading,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(fetchProductsRequest());
    axios.get("https://fakestoreapi.com/products")
    .then(response => {
      const products = response.data.map(product => ({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price
      }));
      dispatch(fetchProductsSuccess(products))
    })
    .catch(error => dispatch(fetchProductsFailure(error)))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ContainerCards)