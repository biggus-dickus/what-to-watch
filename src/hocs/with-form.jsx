import React from 'react';
import PropTypes from 'prop-types';

import collectFormData from '../utilities/collect-form-data';
import {copyRelevantProps} from '../utilities/helpers';
import getDisplayName from '../utilities/get-display-name';


/**
 * Handle the repetitive form routine: creating a controlled component,
 * adding a validator, processing user input, etc.
 * @param {Function} WrappedComponent — a React component (class or function or HOC)
 * @param {Array} formFields — an array of objects
 * @param {Object} [params] — optional
 * @return {*}
 */
const withForm = (WrappedComponent, formFields, params = {}) => {
  const requiredTypes = {
    WrappedComponent: PropTypes.func.isRequired,
    formFields: PropTypes.array.isRequired,
    params: PropTypes.object
  };

  PropTypes.checkPropTypes(requiredTypes, {WrappedComponent, formFields, params});

  class WithForm extends React.Component {
    constructor(props) {
      super(props);

      this._fieldNames = formFields.map((field) => field.name);
      this.passThroughFields = formFields.map((field) => copyRelevantProps(field, [`validate`, `validWhen`]));

      const formData = collectFormData(formFields);
      const validationData = {...formData};
      for (let key in validationData) {
        if (validationData.hasOwnProperty(key)) {
          validationData[key] = false;
        }
      }

      this._initialState = {
        ...formData,
        validity: {...validationData},
        isSubmitted: false,
        isFormValid: false
      };

      this.state = {...this._initialState};
    }

    _setValidity(fieldName, fieldValue) {
      const validity = {...this.state.validity};
      const currentField = formFields.find((field) => field.name === fieldName);

      validity[fieldName] = currentField.validate(fieldValue) === currentField.validWhen;

      return validity;
    }

    _isFormValid = () => {
      return this._fieldNames.every((name) => !!this.state.validity[name]);
    };

    handleInput = (e) => {
      const {name, value} = e.target;

      this.setState({
        [name]: value,
        validity: this._setValidity(name, value)
      });
    };

    /**
     * On submit, data will simply get re-validated,
     * Data submission logic per se must be handled by the concerned component.
     * @param {Event} e
     */
    handleSubmit = (e) => {
      e.preventDefault();

      if (!this.state.isSubmitted) {
        this.setState({isSubmitted: true});
      }

      this.setState({
        isFormValid: this._isFormValid()
      });
    };

    resetState = () => this.setState({...this._initialState});

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          formFields={this.passThroughFields}
          onInputChange={this.handleInput}
          onSubmit={this.handleSubmit}
          onStateReset={this.resetState} />
      );
    }
  }

  WithForm.displayName = `WithForm${getDisplayName(WrappedComponent)}`;
  return WithForm;
};

export default withForm;


// These propTypes are shared between all components implemented by withForm HOC.
// Import this object to avoid copy-pasting.
export const withFormSharedPropTypes = {
  formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onStateReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validity: PropTypes.object.isRequired,
};
