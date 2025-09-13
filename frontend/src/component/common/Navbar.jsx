import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    
const navigate = useNavigate();



    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
     //       navigate("/")   // baanu
        }
    };
//        {isAuthenticated && isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">UserManagement Dev</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
                
            </ul>
        </nav>
    );
}

export default Navbar;