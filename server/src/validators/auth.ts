import * as yup from 'yup';

export const loginOpenIdConnectSchema = yup.object().shape({
    redirect_to_frontend: yup.string().required('Redirect URI is required'),
});
