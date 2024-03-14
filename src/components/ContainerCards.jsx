import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchProductsFailure, fetchProductsRequest, fetchProductsSuccess } from '../redux/actions';

const ContainerCards = ({products,loading,error,fetchProducts}) => {
  useEffect(() => {
    fetchProducts();
  },[fetchProducts])

  if(loading) return <div>Cargando</div>
  if(error) return <div>Error {error.message}</div>

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">camisas formales</h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
            dicta incidunt est ipsam, officia dolor fugit natus?
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {
            products?.map(product => (
              <li key={product.id}>
                <Link to="/" className="group block overflow-hidden">
                  <img
                    src={product.image}
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {product.title}
                    </h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider text-gray-900"> {product.price} </span>
                    </p>
                  </div>
                </Link>
              </li>

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
    .then(response => dispatch(fetchProductsSuccess(response.data)))
    .catch(error => fetchProductsFailure(error))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(ContainerCards)