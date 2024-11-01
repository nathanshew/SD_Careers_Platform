import * as yup from 'yup';

// Schema for creating a new job
export const createJobSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  department_id: yup
    .number()
    .integer('Department ID must be an integer')
    .positive('Department ID must be positive')
    .required('Department ID is required'),
  description: yup.string().required('Description is required'),
  semester: yup.string().required('Semester is required'),
  deadline: yup.date().required('Deadline is required'),
  status: yup
    .mixed<'open' | 'closed'>()
    .oneOf(['open', 'closed'], 'Status must be either "open" or "closed"')
    .required('Status is required'),
  created_by: yup
    .number()
    .integer('Created by must be an integer')
    .positive('Created by must be positive')
    .required('Created by (Admin ID) is required'),
});

// Schema for editing an existing job
export const editJobSchema = yup.object().shape({
  title: yup.string().optional(),
  department_id: yup
    .number()
    .integer('Department ID must be an integer')
    .positive('Department ID must be positive')
    .optional(),
  description: yup.string().optional(),
  semester: yup.string().optional(),
  deadline: yup.date().optional(),
  status: yup
    .mixed<'open' | 'closed'>()
    .oneOf(['open', 'closed'], 'Status must be either "open" or "closed"')
    .optional(),
  created_by: yup
    .number()
    .integer('Created by must be an integer')
    .positive('Created by must be positive')
    .optional(),
});