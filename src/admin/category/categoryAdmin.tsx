import React, {useState} from 'react';
import TableMaterial from "../../components/tableMaterial/tableMaterial";
import Button from '@mui/material/Button';
import {useAppDispatch, userAppSelector} from "../../hooks/redux-hooks";
import {
    useGetCategoryQuery,
    useDeleteCategoryMutation,
    useAddCategoryMutation,
    useUpdateCategoryMutation
} from "../../store/services/CategoryApi";
import {ICategory} from "../../shared/interfaces/category/category";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import {useFormik} from "formik";
import {categoryAdminValidate} from "../../shared/validator/categoryAdminValidate";
import {TextField} from "@mui/material";
import {closeModal, IModal, openModal} from "../../store/slices/modal";
import { ModalAdmin } from '../components/modalAdmin/modalAdmin';


const CategoryAdmin = () => {
    const dispatch = useAppDispatch();

    const [percentage, setPercentage] = useState<number>(0);
    const { isEditModal, isChangeActive, isDownload} = userAppSelector(state => (state.modal as IModal) );


    const {data} = useGetCategoryQuery();
    const [createCategory] = useAddCategoryMutation();
    const [onDeleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation()

    const categoryForm = useFormik({
        initialValues: {
            category: '',
            file: '',
        },
        onSubmit: (values: ICategory): void => {
            if (isEditModal) {
                 createCategory(values).then(() => resetModal('add Category', 0));
             } else  {
                 updateCategory(values).then(() => resetModal('Change Category', 100));
             }
        },
        validationSchema: categoryAdminValidate,
    });

    const resetModal = (message: string, percentage: number): void => {
        dispatch(closeModal());
        dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `${message} ${categoryForm.values.category}`}));
        categoryForm.resetForm();
        setPercentage(percentage);
    }

    const handleClickOpen = (): void => {
       dispatch(openModal({isEditModal: true, isChangeActive: true, isDownload: false}));
       setPercentage(0);
    };

    const editCategory = (event: ICategory): void => {
        categoryForm.setValues(event);
        dispatch(openModal({isEditModal: false, isChangeActive: true, isDownload: false}));
        setPercentage(100);
    }

    const deleteCategory = (event: ICategory | undefined): void => {
        if (event?.id)  {
            onDeleteCategory(event.id).then(() =>
              dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `Delete category ${event.category}`})) )
        }
    }

    return  (
        <div>
            <div className='mb-2'>
                <Button variant="outlined" onClick={handleClickOpen}>
                   Add Category
                </Button>
                <ModalAdmin
                    open={isChangeActive}
                    form={categoryForm}
                    percentage={percentage}
                    setPercentage={setPercentage}
                    isEdit={isEditModal}
                    dispatch={dispatch}
                    isDownload={isDownload}
                    fileName={'category'}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="category"
                        name="category"
                        value={categoryForm.values.category}
                        label="Category"
                        autoComplete="category"
                        onBlur={categoryForm.handleBlur}
                        onChange={categoryForm.handleChange}
                        error={categoryForm.touched.category && !!categoryForm.errors.category}
                        helperText={categoryForm.touched.category && categoryForm.errors.category}/>
                </ModalAdmin>
            </div>
            <TableMaterial
                tableBody={data}
                tableHeader={['category']}
                eventDelete={deleteCategory}
                eventEdit={editCategory}
                tableName={true}/>
        </div>
    );
};

export default CategoryAdmin;





