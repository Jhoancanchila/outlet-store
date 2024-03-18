import React from 'react'
import { handleAddTocart, handleDeleteTocart } from '../functions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Purchase = ({
  openModal,
  setOpenModal,
  productsCart,
  setProductsCart,
  dataResponseTransaction,
  typePresentation,
  dataTransaction,
  functionTransaction,
  functionCancelTransaction
}) => {

  const storageTotalValue = localStorage.getItem("valueTotalCart");
  const valueTotalCart = JSON.parse(storageTotalValue);

  const dispatch = useDispatch();

  const handleChangeQuantity = (prod, val) => {
    const newProducts = productsCart.map(product => {
      if (product.id === prod.id) {
        return {
          ...product,
          quantity: val
        }
      } else {
        return product
      }
    });
    setProductsCart(newProducts);
    const newProduct = { ...prod, quantity: Number(val) };
    handleAddTocart(dispatch, newProduct);
  };

  const removeProduct = (prod) => {
    const newProducts = productsCart.filter(p => p.id !== prod.id);
    setProductsCart(newProducts);
    handleDeleteTocart(dispatch, prod);
  };

  const getTotalValue = () => {
    let neArrayValues = [];
    productsCart?.forEach(element => {
      let valueXproduct = element.price * element.quantity;
      neArrayValues.push(valueXproduct);
    });
    const subTotal = neArrayValues.reduce((acumulador, valorActual) => acumulador + valorActual, 0).toFixed(2);
    return subTotal;
  };

  const totalCheckout = getTotalValue();

  const reviewDataProvided = () => {
    setOpenModal(true);
    localStorage.setItem("openModalStorage",true);
  };

  if (typePresentation === "CART") {
    return (
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
                            onChange={(e) => handleChangeQuantity(product, e.target.value)}
                          >
                            {
                              [1, 2, 3, 4, 5].map(opt => <option key={opt} value={opt}>{opt}</option>)
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
                        onClick={() => { setOpenModal(true); localStorage.setItem("openModalStorage", true) }}
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
    )
  }

  if (typePresentation === "SUCCES") {
    return (
      <section className={openModal ? 'overflow-hidden' : ''}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-green-500 sm:text-3xl">{dataResponseTransaction.message}</h1>
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
                      <dd>{`USD ${productsCart ? totalCheckout : 0}`}</dd>
                    </div>
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{`USD ${productsCart ? totalCheckout : 0}`}</dd>
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
    )
  }

  if (typePresentation === "PAYMENT") {
    return (
      <section className={openModal ? 'overflow-hidden' : ''}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="flex items-center justify-between">
              <span onClick={reviewDataProvided} className="hover:bg-gray-600 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center p-4 bg-[#efefef]">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
              </span>
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Detalles del pago</h1>
            </header>
            <div className="mt-16">
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
                      <dd>{dataTransaction.NAME_TITULAR.val}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Cédula</dt>
                      <dd>{dataTransaction.DOCUMENT_TITULAR.val}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Nro Tarjeta</dt>
                      <dd>{`**** **** **** ${dataTransaction.NUMBER_CARD.val.substring(14, dataTransaction.NUMBER_CARD.val.length)}`}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Total a pagar</dt>
                      <dd>{`USD ${productsCart ? valueTotalCart : 0}`}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button
                      onClick={functionTransaction}
                      className="mt-1.5 inline-block bg-indigo-700  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Confirmar pago
                    </button>
                    <button
                      onClick={functionCancelTransaction}
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
    )
  }
}

export default Purchase