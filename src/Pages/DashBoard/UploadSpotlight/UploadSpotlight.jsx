import './UploadSpotlight.css';
import bgImg from '../../../../public/photos/bgImageWithLogo.jpg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;
const UploadSpotlight = () => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const onSubmit = data => {
        const fromData = new FormData();
        fromData.append('image', data.images[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: fromData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { username } = data;
                    const item = { username ,image: imgURL };

                    console.log(item);
                    fetch('https://tahar-server.vercel.app/customarSpotlight', {
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
                                reset();
                                setSelectedFile(null);
                            }
                        })
                }
            })
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(URL.createObjectURL(file));
    }

    const handleRemoveImage = () => {
        setSelectedFile(null);
    }
    return (
        <div>
            <div
                className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative"
                style={{
                    backgroundImage: `url(${bgImg})`
                }}
            >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                    <div className="text-center">
                        <h2 className="mt-5 text-3xl font-bold text-gray-900">
                            Customer Soptlight Upload!
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">Proud Customer Images Upload</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3" action="#" method="POST">
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Customer Name</label>
                            <input
                                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                {...register("username")}
                                type="text" placeholder="Username" />
                        </div>
                        <div className="grid grid-cols-1 space-y-2">
                            <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                    <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                            <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                        </div>
                                        <p className="pointer-none text-gray-500 "><span className="text-sm">Upload</span> files here
                                            <p className="text-blue-600 hover:underline">select a file</p> from your computer</p>
                                    </div>
                                    <input type="file"  {...register("images")} onChange={handleFileChange} className="" />
                                </label>

                            </div>
                            {selectedFile && (
                                <div className="relative">
                                    <button className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full" onClick={handleRemoveImage}>
                                        X
                                    </button>
                                    <p>Uploaded Photo:</p>
                                    <img src={selectedFile} alt="Uploaded" className="max-h-24 mx-auto" />
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-300">
                            <span>File type: Images</span>
                        </p>
                        <div>
                            <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadSpotlight;