import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getAuthError} from '../../store/reducers/user/selectors';
import {Operation} from '../../store/operations';

import {EMAIL_NAME, PASSWORD_NAME} from './form-fields';
import formFields from './form-fields';
import {isEmpty, isValidEmail} from '../../utilities/validators';

import Footer from '../partials/footer/footer';
import Input from '../partials/form-input/form-input';
import Loader from '../partials/loader/loader';
import Logo from '../partials/logo/logo';


const initialState = {
  [EMAIL_NAME]: ``,
  [PASSWORD_NAME]: ``,
  validity: {
    [EMAIL_NAME]: false,
    [PASSWORD_NAME]: false
  },
  isLoading: false,
  isSubmitted: false
};


class SignInView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {...initialState};
  }

  _getError() {
    const {isSubmitted, validity} = this.state;
    const {authError} = this.props;

    if (isSubmitted) {
      if (!validity[EMAIL_NAME]) {
        return `Please enter a valid email address`;
      }

      if (!validity[PASSWORD_NAME]) {
        return `Password field cannot be empty`;
      }

      if (authError) {
        return authError;
      }
    }

    return null;
  }

  _isFormValid() {
    return this.state.validity[EMAIL_NAME] && this.state.validity[PASSWORD_NAME];
  }

  _setValidity(fieldName, fieldValue) {
    const validity = {...this.state.validity};

    validity[fieldName] = (fieldName === EMAIL_NAME) ? isValidEmail(fieldValue) : !isEmpty(fieldValue);

    return validity;
  }

  _handleInput = (e) => {
    const {name, value} = e.target;

    this.setState({
      [name]: value,
      validity: this._setValidity(name, value)
    });
  };

  _handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.isSubmitted) {
      this.setState({isSubmitted: true});
    }

    if (this._isFormValid()) {
      this.setState({isLoading: true});

      this.props.onLoginAttempt(this.state[EMAIL_NAME], this.state[PASSWORD_NAME])
        .then(this._resetState());
    }
  };

  _resetState() {
    this.setState({...initialState});
  }

  render() {
    const {isSubmitted, validity} = this.state;
    const error = this._getError();

    let buttonText = `Sign in`;
    const formClassList = [`sign-in__form`];

    if (this.state.isLoading) {
      buttonText = `Signing in…`;
      formClassList.push(`sign-in__form--loading`);
    }

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo isHomePage={false} />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="?"
            method="post"
            className={formClassList.join(` `)}
            noValidate
            onSubmit={this._handleSubmit}>

            <Loader show={this.state.isLoading} />

            {error && <div className="sign-in__message"><p>{error}</p></div>}

            <div className="sign-in__fields">
              {formFields.map((field) => {
                const {label, ...rest} = field;

                const classList = [`sign-in__field`];
                if (isSubmitted && !validity[field.name]) {
                  classList.push(`sign-in__field--error`);
                }

                return (
                  <div className={classList.join(` `)} key={field.id}>
                    <Input className="sign-in__input"
                      value={this.state[field.name]}
                      onChange={this._handleInput}
                      {...rest} />

                    <label className="sign-in__label visually-hidden" htmlFor={field.id}>
                      {label}
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" disabled={this.state.isLoading}>
                {buttonText}
              </button>
            </div>
          </form>
        </div>

        <Footer isHomePage={false} />
      </div>
    );
  }
}

SignInView.propTypes = {
  onLoginAttempt: PropTypes.func.isRequired,
  authError: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

const mapStateToProps = (state) => ({
  authError: getAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoginAttempt: (email, password) => dispatch(Operation.tryLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
