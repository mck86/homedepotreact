import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="slds-page-header">
        <div className="slds-media">
          <div className="slds-media__body">
            <h1 className="slds-page-header__title slds-truncate slds-align-middle">The Home Depot</h1>
          </div>
        </div>
      </div>
    );
  }
}
