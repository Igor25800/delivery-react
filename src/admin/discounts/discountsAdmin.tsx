import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from './discounts.module.scss';
import {ModalAdmin} from "../components/modalAdmin/modalAdmin";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, userAppSelector} from "../../hooks/redux-hooks";
import {closeModal, IModal, openModal} from "../../store/slices/modal";
import {changeOpenSnackBar} from "../../store/slices/snackBar";
import {
    useAddDiscountsMutation,
    useDeleteDiscountsMutation,
    useGetDiscountsQuery,
} from "../../store/services/discontsApi";
import {IDiscounts} from "../../shared/interfaces/discounts/discounts";
import {discountAdminValidate} from "../../shared/validator/discountAdminValidate";

const DiscountsAdmin = () => {
    const dispatch = useAppDispatch();
    const [percentage, setPercentage] = useState<number>(0);
    const {isEditModal, isChangeActive, isDownload} = userAppSelector(state => (state.modal as IModal));

    const {data} = useGetDiscountsQuery();
    const [createCategory, {isSuccess, ...resultProduct}] = useAddDiscountsMutation();
    const [onDeleteDiscount] = useDeleteDiscountsMutation();

    const discountsForm = useFormik({
        initialValues: {
            name: '',
            file: '',
        },
        onSubmit: (values: IDiscounts): void => {
            if (isEditModal) {
                createCategory(values).then(() => resetModal('add Discounts', 0))
            }
        },
        validationSchema: discountAdminValidate,
    });

    const handleClickOpen = (): void => {
        dispatch(openModal({isEditModal: true, isChangeActive: true, isDownload: false}));
        setPercentage(0);
    };

    const resetModal = (message: string, percentage: number): void => {
        dispatch(closeModal());
        dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `${message} ${discountsForm.values.name}`}));
        discountsForm.resetForm();
        setPercentage(percentage);
    }

    const deleteDiscount = (event: IDiscounts | undefined): void => {
        if (event?.id) {
            onDeleteDiscount(event.id).then(() =>
                dispatch(changeOpenSnackBar({isActionSnackBar: true, message: `Delete category ${event.name}`})))
        }
    }

    return (
        <div>
            <div className='mb-2'>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Discount
                </Button>
                <ModalAdmin
                    open={isChangeActive}
                    form={discountsForm}
                    percentage={percentage}
                    setPercentage={setPercentage}
                    isEdit={isEditModal}
                    dispatch={dispatch}
                    isDownload={isDownload}
                    fileName={'discount'}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        value={discountsForm.values.name}
                        label="Name"
                        autoComplete="name"
                        onBlur={discountsForm.handleBlur}
                        onChange={discountsForm.handleChange}
                        error={discountsForm.touched.name && !!discountsForm.errors.name}
                        helperText={discountsForm.touched.name && discountsForm.errors.name}/>
                </ModalAdmin>
            </div>
            <div className={style.discounts}>
                {data?.map((discount: IDiscounts) =>
                    <Card key={discount.id} className={style.discountCard} sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Discount: {discount.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                <img
                                    src={discount.file}
                                    alt=""/>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="error" onClick={() => deleteDiscount(discount)}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </div>
        </div>
    )
};

export default DiscountsAdmin;