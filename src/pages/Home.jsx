import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterNameThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  console.log(products);

  const [categoryList, setCategoryList] = useState([])

  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk())
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(res => setCategoryList(res.data.data.categories))
      .catch(error => console.log(error.data))
  }, [])

  console.log(categoryList);

  const addToCart = () => {
    alert('added to cart')
  }

  return (
    <div className='home'>
      <Row>
        {/* CATEGOTIES */}
        <Col lg={3}>
          <ListGroup>
            {categoryList.map((category) => (
              <ListGroup.Item className='category'
                onClick={() => dispatch(filterProductsThunk(category.id))}
                key={category.id}
                style={{ cursor: 'pointer' }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        {/* PRODUCTS */}
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter product name"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={inputSearch}
              onChange={e => setInputSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => dispatch(filterNameThunk(inputSearch))}
            >
              Search
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products?.map((product) => (
              <Col key={product.id}>
                <Card >
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }} >
                    {/* <div style={{ width: '200px'}}   */}
                    <Card.Img
                      variant="top"
                      src={product.productImgs?.[0]}
                      className='img-fluid'/>
                    {/* </div> */}
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        ${product.price}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Button onClick={() => addToCart()}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;