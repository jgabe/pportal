import React, { Component } from 'react';
import Product from './Category';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';


class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {filterCategories: ''};
  }

  // fetchCategories() {
  //   fetch(`/data/categories.json`)
  //       .then( response => response.json())
  //       .then( json =>
  //         this.setState({categories : json})
  //       );
  // }

  componentWillMount() {
    // this.fetchCategories();
  }

  handleFilter(event) {
    this.setState({filterCategories: event.target.value});
  }

  render() {
    return (
      <div className="CategoryList">
        <h4>Please select a product category</h4>

        <div className="Category-List">
          <div>
            <label>Filter</label>
            <input type="text" onChange={this.handleFilter.bind(this)} />
          </div>

          <ul className="media-list">
            {
              this.props.categories
                .filter( category => category.name.toLowerCase().indexOf(this.state.filterCategories.toLowerCase()) >= 0 || category.description.toLowerCase().indexOf(this.state.filterCategories.toLowerCase()) >= 0)
                .map( category =>

                  <li key={category.id} className="media">
                    <div className="media-left">
                      <Link to={`/category/${category.id}`}>
                        <img className="media-object" src={category.thumbnail} alt="..." />
                      </Link>
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{category.name}</h4>
                      {category.description}
                    </div>
                  </li>

                )}
          </ul>
        </div>
      </div>
    );
  }
}

// property declaration
CategoryList.propTypes = {
  categories: PropTypes.array
}

export default CategoryList;
