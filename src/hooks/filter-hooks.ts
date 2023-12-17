import {useMemo} from "react";
import {IProducts} from "../shared/interfaces/products/products";
import {FormikProps} from "formik";

export const useFilterCategory = (formik: FormikProps<{
    selectedOption: string
}>, productsData: Array<IProducts> | undefined) => {
    return useMemo(() => {
        if (productsData?.length) {
            if (!formik.values.selectedOption) {
                return productsData;
            }
            return productsData?.filter((product: IProducts) => {
                return product.category === formik.values.selectedOption
            });
        }
    }, [formik.values.selectedOption, productsData]);
}