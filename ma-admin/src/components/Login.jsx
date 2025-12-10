import React, { useState } from 'react';

const Second = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://10.10.106.220:8080/api/v1/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            
            alert('Sign in successful!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='w-[45%] flex items-center justify-center'>
            <div className='w-[85%] h-4/5 p-9 flex flex-col gap-7 box-border rounded-3xl border border-[#0089ED] bg-white'>
                <div className='flex items-start justify-between p-2'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-xl font-normal'>Welcome to <span className='text-[#0089ED] font-bold'>DevPos</span></h1>
                        <h1 className='text-5xl font-medium'>Sign in</h1>
                    </div>
                </div>
                {/* <div className='flex gap-4'>
                    <div className='p-2 w-[75%] rounded-xl border bg-[#E9F1FF] flex items-center justify-center gap-5 text-[#4285F4] cursor-pointer'>
                        <img src={Google} alt="Google" /> Sign in with Google
                    </div>
                    <div className='p-2 rounded-xl border bg-[#F6F6F6] flex items-center justify-center cursor-pointer'><img src={Apple} alt="Apple" /></div>
                    <div className='p-2 rounded-xl border bg-[#F6F6F6] flex items-center justify-center cursor-pointer'><img src={Facebook} alt="Facebook" /></div>
                </div> */}
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='flex gap-3 flex-col'>
                        <label htmlFor="email" className='font-medium'>Enter your username or email address</label>
                        <input 
                            className='p-3 rounded-xl border border-[#4285F4]'
                            type="email" 
                            id="email" 
                            placeholder='Username or email address' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex gap-3 flex-col mt-5'>
                        <label htmlFor="password" className='font-medium'>Enter your Password</label>
                        <input 
                            className='p-3 rounded-xl border border-[#4285F4]'
                            type="password" 
                            id="password" 
                            placeholder='Password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <a href='#' className='text-[#4285F4]'>
                        <h3 className='text-right'>Forget Password</h3>
                    </a>
                    {error && <p className='text-red-500'>{error}</p>}
                    <button type="submit" className='bg-[#0089ED] p-3 mt-3 rounded-xl text-white font-semibold'>Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Second;