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
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {title}
          </h3>

          <p className="mt-2">
            <span className="tracking-wider text-gray-900"> {`USD ${price}`} </span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default Card