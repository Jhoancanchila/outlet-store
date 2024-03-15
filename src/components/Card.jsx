import React from 'react'
import { Link } from 'react-router-dom'
import { handleAddTocart } from '../functions'
import { useDispatch } from "react-redux";

const Card = ({ product }) => {

  const { image, title, price, id } = product;
  const dispatch = useDispatch();

  const storageProducts = localStorage.getItem("productsCart");
  const parseStorage = JSON.parse(storageProducts);
  const productExist = parseStorage?.some(product => product.id === Number(id));

  return (
    <li>
      <Link to={`/detalle/${id}`} className="group block overflow-hidden">
        <img
          src={image}
          alt="imagen-product"
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative bg-white pt-3">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4 lg:truncate">
            {title}
          </h3>
        </div>
      </Link>
      <div className="flex items-center justify-between">

        <p className="mt-2">
          <span className="tracking-wider text-gray-900"> {`USD ${price}`} </span>
        </p>
        <button
          onClick={() => !productExist ? handleAddTocart(dispatch,product) : null}
          className="mt-1.5 inline-block bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        >
          {
            productExist ? "Sacar del carrito" : "Agregar al carrito"
          }
        </button>
      </div>
    </li>
  )
}

export default Card