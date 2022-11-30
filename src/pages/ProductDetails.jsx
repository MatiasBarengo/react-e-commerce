import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

  return (
    <div>
      <h1>{productSelected?.title}</h1>
      <Row>
        <Col lg={9}>
          <img src={productSelected?.productImgs[0]} className='img-fluid' alt="" />
          <br /><br /><br />
          <h3>${productSelected?.price}</h3>
        </Col>
        <Col lg={3}>
          <ListGroup variant="flush">
            {relatedProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <ListGroup.Item>
                  {product.title}
                  <br />
                  <img src={product.productImgs?.[0]} style={{ width: '150px' }} alt="" className='img-fluid' />
                  <br />
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