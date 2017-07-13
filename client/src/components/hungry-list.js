import React from 'react';
import {connect} from 'react-redux';
import {fetchRestaurant, setLocation} from '../actions/hungry';
import NeverList from './never-list';

export class HungryList extends React.Component {
//send restaurant request
  submitQuery(event){
    event.preventDefault();
    const value = this.input.value;
    console.log(value);
    this.props.dispatch(setLocation(value));
    this.props.dispatch(fetchRestaurant(value));
    this.value="";
  }

  render() {
    if(this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if(this.props.loading) {
      return <div>Loading...</div>
    }
    let buttons;
    if (this.props.restaurants.length > 0) {
    buttons=<NeverList restaruantProps={this.props.restaurants}/>;
      // return buttons;
    }
    //  let buttons=<NeverList restaruantProps = {this.props.restaurants}/>;



    const restaurants = this.props.restaurants.map((restaurant, index) => {
      return (
         <li key={restaurant.id}>
            Restaurant: {restaurant.name}<br/>
            Type: {restaurant.categories[0].title}<br/>
            Address: {restaurant.location.display_address}<br/>
            Contact: {restaurant.display_phone}
        </li>
  )});

  return (
    <div className="root">
      <h1 className="headertxt">Im Hungry</h1>
      <h2>
      </h2>
      <form onSubmit={(e)=>this.submitQuery(e)}>
      <input type="text" name="city" className="City" placeholder="city or zipcode" ref={input => this.input = input}/>

      <button type="submit" id="search">Search by City or ZipCode</button>
      </form>
    <ul>
      {restaurants}
      {buttons}
    </ul>

    </div>
    )

}

}
export const mapStateToProps = (state) => ({
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(HungryList);
