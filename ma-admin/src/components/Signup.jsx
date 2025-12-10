import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    fullName: formData.name,
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            
            alert('Signup successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50'>
            <div className='w-full max-w-md mt-20 lg:max-w-lg h-auto p-6 sm:p-8 md:p-9 flex flex-col gap-5 sm:gap-7 box-border rounded-2xl sm:rounded-3xl border border-[#0089ED] bg-white shadow-lg'>
                <div className='flex items-start justify-between p-2'>
                    <div className='flex flex-col gap-3 sm:gap-5'>
                        <h1 className='text-lg sm:text-xl font-normal'>
                            Welcome to <span className='text-[#0089ED] font-bold'>DevPos</span>
                        </h1>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-medium'>Sign Up</h1>
                    </div>
                </div>
                
                <form className='flex flex-col gap-3 sm:gap-4' onSubmit={handleSubmit}>
                    {[
                        { label: 'Name', name: 'name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Password', name: 'password', type: 'password' },
                        { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
                    ].map((field) => (
                        <div className='flex gap-2 sm:gap-3 flex-col' key={field.name}>
                            <label className='font-medium text-sm sm:text-base' htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input 
                                className='p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-[#4285F4] focus:outline-none focus:ring-2 focus:ring-[#0089ED] text-sm sm:text-base'
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
             
                    {error && <p className='text-red-500 text-sm sm:text-base'>{error}</p>}
                    
                    <button 
                        type="submit" 
                        className='bg-[#0089ED] p-2.5 sm:p-3 mt-2 sm:mt-3 rounded-lg sm:rounded-xl text-white font-semibold hover:bg-[#0077CC] transition-colors text-sm sm:text-base'
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;