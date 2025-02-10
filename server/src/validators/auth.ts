import * as yup from 'yup';

export const loginOpenIdConnectSchema = yup.object().shape({
    redirect_to_frontend: yup.string().required('Redirect URI is required'),
    redirect_to_frontend_verified_signup: yup.string().required('Redirect URI to verified sign-up page required')
});

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const signUpSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    password: yup.string().required('Password is required')
});

export const verifySchema = yup.object().shape({
    code: yup.string().required('Code is required'),
});

