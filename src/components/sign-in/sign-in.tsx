import * as React from 'react';
import {connect} from 'react-redux';

// Redux
import {getAuthError} from '../../store/reducers/user/selectors';
import {Operation} from '../../store/operations';

// Config
import {EMAIL_NAME, PASSWORD_NAME} from './form-fields';
import signInFields from './form-fields';

// HOCs
import withForm from '../../hocs/with-form';

// Components
import Footer from '../partials/footer/footer';
import Input from '../partials/form-input/form-input';
import Loader from '../partials/loader/loader';
import Logo from '../partials/logo/logo';

// Types
import {GenericFormProps, FormField, Location} from '../../types'; // eslint-disable-line


interface Props extends GenericFormProps {
  authError?: string,
  location: Location,
  onLoginAttempt(email: string, password: string): Promise<void>,
}

interface State {isLoading: boolean}


class SignInView extends React.PureComponent<Props, State> {
  private _isMounted: boolean = false;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  _getError(): string {
    const {authError, isSubmitted, validity} = this.props;

    if (isSubmitted) {
      if (authError) {
        return authError;
      }

      if (!validity[EMAIL_NAME]) {
        return `Please enter a valid email address`;
      }

      if (!validity[PASSWORD_NAME]) {
        return `Password field cannot be empty`;
      }
    }

    return null;
  }

  _signIn(): void {
    this.setState({isLoading: true});

    this.props.onLoginAttempt(this.props[EMAIL_NAME], this.props[PASSWORD_NAME])
      .then(() => {
        if (this._isMounted) {
          this.setState({isLoading: false});

          if (!this.props.authError) {
            this.props.onStateReset();
          }
        }
      });
  }

  componentDidMount(): void {
    this._isMounted = true;
  }

  componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isFormValid && this.props.isFormValid) {
      this._signIn();
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  render(): React.ReactElement {
    const {isSubmitted, validity, formFields, location} = this.props;
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
          <Logo pathname={location.pathname} />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="?"
            method="post"
            className={formClassList.join(` `)}
            noValidate
            onSubmit={this.props.onSubmit}>

            <Loader show={this.state.isLoading} />

            {error && <div className="sign-in__message"><p>{error}</p></div>}

            <div className="sign-in__fields">
              {formFields.map((field: FormField) => {
                const {label, ...rest} = field;

                const classList = [`sign-in__field`];
                if (isSubmitted && !validity[field.name]) {
                  classList.push(`sign-in__field--error`);
                }

                return (
                  <div className={classList.join(` `)} key={field.id}>
                    <Input
                      className="sign-in__input"
                      value={this.props[field.name]}
                      onChange={this.props.onInputChange}
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

        <Footer pathname={location.pathname} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authError: getAuthError(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoginAttempt: (email, password) => dispatch(Operation.tryLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withForm(SignInView, signInFields));
