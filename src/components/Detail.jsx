import { useParams } from "react-router-dom";
import { useFetchProducts } from "../hooks";
import { useEffect } from "react";
import { handleAddTocart } from "../functions";
import { useDispatch } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();
  const { fetchProductById, loading, error, productAdded } = useFetchProducts("all");
  const { id } = useParams();
  
  useEffect(()=>{
    if(id){
      fetchProductById(Number(id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  if(loading) return <div>Cargando...</div>
  if(error) return <div>Error {error.message}</div>

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt="imagen-producto"
              src={productAdded?.image}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">{productAdded?.title}</h2>

            <p className="mt-4 text-gray-600">
              {
                productAdded?.description
              }
            </p>
            <p className="mt-2">
              <span className="tracking-wider text-black-900"> {`USD ${productAdded?.price}`} </span>
            </p>
            <button
              onClick={() => handleAddTocart(dispatch,productAdded)}
              className="mt-8 inline-block bg-indigo-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-indigo-700"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail