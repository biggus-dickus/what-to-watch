import * as React from 'react';
import {FormField, FormFieldWithValidation} from '../types'; // eslint-disable-line

import collectFormData from '../utilities/collect-form-data';
import {copyRelevantProps} from '../utilities/helpers';
import getDisplayName from '../utilities/get-display-name';


interface State {
  [x: string]: any,
  validity: {[x: string]: boolean},
  isFormValid: boolean,
  isSubmitted: boolean
}


const withForm = (WrappedComponent: React.ElementType, formFields: FormFieldWithValidation[]) => {
  class WithForm extends React.Component<any, State> {
    private _fieldNames: string[];
    private _initialState: State;

    public passThroughFields: FormField[];
    public displayName: string;

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

  (WithForm as React.ComponentClass).displayName = `WithForm${getDisplayName(WrappedComponent)}`;
  return WithForm;
};

export default withForm;
