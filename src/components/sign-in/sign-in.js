import React from 'react';

import {isValidEmail} from '../../utilities/validators';

import Logo from '../partials/logo/logo';
import Footer from '../partials/footer/footer';


const EMAIL_NAME = `email`;
const PASSWORD_NAME = `password`;

export default class SignInView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      [EMAIL_NAME]: ``,
      [PASSWORD_NAME]: ``
    };
  }

  _handleInput = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  _handleSubmit = (e) => {
    e.preventDefault();
  };

  _isFormValid() {
    return isValidEmail(this.state[EMAIL_NAME] && this.state[PASSWORD_NAME].length);
  }

  render() {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo isHomePage={false} />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="?"
            method="post"
            className="sign-in__form"
            noValidate
            onSubmit={this._handleSubmit}>

            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name={EMAIL_NAME}
                  id="user-email"
                  value={this.state[EMAIL_NAME]}
                  onChange={this._handleInput}
                  required />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">
                  Email address
                </label>
              </div>

              <div className="sign-in__field">
                <input className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name={PASSWORD_NAME}
                  id="user-password"
                  value={this.state[PASSWORD_NAME]}
                  onChange={this._handleInput}
                  required />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">
                  Password
                </label>
              </div>
            </div>

            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer isHomePage={false} />
      </div>
    );
  }
}
