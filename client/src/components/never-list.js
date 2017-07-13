import React from 'react';
import {connect} from 'react-redux';
import {updateUserNevers, fetchRestaurant} from '../actions/hungry';

export class NeverList extends React.Component {

      handleClick(e){
        e.preventDefault();
        let id=  this.props.restaruantProps[0].id;
        this.props.dispatch(updateUserNevers(id));
        this.props.dispatch(fetchRestaurant(this.props.city));
        console.log('The link was clicked.');
      }

      handleYes(e){
        e.preventDefault();

      }

render() {

  return (
      <div className="buttons">
           <button type="button" id="button1" onClick={(e)=>this.handleYes(e)}>Yes, take me there! </button>
           <button type="button" id="button2" onClick={(e)=> this.handleClick(e)}>No</button>

      </div>
    )

  }

}
export const mapStateToProps = (state) => ({
  nevers:state.nevers,
  city: state.city
});


export default connect(mapStateToProps)(NeverList);
