import React, { Component } from 'react';

import Header from './header';
import CurrencyConverter from '../containers/currency-converter'

export default class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <div className="slds-grid">
                <div className="slds-col">
                    <CurrencyConverter />
                </div>

                <div className="slds-col">
                    <CurrencyConverter />
                </div>

                <div className="slds-col">
                    <CurrencyConverter />
                </div>
            </div>
        </div>
    );
  }
}
