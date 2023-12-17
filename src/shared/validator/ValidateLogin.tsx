import * as Yup from "yup";

export const validateLogin = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Please enter Email'),
    password: Yup.string().min(8, 'Min 8 letter').required('Please enter password')
})