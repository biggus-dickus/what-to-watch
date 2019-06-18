import * as React from 'react';
import {FormField} from '../../../types'; // eslint-disable-line


interface Props extends FormField {
  className?: string,
  children?: any[],
  onChange(): void
}


const FormInput = (props: Props): React.ReactElement => {
  const {htmlFormTag, type = `text`, id, name, children, ...rest} = props;

  switch (htmlFormTag.toLowerCase()) {
    case `select`:
      return <select {...{id, name}} {...rest}>{children}</select>;

    case `textarea`:
      return <textarea {...{id, name}} {...rest} />;

    default:
      return <input {...{id, name, type}} {...rest} />;
  }
};

export default FormInput;
