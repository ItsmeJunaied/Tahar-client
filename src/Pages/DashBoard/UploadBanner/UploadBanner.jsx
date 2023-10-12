import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const UploadBanner = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [bannerinfo, setBannerinfo] = useState([]);

    useEffect(() => {
        fetch('https://tahar-server.vercel.app/banner')
            .then(res => res.json())
            .then(data => setBannerinfo(data))
    }, [])
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const formData = new FormData();

            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }

            formData.append('title', data.title);
            formData.append('description', data.description);

            const response = await fetch('https://tahar-server.vercel.app/banner', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                fetch('https://tahar-server.vercel.app/banner')
                    .then(res => res.json())
                    .then(data => setBannerinfo(data))
                setUploadedImages(null)
                reset();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //delete
    const handleBannerDelete = async (id) => {
        console.log(id)

        fetch(`https://tahar-server.vercel.app/banner/${id}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.deletedCount > 0){
                setBannerinfo(prev => prev.filter(banner => banner._id !== id));
                fetch('https://tahar-server.vercel.app/banner')
                    .then(res => res.json())
                    .then(data => setBannerinfo(data))
            }
        })
    };

    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const updatedImages = [...uploadedImages];

        for (let i = 0; i < files.length; i++) {
            updatedImages.push({
                id: Math.random(),
                file: files[i]
            });
        }

        setUploadedImages(updatedImages);
    };

    const handleImageDelete = (id) => {
        const updatedImages = uploadedImages.filter(image => image.id !== id);
        setUploadedImages(updatedImages);
    };
    return (
        <div className=' container mx-auto'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1 xl:col-span-1'>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 px-4 pt-6  xl:gap-4">

                        <div >
                            <div className="bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 h-72">
                                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                                    <div>
                                        <h3 className="mb-1 text-xl font-bold text-gray-900">Upload Banner Image</h3>
                                        <div className="mb-4 text-sm text-gray-500">
                                            JPG, PNG. Max size of 800K
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="file"
                                                name='images'
                                                {...register("images", { required: true })}
                                                className="file-input file-input-bordered w-full max-w-xs"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    </div>
                                    {uploadedImages && uploadedImages.map(image => (
                                        <div key={image.id} className="uploaded-image">
                                            <img className='w-28 h-28  mr-2 mt-10 object-cover rounded-lg' src={URL.createObjectURL(image.file)} alt={`Uploaded ${image.file.name}`} />
                                            <button onClick={() => handleImageDelete(image.id)} className="delete-button bg-red-500 rounded-full w-5">X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-1  mt-4  sm:p-6   ">
                                <h3 className="mb-4 text-xl font-semibold   ">Banner Information </h3>
                                <htmlForm action="#">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900   ">Banner Short Title</label>
                                            <input type="text"
                                                {...register("title", { required: true })}
                                                id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Bonnie" required />
                                        </div>

                                    </div>
                                </htmlForm>
                            </div>

                            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-1    sm:p-6   ">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900   ">Description</label>

                                    <textarea
                                        id="description"
                                        {...register("description", { required: true })}
                                        required
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-60 p-2.5"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Save button */}
                            <div className=" ">
                                <button
                                    className="text-white  w-full bg-[#2B3440] btn btn-primary-700 hover:btn-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="submit"
                                >
                                    Save all
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


                {/* output container */}
                <div className='col-span-1 xl:col-span-1 mt-6'>
                    {/* size S */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Short Description</th>

                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bannerinfo?.map(item =>
                                            <tr key={item._id}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`https://tahar-server.vercel.app/uploads/${item.images}`} alt="banner img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.title}
                                                </td>
                                                <td>{item.description}</td>

                                                <th>
                                                    <button onClick={() => handleBannerDelete(item._id)} className="">
                                                        <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#e53c2a", }} />
                                                    </button>
                                                </th>
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
    );
};

export default UploadBanner;