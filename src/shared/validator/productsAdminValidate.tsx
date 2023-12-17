import * as Yup from "yup";

export const productsAdminValidate = Yup.object().shape({
    category: Yup.string().required('Please enter Category'),
    file: Yup.mixed().required('Please download Img'),
    name: Yup.string().required('Please enter Name'),
    weight: Yup.string().required('Please enter Weight'),
    price: Yup.string().required('Please enter Price'),
    description: Yup.string().required('Please enter Description')
})

