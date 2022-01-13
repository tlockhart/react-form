import * as yup from "yup";

export const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name."),
    // lastName: yup.string().required(),
    // email: yup.string().email().required(),
    // age: yup.number().positive().integer().required(),
    // password: yup.string().min(4).max(15).required(),
    // confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    func: yup.string().required(),
    proto: yup.object()
        .shape({
            label: yup.string().required("status is required(rs-label)"),
            value: yup.string().required("status is required(rs-value)")
        })
        .nullable() // for handling null value when clearing options via clicking "x"
        .required("status is required (from outter null check)")
})
// .required();