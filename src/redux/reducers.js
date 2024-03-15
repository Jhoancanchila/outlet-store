import { 
  ADD_TO_CART, 
  FETCH_PRODUCTS_FAILURE, 
  FETCH_PRODUCTS_REQUEST, 
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS
  } from "./actions";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCart: [],
  productAdded: null
};


const productsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_PRODUCTS_SUCCESS:
      
      return {...state,
        loading:false,
        products:action.payload
      }
    case FETCH_PRODUCTS_FAILURE:
      
      return {...state,
        loading:false,
        error:action.payload
      }
    case FETCH_PRODUCT_BY_ID_REQUEST:
      
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      
      return {...state,
        loading:false,
        productAdded: action.payload
      }
    case FETCH_PRODUCT_BY_ID_FAILURE:
      
      return {...state,
        loading:false,
        error:action.payload
      }
    case ADD_TO_CART:

      
      
      return {...state,
        productsCart: [...state.productsCart,action.payload]
      }
  
    default:
      return state;
  }
}

export default productsReducers;