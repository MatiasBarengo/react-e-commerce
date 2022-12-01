import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk } from '../store/slices/cart.slice';

const CartBar = ({show, handleClose}) => {

  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartThunk());
  }, [])

  console.log(cart);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cart.products?.map(product => (
            <div key={product.id}>
              <h5 style={{marginTop: '1rem'}}>{product.title}</h5>
              <p>$ {product.price}</p>
              <p>cant: {product.productsInCart.quantity}</p>
              <div style={{width: '100%', height: '1px', background: '#d3d3d3'}}></div>
            </div>
          ))
        }
        <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartBar;