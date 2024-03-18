import { fetchTransaction } from "../functions";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import masterLogo  from "../assets/master.png";
import visaLogo  from "../assets/visa.png";
import billeteraLogo  from "../assets/billetera.png";
import pagoLogo  from "../assets/pago.png";
import Modal from "./Modal";
import { clearCart } from "../redux/actions";
import { SpinnerInfinity } from 'spinners-react/lib/esm/SpinnerInfinity';
import Purchase from "./Purchase";

const CartDetail = () => {

  //validar correo
  // eslint-disable-next-line no-useless-escape
  let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //Structures datas
  const structurePayment = {
    NUMBER_CARD: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    MONTH_EXP: {
      val: "1",
      error: false,
      textSuggestion: "",
    },
    YEAR_EXP: {
      val: "2024",
      error: false,
      textSuggestion: "",
    },
    CVC: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    NAME_TITULAR: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    DOCUMENT_TITULAR: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    NUMBER_QUOTAS: {
      val: "1",
      error: false,
      textSuggestion: "",
    },
    CHECKED: {
      val: false,
      error: false,
      textSuggestion: "",
    }
  };
  const structureDataUser = {
    EMAIL: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    NAME: {
      val: "",
      error: false,
      textSuggestion: "",
    },
    CELULAR: {
      val: "",
      error: false,
      textSuggestion: "",
    }
  }

  const stepsStorage = parseInt(localStorage.getItem("steps"),10);
  const typePresentationStorage = localStorage.getItem("presentation");
  const openModalStorage = localStorage.getItem("openModalStorage");
  const dataUserStorage = localStorage.getItem("dataUser");
  const dataPaymentStorage = localStorage.getItem("dataPayment");
  

  const [openModal, setOpenModal] = useState(openModalStorage ? Boolean(openModalStorage)  : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [steps, setSteps] = useState(stepsStorage ? stepsStorage : 0);
  const [typePresentation, setTypePresentation ] = useState(typePresentationStorage ?? "CART");
  
  
  const [dataUser, setDataUser] = useState(JSON.parse(dataUserStorage) ?? structureDataUser);
  const [dataTransaction, setDataTransaction] = useState(JSON.parse(dataPaymentStorage) ?? structurePayment);
  const dispatch = useDispatch();
  const [ productsCart, setProductsCart ] = useState(JSON.parse(localStorage.getItem("productsCart")));

  useEffect(() => {
    localStorage.setItem("dataUser",JSON.stringify(dataUser));
  },[dataUser]);

  useEffect(() => {
    localStorage.setItem("dataPayment",JSON.stringify(dataTransaction));
  },[dataTransaction]);

  const handleNumberCard = ( e ) => {

    //restringir espacios
    let inputValue = e.target.value.replace(/ /g, "");
    //limpiar espacios y restringir letras
    let trim = inputValue.replace(/[^\d\s]/g, "");
    
    //Espacio cada cuatro números
    let formatValue = trim.replace(/(\d{4})(?=\d)/g, "$1 ");

    //cuatro primeros numeros cuando no sea una tarjeta válida
    if(inputValue.charAt(0) !== "4" && inputValue.charAt(0) !== "5" ){
      formatValue=formatValue.substring(0,4);
    };
    setDataTransaction({
      ...dataTransaction,
      "NUMBER_CARD": {
      val: formatValue,
      error: false,
      textSuggestion:""
    }})
  };

  const handleCvcCard = ( e ) => {
    let inputValue = e.target.value.replace(/ /g, "");
    let trim = inputValue.replace(/[^\d\s]/g, "");
    setDataTransaction({
      ...dataTransaction,
      "CVC": {
      val: trim,
      error: false,
      textSuggestion:""
    }})
  };

  const handleCancelTransaction = () => {
    setOpenModal(false);
    setSteps(0);
    setDataTransaction(structurePayment);
    setDataUser(structureDataUser);
    setTypePresentation("CART");
    localStorage.removeItem("presentation");
    localStorage.removeItem("dataUser");
    localStorage.removeItem("dataPayment");
    localStorage.removeItem("valueShowViewConfirmPay");
    localStorage.removeItem("openModalStorage");
    localStorage.setItem("steps",0);
  };

  const handleStepButtonBack = () => {
    const newStep = steps - 1;
    setSteps(newStep);
    localStorage.setItem("steps",newStep);
  };
  
  const handleChangeDataUser = (e,key) => {
    const { value } = e.target;
    setDataUser({
    ...dataUser,
    [key]: {
    val: value,
    error: false,
    textSuggestion:""
    }})
  };

  const handleChangeDataPayment = (e,key) => {
    const { value, checked } = e.target;
    setDataTransaction({
    ...dataTransaction,
    [key]: {
    val: key === "CHECKED" ? checked : value,
    error: false,
    textSuggestion:""
    }})
  };

  const handleButtonDataUser = (e) => {
    e.preventDefault();
    if(!dataUser.EMAIL.val || !dataUser.NAME.val || !dataUser.CELULAR.val || !emailRegex.test(dataUser.EMAIL.val)){
      setDataUser({
      "EMAIL": {
        val: dataUser.EMAIL.val,
        error: !emailRegex.test(dataUser.EMAIL.val) || !dataUser.EMAIL.val ? true : false,
        textSuggestion: (!emailRegex.test(dataUser.EMAIL.val) && dataUser.EMAIL.val) ? "Ingresa un correo válido" : !dataUser.EMAIL.val ? "Campo obligatorio" : ""
        },
      "NAME": {
        val: dataUser.NAME.val,
        error: !dataUser.NAME.val ? true : false,
        textSuggestion: !dataUser.NAME.val ? "Campo obligatorio" : ""
        },
      "CELULAR": {
        val: dataUser.CELULAR.val,
        error: !dataUser.CELULAR.val ? true : false,
        textSuggestion: !dataUser.CELULAR.val ? "Campo obligatorio" : ""
        }
      });
    }else{
      setSteps(2);
      localStorage.setItem("steps",2);
    }     
  };

  const handleContinuePay = (e) => {
    e.preventDefault();
    if(!dataTransaction.NUMBER_CARD.val || !dataTransaction.CVC.val || !dataTransaction.NAME_TITULAR.val || !dataTransaction.DOCUMENT_TITULAR.val || !dataTransaction.CHECKED.val){
      setDataTransaction({
      "NUMBER_CARD": {
        val: dataTransaction.NUMBER_CARD.val,
        error: !dataTransaction.NUMBER_CARD.val ? true : false,
        textSuggestion: !dataTransaction.NUMBER_CARD.val ? "Campo obligatorio" : ""
        },
      "MONTH_EXP": {
        val: dataTransaction.MONTH_EXP.val,
        error: false,
        textSuggestion: "",
      },
      "YEAR_EXP": {
        val: dataTransaction.YEAR_EXP.val,
        error: false,
        textSuggestion: "",
      },
      "CVC": {
        val: dataTransaction.CVC.val,
        error: !dataTransaction.CVC.val ? true : false,
        textSuggestion: !dataTransaction.CVC.val ? "Campo obligatorio" : ""
        },
      "NAME_TITULAR": {
        val: dataTransaction.NAME_TITULAR.val,
        error: !dataTransaction.NAME_TITULAR.val ? true : false,
        textSuggestion: !dataTransaction.NAME_TITULAR.val ? "Campo obligatorio" : ""
        },
      "DOCUMENT_TITULAR": {
        val: dataTransaction.DOCUMENT_TITULAR.val,
        error: !dataTransaction.DOCUMENT_TITULAR.val ? true : false,
        textSuggestion: !dataTransaction.DOCUMENT_TITULAR.val ? "Campo obligatorio" : ""
        },
      "NUMBER_QUOTAS": {
        val: dataTransaction.NUMBER_QUOTAS.val,
        error: false,
        textSuggestion: "",
      },
      "CHECKED": {
        val: dataTransaction.CHECKED.val,
        error: !dataTransaction.CHECKED.val ? true : false,
        textSuggestion: !dataTransaction.CHECKED.val ? "Acepta los terminos" : ""
        }
      });
    }else{
      setTypePresentation("PAYMENT");
      localStorage.setItem("presentation","PAYMENT");
      localStorage.setItem("valueShowViewConfirmPay",1);
      localStorage.removeItem("openModalStorage");
      setOpenModal(false);
    }     
  };

  //función que ejecuta la lógica de pago
  const handleTransaction = (e) => {
    e.preventDefault();
    setLoading(true);
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    fetchTransaction(randomNumber)
    .then(res=>{
      setData(res);
      setTypePresentation("SUCCES");
      dispatch(clearCart());
      setOpenModal(false);
      setDataTransaction(structurePayment);
      setDataUser(structureDataUser);
      localStorage.clear();
    })
    .catch(error=>{
      setOpenModal(true);
      localStorage.setItem("openModalStorage",true);
      setError(error.message);
    })
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
      <Purchase
        typePresentation={typePresentation}
        openModal={openModal}
        setOpenModal={setOpenModal}
        productsCart={productsCart}
        setProductsCart={setProductsCart}
        dataResponseTransaction={data}
        dataTransaction={dataTransaction}
        functionCancelTransaction={handleCancelTransaction}
        functionTransaction={handleTransaction}
      />
      
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
                      <img height={24} src={masterLogo} alt="master" />
                      <img height={24} src={visaLogo} alt="visa" />
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
                    <div className="w-full h-24">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Correo electrónico </label>
                      <input
                        onChange={(e)=>handleChangeDataUser(e,"EMAIL")}
                        value={dataUser.EMAIL.val}
                        autoComplete="off"
                        type="email"
                        name="email"
                        className={`${dataUser.EMAIL.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                      />
                      {
                        dataUser.EMAIL.error &&
                        <span className="text-red-500">{dataUser.EMAIL.textSuggestion}</span>
                      }
                    </div>
                    <div className="h-24 mt-2">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Nombres y apellidos </label>
                      <input
                        onChange={(e)=>handleChangeDataUser(e,"NAME")}
                        value={dataUser.NAME.val}
                        autoComplete="off"
                        type="text"
                        name="name"
                        className={`${dataUser.NAME.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                      />
                      {
                        dataUser.NAME.error &&
                        <span className="text-red-500">{dataUser.NAME.textSuggestion}</span>
                      }
                    </div>
                    <div className="h-24">
                      <div className="flex items-center w-full mt-2">
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
                            onChange={(e)=>handleChangeDataUser(e,"CELULAR")}
                            value={dataUser.CELULAR.val}
                            autoComplete="off"
                            type="text"
                            name="celular"
                            className={`${dataUser.CELULAR.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                          />
                        </div>
                      </div>
                      {
                        dataUser.CELULAR.error &&
                        <span className="text-red-500">{dataUser.CELULAR.textSuggestion}</span>
                      }
                    </div>
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        onClick={(e) => handleButtonDataUser(e)}
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
              {
                error &&
                <span className="text-xl text-center mt-4 text-red-400">
                  {error}
                </span>
              }
              <form className="flex-col gap-4 mt-8">
                <div className="h-24">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> número de la tarjeta </label>
                  <div className="flex">

                    <input
                      onChange={handleNumberCard}
                      value={dataTransaction.NUMBER_CARD.val}
                      type="text"
                      maxLength={19}
                      autoComplete="off"
                      className={`${dataTransaction.NUMBER_CARD.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                    />
                    {
                      dataTransaction.NUMBER_CARD.val.charAt(0) === '4' ? (<img className="absolute right-8 sm:right-16 " width={40} src={visaLogo} alt="visa" />) : dataTransaction.NUMBER_CARD.val.charAt(0) === '5' ? (<img className="absolute right-8 sm:right-16
                    " width={40} src={masterLogo} alt="master" />) : null
                      
                    }
                  </div>
                    {
                      dataTransaction.NUMBER_CARD.error &&
                      <span className="text-red-500">{dataTransaction.NUMBER_CARD.textSuggestion}</span>
                    }
                </div>
                  <div className="h-24">
                    <div className="flex items-center">
                      <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Expira el</label>
                        <div className="flex">
                          <div className="w-16">
                            <select 
                            onChange={(e) => handleChangeDataPayment(e,"MONTH_EXP")}
                            value={dataTransaction.MONTH_EXP.val}
                            name="" 
                            id=""
                            className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            >
                              {
                                [1,2,3,4,5,6,7,8,9,10,11,12].map(op => <option key={op} value={op}>{op}</option>)
                              }
                              
                            </select>
                            
                          </div>
                          <div className="mx-4 w-16">
                            <select 
                            onChange={(e) => handleChangeDataPayment(e,"YEAR_EXP")}
                            value={dataTransaction.YEAR_EXP.val}
                            name="" 
                            id=""
                            className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            >
                              {
                                [2024,2025,2026,2027,2028,2029,2030].map(op => <option key={op} value={op}>{op}</option>)
                              }
                            </select>                
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                      <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> cvc</label>
                      <input
                        onChange={handleCvcCard}
                        value={dataTransaction.CVC.val}
                        type="text"
                        maxLength={3}
                        className={`${dataTransaction.CVC.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                      />
                    </div>
                    </div>
                      {
                        dataTransaction.CVC.error &&
                        <span className="text-red-500 ml-40">{dataTransaction.CVC.textSuggestion}</span>
                      }
                  </div>
                <div className="h-24">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Nombre en la tarjeta</label>
                  <input
                    onChange={(e) => handleChangeDataPayment(e,"NAME_TITULAR")}
                    value={dataTransaction.NAME_TITULAR.val}
                    autoComplete="off"
                    type="text"
                    id="Email"
                    name="email"
                    className={`${dataTransaction.NAME_TITULAR.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                  />
                  {
                    dataTransaction.NAME_TITULAR.error &&
                    <span className="text-red-500">{dataTransaction.NAME_TITULAR.textSuggestion}</span>
                  }
                </div>
                <div className="h-24">

                  <div>
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
                        onChange={(e) => handleChangeDataPayment(e,"DOCUMENT_TITULAR")}
                        value={dataTransaction.DOCUMENT_TITULAR.val}
                        type="text"
                        autoComplete="off"
                        id="Email"
                        name="email"
                        className={`${dataTransaction.DOCUMENT_TITULAR.error ? 'border-red-500 border-2' : ''} mt-1 pl-4 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}
                      />
                      </div>
                    </div>
                    
                  </div>
                  {
                    dataTransaction.DOCUMENT_TITULAR.error &&
                    <span className="text-red-500 ml-20">{dataTransaction.DOCUMENT_TITULAR.textSuggestion}</span>
                  }
                </div>
                <div>
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Número de cuotas </label>
                  <select 
                  onChange={(e) => handleChangeDataPayment(e,"NUMBER_QUOTAS")}
                  value={dataTransaction.NUMBER_QUOTAS.val}
                  name="" 
                  id=""
                  className="mt-1 h-12 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  >
                    {
                      [1,2,3,4,5,6,7,8,9,10,11,12].map(op => <option key={op} value={op}>{op}</option>)
                    }
                  </select>
                    
                  </div>

                  <div className="col-span-6 mt-4 h-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                      <input
                        onChange={(e) => handleChangeDataPayment(e,"CHECKED")}
                        value={dataTransaction.CHECKED.val}
                        type="checkbox"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        Acepto haber leído los términos y condiciones
                      </span>
                    </label>
                    {
                      dataTransaction.CHECKED.error &&
                      <span className="text-red-500">{dataTransaction.CHECKED.textSuggestion}</span>
                    }
                  </div>
                  

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      onClick={(e) => handleContinuePay(e)}
                      className="mt-4 inline-block bg-[#2c2a29] text-[#dfff61] px-5 py-3 text-xs font-medium uppercase tracking-wide"
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