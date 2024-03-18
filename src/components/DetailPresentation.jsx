import { fetchTransaction } from "../functions";
import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
/* import masterLogo  from "../assets/master.png";
import visaLogo  from "../assets/visa.png";
import billeteraLogo  from "../assets/billetera.png";
import pagoLogo  from "../assets/pago.png"; */
import Modal from "./Modal";
import { clearCart } from "../redux/actions";
import { SpinnerInfinity } from 'spinners-react/lib/esm/SpinnerInfinity';
import Purchase from "./Purchase";
import StepsPayment from "./StepsPayment";

const CartDetail = () => {
  
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

  const typePresentationStorage = localStorage.getItem("presentation");
  const openModalStorage = localStorage.getItem("openModalStorage");
  const dataPaymentStorage = localStorage.getItem("dataPayment");
  

  const [openModal, setOpenModal] = useState(openModalStorage ? Boolean(openModalStorage)  : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [typePresentation, setTypePresentation ] = useState(typePresentationStorage ?? "CART");
  
  const [dataTransaction, setDataTransaction] = useState(JSON.parse(dataPaymentStorage) ?? structurePayment);
  const dispatch = useDispatch();
  const [ productsCart, setProductsCart ] = useState(JSON.parse(localStorage.getItem("productsCart")));

  useEffect(() => {
    localStorage.setItem("dataPayment",JSON.stringify(dataTransaction));
  },[dataTransaction]);

  const handleCancelTransaction = () => {
    setOpenModal(false);
    setDataTransaction(structurePayment);
    setTypePresentation("CART");
    localStorage.removeItem("presentation");
    localStorage.removeItem("dataUser");
    localStorage.removeItem("dataPayment");
    localStorage.removeItem("valueShowViewConfirmPay");
    localStorage.removeItem("openModalStorage");
    localStorage.setItem("steps",0);
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
      /* setDataUser(structureDataUser); */
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
        <StepsPayment
          dataTransaction={dataTransaction}
          error={error}
          functionCancelTransaction={handleCancelTransaction}
          setDataTransaction={setDataTransaction}
          functionContinuePay={handleContinuePay}
        />
      </Modal>  
    </Fragment>
  )
}

export default CartDetail