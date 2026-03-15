import React from 'react'
import Header from '../Components/Navbar/Header'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLayout = () => {
    return (
        <>
            <Header />

            <div style={{ minHeight: "80vh" }}>

                <Outlet />
            </div>
            <Footer />

        </>
    )
}

export default MainLayout
