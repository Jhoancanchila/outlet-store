import { addToCart, removeToCart } from "../redux/actions";

export const handleAddTocart = (dispatch,product) => {
  
  const storageCart = localStorage.getItem("productsCart");
  let totalCart =[];
  if(storageCart){
    try {
      totalCart = JSON.parse(storageCart);
    } catch (error) {
      totalCart = [];
    }
  };
  const isExist = totalCart?.some(prod => prod.id === product.id);
  if(!isExist){
    product = {...product,quantity: 1};
    totalCart.push(product);
  }else{
    let newtotalcart = totalCart.map(tc => {
      if(tc.id === product.id){
        return{
          ...tc,
          quantity: product.quantity
        }
      }else{
        return tc;
      }
    });
    totalCart = newtotalcart;
  }
  dispatch(addToCart(product));
  
  localStorage.setItem("productsCart",JSON.stringify(totalCart));
  let neArrayValues = [];
    totalCart.forEach(element => {
    let valueXproduct = element.price * element.quantity;
    neArrayValues.push(valueXproduct);
  });
  const subTotal = neArrayValues.reduce((acumulador, valorActual) => acumulador + valorActual, 0).toFixed(2);
  localStorage.setItem("valueTotalCart",JSON.stringify(subTotal));
  cartQuantity();
};

export const handleDeleteTocart = (dispatch,product) => {
  
  const storageCart = localStorage.getItem("productsCart");
  let totalCart =[];
  if(storageCart){
    try {
      totalCart = JSON.parse(storageCart);
    } catch (error) {
      totalCart = [];
    }
  };
  totalCart = totalCart.filter(prod => prod.id !== product.id);  
  localStorage.setItem("productsCart",JSON.stringify(totalCart));
  dispatch(removeToCart(product));

  let neArrayValues = [];
    totalCart.forEach(element => {
    let valueXproduct = element.price * element.quantity;
    neArrayValues.push(valueXproduct);
  });
  const subTotal = neArrayValues.reduce((acumulador, valorActual) => acumulador + valorActual, 0).toFixed(2);
  localStorage.setItem("valueTotalCart",JSON.stringify(subTotal));
};

export const cartQuantity = () => {
  const storageCart = localStorage.getItem("productsCart");
  let totalCart =[];
  if(storageCart){
    try {
      totalCart = JSON.parse(storageCart);
    } catch (error) {
      totalCart = [];
    }
  };
  return totalCart.length
};

export const fetchTransaction = ( data ) => {
  return new Promise((resolve,reject)=>{
    if(data === 1 || data === 4 || data === 5){
      setTimeout(() => {
        resolve({status:200,message:"Transacción exitosa"})
      }, 3000);
    }else{
      setTimeout(() => {
        reject({status:401, message:"Hubo un error procesando el pago,por favor verifica la información!"})
      }, 3000);
    }
  })
}