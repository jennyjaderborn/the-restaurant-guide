import React, {Component} from "react";
import ReactLoading from 'react-loading';
import RestaurantList from '../components/restaurant/RestaurantList';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CategoryNavbar from '../components/common/CategoryNavbar';
import { Collapse } from 'react-collapse';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { withRouter } from 'react-router';



class RestaurantPage extends Component {
  constructor(props){
    super(props)
   
    this.state = {
      show: false,
      allSelected: this.props.history.location.state ? this.props.location.state : []
    }

    this.showCategory = this.showCategory.bind(this);
    this.onFilter = this.onFilter.bind(this)
    //this.pushNew = this.pushNew.bind(this)
  } 

  onFilter = (selectedOpt) => {
    if(this.props.selectedOptions.length < 2){
      this.props.sendOption(selectedOpt);
    } else {
      console.log('vald kategori', selectedOpt.category)
      let newArray = this.props.selectedOptions.filter(obj => (obj.category !== selectedOpt.category));
      this.props.sendArray(newArray)
       this.props.sendOption(selectedOpt);
   
       console.log('Ny array', newArray);

    }
  

}


  showCategory = () => {
    this.setState(prevState => ({
        show: !prevState.show,
      }))
  }

  closeSelect = () => {
    this.setState({
      show: false,
    })
  }
  


  render() {

    console.log('FRÅN REDUX', this.props.selectedOptions)

    // Render error, loading, or resturantpage
    const { error, loading } = this.props;
    
    if (error) { return <div>Error! {error.message}</div>}

    else if (loading) {
       return (
          <LoadingSpinner>
              <ReactLoading type={'spin'} color={'orange'} height={60} width={30} />
          </LoadingSpinner>
       )
      }
    
      else {    
     // console.log("All selected här",this.state.allSelected)
      let city = this.props.selectedOptions.map((sel) => { return sel.cityId }).join("");

      let food = this.props.selectedOptions.map((sel) => { return sel.foodId }).join("");

   
     return (
          <Container>

            <div className="filterDiv">
                <a className="filter" onClick={this.showCategory}><span>Filtrera restauranger</span>
                <span> { this.state.show ?  <FaAngleUp/> :  <FaAngleDown />}</span></a>
            </div>

            <Content>
               <Collapse isOpened={this.state.show}>
               <div className="categoryWrap">
                {this.props.categories.map((category, i) =>
                  <CategoryNavbar 
                        category={category.name}
                        cityCategories={this.props.cityCategories} 
                        foodCategories={this.props.foodCategories}
                        onFilter={this.onFilter}
                        key={i}
                        />
                        )}
              </div>
            </Collapse>
            </Content>
              <Content>
             


                  <List>
                       {this.state.allSelected ?                  
                          <RestaurantList   
                                            cityCat={city}
                                            foodCat={food}
                                            restaurants={this.props.restaurants}
                                            restaurantP={this.props.restaurantP}
                                            reviews={this.props.reviews}
                                            showCategory={this.closeSelect}
                                            saveState={this.state.allSelected}
                                            />

                         : 
                        <RestaurantList cat={this.props.cat}
                        restaurantP={this.props.restaurantP}
                        restaurants={this.state.filteredArray}
                        reviews={this.props.reviews}
                        showCategory={this.closeSelect}
                        saveState={this.state.allSelected}

                        />
                       }

                    </List>
                </Content>
           </Container>
    ); 
  }
}
}

const mapStateToProps = (state) => {
  return {
      restaurants: state.restaurants.restaurants,
      loading: state.restaurants.loading,
      error: state.restaurants.error,
      reviews: state.reviews.reviews,
      categories: state.categories.categories,
      foodCategories: state.categories.foodCategories,
      cityCategories: state.categories.cityCategories,
      selectedOptions: state.filter.selectedOptions

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendOption: (selectedOpt) => dispatch({type: 'UPDATE_OPTION', payload: selectedOpt}),
    sendArray: (array) => dispatch({type: 'UPDATE_OPTIONS', payload: array}),

  }
}

// Style
const Container = styled.div `
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    max-width: 100%;
    background-color:white;
    height: auto;
    font-family: 'Ubuntu', sans-serif;
    color: rgb(49, 44, 44);

    .filterDiv{
      display: flex;
      justify-content: center;
      align-items:center;
      height: 70px;
      max-width: 100%;
      font-family: 'Source Sans Pro', sans-serif;

    @media all and (min-width: 400px) AND (max-width: 1024px) and (orientation: landscape ){
      height: 42px;
    }
    }

.filter{
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bolder;
}

a.filter{
  border: none;
  cursor: pointer;
  color: black;
 
  font-size: 16px;
}

a.filter:active{
  text-decoration: underline;
}

`
const Content = styled.div `  
 max-width: 100%; 
 

  .categoryWrap {
  display: flex;
 justify-content: center;
  flex-flow: row wrap;
   background-color: white;
  
  }
`
const List = styled.div `
   max-width:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const LoadingSpinner = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: 100vh;
`

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantPage));
