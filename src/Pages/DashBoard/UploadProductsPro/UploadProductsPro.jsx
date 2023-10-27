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



            const response = await fetch('http://localhost:5000/product', {
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
        <div className=' container mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">

                <div className="col-span-2 xl:col-span-3">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2 sm:p-6 h-80">
                        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                            <div>
                                <h3 className="mb-1 text-xl font-bold text-gray-900">Upload Picture</h3>
                                <div className="mb-4 text-sm text-gray-500">
                                    JPG, PNG. Max size of 800K
                                </div>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        name='images'
                                        {...register("images", { required: true })}
                                        multiple
                                        className="file-input file-input-bordered  w-full max-w-xs"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="uploaded-images flex flex-row">
                            {uploadedImages && uploadedImages.map(image => (
                                <div key={image.id} className="uploaded-image relative">
                                    <img className='w-28 h-28 mr-5 mt-10 object-cover rounded-lg' src={URL.createObjectURL(image.file)} alt={`Uploaded ${image.file.name}`} />
                                    <button onClick={() => handleImageDelete(image.id)} className="delete-button bg-red-500 rounded-full w-6 absolute top-8 right-2">X</button>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-1    sm:p-6   ">
                        <h3 className="mb-4 text-xl font-semibold   ">Product Information </h3>

                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900   ">Product Title</label>
                                <input type="text"
                                    {...register("title", { required: true })}
                                    id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Bonnie" required />
                            </div>
                            {/* color */}
                            <div className="col-span-6 sm:col-span-3 flex align-bottom">

                                <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                            </div>




                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900   ">Price</label>
                                <input type="number"
                                    {...register("price", { required: true })}
                                    id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Tk. BDT." required />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900   ">Category</label>

                                <select
                                    defaultValue="Pick One"
                                    {...register("category", { required: true })}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900   ">Fabrics</label>


                                <select
                                    defaultValue="Pick One"
                                    {...register("fabrics", { required: true })}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required>
                                    <option value="Pick One" disabled>Pick One Fabrics</option>
                                    {fabricsdata.map(item => (
                                        <option key={item._id} value={item.fabricsType}>
                                            {item.fabricsType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900   ">Gender</label>
                                {/* <input type="text" name="address" id="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="e.g. Male" required /> */}

                                <select
                                    id="gender"
                                    defaultValue="Pick One"
                                    {...register("gender")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required>
                                    <option value="Pick One" disabled>Pick One</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900   ">Clearance</label>
                                {/* <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   "  required /> */}

                                <select
                                    id="C"
                                    defaultValue="Pick One"
                                    {...register("Clearance", { required: true })}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " required
                                    onChange={handleClearanceChange}
                                >
                                    <option value="Pick One" disabled>Pick One</option>
                                    <option value="Sale">Sale</option>
                                    <option value="Not Sale">Not Sale</option>
                                </select>

                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900   ">Sell Percentage</label>

                                <input type="number"
                                    value={salePercentage}
                                    onChange={handleSalePercentageChange}
                                    id="phone-number"
                                    className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${clearanceOption === 'Sale' ? '' : 'pointer-events-none opacity-50'}`}

                                    placeholder="Sale Percentage %" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900   ">Date</label>
                                <input type="date"
                                    {...register("Date", { required: true })}
                                    id="birthday" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="dd/mm/yyyy" required />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="organization" className="block mb-2 text-sm font-medium text-gray-900   ">Uploader Email</label>
                                <input
                                    type="text"
                                    {...register("UploaderEmail", { required: true })}
                                    id="organization"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    disabled
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900   ">Uploader Role</label>
                                <input
                                    type="text"
                                    {...register("UploaderRole", { required: true })}
                                    id="role"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                    required
                                    disabled
                                />
                            </div>

                        </div>

                    </div>

                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-1 sm:p-6">

                        <div className="grid grid-cols-6 gap-6">

                            {/* XS */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>XS</p>
                                </div>
                            </div>

                            {/* XS Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="quantity-xs" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("XSquantity")}
                                    id="quantity-xs"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0"
                                    defaultValue="0"
                                />
                            </div>


                            {/* S */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>S</p>
                                </div>
                            </div>

                            {/* S Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("Squantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>

                            {/* M */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>M</p>
                                </div>
                            </div>

                            {/* M Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("Mquantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>

                            {/* L */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>L</p>
                                </div>
                            </div>

                            {/* L Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("Lquantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>

                            {/* XL */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>XL</p>
                                </div>
                            </div>

                            {/* XL Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("XLquantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>

                            {/* 2XL */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>2XL</p>
                                </div>
                            </div>

                            {/* 2XL Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("XXLquantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>

                            {/* 3XL */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <p>3XL</p>
                                </div>
                            </div>

                            {/* 3XL Quantity */}
                            <div className="col-span-6 sm:col-span-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                <input
                                    type="number"
                                    {...register("XXXLquantity")}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    placeholder="Ex. 0" defaultValue="0"

                                />
                            </div>
                        </div>

                    </div>

                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-1    sm:p-6   ">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900   ">Description</label>

                            <textarea
                                id="description"
                                {...register("description", { required: true })}
                                required
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-96 p-2.5"
                            ></textarea>
                        </div>
                    </div>

                    {/* Save button */}
                    <div className="col-span-2 xl:col-span-3 flex justify-end">
                        <input type="Submit" className="w-full text-white bg-[#2B3440] btn btn-primary-700 hover:btn-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" />

                    </div>
                </div>

            </form>
        </div>
    );
};

export default UploadProductsPro;