import * as Yup from 'yup';

import {
  emailRegexPattern,
  passwordRegexPattern,
} from '@parsiq-nft-tracking/validation-library';

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your email')
    .matches(emailRegexPattern, 'Please enter a valid email address'),
  password: Yup.string().required('Please enter your password'),
});

export const signUpFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .matches(emailRegexPattern, 'Please enter a valid email address'),
  password: Yup.string()
    .required('This field is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegexPattern,
      'Your password needs at least one uppercase letter,\none lowercase letter, 1 number and 1 special character'
    ),
  confirmPassword: Yup.string()
    .transform((x) => (x === '' ? undefined : x))
    .when('password', (password, schema) => {
      if (password) return schema.required('This field is required');
    })
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const emailVerificationFormValidationSchema = Yup.object().shape({
  code: Yup.string().required(
    'Please enter the validation code that was \nsent to your email address.'
  ),
});
