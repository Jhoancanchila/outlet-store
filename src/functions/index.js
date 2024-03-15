import { addToCart } from "../redux/actions";

export const handleAddTocart = (dispatch,product) => {
  dispatch(addToCart(product));

  const storageCart = localStorage.getItem("productsCart");
  let totalCart =[];
  if(storageCart){
    try {
      totalCart = JSON.parse(storageCart);
    } catch (error) {
      totalCart = [];
    }
  };
  totalCart.push(product);
  localStorage.setItem("productsCart",JSON.stringify(totalCart));
};