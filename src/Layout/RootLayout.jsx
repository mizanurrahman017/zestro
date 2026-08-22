import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/footer/footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;