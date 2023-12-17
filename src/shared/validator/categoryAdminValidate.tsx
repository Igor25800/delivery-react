import * as Yup from "yup";

export const categoryAdminValidate = Yup.object().shape({
    category: Yup.string().required('Please enter Category'),
    file: Yup.mixed().required('Please download Img')
})