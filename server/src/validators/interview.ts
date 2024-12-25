import * as yup from 'yup';

export const createInterviewSchema = yup.object().shape({
    application_id: yup
        .number()
        .integer()
        .positive()
        .required('Application ID is required'),
    interview_dateTime: yup
        .date()
        .required('Interview date and time is required'),
    interview_URL: yup
        .string()
        .url('Interview URL must be a valid URL')
        .required('Interview URL is required'),
    interview_decision: yup
        .string()
        .optional(),
    interview_notes: yup
        .string()
        .optional(),
    status: yup
        .mixed<'scheduled' | 'completed' | 'canceled'>()
        .oneOf(['scheduled', 'completed', 'canceled'], 'Status must be one of: scheduled, completed, canceled')
        .required('Status is required'),
});

export const editInterviewSchema = yup.object().shape({
    interview_dateTime: yup.date().optional(),
    interview_URL: yup
        .string()
        .url('Interview URL must be a valid URL')
        .optional(),
    interview_decision: yup.string().optional(),
    interview_notes: yup.string().optional(),
    status: yup
        .mixed<'scheduled' | 'completed' | 'canceled'>()
        .oneOf(['scheduled', 'completed', 'canceled'], 'Status must be one of: scheduled, completed, canceled')
        .optional(),
});