import React from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../actions/hungry';

export class neverList extends React.Component {
    render() {

  return (
      <div>
           <button type="button">Yes</button>
           <button type="button">No</button>
      </div>
    )

  }

}
export const mapStateToProps = (state) => ({
  nevers:state.nevers
});


export default connect(mapStateToProps)(neverList);

