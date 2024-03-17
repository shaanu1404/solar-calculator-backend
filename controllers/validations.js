import * as Yup from "yup";

export const calculateValidationSchema = Yup.object().shape({
  avgMonthBill: Yup.number().required("Average monthly bill is required"),
  area: Yup.number().required("Area is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .length(10, "Phone number should be 10 digits")
    .matches(/^[0-9]{10}$/, "Must be only digits"),
});
