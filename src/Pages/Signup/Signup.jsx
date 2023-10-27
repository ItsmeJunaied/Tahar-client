import './Signup.css';
import facebookIcon from '../../../public/photos/logos_facebook.png'
import googleIcon from '../../../public/photos/flat-color-icons_google.png'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
const Signup = () => {
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const { createUser, updateUser } = useContext(AuthContext);
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        // const role=data.role;
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;

                updateUser(data.firstName, data.lastName)
                    .then(() => {
                        const saveUser = { firstName: data.firstName, lastName: data.lastName, photoURL:data.photoURL, email: data.email ,role: 'User'}
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    reset();
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => console.log(error))

            })
    }


    const checkRequirements = () => {
        const requirements = {
            required: password.length > 0,
            minLength: password.length >= 6,
            maxLength: password.length >= 6 && password.length <= 20,
            pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(password),
        };
        return requirements;
    };

    const handleInputChange = (e) => {
        setTouched(true);
        setPassword(e.target.value);
    };

    const requirementsMet = Object.values(checkRequirements()).every(Boolean);



    return (

        <section className="flex flex-col md:flex-row h-screen items-center bg-[#CFCFCF]">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-fit px-6 lg:px-16 xl:px-12
        flex items-center justify-center rounded-[10px] ">

                <div className="w-full h-100">


                    <h1 className="text-xl font-serif text-center md:text-2xl mt-10 leading-tight ">Create Tahar Account</h1>

                    <div className="divider w-full"></div>

                    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id=""
                                {...register("firstName", { required: true })}
                                placeholder="Enter First Name"
                                className="w-full px-4 py-3 rounded-lg    mt-2 border focus:border-[#DBC896] focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id=""
                                {...register("lastName", { required: true })}
                                placeholder="Enter Last Name"
                                className="w-full px-4 py-3 rounded-lg    mt-2 border focus:border-[#DBC896] focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete
                                required
                            />
                        </div>


                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" name="" id="" placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg    mt-2 border focus:border-[#DBC896] focus:bg-white focus:outline-none"
                                {...register("email", { required: true })}
                                autoFocus autoComplete required />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                {...register("password", { required: true })}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg mt-2 border focus:border-[#DBC896] focus:bg-white focus:outline-none"
                                required
                            />
                            <div className="mt-2 requirements">
                                {touched && !requirementsMet && (
                                    Object.entries(checkRequirements()).map(([key, value]) => (
                                        <span key={key} className={value ? 'text-green-600' : 'text-red-600'}>
                                            {value ? '✓' : '•'}{' '}
                                            {key === 'required' && 'Password required'}
                                            {key === 'minLength' && 'Must be at least 6 characters'}
                                            {key === 'maxLength' && 'Must be within 20 characters'}
                                            {key === 'pattern' && 'Must have at least one uppercase, lowercase, digit, and special character'}
                                            <br />
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        <input
                            type="submit"
                            value="Create Account"
                            className="w-full block bg-[#1C2E37] hover:bg-[#DBC896] focus:bg-[#DBC896] text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        />

                    </form>

                    <div className="divider">OR</div>

                    <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 mt-2">
                        <div className="flex items-center justify-center">
                            <img src={facebookIcon} alt="" />
                            <span className="ml-4">
                                Log in with Facebook
                            </span>
                        </div>
                    </button>
                    <GoogleLogin></GoogleLogin>



                    <p className="mt-8 mb-10 text-center">Already have account? <Link to='/login' className=" text-[#1C2E37] underline hover:text-[#DBC896] font-semibold">log in</Link></p>
                </div>
            </div>

        </section>
    );
};

export default Signup;