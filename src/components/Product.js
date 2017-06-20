import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Product extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
        <li key={this.props.product.id} className="media">
          <div className="media-left">
          <a href={this.props.product.appLink}><img className="media-object" src={this.props.product.thumbnail} alt="..." /></a>
          </div>
          <div className="media-body">
          <h4 className="media-heading"><a href={this.props.product.appLink}>{this.props.product.name}</a></h4>
          {this.props.product.description}
          </div>
        </li>
    );
  }
}

// property declaration
Product.propTypes = {
  product: PropTypes.object
}


export default Product;
