import React, {useState} from 'react';
import {useFormik} from "formik";
import {IProducts} from "../../shared/interfaces/products/products";
import {useGetCategoryQuery} from "../../store/services/CategoryApi";
import {useAppDispatch, userAppSelector} from "../../hooks/redux-hooks";
import {closeModal, IModal, openModal} from "../../store/slices/modal";
import {
    useAddProductsMutation,
    useDeleteProductsMutation,
    useGetProductsQuery,
    useUpdateProductsMutation
} from "../../store/services/ProductsApi";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import Button from "@mui/material/Button";
import {ModalAdmin} from "../components/modalAdmin/modalAdmin";
import {FormHelperText, TextField} from "@mui/material";
import TableMaterial from "../../components/tableMaterial/tableMaterial";
import {productsAdminValidate} from "../../shared/validator/productsAdminValidate";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ICategory} from "../../shared/interfaces/category/category";
import FilterProducts from "./filterProducts/filterProducts";
import {useFilterCategory} from "../../hooks/filter-hooks";

const ProductsAdmin = () => {
    const dispatch = useAppDispatch();
    const [percentage, setPercentage] = useState<number>(0);
    const {isEditModal, isChangeActive, isDownload} = userAppSelector(state => (state.modal as IModal) );

    const {data} = useGetCategoryQuery();

    const {data: productsData} = useGetProductsQuery();
    const [createCategory] = useAddProductsMutation();
    const [onDeleteCategory] = useDeleteProductsMutation();
    const [updateCategory] = useUpdateProductsMutation();

    const productForm = useFormik({
        initialValues: {
            category: '',
            file: '',
            name: '',
            weight: '',
            price: '',
            description: '',
        },
        onSubmit: (values: IProducts): void => {
            if (isEditModal) {
                createCategory(values).then(() => resetModal('Add Product', 0));
            } else  {
                updateCategory(values).then(() => resetModal('Change Product', 100));
            }

        },
        validationSchema: productsAdminValidate,
    });

    const initialValues = {
        selectedOption: '',
    };
    const onSubmit = (values: any) => {

    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    const resetModal = (message: string, percentage: number): void => {
        dispatch(closeModal());
        dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `${message} ${productForm.values.name}`}));
        productForm.resetForm();
        setPercentage(percentage);
    }

    const handleClickOpen = (): void => {
        dispatch(openModal({isEditModal: true, isChangeActive: true, isDownload: false}));
        setPercentage(0);
    };

    const editProduct = (event: IProducts | ICategory): void => {
        productForm.setValues(event as IProducts);
        dispatch(openModal({isEditModal: false, isChangeActive: true, isDownload: false}));
        setPercentage(100);
    }

    const deleteProduct = (event: (IProducts | ICategory  )| undefined): void => {
        if (event?.id)  {
            onDeleteCategory(event.id).then(() =>
                dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `Delete Product ${event.category}`})) )
        }
    }

    const filteredData = useFilterCategory(formik, productsData);

    return (
        <div>
            <FilterProducts data={data} formik={formik}/>
            <div className='mt-2 mb-2'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Product
                </Button>
                <ModalAdmin
                    open={isChangeActive}
                    form={productForm}
                    percentage={percentage}
                    setPercentage={setPercentage}
                    isEdit={isEditModal}
                    dispatch={dispatch}
                    fileName={'products'}
                    isDownload={isDownload}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productForm.values.category}
                            label="category"
                            name="category"
                            onBlur={productForm.handleBlur}
                            onChange={productForm.handleChange}
                            error={productForm.touched.category && !!productForm.errors.category}>
                            {data?.map((category: ICategory, ind: number) =>
                                <MenuItem key={ind} value={category.category}>{category.category}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText className='active'>
                            {productForm.touched.category && productForm.errors.category}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        value={productForm.values.name}
                        label="name"
                        autoComplete="name"
                        onBlur={productForm.handleBlur}
                        onChange={productForm.handleChange}
                        error={productForm.touched.name && !!productForm.errors.name}
                        helperText={productForm.touched.name && productForm.errors.name}/>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="weight"
                        name="weight"
                        value={productForm.values.weight}
                        label="weight"
                        autoComplete="name"
                        onBlur={productForm.handleBlur}
                        onChange={productForm.handleChange}
                        error={productForm.touched.weight && !!productForm.errors.weight}
                        helperText={productForm.touched.weight && productForm.errors.weight}/>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="price"
                        name="price"
                        value={productForm.values.price}
                        label="price"
                        autoComplete="price"
                        onBlur={productForm.handleBlur}
                        onChange={productForm.handleChange}
                        error={productForm.touched.price && !!productForm.errors.price}
                        helperText={productForm.touched.price && productForm.errors.price}/>
                    <TextField
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        className='mt-1'
                        value={productForm.values.description}
                        multiline
                        rows={4}
                        onBlur={productForm.handleBlur}
                        onChange={productForm.handleChange}
                        error={productForm.touched.description && !!productForm.errors.description}
                        helperText={productForm.touched.description && productForm.errors.description}
                    />
                </ModalAdmin>
            </div>
            <TableMaterial
                tableBody={filteredData}
                tableHeader={['category', 'name', 'weight', 'price', 'description']}
                eventDelete={deleteProduct}
                eventEdit={editProduct}
                tableName={false}/>
        </div>
    );
};

export default ProductsAdmin;