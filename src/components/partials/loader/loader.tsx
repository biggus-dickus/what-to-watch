import * as React from 'react';

interface Props {
  show: boolean
}

const Loader = ({show}: Props): React.ReactElement => (
  show ? (
    <div className="loader">
      <p className="visually-hidden">Loading&hellip;</p>
    </div>
  ) : null
);

export default Loader;
