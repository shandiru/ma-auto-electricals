import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-options'>
                <NavLink to="/add/product" className='sidebar-option'>
                    <img src={assets.add_icon} alt='' />
                    <p>Add Product</p>
                </NavLink>
                <NavLink to="/add/car" className='sidebar-option'>
                    <img src={assets.add_icon} alt='' />
                    <p>Add Car</p>
                </NavLink>
                <NavLink to="/list/product" className='sidebar-option'>
                    <img src={assets.order_icon} alt='' />
                    <p>List Items</p>
                </NavLink>
                    <NavLink to="/list/car" className='sidebar-option'>
                    <img src={assets.order_icon} alt='' />
                    <p>List Cars</p>
                </NavLink>
                {/* <NavLink to="/order" className='sidebar-option'>
                    <img src={assets.order_icon} alt='' />
                    <p>Orders</p>
                </NavLink> */}
            </div>

        </div>
    )
}

export default Sidebar
