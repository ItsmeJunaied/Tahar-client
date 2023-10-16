import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import returnImg from '../../../../public/photos/Colorful 3D Online Sale Instagram Post.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../Provider/AuthProvider';

const TrackOrder = () => {
    const { order } = useContext(AuthContext)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [trackData, setTrackdata] = useState([])
    const onSubmit = data => {
        setTrackdata(data)
        console.log(data)
    }

    const matchedData = order.find(item => item.tranjection_id === trackData.orderID);

    // console.log(matchedData)
    return (
        <div>
            <div className=' bg-white'>
                <div className=' flex flex-row lg:flex-row mx-[100px] my-[100px]'>
                    <div className=' lg:w-1/2'>
                        <img className=' w-[780px] h-[710px] rounded-xl' src={returnImg} alt="" />
                    </div>
                    <div className='lg:w-1/2'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className=" text-[61px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase font-semibold ">Track Order</h1>
                            <p className=' w-[500px] mb-5 text-[19px]'>Enter Your Email & Transection Number Number Below.</p>
                            <p className=' text-[22px] mb-3 text-[#828282]'>E-mail</p>

                            <input type="text" {...register("email")} name="email" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " required />

                            <p className=' text-[22px] mb-3 text-[#828282]'>Tranjection Number</p>

                            <input type="text" {...register("orderID")} name="orderID" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " required />

                            {/* <input type="number" {...register("orderID")} name="orderID" placeholder="Your Order ID" className="input input-bordered w-[632px] mb-10 " /> */}
                            <button type="submit" value="Send" className=' w-[632px] bg-[#1C2E37] rounded-[10px] h-[67px] border-none text-white mb-3 '>Submit <FontAwesomeIcon icon={faArrowRight} /></button>
                        </form>
                        <div>
                            {
                                matchedData ? <p className=' text-black text-5xl text-green-400'>{matchedData.Confirm}</p> : null
                            }
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default TrackOrder;