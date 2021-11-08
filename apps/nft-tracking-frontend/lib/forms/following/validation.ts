import * as Yup from 'yup';

import { ethereumAddressRegexPattern } from '@parsiq-nft-tracking/validation-library';

export const newAddressFormValidationSchema = Yup.object().shape({
  address: Yup.string()
    .required('Please enter an address')
    .matches(ethereumAddressRegexPattern, 'Please enter a valid address'),
  name: Yup.string().required('Please enter a name'),
});
