import React from 'react';
import {connect} from 'react-redux';
import {fetchRestaurant} from '../actions/hungry';

export class HungryList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRestaurant());
  }

  render() {
    if(this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if(this.props.loading) {
      return <div>Loading...</div>
    }
    const restaurants = this.props.restaurants.map((restaurant, index) => {
      //console.log(index);
     // console.log(restaurant);
      return (
         <li key={index}>
           {restaurant}
        </li>
  )});

  return (
    <ul>
      {restaurants}
    </ul>
    )
  }
  
}

const mapStateToProps = (state) => ({
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(HungryList);