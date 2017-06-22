import React, { Component } from 'react';
import ProductList from './ProductList';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


class Category extends Component {
  constructor(props) {
    super(props);

    this.showAddProductModal = this.showAddProductModal.bind(this);
    this.hideAddProductModal = this.hideAddProductModal.bind(this);
    this.state = {products: [], category: {}, showAddProduct: false};
  }

  // getInitialState() {
  //   return {products: [], category: {}, showAddProduct: false};
  // }

  fetchCategoryById(catId) {
    // TODO normally would have a different URL to fetch a single category //

    console.log('fetchCategoryById');
    fetch(`/data/categories.json?id=${catId}`, {
      headers : { // headers neeeded for IE11
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
     })
    .then( response => response.json())
    .then( json =>
      this.setState({
        products: this.state.products,
        category : json.find( categIdx => categIdx.id == catId),
        showAddProduct: this.state.showAddProduct
      })
    );
  }

  fetchProducts(catId) {
    // TODO maybe filter by category.id

    console.log('fetchProducts');
    fetch(`/data/products.json?categoryId=${catId}`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
     })
    .then( response => response.json())
    .then( json =>
      this.setState({
        category: this.state.category,
        showAddProduct: this.state.showAddProduct,
        products : json.filter( prodIdx => prodIdx.categoryId == catId)
        // products : json
      })
    );
  }

  showAddProductModal() {
    this.setState({showAddProduct: true});
  }

  hideAddProductModal() {
    this.setState({showAddProduct: false});
  }

  componentWillMount() {
    this.fetchCategoryById(this.props.categoryId);
    this.fetchProducts(this.props.categoryId);
  }


  render() {
    return (
      <div className="Category">
        <div className="well">
              Category Name: <strong>{this.state.category.name}</strong>
              <br/>Category Description: <strong>{this.state.category.description}</strong>
        </div>

        {
          // just to try a dialog
        }
        <Button bsStyle="primary" onClick={this.showAddProductModal}>
          Add Product
        </Button>

        <Modal show={this.state.showAddProduct} onHide={this.hideAddProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Some Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Some body here
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideAddProductModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <hr/>
        <h4>Products</h4>

        <ProductList products={this.state.products} />
      </div>
    );
  }
}

// property declaration
Category.propTypes = {
  categoryId : PropTypes.string
}

export default Category;
