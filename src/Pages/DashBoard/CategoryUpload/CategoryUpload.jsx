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
        fetch('http://localhost:5000/categoryInfo')
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

        fetch('http://localhost:5000/categoryInfo', {
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
        fetch(`http://localhost:5000/categoryInfo/${id}`, {
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
                    fetch('http://localhost:5000/categoryInfo')
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };

        reader.readAsDataURL(file);
    };




    return (
        <div className=' container mx-auto'>
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3 flex flex-col lg:flex-row justify-around h-full my-[100px] mx-[100px]">
                <div className=' flex flex-col lg:flex-row gap-5 w-1/2'>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
                            className="flex flex-col items-center bg-white shadow-lg rounded-sm border border-gray-200 p-10">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-center " htmlFor="photo">
                                Profile Photo
                            </label>

                            <div className="text-center">
                                <div className="mt-2" style={{ display: photoPreview ? 'block' : 'none' }}>
                                    <div
                                        className="w-40 h-40 m-auto rounded-full shadow"
                                        style={{
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center center',
                                            backgroundImage: `url('${photoPreview}')`,
                                        }}
                                    />
                                </div>
                                <input
                                    type="file"
                                    id="photo"
                                    name='categoryImage'
                                    className="hidden"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                        setValue("categoryImage", e.target.files[0]);
                                    }}
                                />

                                <label
                                    htmlFor="photo"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2"
                                >
                                    Select Photo
                                </label>
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text-input">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="text-input"
                                    className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                                    {...register("CategoryTitle", { required: true })}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Add"
                                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                            />
                        </form>
                    </div>
                    <div>
                        <ShowCategory categoryData={categoryData} handleStatus={handleStatus}></ShowCategory>
                    </div>
                </div>
                <div className="divider lg:divider-horizontal"></div>

                {/* fabrics upload */}
                <div className=' w-1/2'>
                    <UploadFabrics></UploadFabrics>
                </div>
            </div>
        </div>
    );
};

export default CategoryUpload;