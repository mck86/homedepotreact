import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFixer } from '../actions/index';

class CurrencyConverter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            baseAmount: '',
            baseCurrency: '',
            convertedAmount: '',
            convertedCurrecy: ''
        }

        this.onBaseInputChange = this.onBaseInputChange.bind(this);
        this.onConvertedInputChange = this.onConvertedInputChange.bind(this);
        this.onBaseSelectChange = this.onBaseSelectChange.bind(this);
        this.onConvertedSelectChange = this.onConvertedSelectChange.bind(this);
    }

    componentDidMount() {
        this.setState({baseCurrency: 'CAD', convertedCurrency: 'USD'});
        this.props.fetchFixer('CAD');
    }

    convertBase() {
        if (this.state.baseCurrency === this.state.convertedCurrency) {
            this.setState({baseAmount: (this.state.convertedAmount).toFixed(2)});
        } else {
            this.setState({baseAmount: (this.state.convertedAmount / this.props.currencies.rates[this.state.convertedCurrency]).toFixed(2)});
        }
    }

    convertConverted() {
        if (this.state.convertedCurrency === this.state.baseCurrency) {
            this.setState({convertedAmount: parseInt(this.state.baseAmount).toFixed(2)});
        } else {
            this.setState({convertedAmount: (this.state.baseAmount * this.props.currencies.rates[this.state.convertedCurrency]).toFixed(2)});
        }
    }

    onBaseInputChange(event) {
        if(!isNaN(event.target.value)) {
            this.setState(
                {baseAmount: event.target.value},
                this.convertConverted
            );
        }
    }

    onConvertedInputChange(event) {
        if(!isNaN(event.target.value)) {
            this.setState(
                {convertedAmount: event.target.value},
                this.convertBase
            );
        }
    }

    onBaseSelectChange(event) {
        this.setState({baseCurrency: event.target.value});
        this.props.fetchFixer(event.target.value).then((value) => {
            this.convertConverted();
        });
    }

    onConvertedSelectChange(event) {
        this.setState(
            {convertedCurrency: event.target.value},
            this.convertConverted
        );
    }

    render() {
        return (
            <div className="slds-p-around_large">
                <div className="slds-form-element slds-m-bottom_xx-small">
                    <div className="slds-grid slds-wrap slds-grid_pull-padded slds-form-element__control">
                        <label className="slds-form-element__label slds-p-horizontal_xx-small">Type in amount and select currency:</label>
                        <div className="slds-large-size_10-of-12 slds-medium-size_9-of-12 slds-small-size_7-of-12  slds-max-small-size_12-of-12 slds-p-around_xx-small">
                            <input
                                type="text"
                                className="slds-input"
                                placeholder="0.00"
                                value={this.state.baseAmount}
                                onChange={this.onBaseInputChange}
                            />
                        </div>
                        <div className="slds-large-size_2-of-12 slds-medium-size_3-of-12 slds-small-size_5-of-12  slds-max-small-size_12-of-12 slds-p-around_xx-small">
                            <select className="slds-select"  onChange={this.onBaseSelectChange} value={this.state.baseCurrency}>
                                <option value="CAD">CAD</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="slds-form-element slds-m-bottom_xx-small">
                    <div className="slds-grid slds-wrap slds-grid_pull-padded slds-form-element__control">
                        <label className="slds-form-element__label slds-p-horizontal_xx-small">Converted Amount:</label>
                        <div className="slds-large-size_10-of-12 slds-medium-size_9-of-12 slds-small-size_8-of-12 slds-max-small-size_12-of-12 slds-p-around_xx-small">
                            <input
                                type="text"
                                className="slds-input"
                                placeholder="0.00"
                                value={this.state.convertedAmount}
                                onChange={this.onConvertedInputChange}
                            />
                        </div>
                        <div className="slds-large-size_2-of-12 slds-medium-size_3-of-12 slds-small-size_4-of-12 slds-max-small-size_12-of-12 slds-p-around_xx-small">
                            <select className="slds-select" onChange={this.onConvertedSelectChange} value={this.state.convertedCurrency}>
                                <option value="CAD">CAD</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ currencies }) {
    return { currencies }; // { weather } === { weather: weather }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchFixer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
