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
        <div className=' flex  flex-col md:flex-row gap-5 '>

            <div className=' bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] h-[256px] rounded-[18px] p-[41px] w-full md:w-1/2 '>
                <h1 className='section-name-category  text-start mb-2'>Upload Fabrics</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        id="text-input-category"
                        className=" bg-[#2E2A2B] w-full h-[50px] rounded-md p-5 outline-none placeholder-text "
                        {...register("fabrics", { required: true })}
                    />
                    {/* <input type="submit" value="Add" className=' btn btn-primary rounded-full ml-5' /> */}
                    <div className=' flex justify-center'>
                        <input
                            type="submit"
                            value="Create Febrics"
                            placeholder=' E.Z. Modal'
                            className=" dash-normal-text mt-4 bg-[#DBC896] h-[60px] text-[#201D1D] w-[250px] font-bold py-2 px-4 rounded-full"
                        />
                    </div>
                </form>
            </div>

            <div className=' w-full md:w-1/2  '>
                <div className="flex flex-col   overflow-y-auto">
                    <div className="w-full bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 max-h-[664px] ">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800 category_text text-start">Fabrics List</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase ">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="Category_List text-center">Fabrics</div>
                                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="Category_List text-center">Update</div>
                                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="Category_List text-center">Delete</div>
                                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-['Manrope'] section-name-category">
                                        {
                                            fabricsdata.map(item =>
                                                <tr key={item._id}>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-center">
                                                            {item.fabricsType}
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-center font-medium ">
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