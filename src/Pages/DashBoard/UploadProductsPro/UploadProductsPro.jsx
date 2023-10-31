import React, { useContext, useEffect, useState } from 'react';
import Revenue from '../DashBoardHome/Revenue/Revenue';
import Swal from 'sweetalert2';
import ColorPicker from '../../../Shared/ColorPicker/ColorPicker';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Provider/AuthProvider';

const UploadProductsPro = () => {
    const { user, loggedUser, categoryName, fabricsdata } = useContext(AuthContext);
    const findUser = loggedUser.find(person => person.email === user?.email);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            UploaderEmail: user?.email,
            UploaderRole: findUser?.role
        }
    });

    // You can also set default values using setValue
    useEffect(() => {
        setValue("UploaderEmail", user?.email);
        setValue("UploaderRole", findUser?.role);
    }, [user?.email, findUser?.role, setValue]);

    const [selectedColor, setSelectedColor] = useState('');

    const [clearanceOption, setClearanceOption] = useState('');
    const [salePercentage, setSalePercentage] = useState('');


    const [uploadedImages, setUploadedImages] = useState([]);


    // console.log(salePercentage)
    const handleClearanceChange = (e) => {
        const selectedOption = e.target.value;
        setClearanceOption(selectedOption);

        if (selectedOption === 'Sale') {
            setSalePercentage(''); // Reset salePercentage when 'Sale' is selected
        }
    };

    const handleSalePercentageChange = (e) => {
        setSalePercentage(e.target.value);
    };

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

    const onSubmit = async (data) => {
        console.log('MainData', data);

        data.selectedColor = selectedColor;
        data.sellpercet = salePercentage;



        try {
            const formData = new FormData();

            for (let i = 0; i < data.images.length; i++) {
                // console.log('uploadedImages',uploadedImages);
                formData.append('images', data.images[i]);
            }

            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('Clearance', data.Clearance);
            formData.append('sellpercet', data.sellpercet);
            formData.append('UploaderEmail', data.UploaderEmail);
            formData.append('UploaderRole', data.UploaderRole);
            formData.append('description', data.description);
            formData.append('Date', data.Date);
            formData.append('gender', data.gender);
            formData.append('category', data.category);
            formData.append('fabrics', data.fabrics);

            formData.append('selectedColor', data.selectedColor);
            formData.append('XSquantity', data.XSquantity);
            formData.append('Squantity', data.Squantity);
            formData.append('Mquantity', data.Mquantity);
            formData.append('Lquantity', data.Lquantity);
            formData.append('XLquantity', data.XLquantity);
            formData.append('XXLquantity', data.XXLquantity);
            formData.append('XXXLquantity', data.XXXLquantity);



            const response = await fetch('https://tahar-server-production.up.railway.app/product', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product Addes',
                    showConfirmButton: false,
                    timer: 1500
                })
                setSelectedColor([]);
                setUploadedImages(null);
                setSalePercentage(null)

                reset();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };




    return (
        <div className=' bg-[#110e0e]'>
            <div className=' container mx-auto bg-[#110e0e]'>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">

                    <div className="col-span-2 xl:col-span-3">


                        <div className="p-4 mb-4 bg-[#201D1D] border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-1    sm:p-6   ">
                            <h3 className="mb-4 text-xl font-semibold text-[#FFFFFF]  ">Product Information </h3>

                            <div className=' divider bg-[#FFFFFF24] h-[2px]'></div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className='w-full md:w-1/2'>
                                    <div className='col-span-6 sm:col-span-3 flex flex-row justify-between items-start gap-3'>
                                        {/* title */}
                                        <div className=" w-2/3">
                                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Product Title</label>
                                            <input type="text"
                                                {...register("title", { required: true })}
                                                id="first-name" className=" bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-[60px] p-2.5   " placeholder="Bonnie" required />
                                        </div>
                                        {/* color */}
                                        <div className=" w-1/3 align-bottom">
                                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Product Color</label>
                                            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                        </div>
                                    </div>

                                    {/* upload image */}
                                    <div className=' col-span-6 sm:col-span-3 row-span-1  '>
                                        <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-[#ABA9A9] ">Upload Picture</label>
                                        <label htmlFor="first-name" className="block mb-2 text-xs font-medium text-[#ABA9A966] ">JPG, PNG. Max size of 800K</label>

                                        <div className="p-4 mb-4 bg-[#201D1D] border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 ">

                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full   bg-[#201D1D] border border-[#FFFFFF24]">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8  mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    name='images'
                                                    {...register("images", { required: true })}
                                                    multiple
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


                                    {/* description */}

                                    <div className="col-span-6 sm:col-span-3 ">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Description</label>
                                        <textarea
                                            id="description"
                                            {...register("description", { required: true })}
                                            required
                                            className=" bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-[165px] p-2.5"
                                        ></textarea>
                                    </div>

                                    <div className='flex flex-row justify-between items-start gap-3'>
                                        <div className="col-span-6 sm:col-span-3 w-1/2">
                                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Price</label>
                                            <input type="number"
                                                {...register("price", { required: true })}
                                                id="last-name" className="h-[60px]   bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Tk. BDT." required />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 w-1/2">
                                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Fabrics</label>


                                            <select
                                                defaultValue="Pick One"
                                                {...register("fabrics", { required: true })}
                                                className="h-[60px]   bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required>
                                                <option value="Pick One" disabled>Pick One Fabrics</option>
                                                {fabricsdata.map(item => (
                                                    <option key={item._id} value={item.fabricsType}>
                                                        {item.fabricsType}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className=' w-full md:w-1/2'>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Category</label>

                                        <select
                                            defaultValue="Pick One"
                                            {...register("category", { required: true })}
                                            className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                            placeholder="e.g. New Collection" required
                                        >
                                            <option value="Pick One" disabled>Pick One Category</option>
                                            {categoryName.map(item => (
                                                <option key={item._id} value={item.title}>
                                                    {item.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Gender</label>
                                        {/* <input type="text" name="address" id="address" className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="e.g. Male" required /> */}

                                        <select
                                            id="gender"
                                            defaultValue="Pick One"
                                            {...register("gender")}
                                            className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required>
                                            <option value="Pick One" disabled>Pick One</option>
                                            <option value="men">Men</option>
                                            <option value="women">Women</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Clearance</label>
                                        {/* <input type="email" name="email" id="email" className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "  required /> */}

                                        <select
                                            id="C"
                                            defaultValue="Pick One"
                                            {...register("Clearance", { required: true })}
                                            className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required
                                            onChange={handleClearanceChange}
                                        >
                                            <option value="Pick One" disabled>Pick One</option>
                                            <option value="Sale">Sale</option>
                                            <option value="Not Sale">Not Sale</option>
                                        </select>

                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Sell Percentage</label>

                                        <input type="number"
                                            value={salePercentage}
                                            onChange={handleSalePercentageChange}
                                            id="phone-number"
                                            className={`h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${clearanceOption === 'Sale' ? '' : 'pointer-events-none opacity-50'}`}

                                            placeholder="Sale Percentage %" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Date</label>
                                        <input type="date"
                                            {...register("Date", { required: true })}
                                            id="birthday" className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="dd/mm/yyyy" required />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="organization" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Uploader Email</label>
                                        <input
                                            type="text"
                                            {...register("UploaderEmail", { required: true })}
                                            id="organization"
                                            className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-[#ABA9A9]   ">Uploader Role</label>
                                        <input
                                            type="text"
                                            {...register("UploaderRole", { required: true })}
                                            id="role"
                                            className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                            required
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="p-4 mb-4 bg-[#201D1D] border border-[#FFFFFF24] rounded-lg shadow-xl 2xl:col-span-1 sm:p-6">
                            <h3 className="mb-4 text-xl font-semibold text-[#FFFFFF]  ">Size & Quantity </h3>

                            <div className=' divider bg-[#FFFFFF24] h-[2px]'></div>
                            <div className="grid grid-cols-6 gap-6">



                                {/* XS Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="quantity-xs" className="block mb-2 text-sm font-medium text-[#ABA9A9]">XS</label>
                                    <input
                                        type="number"
                                        {...register("XSquantity")}
                                        id="quantity-xs"
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0"
                                        defaultValue="0"
                                    />
                                </div>




                                {/* S Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">S</label>
                                    <input
                                        type="number"
                                        {...register("Squantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>


                                {/* M Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">M</label>
                                    <input
                                        type="number"
                                        {...register("Mquantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>



                                {/* L Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">L</label>
                                    <input
                                        type="number"
                                        {...register("Lquantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>


                                {/* XL Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">XL</label>
                                    <input
                                        type="number"
                                        {...register("XLquantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>


                                {/* 2XL Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">2XL</label>
                                    <input
                                        type="number"
                                        {...register("XXLquantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>


                                {/* 3XL Quantity */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-[#ABA9A9]">3XL</label>
                                    <input
                                        type="number"
                                        {...register("XXXLquantity")}
                                        className="h-[60px]  bg-[#2E2A2B] border border-[#2E2A2B] text-[#ABA9A9] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        placeholder="Ex. 0" defaultValue="0"

                                    />
                                </div>
                            </div>

                        </div>



                        {/* Save button */}
                        <div className="col-span-2 xl:col-span-3 flex justify-end">
                            <input type="Submit" className="w-full text-white bg-[#201D1D] border border-[#FFFFFF24] btn btn-primary-700 hover:btn-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" />

                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default UploadProductsPro;