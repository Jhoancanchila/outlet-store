import logo from "../assets/logo.png";
import bag from "../assets/shopping-bag.png";
import { Link } from 'react-router-dom';
import { cartQuantity } from '../functions';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Header = () => {

  const menuSelectedStorage = localStorage.getItem("selection");

  const product = useSelector(state => state.productsCart);
  const quantityProductsCart = cartQuantity();
  const [ quantityProducts,setQuantityProducts ] = useState(0);
  const [ isOpenMenu,setIsOpenMenu ] = useState(false);
  const [ itemSelected,setItemSelected ] = useState(menuSelectedStorage ?? '');

  useEffect(() => {
    setQuantityProducts(quantityProductsCart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[product])

  const handleHiddenMenu = (selection) => {
    setIsOpenMenu(false);
    setItemSelected(selection);
  };

   useEffect(() => {
    localStorage.setItem("selection",itemSelected);
   },[itemSelected]);

  return (
    <>
      <header className="bg-white w-full border-b border-gray-200 border-solid fixed z-20">
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
                    <Link  className="text-gray-500 transition hover:text-gray-500/75" to="/mujer">Mujer</Link>
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
              <div className="sm:flex sm:gap-4 relative">
                <Link to="/cart">
                  {
                    quantityProducts > 0 &&
                    <sup className='rounded-full p-2 absolute bg-indigo-400 bottom-4 left-4 text-xs h-4 w-4 text-center flex items-center justify-center text-white' >{quantityProducts < 10 ? quantityProducts : '9+'}</sup>
                  }
                  <img width="30" height="30" src={bag} alt="bag" />              
                </Link>
              </div>

              <div className="block md:hidden">
                <button onClick={() => setIsOpenMenu(!isOpenMenu)} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
      {
        isOpenMenu &&
        <div className="w-full z-10 fixed top-12">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li onClick={() => handleHiddenMenu("HOME")}>
              <Link to="/" className={`${itemSelected === "HOME" ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3  rounded dark:bg-blue-600`} aria-current="page">Home</Link>
            </li>
            <li onClick={() => handleHiddenMenu("WOMEN")}>
              <Link to="/mujer" className={`${itemSelected === "WOMEN" ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3  rounded dark:bg-blue-600`}>Mujer</Link>
            </li>
            <li onClick={() => handleHiddenMenu("MEN")}>
              <Link to="/hombre" className={`${itemSelected === "MEN" ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3  rounded dark:bg-blue-600`}>Hombre</Link>
            </li>
            <li onClick={() => handleHiddenMenu("TECNOLOGY")}>
              <Link to="/tecnología" className={`${itemSelected === "TECNOLOGY" ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3  rounded dark:bg-blue-600`}>Tecnología</Link>
            </li>
            <li onClick={() => handleHiddenMenu("JEWELRY")}>
              <Link to="/joyería" className={`${itemSelected === "JEWELRY" ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-gray-100'} block py-2 px-3  rounded dark:bg-blue-600`}>Joyería</Link>
            </li>
          </ul>
        </div>
      }
    </>
  )
}
