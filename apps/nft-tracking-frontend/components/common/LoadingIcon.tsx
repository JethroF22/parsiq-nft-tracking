import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

interface AppProps {
  size: SizeProp;
}

const LoadingIcon = ({ size }: AppProps): JSX.Element => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      <FontAwesomeIcon
        icon={faCircleNotch}
        size={size}
        style={{
          color: '#7f7f7fff',
        }}
        spin={true}
      />
    </div>
  );
};

export default LoadingIcon;
