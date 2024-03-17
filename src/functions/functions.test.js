import "jest-localstorage-mock";
import { handleAddTocart, handleDeleteTocart, cartQuantity, fetchTransaction } from "./index";


describe("handleAddToCart",()=> {
  beforeEach(() => {
    localStorage.clear()
  })
  it("add product",()=>{
    const product = {
      title: "camisas",
      description:"las mejores del mercado",
      price: 445,
      quantity: 1
    }
    handleAddTocart(jest.fn(),product);
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalledWith("productsCart",JSON.stringify([product]))
  })
})

describe("handleDeleteToCart",()=>{

  it('Eliminates the product when it already exists in the cart', () => {
    const dispatch = jest.fn();
    const product = { id: 1, name: 'Product 1' };
    const storageCart = JSON.stringify([product]);
    localStorage.getItem.mockReturnValueOnce(storageCart);
    localStorage.setItem.mockImplementationOnce(() => {});

    handleDeleteTocart(dispatch, product);

    expect(localStorage.getItem).toHaveBeenCalledWith('productsCart');
    expect(localStorage.setItem).toHaveBeenCalledWith('productsCart', '[]');
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_TO_CART', payload: product });
  });

  it('should handle cases where the product is not in the cart', () => {
    const dispatch = jest.fn();
    const product = { id: 1, name: 'Product 1' };
    const storageCart = JSON.stringify([]);
    localStorage.getItem.mockReturnValueOnce(storageCart);
    localStorage.setItem.mockImplementationOnce(() => {});
    handleDeleteTocart(dispatch, product);
    expect(localStorage.getItem).toHaveBeenCalledWith('productsCart');
    expect(localStorage.setItem).toHaveBeenCalledWith('productsCart', '[]');
    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_TO_CART', payload: product });
  });
})
describe("carQuantity",()=>{
  beforeEach(() => {
    localStorage.clear()
  })
  it('It will return the quantity of products in the array', () => {
    const storageCart = [{ id: 1, quantity: 1 }, { id: 2, quantity: 2 }];
    localStorage.getItem.mockReturnValue(JSON.stringify(storageCart));
    const result = cartQuantity();
    expect(result).toBe(storageCart.length);
  });

  it('will decay to zero when storage is null', () => {
    localStorage.getItem.mockReturnValue(null);
    const result = cartQuantity();
    expect(result).toBe(0);
  });

  it('storage is not a valid json', () => {
    localStorage.getItem.mockReturnValue("invalidJSON");
    const result = cartQuantity();
    expect(result).toBe(0);
  });
  
})
describe("fetchTransaction",()=>{
  it('should resolve with status 200 and message "Transacción exitosa" when data is 1', () => {
    return fetchTransaction(1).then(response => {
      expect(response.status).toBe(200);
      expect(response.message).toBe("Transacción exitosa");
    });
  });
  it('will return the unsuccessful operation', () => {
    return fetchTransaction(null).catch(response => {
      expect(response.status).toBe(401);
      expect(response.message).toBe("Hubo un error procesando el pago,por favor verifica la información!");
    });
  });
})

