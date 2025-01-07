import * as yup from 'yup';

export const createAdminSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
});

export const editAdminSchema = yup.object().shape({
    username: yup.string().optional(),
    email: yup.string().email('Email must be a valid email address').optional(),
});