import React from 'react';
import {connect} from 'react-redux';
import {fetchRestaurant} from '../actions/hungry';
import{fetchRestaurantSuccess} from '../actions/hungry';

export class HungryList extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchRestaurant());
  // }

  submitQuery(event){
    event.preventDefault();
    const value = this.input.value;
    console.log(value);
    this.props.dispatch(fetchRestaurant(value));
    this.value="";
  }

  render() {
  //console.log("Restaurant PROPS",this.props.restaurants);
    if(this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if(this.props.loading) {
      return <div>Loading...</div>
    }
    const restaurants = this.props.restaurants.map((restaurant, index) => {
     //console.log(restaurant);
      return (
         <li key={index}>
           {restaurant.name}
        </li>

  )});

  return (
    <div>
      <form onSubmit={(e)=>this.submitQuery(e)}>
      <input type="text" name="city" className="City" placeholder="city" ref={input => this.input = input}/>

      <button type="submit">Search by City</button>
      </form>
     {/*<button onClick={() => this.props.dispatch(fetchRestaurantSuccess({name: 'A great restaurant'}))}>Search by ZipCode</button>
      <button onClick={() => this.props.dispatch(fetchRestaurantSuccess({name: 'A great restaurant'}))}>Search by Cuisine</button>*/}
    <ul>
      {restaurants}
    </ul>
    </div>
    )

}

}
const mapStateToProps = (state) => ({
  restaurants: state.restaurants
});

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onClick: (evt) => {
//             dispatch((evt.target.querySelector('input').value)
//         }
//     }
// }

export default connect(mapStateToProps)(HungryList);
