import * as Yup from 'yup';

import { emailRegexPattern } from '@parsiq-nft-tracking/validation-library';

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email')
    .matches(emailRegexPattern, 'Please enter a valid email address'),
  password: Yup.string().required('Please enter your password'),
});
