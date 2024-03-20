import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const UploadBanner = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [bannerinfo, setBannerinfo] = useState([]);

    useEffect(() => {
        fetch('https://taharz.onrender.com/banner')
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

            const response = await fetch('https://taharz.onrender.com/banner', {
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
                fetch('https://taharz.onrender.com/banner')
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

        fetch(`https://taharz.onrender.com/banner/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    setBannerinfo(prev => prev.filter(banner => banner._id !== id));
                    fetch('https://taharz.onrender.com/banner')
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
        <div className=' '>
            <div className=' bg-[#110E0E] h-screen '>
                <div className=' container mx-auto  bg-[#110E0E]  '>
                    <div className=' flex flex-col md:flex-row gap-4'>
                        <div className='col-span-1 xl:col-span-1 h-[830px]'>
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 px-4 pt-6  xl:gap-4">
                                <div className=' ' >
                                    <div className="bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 2xl:col-span-2 sm:p-6 ">
                                        <h1 className='category_text text-start'>Banner Information</h1>
                                        <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>

                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <h1 className="section-name-category mb-2" htmlFor="text-input">
                                                    Banner Short Title
                                                </h1>
                                                <input type="text"
                                                    {...register("title", { required: true })}
                                                    id="text-input-category"
                                                    className="bg-[#2E2A2B] w-full h-[50px] rounded-md p-5 outline-none placeholder-text "
                                                    placeholder='E.g: Zenith Collection'
                                                    required />
                                            </div>

                                        </div>


                                        <div className=' mt-5 '>
                                            <label htmlFor="first-name" className="section-name-category ">Upload Picture</label>
                                            <label htmlFor="first-name" className="block mb-2 text-xs font-medium text-[#ABA9A966] ">JPG, PNG. Max size of 800K</label>

                                            <div className="p-4 mb-4 h-[270px]  bg-[#2E2A2B]  border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 ">

                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full bg-[#2E2A2B] ">
                                                    <div className="flex flex-col h-[220px]  items-center justify-center pt-5 pb-6">
                                                        <FontAwesomeIcon className=' text-[54px] text-[#ABA9A966]' icon={faCloudArrowUp} />
                                                        <p className="mb-2 text-sm text-[#ABA9A966]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-[#ABA9A966]">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    <input
                                                        id="dropzone-file"
                                                        type="file"
                                                        name='images'
                                                        {...register("images", { required: true })}
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                    />

                                                </label>

                                                <div className="uploaded-images flex flex-row">
                                                    {uploadedImages && uploadedImages.map(image => (
                                                        <div key={image.id} className="uploaded-image relative">
                                                            <img className='w-28 h-28 mr-5 mt-10 object-cover rounded-lg' src={URL.createObjectURL(image.file)} alt={`Uploaded ${image.file.name}`} />
                                                            <button onClick={() => handleImageDelete(image.id)} className="delete-button bg-red-500 rounded-full w-6 absolute top-8 right-2">X</button>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <h1 className="section-name-category mb-2 ">Description</h1>

                                            <textarea
                                                id="text-input-category"
                                                {...register("description", { required: true })}
                                                required
                                                className="bg-[#2E2A2B]  rounded-md h-[115px]  w-full  p-2.5"
                                                placeholder='Describe Your Banner'
                                            ></textarea>
                                        </div>
                                        {/* Save button */}
                                        <div className=" flex justify-center ">
                                            <button
                                                className=" dash-normal-text mt-4 bg-[#DBC896] h-[60px] text-[#201D1D] w-[250px] font-bold py-2 px-4 rounded-full"
                                                type="submit"
                                            >
                                                Save all
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </form>
                        </div>


                        {/* output container */}
                        <div className='col-span-1 xl:col-span-1 mt-6 h-[830px]'>
                            {/* size S */}
                            <div className=" mb-4 bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 2xl:col-span-2  sm:p-6   ">
                                <h1 className='category_text text-start'>Banner Information</h1>
                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th className='Category_List text-center'>Image</th>
                                                <th className='Category_List text-center'>Title</th>
                                                <th className='Category_List text-center'>Short Description</th>
                                                <th className='Category_List text-center'>Delete</th>
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
                                                                        <img src={`https://taharz.onrender.com/uploads/${item.images}`} alt="banner img" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-center font-['Manrope'] section-name-category">{item.title}</p>

                                                        </td>
                                                        <td>
                                                            <p className="text-center font-['Manrope'] section-name-category">{item.description}</p>
                                                        </td>

                                                        <th>
                                                            <div className="w-40 h-10 px-12 pt-3.5 pb-3 bg-red-400 rounded-lg justify-center items-center inline-flex">
                                                                <button className="text-center text-stone-900 text-lg font-semibold font-['Manrope'] leading-normal">Delete</button>
                                                            </div>
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
            </div>
        </div>
    );
};

export default UploadBanner;