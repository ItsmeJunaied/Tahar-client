import { faCloudArrowUp, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const UploadVideo = () => {
    const { AllProducts } = useContext(AuthContext);

    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState(null);
    const [video, setVideo] = useState([]);

    useEffect(() => {
        fetch('https://tahar-server.vercel.app/video')
            .then(res => res.json())
            .then(data => setVideo(data))
    }, [])
    // console.log(video)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setVideoFile(file);
            setVideoURL(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleDelete = () => {
        setVideoFile(null);
        setVideoURL(null);
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        data.video = videoFile;
        console.log(data)
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('video', data.video);

        const response = await fetch('https://tahar-server.vercel.app/video', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const responseData = await response.json();
            fetch('https://tahar-server.vercel.app/video')
                .then(res => res.json())
                .then(updatedata => setVideo(updatedata))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Video Added',
                showConfirmButton: false,
                timer: 1500
            })
            setVideoFile(null);
            setVideoURL(null);


            reset();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    }



    const handleStatus = (id, currentStatus) => {
        console.log(id, currentStatus)
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        console.log(newStatus)
        fetch(`https://tahar-server.vercel.app/video/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: newStatus
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {


                    setVideo(prevCategoryData => {
                        return prevCategoryData.map(category => {
                            if (category._id === id) {
                                return {
                                    ...category,
                                    status: newStatus
                                };
                            }

                            return category;

                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='  bg-[#F9FAFB] '>
            <div className=' container mx-auto h-screen '>
                <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4   ">
                    <div className="mb-4 col-span-full xl:mb-2">
                        <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600    ">
                                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <a href="#" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2    ">Users</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="ml-1 text-gray-400 md:ml-2 " aria-current="page">Settings</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl uppercase ">Product Video</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="col-span-full xl:col-auto">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg 2xl:col-span-2  sm:p-6 ">
                            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                                {videoURL ? (
                                    <video src={videoURL} className="max-w-xs w-32 h-32" controls />
                                ) : (
                                    <label htmlFor="file-upload" className="file-input max-w-xs w-32 h-32 text-primary">
                                        <FontAwesomeIcon className=' w-28 h-28' icon={faCloudArrowUp} />
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="hidden"
                                            accept="video/*"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                )}

                                <div>
                                    <h3 className="mb-1 text-xl font-bold text-gray-900 ">Upload Video</h3>
                                    <div className="mb-4 text-sm text-gray-500 ">
                                        MP4. Max size of 800K
                                    </div>
                                    <div className="flex items-center space-x-4">

                                        <button onClick={handleDelete} type="button" className="py-2 px-3 text-sm font-medium text-primary 900 focus:outline-none bg-white rounded-lg border border-primary hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  ">
                                            Change Video
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg 2xl:col-span-2  sm:p-6   ">
                            <h3 className="mb-4 text-xl font-semibold ">Video Product Title</h3>
                            <div className="mb-4">
                                <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Title</label>
                                <select
                                    defaultValue="Pick One"
                                    {...register("title", { required: true })}
                                    id="settings-language"
                                    name="title"
                                    className="bg-gray-50 border focus:outline-none border-[#D1D5DB] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                >
                                    <option value="Pick One" disabled>
                                        Pick One
                                    </option>
                                    {AllProducts &&
                                        AllProducts.map((item) => (
                                            <option key={item._id} value={item.title}>
                                                {item.title}
                                            </option>
                                        ))}
                                </select>


                            </div>

                            <button type="submit" className="py-2 px-3 text-sm font-medium text-primary 900 focus:outline-none bg-white rounded-lg border border-primary hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200  ">
                                Upload
                            </button>
                        </div>


                    </form>

                    <div className="col-span-2">
                        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg 2xl:col-span-2    sm:p-6   ">
                            <h3 className="mb-4 text-xl font-semibold   ">Overall Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                {
                                    video && video.map(video =>
                                        <div key={video._id} className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                            <div className="relative aspect-w-8 aspect-h-8">
                                                <video className=" w-60 h-64 " src={`https://tahar-server.vercel.app/uploads/${video.video.filename} `} controls></video>
                                            </div>
                                            <h1 className="text-lg font-bold mt-2 h-10 ">{video.title}</h1>
                                            <div className="flex justify-between items-center mt-6">
                                                <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                                                <button
                                                    onClick={() => handleStatus(video._id, video.status)}
                                                    className=' btn btn-sm btn-accent text-black'>{video?.status}</button>
                                                <FontAwesomeIcon icon={faTrashCan} className="text-red-500 hover:text-red-700 cursor-pointer" />
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default UploadVideo;