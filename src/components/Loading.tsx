import React from 'react';

import { NAMESPACE } from '../constants';


const Loading = () => {
  return (
    <div className={`${NAMESPACE}__loading`}>
      <div className={`${NAMESPACE}__loading--content`}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
