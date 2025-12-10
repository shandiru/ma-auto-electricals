import React, { useState } from 'react';
import SignIn from './Login';  // Your SignIn component
import Signup from './Signup';  // Your Signup component

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="w-full flex items-center justify-center h-screen">
            {isSignUp ? (
                <Signup />
            ) : (
                <SignIn />
            )}
            <div className="absolute ">
                {isSignUp ? (
                    <div className='mt-180'>
                        <span>Already have an account?
                            <a href="#" className="text-[#4285F4]" onClick={() => setIsSignUp(false)}> Sign in</a>
                        </span>
                    </div>
                ) : (
                    <div className='mt-122'>
                        <span>No Account?
                            <a href="#" className="text-[#4285F4]" onClick={() => setIsSignUp(true)}> Sign up</a>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;