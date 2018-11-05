/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage';
import ProductPage from '../ProductPage'
import SavePage from '../SavePage';
import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchReviews} from '../../actions/reviewAction';
import { fetchRestaurants } from '../../actions/restaurantAction';
import { fetchSavedRestaurants } from '../../actions/saveAction';
import { fetchCategories, fetchFoodCategories, fetchCityCategories } from '../../actions/categoryAction';




class App extends Component {


  componentDidMount(){
    this.props.dispatch(fetchReviews());
    this.props.dispatch(fetchRestaurants());
    this.props.dispatch(fetchSavedRestaurants());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchFoodCategories());
    this.props.dispatch(fetchCityCategories());

  }

  render(){
  return (
    //Add switch to router 

    <Router>    
    <React.Fragment>
    {console.log('FOOD', this.props.foodCategories)}

     <NavBar categories={this.props.categories} cityCategories={this.props.cityCategories} foodCategories={this.props.foodCategories}/>
   
      <Route path="/" exact strict render={
        ()=> {
          return (<HomePage/>);
        }
      }/>

        <Route path="/favoriter" exact strict render={
        ()=> {

          return (<SavePage />);
        }
      }/>

      <Route path="/:restaurantName" exact strict render={({match})=>(
                   <ProductPage restaurantName={match.params.restaurantName}
                   restaurants={this.props.restaurants}
                   reviews={this.props.reviews}
                   />
      )}/>

     <Footer />

      </React.Fragment>
  </Router>
    
  );
      }
}

const mapStateToProps = (state) => {
  return {
      reviews: state.reviews.reviews,
      categories: state.categories.categories,
      loading: state.reviews.loading,
      error: state.reviews.error,
      foodCategories: state.categories.foodCategories,
      cityCategories: state.categories.cityCategories,
      restaurants: state.restaurants.restaurants


  }
}


export default connect(mapStateToProps)(App);