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
        fetch('https://tahar-server-production.up.railway.app/video')
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

        const response = await fetch('https://tahar-server-production.up.railway.app/video', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const responseData = await response.json();
            fetch('https://tahar-server-production.up.railway.app/video')
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
        fetch(`https://tahar-server-production.up.railway.app/video/${id}`, {
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
        <div className='bg-[#110E0E]'>
            <div className='  bg-[#110E0E] '>
                <div className=' container mx-auto '>
                    <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4   ">
                        <div className="mb-4 col-span-full xl:mb-2">
                            <h1 className="text-xl font-bold text-white sm:text-2xl uppercase ">Product Video</h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="col-span-full xl:col-auto">
                            <div className="mb-4 bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 2xl:col-span-2  sm:p-6 ">
                                <h3 className="mb-4 category_text text-start ">Video Product Title</h3>
                                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>

                                <div className="mb-4">
                                    <h1 className="section-name-category mb-2">Which Product?</h1>
                                    <select
                                        defaultValue="Pick One"
                                        {...register("title", { required: true })}
                                        id="settings-language"
                                        name="title"
                                        className="bg-[#2E2A2B] w-full h-[50px] rounded-md px-5 outline-none placeholder-text "
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

                                {/* <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
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
                                </div> */}

                                <label htmlFor="first-name" className="section-name-category ">Upload Picture</label>
                                <label htmlFor="first-name" className="block mb-2 text-xs font-medium text-[#ABA9A966] ">JPG, PNG. Max size of 800K</label>

                                <div className="p-4 mb-4 h-[270px] bg-[#201D1D] border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 flex flex-col justify-center items-center ">

                                    {videoURL ? (
                                        <video src={videoURL} className="max-w-xs w-32 h-32" controls />
                                    ) : (
                                        <label htmlFor="file-upload" className="file-input max-w-xs w-32 h-32 text-[#ABA9A966] bg-[#201D1D] relative flex items-center justify-center">
                                            <FontAwesomeIcon className='text-[#ABA9A966] w-20 h-20' icon={faCloudArrowUp} />
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
                                        <h3 className="mb-1 text-xl font-bold text-[#ABA9A966]  ">Upload Video</h3>
                                        <div className="mb-4 text-sm text-[#ABA9A966]  ">
                                            MP4. Max size of 800K
                                        </div>
                                        <div className="flex items-center space-x-4">

                                            <button onClick={handleDelete} type="button" className="py-2 px-3 text-sm font-medium text-[#ABA9A966] h-[54px] bg-transparent rounded-lg border border-[#ABA9A966] ">
                                                Change Video
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className=' flex justify-center'>
                                    <input
                                        type="submit"
                                        value="Upload"
                                        className=" dash-normal-text mt-4 bg-[#DBC896] h-[60px] text-[#201D1D] w-[250px] font-bold py-2 px-4 rounded-full"
                                    />
                                </div>
                            </div>


                        </form>

                        <div className="col-span-2">
                            <div className=" mb-4 bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 2xl:col-span-2    sm:p-6   ">
                                <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">Overall Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                                    {
                                        video && video.map(video =>
                                            <div key={video._id} className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                                <div className="relative aspect-w-8 aspect-h-8">
                                                    <video className=" w-60 h-64 " src={`https://tahar-server-production.up.railway.app/uploads/${video.video.filename} `} controls></video>
                                                </div>
                                                <h1 className="section-name-category h-10 mt-2 ">{video.title}</h1>
                                                <div className="flex justify-between items-center mt-6">
                                                    <button
                                                        onClick={() => handleStatus(video._id, video.status)}
                                                        className=' btn w-[154px] h-[41px] bg-[#B3EEAA] border-[#B3EEAA] text-black'>{video?.status}</button>
                                                    <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500 hover:text-blue-700 text-xl cursor-pointer" />
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
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
        </div>
    );
};

export default UploadVideo;