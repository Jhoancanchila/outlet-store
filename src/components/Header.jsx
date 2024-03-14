import React from 'react'
import logo from "../assets/logo.png";
import bag from "../assets/shopping-bag.png";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 border-solid ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to="/">
              <span className="sr-only">Home</span>
             <img width="50" height="50" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" to="/mujer">Mujer</Link>
                </li>

                <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" to="/hombre">Hombre</Link>
                </li>
                <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" to="/tecnología">Tecnología</Link>
                </li>
                <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" to="/joyería">Joyería</Link>
                </li>

              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link to="/cart">
                <img width="30" height="30" src={bag} alt="bag" />              
              </Link>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
