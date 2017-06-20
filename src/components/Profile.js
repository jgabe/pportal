import React, { Component } from 'react';
import PropTypes from 'prop-types';



class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
        <div className="Profile">
          <h4>Profile</h4>
          
          <div className="row well">
              Here's the profile
          </div>

        </div>
    );
  }
}

// property declaration
Profile.propTypes = {

}


export default Profile;
