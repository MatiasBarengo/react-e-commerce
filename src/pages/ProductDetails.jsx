import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetails = () => {

  const { id } = useParams()

  const products = useSelector(state => state.products)

  const productSelected = products.find(product => product.id === Number(id))
  const relatedProducts = products.filter(product =>
    product.category.id === productSelected.category.id &&
    product.id !== productSelected.id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])

  const [quantity, setQuantity] = useState('')
 
  const addToCart = () => {
    const cartProducts = {
      id: productSelected.id,
      quantity: quantity
    }
    dispatch(addToCartThunk(cartProducts))
  }

  return (
    <div>
      <Row>
        <Col lg={9}>
          <Card>
            <Card.Body>
              <Card.Title><h1>{productSelected?.title}</h1></Card.Title>
              <br />
              <Card.Text>
                <img src={productSelected?.productImgs[0]} className='img-fluid' style={{ width: '100%', aspectRatio: '3/2', objectFit: 'contain' }} />
                <br /><br /><br />
                <p>{productSelected?.description}</p>
                <br />
                <h5>${productSelected?.price}</h5>
              </Card.Text>
              <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
              <Button
                variant="primary"
                onClick={() => addToCart()}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <h4>Related products</h4>
          <ListGroup variant="flush">
            {relatedProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <ListGroup.Item>
                  {product.title}
                  <br /><br />
                  <img src={product.productImgs?.[0]} style={{ width: '100%', height: '200px', aspectRatio: '3/2', objectFit: 'contain' }} alt="" className='img-fluid' />
                  <br /><br />
                  ${product.price}
                  <br /><br />
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;