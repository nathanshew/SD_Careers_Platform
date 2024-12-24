import * as yup from "yup";

export const frontEndApplicationSchema = yup.object().shape({
  // Replicate only the rules you need on the client
  status: yup
    .mixed<"submitted" | "shortlisted" | "rejected">()
    .oneOf(["submitted", "shortlisted", "rejected"], 
      "Status must be one of: submitted, shortlisted, rejected")
    .optional(),
  name: yup.string().optional(),
  telegram: yup
    .string()
    .matches(/^@/, "Telegram handle must start with '@'")
    .optional(),
  phone: yup
    .string()
    .matches(/^\d{8}$/, "Phone number must be exactly 8 digits")
    .optional(),
  year: yup
    .number()
    .integer()
    .min(1, "Year must be between 1 and 4")
    .max(4, "Year must be between 1 and 4")
    .optional(),
  major: yup.string().required("Major is required"),
  faculty: yup.string().required("Faculty is required"),
  linkedin_url: yup.string().url("LinkedIn URL must be a valid URL").optional(),
  resume_url: yup.string().url("Resume URL must be a valid URL").optional(),
  applicant_desc: yup.string().required("Applicant description is required"),
});