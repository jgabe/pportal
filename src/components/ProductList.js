import React, { Component } from 'react';
import Product from './Product';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: ''};
  }

  fetchProducts() {
    fetch(`/data/products.json`)
        .then( response => response.json())
        .then( json =>
          this.setState({products : json})
        );
  }

  componentWillMount() {
    this.fetchProducts();
  }

  handleFilter(event) {
    this.setState({products: this.state.products, filter: event.target.value});
  }

  render() {
    return (
      <div className="ProductList">

        <div className="Product-List">
          <div>
            <label>Filter Products</label>
            <input type="text" onChange={this.handleFilter.bind(this)} />
          </div>

          <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
            <ul className="media-list">
              {this.props.products
                .filter( product => product.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0 || product.description.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)
                .map( product =>
                  <Product key={product.id} product={product} />
                )}
            </ul>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

// property declaration
ProductList.propTypes = {
  products: PropTypes.array
}

export default ProductList;
