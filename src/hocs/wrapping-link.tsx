import * as React from 'react';
import {Link} from 'react-router-dom';


interface Props {
  children?: React.ReactElement | React.ReactElement[],
  isEqualCurrentPath: boolean,
  to: string,
  [x: string]: any
}


// Prevent active html navigation links from linking on themselves
const WrappingLink = (props: Props) => {
  const {isEqualCurrentPath, to, children, ...rest} = props;

  return (isEqualCurrentPath) ?
    <span {...rest}>{children}</span> :
    <Link to={to} {...rest}>{children}</Link>;
};

export default WrappingLink;
