import React from 'react'

import Card from './Card';

import { useFetchProducts } from '../hooks';

const ContainerCards = ({
  title,
  description,
  category
}) => {

  const { loading, products, error } = useFetchProducts(category);

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



export default ContainerCards