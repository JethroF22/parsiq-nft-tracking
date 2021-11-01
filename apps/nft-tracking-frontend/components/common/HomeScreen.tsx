import React from 'react';

import HomeScreenContainer from './HomeScreenContainer';
import Navbar from './Navbar';

function HomeScreen(props) {
  return (
    <HomeScreenContainer>
      <Navbar />
      {props.children}
    </HomeScreenContainer>
  );
}

export default HomeScreen;
