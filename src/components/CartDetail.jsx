import { Link } from "react-router-dom";
import { handleAddTocart, handleDeleteTocart } from "../functions";
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import masterLogo  from "../assets/master.png";
import visaLogo  from "../assets/visa.png";
import Modal from "./Modal";

const CartDetail = () => {
  const [openModal, setOpenModal] = useState(false)
  const [steps, setSteps] = useState(0);
  const [dataTransaction, setDataTransaction] = useState({
    numberCard: "",
    monthExp: "",
    yearExp: "",
    cvc: "",
    name: "",
    numberDocument: "",
    numberQuotas: ""
  });
  const dispatch = useDispatch();
  const [ productsCart, setProductsCart ] = useState(JSON.parse(localStorage.getItem("productsCart")));
  const storageTotalValue = localStorage.getItem("valueTotalCart");
  const valueTotalCart = JSON.parse(storageTotalValue);

  const handleChangeQuantity = ( prod,val ) => {
    const newProducts = productsCart.map(product => {
      if(product.id === prod.id){
        return{
          ...product,
          quantity: val
        }
      }else{
        return product
      }
    });
    setProductsCart(newProducts);
    const newProduct = {...prod,quantity: Number(val)};
    handleAddTocart(dispatch,newProduct);
  };

  const removeProduct = ( prod ) => {
    const newProducts = productsCart.filter(p => p.id !== prod.id);
    setProductsCart(newProducts);
    handleDeleteTocart(dispatch,prod);
  };

  const handleNumberCard = ( e ) => {
    let inputValue = e.target.value;
    let trim = inputValue.replace(/[^\d\s]/g, "");
    let formatValue = trim.replace(/(\d{4})(?=\d)/g, "$1 ");
    if(inputValue.charAt(0) != 4 && inputValue.charAt(0) != 5 ){
      formatValue=formatValue.substring(0,4);
    };
    setDataTransaction({...dataTransaction,numberCard:formatValue});
  };
  const handleCvcCard = ( e ) => {
    let inputValue = e.target.value;
    let trim = inputValue.replace(/[^\d\s]/g, "");
    setDataTransaction({...dataTransaction,cvc:trim})
  };

  console.log(dataTransaction)
  return (
    <Fragment>
      <section className={openModal ? 'overflow-hidden' : ''}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Productos carrito</h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {
                  productsCart?.map(product => (
                    <li key={product.id} className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt="imagen-producto"
                        className="size-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{product.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">{`USD ${product.price}`}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>
                            <select 
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                              name="" 
                              id=""
                              value={product.quantity}
                              onChange={(e) => handleChangeQuantity(product,e.target.value)}
                            >
                              {
                                [1,2,3,4,5].map(opt => <option value={opt}>{opt}</option>)
                              }                            
                            </select>
                        </form>

                        <button onClick={() => removeProduct(product)} className="text-gray-600 transition hover:text-red-600">
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{`USD ${valueTotalCart}`}</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{`USD ${valueTotalCart}`}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button
                      onClick={() => { setOpenModal(true);localStorage.setItem("openModalStorage",true)}}
                      className="mt-1.5 mr-2 inline-block bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Seleccionar metodo de pago
                    </button>
                    <Link
                      to="/"
                      className="mt-1.5 inline-block bg-indigo-400 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Seguir comprando
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  
      <Modal isOpen={localStorage.getItem("openModalStorage")} onClose={() =>setOpenModal(false)}>
        {
          !localStorage.getItem("steps") ?
          (
            <section>
              <div className="max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold sm:text-4xl">Seleccione método de pago</h2>
              </div>
                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                  <div className="flex items-start gap-4" onClick={()=>{ setSteps(1);localStorage.setItem("steps",1) }}>
                    <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    </span>

                    <div>
                      <h2 className="text-lg font-bold">Tarjeta de crédito</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
                        possimus quisquam reiciendis tempora animi! Quaerat, saepe?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    </span>

                    <div>
                      <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
                        possimus quisquam reiciendis tempora animi! Quaerat, saepe?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        ></path>
                      </svg>
                    </span>

                    <div>
                      <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab
                        possimus quisquam reiciendis tempora animi! Quaerat, saepe?
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setOpenModal(false);localStorage.removeItem("openModalStorage")}}
                    className="mt-1.5 inline-block bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Cancelar transacción
                  </button>
                </div>
              </div>
            </section>
          )
          :
          localStorage.getItem("steps") === '1' ?
          (
            <section className="p-4">
              <div className="flex flex-col">
                <div>
                  <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Ingresa tus datos
                  </h1>
                  <form action="#" className="mt-8 gap-6 flex-col">                 
                    <div className="w-full">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Correo electrónico </label>
                      <input
                        autoComplete="off"
                        type="email"
                        id="Email"
                        name="email"
                        className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Nombres y apellidos </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="Email"
                        name="email"
                        className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center w-full mt-4">
                      <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">país</label>
                        <select 
                          className="mt-1  h-12 w-16 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                          name="" 
                          id=""
                        >
                          <option value="+57">+57</option>
                        </select>
                      </div>
                      <div className="w-full ml-4">
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> celular </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="Email"
                          name="email"
                          className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        onClick={()=>{setSteps(2); localStorage.setItem("steps",2)}}
                        className="mt-8 inline-block bg-[#2c2a29] text-[#dfff61] hover:opacity-10 px-5 py-3 text-xs font-medium uppercase tracking-wide "
                      >
                        Continuar con tu pago
                      </button>                   
                    </div>
                  </form>
                </div>                
              </div>
            </section>
          )
          :
          localStorage.getItem("steps") === '2' ?

          (
            <section className="py-8 px-4 sm:p-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold sm:text-4xl">Paga con tu tarjeta</h2>
              </div>
              <form className="flex-col gap-4 mt-8">
                <div>
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> número de la tarjeta </label>
                  <div className="flex">

                    <input
                      onChange={handleNumberCard}
                      value={dataTransaction.numberCard}
                      type="text"
                      maxLength={19}
                      autoComplete="off"
                      className="relative pl-4 mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {
                      dataTransaction.numberCard.charAt(0) === '4' ? (<img className="absolute right-8 sm:right-16 " width={40} src={visaLogo} alt="visa" />) : dataTransaction.numberCard.charAt(0) === '5' ? (<img className="absolute right-8 sm:right-16
                    " width={40} src={masterLogo} alt="master" />) : null
                      
                    }
                  </div>
                </div>

                <div className="mt-4 flex items-center ">
                  <div>
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Expira el</label>
                    <div className="flex">
                      <div className="w-16">
                        <select 
                        onChange={(e)=> setDataTransaction({...dataTransaction,monthExp: e.target.value})}
                        value={dataTransaction.monthExp}
                        name="" 
                        id=""
                        className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        >
                          {
                            [1,2,3,4,5,6,7,8,9,10,11,12].map(op => <option value={op}>{op}</option>)
                          }
                          
                        </select>
                        
                      </div>
                      <div className="mx-4 w-16">
                        <select 
                        onChange={(e)=> setDataTransaction({...dataTransaction,yearExp: e.target.value})}
                        value={dataTransaction.yearExp}
                        name="" 
                        id=""
                        className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        >
                          {
                            [2024,2025,2026,2027,2028,2029,2030].map(op => <option value={op}>{op}</option>)
                          }
                        </select>                
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> cvc</label>
                  <input
                    onChange={handleCvcCard}
                    value={dataTransaction.cvc}
                    type="text"
                    maxLength={3}
                    className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Nombre en la tarjeta</label>
                  <input
                    onChange={(e)=> setDataTransaction({...dataTransaction,name: e.target.value})}
                    value={dataTransaction.name}
                    autoComplete="off"
                    type="text"
                    id="Email"
                    name="email"
                    className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="Name" className="block text-sm font-medium text-gray-700"><label htmlFor="Email" className="block text-sm font-medium text-gray-700">Identificación del tarjetahabiente </label> </label>
                  <div className="flex">
                    <select 
                    name="" 
                    id=""
                    className="mt-1 h-12 w-16 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    >
                      {
                        <option value="cc">cc</option>
                      }
                    </select>
                    
                    <div className="ml-4 w-full">
                    <input
                      onChange={(e)=> setDataTransaction({...dataTransaction,numberDocument: e.target.value})}
                      value={dataTransaction.numberDocument}
                      type="text"
                      autoComplete="off"
                      id="Email"
                      name="email"
                      className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    </div>
                  </div>
                  
                </div>
                <div className="mt-4">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Número de cuotas </label>
                  <select 
                  onChange={(e)=> setDataTransaction({...dataTransaction,numberQuotas: e.target.value})}
                  value={dataTransaction.numberQuotas}
                  name="" 
                  id=""
                  className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  >
                    {
                      [1,2,3,4,5,6,7,8,9,10,11,12].map(op => <option value={op}>{op}</option>)
                    }
                  </select>
                    
                  </div>

                  <div className="col-span-6 mt-4">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        autoComplete="off"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        Acepto haber leído los términos y condiciones
                      </span>
                    </label>
                  </div>


                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      className="mt-8 inline-block bg-[#2c2a29] text-[#dfff61] hover:opacity-10 px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      Continuar con tu pago
                    </button>                   
                  </div>
              </form>
            </section>
          )
          :
          null
        }
      </Modal>  
    </Fragment>
  )
}

export default CartDetail