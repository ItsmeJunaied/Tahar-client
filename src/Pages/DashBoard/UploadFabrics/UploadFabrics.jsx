import { faPenNib, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UploadFabrics = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm()

    const [fabricsdata, setFabricsData] = useState([]);

    useEffect(() => {
        fetch('https://tahar-server-production.up.railway.app/fabrics')
            .then(res => res.json())
            .then(data => setFabricsData(data))
    }, [])
    const onSubmit = (data) => {
        console.log(data.fabrics);
        console.log(data);
        const { fabrics } = data;
        const item = { fabrics };
        fetch('https://tahar-server-production.up.railway.app/fabrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData);

                if (responseData.success) {
                    fetch('https://tahar-server-production.up.railway.app/fabrics')
                        .then(res => res.json())
                        .then(updatedData => setFabricsData(updatedData));
                    reset();
                }
            })
    }
    return (
        <div className=' flex lg:flex-row flex-col gap-5 '>

            <div className=' bg-white shadow-lg rounded-sm border border-gray-200 p-10 w-1/2'>
                <h1 className='block text-gray-700 text-sm font-bold mb-2 text-center'>UploadFabrics</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        id="text-input"
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                        {...register("fabrics", { required: true })}
                    />
                    <input type="submit"
                        value=" Add" className=' btn btn-primary rounded-full ml-5' />
                </form>
            </div>
            <div className=' w-1/2'>
                <div className="flex flex-col justify-center h-full">
                    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Category</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Fabrics</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Update</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Delete</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {
                                            fabricsdata.map(item =>
                                                <tr key={item._id}>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">
                                                            {item.fabricsType}
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium ">
                                                            <button><FontAwesomeIcon icon={faPenNib} /></button>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">
                                                            <button className=''><FontAwesomeIcon className=' text-red-700' icon={faTrash} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default UploadFabrics;