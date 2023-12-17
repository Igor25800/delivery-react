import React, {FC} from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {ICategory} from "../../../shared/interfaces/category/category";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {FormikProps} from "formik";

export interface IFilter {
    selectedOption: string;
}

export interface IFilterProducts {
    data: Array<ICategory> | undefined;
    formik: FormikProps<IFilter>
}

const FilterProducts: FC<IFilterProducts> = ({data, formik}) => {


    return (
        <div>
            <form>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="selectedOptiont"
                        value={formik.values.selectedOption}
                        name='selectedOption'
                        label="Filtert"
                        onChange={formik.handleChange}>
                        <MenuItem value="">Оберіть опцію</MenuItem>
                        {data?.map((category: ICategory, ind: number) =>
                            <MenuItem key={ind} value={category.category}>{category.category}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </form>
        </div>
    );
};

export default FilterProducts;