import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ICategory} from "../../shared/interfaces/category/category";
import style from './tableMaterial.module.scss';
import { Button } from '@mui/material';
import {IProducts} from "../../shared/interfaces/products/products";
import clsx from "clsx";


interface tableProps {
    tableHeader: Array<string> | undefined;
    tableBody: Array< ICategory | IProducts> | undefined;
    eventEdit: (event: ICategory | IProducts) => void;
    eventDelete: (event: (ICategory | IProducts) | undefined) => void;
    tableName: boolean;
}

const TableMaterial: FC<tableProps> = ({tableBody, tableHeader, eventEdit, eventDelete, tableName}) => {

    return  (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell className={style.td} align="center">File</TableCell>
                        {tableHeader?.map((item: string, index: number) => (
                            <TableCell className={style.td} key={index} align="center">{item}</TableCell>
                        ))}
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody?.map((item: ICategory | IProducts, index: number) => (
                        <TableRow  key={index} >
                            <TableCell   align="center">{index + 1}</TableCell>
                            <TableCell   align="center">
                                <img className={clsx(style.tdProducts, { [style.tdCategory]: tableName })} src={item.file} alt=''/>
                            </TableCell>
                            {tableHeader?.map((key: string, columnIndex: number) =>
                                    <TableCell key={columnIndex}  align="center">
                                        {((item as any)[key] || '') as string}
                                    </TableCell>
                            )}
                            <TableCell  align="center">
                                <Button variant="contained" color="warning" onClick={() => eventEdit(item)}>
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell  align="center">
                                <Button variant="contained" color="error" onClick={() => eventDelete(item)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableMaterial;