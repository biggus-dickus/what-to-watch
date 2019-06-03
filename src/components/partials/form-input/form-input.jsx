import React from 'react';
import PropTypes from 'prop-types';


const FormInput = (props) => {
  const {htmlFormTag, type = `text`, id, name, ...rest} = props;

  switch (htmlFormTag) {
    case `select`:
      return <select {...{id, name}} {...rest}>{props.children}</select>;

    case `textarea`:
      return <textarea {...{id, name}} {...rest} />;

    default:
      return <input {...{id, name, type}} {...rest} />;
  }
};

FormInput.propTypes = {
  htmlFormTag: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.object
};

export default FormInput;
