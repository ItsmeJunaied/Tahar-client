import React, { useContext, useEffect, useState } from 'react';
import cover from '../../../../public/photos/Elit Customer.png';
import { AuthContext } from '../../../Provider/AuthProvider';
const UserProfile = () => {

    const { user, } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        fetch('https://taharz.onrender.com/orders')
            .then(res => res.json())
            .then(data => setOrderData(data))
    }, [])
    const getUserData = orderData.filter(product => product.data.cus_email === user?.email);
    
    const totalOrderDetails = getUserData.reduce((total, order) => {
        return total + order.OrderDetails.length;
      }, 0);
      
    console.log(totalOrderDetails )
    return (
        <>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

            <main className="profile-page">
                <section className="relative block h-500-px">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
                        backgroundImage: "url('https://i.ibb.co/vhz05gQ/Elit-Customer.png')"
                    }}>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img alt="..." src={user?.photoURL} className="shadow-xl w-72 rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="button">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl [font-family:'Helvetica_Now_Display-Medium',Helvetica]  font-bold block uppercase tracking-wide text-blueGray-600">{totalOrderDetails}</span><span className=" text-blueGray-400 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px]">Total Order</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl uppercase font-semibold leading-normal text-blueGray-700 mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                        {user?.displayName}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px]">{getUserData[0].data.cus_add1}</h1>
                                        
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        <p className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[17px]">{getUserData[0].data.ship_city}</p>
                                        
                                    </div>

                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">

                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    );
};

export default UserProfile;