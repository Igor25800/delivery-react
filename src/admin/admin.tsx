import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import {TabList} from '@mui/lab';
import {TabPanel} from '@mui/lab';
import {Button} from "@mui/material";
import {useAppDispatch, userAppSelector} from "../hooks/redux-hooks";
import {getAuth, signOut} from "firebase/auth";
import {app} from "../firebase";
import {removeToken} from "../store/slices/auth";
import style from './admin.module.scss';
import SnackbarModal from "../components/SnackbarModal/SnackbarModal";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState('category');
    const url = useLocation();
    const {isActionSnackBar, message} = userAppSelector(state => state.snackBar);

    useEffect(() => {
        getUrlCategory();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
        setValue(newValue);
        navigate(`/admin/${newValue}`);
    };
    const signOuAdmin = (): void => {
        signOut(getAuth(app)).then((): void => {
            dispatch(removeToken('admin'));
            navigate('/login');
        })
    };

    const getUrlCategory = (): void => {
        const [, category] = url.pathname.split('/').filter(Boolean);
        if (category) {
            setValue(category);
        }
    }

    return (
        <div>
            <SnackbarModal open={isActionSnackBar} message={message}/>
            <div className={style.admin}>
                <Button className={style.adminBtn} variant="outlined" color="error" onClick={signOuAdmin}>signOut</Button>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Category" value="category" />
                            <Tab label="Products" value="products" />
                            <Tab label="Discounts" value="discounts" />
                            <Tab label="Order" value="order" />
                        </TabList>
                    </Box>
                    <TabPanel value={value}>
                        <Outlet/>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Admin;