import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Category from './components/Category';
import CategoryList from './components/CategoryList';
import Profile from './components/Profile'


class App extends Component {
  constructor() {
    super();
    this.state = {categories: []};
  }

  // getInitialState() {
  //   return {categories: []};
  // }

  fetchCategories() {
    fetch(`/data/categories.json`)
        .then( response => response.json())
        .then( json =>
          this.setState({categories : json})
        );
  }

  fetchCategoriesAjax() {
    $.ajax({
      url: '/data/categories.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({categories: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  componentWillMount() {
    this.fetchCategories();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h2>React Lab</h2>
          </div>

          <NavLink exact activeClassName="activeNav" to={`/`}>Home</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink activeClassName="activeNav" to="/categories">Product Categories</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink activeClassName="activeNav" to="/profile">Profile</NavLink>

          <Switch>
            <Route exact path="/" render={() => (
                <h1>Welcome Page</h1>
              )} />

            <Route path="/profile" component={Profile} />

            <Route path="/category/:categoryId" render={ ({ match }) => (
                <Category categoryId={match.params.categoryId} />
              )}
            />

            {
              /* pass the categories to the component (rather than have the component fetch them) */
            }
            {this.state.categories && (
              <Route path="/categories" render={(props) => (
                    <CategoryList categories={this.state.categories} />
                  )}
              />
            )}
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
