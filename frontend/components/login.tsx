import React from 'react';


const Login = () => {
    return (
        <div className="flex h-screen">
            <div className="bg-gray-900 text-white flex flex-col justify-center items-start w-1/2 min-w-[300px] px-6"> {/* Changed items-center to items-start */}
                <h2 className="mt-2 mb-6 text-left">Welcome</h2>
                <p className="mt-2 mb-6 text-left">Log in to GeeseHacks!</p>
                <div className="flex flex-col gap-4 w-full mb-6">
                    <button className="bg-black text-white py-2 rounded">Sign Up with Google</button>
                    <button className="bg-black text-white py-2 rounded">Sign Up with Apple</button>
                </div>
                <form className="flex flex-col gap-4 w-full">
                    <p>Email</p>
                    <input type="email" name="email" placeholder="Your email address" required className="p-2 rounded bg-gray-800 text-white" />
                    <p>Password</p>
                    {/* <p>Forgot Password</p> */}
                    <input type="password" name="password" placeholder="Your password" required className="p-2 rounded bg-gray-800 text-white" />
                    <button type="submit" className="bg-black text-white py-2 rounded">Log In</button>
                </form>
                <p>Don't have an account?</p>
                {/* <p>Sign Up</p> */}
            </div>
            <div className="bg-cover bg-center w-1/2" style={{ backgroundImage: "url(/path/to/your/background-image.jpg)" }}></div>
        </div>
    );
}


export default Login;
