import React from 'react';
import { useForm } from 'react-hook-form';
import returnImg from '../../../../public/photos/Colorful 3D Online Sale Instagram Post.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TrackOrder = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div>
            <div className=' bg-white'>
                <div className=' flex flex-col lg:flex-row mx-[100px] my-[100px]'>
                    <div className=' lg:w-1/2'>
                        <img className=' w-[780px] h-[710px] rounded-xl' src={returnImg} alt="" />
                    </div>
                    <div className='lg:w-1/2'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className=" text-[61px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase font-semibold ">Track Order</h1>
                            <p className=' w-[500px] mb-5 text-[19px]'>Enter Your Email & Transection Number Number Below.</p>
                            <p className=' text-[22px] mb-3 text-[#828282]'>E-mail/phone</p>

                            <input type="text" {...register("email")} name="email" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " />

                            <p className=' text-[22px] mb-3 text-[#828282]'>Order Number</p>

                            <input type="number" {...register("orderID")} name="orderID" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " />

                            {/* <input type="number" {...register("orderID")} name="orderID" placeholder="Your Order ID" className="input input-bordered w-[632px] mb-10 " /> */}
                            <button type="submit" value="Send" className=' w-[632px] bg-[#1C2E37] rounded-[10px] h-[67px] border-none text-white mb-3 '>Submit <FontAwesomeIcon icon={faArrowRight} /></button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TrackOrder;