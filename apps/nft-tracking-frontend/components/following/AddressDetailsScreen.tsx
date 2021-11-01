import React from 'react';
import { useRouter } from 'next/router';

import HomeScreen from '../common/HomeScreen';

export default function AddressDetailsScreen() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <HomeScreen>
      <div>Viewing details for address {address}</div>
    </HomeScreen>
  );
}
