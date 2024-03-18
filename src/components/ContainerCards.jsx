import { SpinnerInfinity } from 'spinners-react/lib/esm/SpinnerInfinity';

import Card from './Card';

import { useFetchProducts } from '../hooks';
import Error from './Error';

const ContainerCards = ({
  title,
  description,
  category
}) => {

  const { loading, products, error } = useFetchProducts(category);

  if(loading){
    return(
      <div className="w-full h-full rounded-3xl bg-transparent z-20 flex items-center justify-center absolute top-0 left-0 bottom-0 right-0">
        <SpinnerInfinity
          size={50}
          color="#dfff61"
          secondaryColor="#2c2a29"
          enabled={loading}
        />
      </div>
    )
  };
  if(error) return <Error error={error} />

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
              <Card key={product.id} product={product}/>
            ))
          }
        </ul>
      </div>
    </section>
  )
}



export default ContainerCards