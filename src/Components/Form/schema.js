import * as yup from "yup";

export const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name."),
    // lastName: yup.string().required(),
    // email: yup.string().email().required(),
    // age: yup.number().positive().integer().required(),
    // password: yup.string().min(4).max(15).required(),
    // confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    func: yup.string().required()
}).required();