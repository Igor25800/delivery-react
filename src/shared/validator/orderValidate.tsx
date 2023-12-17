import * as Yup from "yup";

export const orderValidate = Yup.object().shape({
    name: Yup.string().required('Please enter Name'),
    city: Yup.string().required('Please enter City'),
    email: Yup.string().email('Please enter Email').required('Please enter City'),
    commit: Yup.string().required('Please enter Commit'),
})

