import React, { useContext } from 'react';
import googleIcon from '../../../public/photos/flat-color-icons_google.png'
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const GoogleLogin = () => {
    const { googleSignIN } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const handleGooglesignIN = () => {

        googleSignIN()
            .then(res => {
                const loggeduser = res.user;
                const saveUser = { name: loggeduser.displayName, email: loggeduser.email, role: 'User' }

                fetch('https://taharecom.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Succesfull Logged In',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    });
            });

    }
    return (
        <div>
            <button type="button" onClick={handleGooglesignIN} className="w-full mt-2 block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold     rounded-lg px-4 py-3 border border-gray-300">
                <div className="flex items-center justify-center">
                    <img src={googleIcon} alt="" />
                    <span className="ml-4">Log in with Google</span>
                </div>
            </button>
        </div>
    );
};

export default GoogleLogin;