import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Card from 'react-credit-cards';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/messages';
import Navbar from '../layout/Navbar';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';

import './styles.css';

import 'react-credit-cards/es/styles-compiled.css';

export class PaymentPortal extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    payment: 0,
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    var { payment } = this.state;
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();

    this.props.createMessage({ payment: 'Payment done Successfully' });
    payment = 1;
    this.setState({ payment });
  };

  render() {
    const {
      name,
      number,
      expiry,
      cvc,
      focused,
      issuer,
      formData,
      payment,
    } = this.state;

    if (payment === 1) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Fragment>
        <Navbar />
        <div className='login_bg5'>
          <div className='login_form_div5'>
            <div key='Payment'>
              <div className='App-payment'>
                <span className='futura'>
                  <span className='futuraa'>Payment</span> Portal
                </span>
                <h4>Enter your card details</h4>
                <Card
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focused}
                  callback={this.handleCallback}
                />
                <form
                  id='payment_form'
                  ref={(c) => (this.form = c)}
                  onSubmit={this.handleSubmit}
                >
                  <div className='form-group'>
                    <input
                      type='tel'
                      name='number'
                      className='form-control'
                      placeholder='Card Number'
                      pattern='[\d| ]{16,22}'
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <small>E.g.: 49..., 51..., 36..., 37...</small>
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      placeholder='Name'
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <input
                        type='tel'
                        name='expiry'
                        className='form-control'
                        placeholder='Valid Thru'
                        pattern='\d\d/\d\d'
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className='col-6'>
                      <input
                        type='tel'
                        name='cvc'
                        className='form-control'
                        placeholder='CVC'
                        pattern='\d{3,4}'
                        required
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                  </div>
                  <input type='hidden' name='issuer' value={issuer} />
                  <div className='form-actions'>
                    <button className='log_btn5'>PAY</button>
                  </div>
                  <br />
                  <button className='log_btn5 '>CANCEL</button>
                </form>
                {formData && (
                  <div className='App-highlight'>
                    {formatFormData(formData).map((d, i) => (
                      <div key={i}>{d}</div>
                    ))}
                  </div>
                )}
                <hr style={{ margin: '60px 0 30px' }} />

                <hr style={{ margin: '30px 0' }} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps, {
  createMessage,
})(PaymentPortal);
