import * as Yup from 'yup';

export const newAddressFormValidationSchema = Yup.object().shape({
  address: Yup.string().required('Please enter an address'),
  name: Yup.string().required('Please enter a name'),
});
