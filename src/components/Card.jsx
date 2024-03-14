import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({image,title,price}) => {
  return (
    <li>
      <Link to="/" className="group block overflow-hidden">
        <img
          src={image}
          alt="imagen-product"
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative bg-white pt-3">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4 lg:truncate">
            {title}
          </h3>
          <div className="flex items-center justify-between">

            <p className="mt-2">
              <span className="tracking-wider text-gray-900"> {`USD ${price}`} </span>
            </p>
            <button
                class="mt-1.5 inline-block bg-indigo-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Agregar
            </button>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Card