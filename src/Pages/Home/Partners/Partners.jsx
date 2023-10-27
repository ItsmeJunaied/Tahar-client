import './Partners.css';
import Marquee from "react-fast-marquee";
import React from "react";

import fedex from '../../../../public/photos/FedEx-Logo 1.png'
import pathao from '../../../../public/photos/pathao.png'
import paperfly from '../../../../public/photos/paper_fly.png'
import DHL from '../../../../public/photos/dhl.png'

import mastecard from '../../../../public/photos/dhl.png'
import visa from '../../../../public/photos//visa.png'
import bkash from '../../../../public/photos/bkash.png'
import mtb from '../../../../public/photos/mtb.png'
import rocket from '../../../../public/photos/rocket.png'
import upay from '../../../../public/photos/upay.png'
import bracbank from '../../../../public/photos/bracBank.png'
import sureCash from '../../../../public/photos/sureCash.png'
import nagad from '../../../../public/photos/Nagad.png'
import top from '../../../../public/photos/top.png'
import BankAsia from '../../../../public/photos/bankAsia.png'


const Partners = ({there}) => {

    
    return (
        <div className=''>
            <div className={`hidden lg:flex lg:flex-row md:flex-col sm:flex-col  lg:h-[350px] md:h-[497px] ${there === 'light' ? 'bg-[#E7E7E7]' : 'bg-black'}`}>
                {/* Delivery Partners */}
                <div className='lg:ml-20'>
                    <h1 className='text-[19px] font-semibold pb-5 lg:mt-10'>Our Delivery Partners</h1>
                    <div className='grid grid-cols-2 lg:gap-12 md:gap-2'>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={fedex} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={DHL} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={pathao} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={paperfly} alt="" />
                        </div>
                    </div>
                </div>

                <div className="divider divider-horizontal my-20 w-32 hidden sm:hidden md:hidden lg:block"></div>

                {/* Payment Partners */}
                <div className='lg:mr-20'>
                    <h1 className='text-[19px] font-semibold pb-5 lg:mt-10'>Our Payment Partners</h1>
                    <div className='grid lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-2 lg:gap-12'>
                        <div className=' w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={mastecard} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={visa} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={bkash} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={mtb} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={rocket} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={upay} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={bracbank} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={sureCash} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={nagad} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={top} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={BankAsia} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* For medium and small devices */}
            <div className='lg:hidden'>
                {/* Delivery Partners */}
                <div className="text-center">
                    <h1 className='text-[19px] font-semibold pb-5 mt-10'>Our Delivery Partners</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={fedex} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={DHL} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={pathao} alt="" />
                        </div>
                        <div className='w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={paperfly} alt="" />
                        </div>
                    </div>
                </div>

                {/* Payment Partners Marquee */}
                <div className='mt-10'>
                    <h1 className='text-[19px] font-semibold pb-5'>Our Payment Partners</h1>
                    <Marquee>
                        <div className=' w-[200px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={mastecard} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={visa} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={bkash} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={mtb} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={rocket} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={upay} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={bracbank} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={sureCash} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={nagad} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={top} alt="" />
                        </div>
                        <div className=' lg:w-[200px] md:w-[179px] h-[76px] rounded-[6px] bg-white grid place-items-center'>
                            <img src={BankAsia} alt="" />
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default Partners;


{/*  */ }