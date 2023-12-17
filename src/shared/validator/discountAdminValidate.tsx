import * as Yup from "yup";

export const discountAdminValidate = Yup.object().shape({
    name: Yup.string().required('Please enter discount'),
    file: Yup.mixed().required('Please download Img')
})