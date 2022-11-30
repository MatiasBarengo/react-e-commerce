import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

  const dispatch = useDispatch()

  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  console.log(purchases);

  return (
    <div>
      <h2>My puerchases</h2>
      {
        purchases.map(purchase => (
          <Card key={purchase.id} style={{ marginBottom: '3rem' }}>
            <Card.Header>{purchase.createdAt}</Card.Header>
            {
              purchase.cart?.products.map(product => (
                <Link to={`/products/${product.id}`}>
                  <Card.Body key={product.id}>
                    <h4>{product.title}</h4>
                    <h4>${product.price}</h4>
                  </Card.Body>
                </Link>
              ))
            }
          </Card>
        ))}
    </div>
  );
};

export default Purchases;