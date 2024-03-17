import { Link } from "react-router-dom";
import { fetchTransaction, handleAddTocart, handleDeleteTocart } from "../functions";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import masterLogo  from "../assets/master.png";
import visaLogo  from "../assets/visa.png";
import billeteraLogo  from "../assets/billetera.png";
import pagoLogo  from "../assets/pago.png";
import Modal from "./Modal";
import { clearCart } from "../redux/actions";
import { SpinnerInfinity } from 'spinners-react/lib/esm/SpinnerInfinity';

const CartDetail = () => {
  const stepsStorage = parseInt(localStorage.getItem("steps"),10);
  const openModalStorage = localStorage.getItem("openModalStorage");
  const [openModal, setOpenModal] = useState(openModalStorage ? Boolean(openModalStorage)  : false);
  const [loading, setLoading] = useState(false);
  const [showViewConfirmPay, setShowViewConfirmPay] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [steps, setSteps] = useState(stepsStorage ? stepsStorage : 0);
  const [dataTransaction, setDataTransaction] = useState({
    numberCard: "",
    monthExp: "",
    yearExp: "",
    cvc: "",
    name: "",
    numberDocument: "",
    numberQuotas: ""
  });
  const [dataUser, setDataUser] = useState({
    email: "",
    name: "",
    celular: ""
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
    if(inputValue.charAt(0) !== "4" && inputValue.charAt(0) !== "5" ){
      formatValue=formatValue.substring(0,4);
    };
    setDataTransaction({...dataTransaction,numberCard:formatValue});
  };
  const handleCvcCard = ( e ) => {
    let inputValue = e.target.value;
    let trim = inputValue.replace(/[^\d\s]/g, "");
    setDataTransaction({...dataTransaction,cvc:trim})
  };

  const handleCancelTransaction = () => {
    setOpenModal(false);
    setSteps(0);
    setShowViewConfirmPay(0);
    localStorage.removeItem("valueShowViewConfirmPay");
    localStorage.removeItem("openModalStorage");
    localStorage.setItem("steps",0);
  };

  const handleStepButtonBack = () => {
    const newStep = steps - 1;
    setSteps(newStep);
    localStorage.setItem("steps",newStep);
  };
  
  const handleChangeDataUser = (e) => {
    const { name, value } = e.target;
    setDataUser({...dataUser,[name]: value});
  };

  const handleContinuePay = (e) => {
    setShowViewConfirmPay(1);
    localStorage.setItem("valueShowViewConfirmPay",1);
    setSteps(0); 
    localStorage.removeItem("steps",3);
    localStorage.removeItem("openModalStorage");
    setOpenModal(false);
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    fetchTransaction(randomNumber)
    .then(res=>{
      setData(res);
      localStorage.removeItem("openModalStorage");
      localStorage.removeItem("steps");
      localStorage.removeItem("productsCart");
      localStorage.removeItem("valueShowViewConfirmPay");
      setShowViewConfirmPay(0);
      dispatch(clearCart());
      setOpenModal(false);
    })
    .catch(error=>setError(error.message))
    .finally(()=>setLoading(false))
  };

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
  
  return (
    <Fragment>
      {
      data.status === 200 ?
      <section className={openModal ? 'overflow-hidden' : ''}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-green-500 sm:text-3xl">{data.message}</h1>
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
                  </li>
                ))
              }
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <Link
                    to="/"
                    className="mt-1.5 inline-block bg-indigo-700  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
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
      : showViewConfirmPay === 1 ?
      <section className={openModal ? 'overflow-hidden' : ''}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Detalles del pago</h1>
          </header>
          {
            error &&
            <span className="text-xl text-center text-red-400">
              {error}
            </span>
          }
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
                  </li>
                ))
              }
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Nombre</dt>
                    <dd>{dataTransaction.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Cédula</dt>
                    <dd>{dataTransaction.numberDocument}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Nro Tarjeta</dt>
                    <dd>{`**** **** **** ${dataTransaction.numberCard.substring(14,dataTransaction.numberCard.length)}`}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total a pagar</dt>
                    <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    onClick={handleTransaction}
                    className="mt-1.5 inline-block bg-indigo-700  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Confirmar pago
                  </button>
                  <button
                    onClick={handleCancelTransaction}
                    className="mt-1.5 ml-4 inline-block bg-indigo-700  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Cancelar transacción
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      :
      <section className={openModal ? 'overflow-hidden' : ''}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Productos carrito</h1>
            </header>
            {
              productsCart?.length === 0 &&
              <h3 className="mt-16 text-center">Sin productos en el carrito!</h3>
            }
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
                      <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    {
                      productsCart?.length > 0 &&
                      <button
                        onClick={() => { setOpenModal(true);localStorage.setItem("openModalStorage",true)}}
                        className="mt-1.5 mr-2 inline-block bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                      >
                        Seleccionar metodo de pago
                      </button>
                    }
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
      }
      <Modal isOpen={openModal} onClose={() =>setOpenModal(false)}>
        {
          steps === 0 ?
          (
            <section>
              <div className="max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold sm:text-4xl">Seleccione método de pago</h2>
              </div>
                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                  <div className="cursor-pointer flex h-24 items-center rounded-2xl  gap-4" onClick={()=>{ setSteps(1);localStorage.setItem("steps",1) }}>
                    <div className="w-16 h-24">
                      <img src={masterLogo} alt="master" />
                      <img src={visaLogo} alt="visa" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">Tarjeta de crédito</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer flex h-24 items-center rounded-2xl  gap-4">
                    <div className="w-16 h-24">
                      <img src={billeteraLogo} alt="billetera" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">Billetera electrónica</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer flex h-24 items-center rounded-2xl border-black gap-4">
                    <div className="w-16 h-24">
                      <img src={pagoLogo} alt="efectivo" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">En efectivo</h2>

                      <p className="mt-1 text-sm text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>

                  
                  <button
                    onClick={handleCancelTransaction}
                    className="mt-1.5 inline-block bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Cancelar transacción
                  </button>
                </div>
              </div>
            </section>
          )
          :
          steps === 1 ?
          (
            <section className="p-4">
              <div className="flex flex-col">
                <div>
                  <div className="flex items-center">
                    <span onClick={handleStepButtonBack} className="hover:bg-gray-600 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center p-4 bg-[#efefef]">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                      </svg>
                    </span>
                    <h1 className="text-center ml-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                      Ingresa tus datos
                    </h1>
                  </div>
                  <form action="#" className="mt-8 gap-6 flex-col">                 
                    <div className="w-full">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Correo electrónico </label>
                      <input
                        onChange={handleChangeDataUser}
                        value={dataUser.email}
                        autoComplete="off"
                        type="email"
                        name="email"
                        className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Nombres y apellidos </label>
                      <input
                        onChange={handleChangeDataUser}
                        value={dataUser.name}
                        autoComplete="off"
                        type="text"
                        name="name"
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
                          onChange={handleChangeDataUser}
                          value={dataUser.celular}
                          autoComplete="off"
                          type="text"
                          name="celular"
                          className="mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        onClick={()=>{setSteps(2); localStorage.setItem("steps",2)}}
                        className="mt-8 inline-block bg-[#2c2a29] text-[#dfff61] px-5 py-3 text-xs font-medium uppercase tracking-wide "
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
          steps === 2 ?
          
          (
            <section className="py-8 px-4 sm:p-8">
              <div className="flex items-center">
                <span onClick={handleStepButtonBack} className="hover:bg-gray-600 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center p-4 bg-[#efefef]">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                  </svg>
                </span>
                <div className="max-w-xl ml-4">
                  <h2 className="text-3xl font-bold sm:text-4xl">Paga con tu tarjeta</h2>
                </div>
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
                    className="mt-1 h-12 pl-4 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
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
                      onClick={handleContinuePay}
                      className="mt-8 inline-block bg-[#2c2a29] text-[#dfff61] px-5 py-3 text-xs font-medium uppercase tracking-wide"
                    >
                      Continuar con tu pago
                    </button>                   
                  </div>
              </form>
            </section>
          )
          :
          <p>hay error</p>
        }
      </Modal>  
    </Fragment>
  )
}

export default CartDetail