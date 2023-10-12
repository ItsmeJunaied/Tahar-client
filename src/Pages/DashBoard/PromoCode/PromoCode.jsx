import React, { useEffect, useState } from 'react';
import './PromoCode.css';
import logo from '../../../../public/photos/tahar-logo.png';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
const PromoCode = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    
    const [code, setCode] = useState([]);
    useEffect(() => {
        fetch('https://tahar-server.vercel.app/promocode')
            .then(res => res.json())
            .then(data => setCode(data))
    }, [])


    const onSubmit = (data) => {

        const { percentage, type, name } = data;
        const item = { percentage, type, name };

        fetch('https://tahar-server.vercel.app/promocode', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
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
                    fetch('https://tahar-server.vercel.app/promocode')
                        .then(res => res.json())
                        .then(data => setCode(data));
                    reset();
                }
            })

    }
    return (
        <div className="container mx-auto">

            <form onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-purple-600 to-indigo-600  h-[300px] text-white text-center py-10 px-20 rounded-lg shadow-md relative  ">
                <img src={logo} className="w-20 mx-auto mb-4 rounded-lg" />
                <h3 className="text-2xl font-semibold mb-4">
                    <input
                        type="number"
                        placeholder='%'
                        {...register("percentage", { required: true })}
                        className='border-dashed border bg-transparent focus:outline-none text-white px-4 py-1 w-20 text-center rounded-lg' />
                    <span className=' ml-3 mr-3'>% flat Discount the</span>
                    <select
                        {...register("type", { required: true })}
                        className="select select-primary border-dashed border-[#FFFFFF] bg-transparent focus:outline-none text-white px-2 py-1  w-40 text-center rounded-lg">
                        <option disabled selected>Pick One</option>
                        <option className=' text-black'>Promo Code</option>
                        <option className=' text-black'>Coupon Code</option>
                    </select>
                </h3>

                <div className="flex flex-row justify-center items-center space-x-2 mb-6">

                    <input type="text"
                        {...register("name", { required: true })}
                        placeholder=' Add Promo or Coupon'
                        className="border-dashed border bg-transparent focus:outline-none text-white px-4 py-2 rounded-lg" />
                    <button type='submit' className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer">
                        Add
                    </button>
                </div>

                <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
            </form>
            <section className="py-1 bg-blueGray-50  ">
                <div className="w-full  px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-yellow-200">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700 text-center">
                                        PROMO / Coupon
                                    </h3>
                                </div>

                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full border-collapse text-blueGray-700  ">
                                <thead className="thead-light ">
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Type
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Discount
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Update
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        code && code.map(item =>
                                            <tr key={item._id}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {item.type}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {item.percentage} %
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    <FontAwesomeIcon className=' text-teal-500' icon={faPenToSquare} />
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    <FontAwesomeIcon className=' text-warning' icon={faTrash} />
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PromoCode;