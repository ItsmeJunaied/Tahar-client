import React, { useEffect, useState } from 'react';
import './CategoryUpload.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import ShowCategory from '../../../Shared/ShowCategory/ShowCategory';
import UploadFabrics from '../UploadFabrics/UploadFabrics';
const CategoryUpload = () => {
    // const { id } = useParams();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/categoryInfo')
            .then(res => res.json())
            .then(data => setCategoryData(data))
    }, [])
    const onSubmit = (data) => {
        const { CategoryTitle, categoryImage } = data;

        console.log(data.categoryImage);
        const formData = new FormData();
        formData.append('CategoryTitle', CategoryTitle);
        formData.append('categoryImage', data.categoryImage);
        formData.append('status', 'Not Show');

        fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/categoryInfo', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(newData => {
                console.log('Response from server:', newData);
                if (newData.productId) {
                    console.log('Insert successful');
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Category Information added successfully",
                        timer: 1500,
                    });

                    setCategoryData(prevCategoryData => [...prevCategoryData, newData]);
                    reset();

                }
            })
    }
    const handleStatus = (id, currentStatus) => {
        fetch(`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/categoryInfo/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status:
                    currentStatus === 'Show' ? 'Not Show' :
                        currentStatus === 'Not Show' ? 'Container1' :
                            currentStatus === 'Container1' ? 'Container2' :
                                currentStatus === 'Container2' ? 'Show' :
                                    'Unknown'
            })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) if (data.modifiedCount > 0) {
                    // Update the state with the new status
                    setCategoryData(prevCategoryData => {
                        return prevCategoryData.map(category => {
                            if (category._id === id) {
                                return {
                                    ...category,
                                    status:
                                        currentStatus === 'Show' ? 'Not Show' :
                                            currentStatus === 'Not Show' ? 'Container1' :
                                                currentStatus === 'Container1' ? 'Container2' :
                                                    currentStatus === 'Container2' ? 'Show' :
                                                        'Unknown'
                                };
                            }

                            return category;
                        });
                    });
                    fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/categoryInfo')
                        .then(res => res.json())
                        .then(data => setCategoryData(data))
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const [photoPreview, setPhotoPreview] = useState(null);
    const [textInput, setTextInput] = useState('');

    const [uploadedImages, setUploadedImages] = useState([]);




    // image

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const updatedImages = uploadedImages ? [...uploadedImages] : [];

        for (let i = 0; i < files.length; i++) {
            updatedImages.push({
                id: Math.random(), // Generate a unique id for each image
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
        <div className=' bg-[#110E0E]'>
            <div className=' container mx-auto bg-[#110E0E]'>
                <div className=" flex flex-col justify-between gap-10 my-[100px] mx-[100px]">
                    <div className=' flex flex-col md:flex-row gap-5 w-full'>
                        <div className=' w-full md:w-1/2  h-[664px]'>
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
                                className="flex flex-col h-full bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10">
                                <h1 className='category_text text-start'>Category Information</h1>
                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>


                                <div className="mt-4">
                                    <h1 className="section-name-category mb-2" htmlFor="text-input">
                                        Category Name
                                    </h1>
                                    <input
                                        type="text"
                                        id="text-input-category"
                                        className="bg-[#2E2A2B] w-full h-[50px] rounded-md p-5 outline-none placeholder-text "
                                        placeholder='E.g: Zenith Collection'
                                        {...register("CategoryTitle", { required: true })}
                                        onChange={(e) => setTextInput(e.target.value)}
                                    />
                                </div>



                                <div className=' mt-5 '>
                                    <label htmlFor="first-name" className="section-name-category ">Upload Picture</label>
                                    <label htmlFor="first-name" className="block mb-2 text-xs font-medium text-[#ABA9A966] ">JPG, PNG. Max size of 800K</label>

                                    <div className="p-4 mb-4 h-[270px]  bg-[#201D1D] border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 ">

                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full   bg-[#201D1D] border border-[#FFFFFF24]">
                                            <div className="flex flex-col h-[220px]  items-center justify-center pt-5 pb-6">
                                                <svg className="w-8  mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
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
                                <div className=' flex justify-center'>
                                    <input
                                        type="submit"
                                        value="Create Category"
                                        className=" dash-normal-text mt-4 bg-[#DBC896] h-[60px] text-[#201D1D] w-[250px] font-bold py-2 px-4 rounded-full"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className='w-full md:w-1/2 '>
                            <ShowCategory categoryData={categoryData} handleStatus={handleStatus}></ShowCategory>
                        </div>
                    </div>

                    {/* fabrics upload */}
                    <div className='  '>
                        <UploadFabrics></UploadFabrics>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryUpload;