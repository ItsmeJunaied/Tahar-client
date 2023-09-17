import './Login.css';
import facebookIcon from '../../../public/photos/logos_facebook.png'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const { handleSubmit, register, formState: { errors } } = useForm();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = handleSubmit((data) => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message);
            });
    });
    return (
        <div>
            <section className="flex flex-col md:flex-row h-screen items-center bg-[#CFCFCF]">
                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-[800px] px-6 lg:px-16 xl:px-12
        flex items-center justify-center rounded-[10px] ">

                    <div className="w-full h-100">


                        <h1 className="text-xl font-serif text-center md:text-2xl leading-tight ">Log in to Tahar</h1>

                        <div className="divider w-full"></div>

                        <form className="mt-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-[#828282]">Email</label>
                                <input type="email" name="email" id="" placeholder="Enter Email Address"
                                    {...register("email", { required: true })}
                                    className="w-full bg-transparent  border-[] px-4 py-3 rounded-lg   mt-2 border border-[#828282] focus:border-[#DBC896] focus:bg-white focus:outline-none" autoFocus autoComplete required />
                                {errors.email && <span className="error-message">Email is required</span>}

                            </div>

                            <div className="mt-4">
                                <label className="block text-[#828282]">Password</label>
                                <input type="password" name="" id="" placeholder="Enter Password"
                                    {...register("password", { required: true })}
                                    className="w-full px-4 py-3 rounded-lg   mt-2 border focus:border-[#DBC896]
                                     focus:bg-white focus:outline-none" required />
                                {errors.password && <span className="error-message">Password is required</span>}
                            </div>

                            <div className="text-right mt-2">
                                <a href="#" className="text-sm font-semibold text-[#1C2E37] hover:text-[#DBC896] focus:text-[#DBC896]">Forgot Password?</a>
                            </div>

                            <button type="submit" className="w-full block bg-[#1C2E37] hover:bg-[#DBC896] focus:bg-[#DBC896] text-white font-semibold rounded-lg
                                     px-4 py-3 mt-6">Log In</button>
                        </form>

                        <div className="divider">OR</div>

                        <button type="button" className="w-full  block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                            <div className="flex items-center justify-center">
                                <img src={facebookIcon} alt="" />
                                <span className="ml-4">
                                    Log in
                                    with
                                    Facebook</span>
                            </div>
                        </button>
                        <GoogleLogin></GoogleLogin>


                        <p className="mt-8 text-center">Don&apos;t have account? <Link to='/signup' className="text-[#1C2E37] underline hover:text-     [#DBC896] font-semibold">Create an
                            account</Link></p>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Login;