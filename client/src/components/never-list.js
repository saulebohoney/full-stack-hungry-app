import React from 'react';
import {connect} from 'react-redux';
import {updateUserNevers} from '../actions/hungry';

export class NeverList extends React.Component {

      handleClick(e){
        e.preventDefault();
        let id=  this.props.restaruantProps[0].id;
        this.props.dispatch(updateUserNevers(id));
        console.log('The link was clicked.');
      }
 
   
        handleYes(e){
        e.preventDefault();
        console.log("YES!");
        console.log(this.props);
        window.location.assign(`https://www.google.com/maps/search/${this.props.restaurantProps[0].location.display_address[0]+this.restaurantProps[0].location.display_address[1]}`);
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
  nevers:state.nevers
});


export default connect(mapStateToProps)(NeverList);
