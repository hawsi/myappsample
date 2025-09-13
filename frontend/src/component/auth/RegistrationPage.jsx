import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
     const navigate = useNavigate();  // baanu update

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: ''
    });

    // This is an event handler function (commonly used in React forms). const handleInputChange = (e) => {...}
    // e is the event object automatically passed when an input changes.
    // e.target refers to the input element that triggered the change.
   // name → the value of the input’s name attribute (e.g., "username", "email", "password")
   // value → the current value typed into the input field.
   // formData is your state object (probably defined like const [formData, setFormData] = useState({});).
   // { ...formData } makes a copy of the existing state (so you don’t overwrite the old values).
   // [name]: value uses computed property names to dynamically update the field that changed.
   // This function lets you update form state dynamically for any input field without writing a separate handler for each input.
   // onChange={(e) => setFormData({ ...formData, username: e.target.value })}
   // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
   const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                city: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter your city" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
