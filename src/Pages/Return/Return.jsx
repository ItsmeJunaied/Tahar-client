import Partners from '../Home/Partners/Partners';
import './Return.css';
import returnImg from '../../../public/photos/returnIMG.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
const Return = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    // const [findOrder, setfindOrder] = useState([]);

    const onSubmit = data => {
        const { email, orderID } = data;
        fetch('https://taharecom.vercel.app/return', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(newData => {
                console.log(newData);
                if (newData.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Customer Sopt Light added successfully",
                        timer: 1500,
                    });
                    reset();
                }
            })
    }



    return (
        <div>
            <div className=' bg-white'>
                <div className=' flex flex-col lg:flex-row mx-[100px] my-[100px]'>
                    <div className=' lg:w-1/2'>
                        <img src={returnImg} alt="" />
                    </div>
                    <div className='lg:w-1/2'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className=' text-[61px]'>Return & Exchange</h1>
                            <p className=' w-[500px] mb-5 text-[19px]'>Enter your Phone number or Email Address or Order Number to track your order.</p>
                            <p className=' text-[22px] mb-3 text-[#828282]'>E-mail/phone</p>

                            <input type="text" {...register("email")} name="email" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " />

                            <p className=' text-[22px] mb-3 text-[#828282]'>Order Number</p>

                            <input type="number" {...register("orderID")} name="orderID" placeholder="Your Email" className="input input-bordered w-[632px] mb-10 " />

                            {/* <input type="number" {...register("orderID")} name="orderID" placeholder="Your Order ID" className="input input-bordered w-[632px] mb-10 " /> */}
                            <button type="submit" value="Send" className=' w-[632px] bg-[#1C2E37] rounded-[10px] h-[67px] border-none text-white mb-3 '>Submit <FontAwesomeIcon icon={faArrowRight} /></button>
                            <p className=' underline text-[#A79055]'>Check our exchange/return policy here</p>
                        </form>
                    </div>
                </div>
            </div>
            <Partners></Partners>
        </div>
    );
};

export default Return;