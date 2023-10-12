import { useForm } from 'react-hook-form';
import './UploadProducts.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import ColorPicker from '../../../Shared/ColorPicker/ColorPicker';
import Swal from 'sweetalert2';
const img_token = import.meta.env.VITE_IMAGE_TOKEN;
const UploadProducts = () => {
    const { user, loggedUser, categoryName, fabricsdata } = useContext(AuthContext);
    const findUser = loggedUser.find(person => person.email === user?.email);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            UploaderEmail: user?.email,
            UploaderRole: findUser?.role
        }
    });



    const [isCheckboxCheckedS, setisCheckboxCheckedS] = useState(false);
    const [isCheckboxCheckedL, setisCheckboxCheckedL] = useState(false);
    const [isCheckboxCheckedM, setisCheckboxCheckedM] = useState(false);
    const [isCheckboxCheckedXL, setisCheckboxCheckedXL] = useState(false);
    const [isCheckboxChecked2XL, setisCheckboxChecked2XL] = useState(false);
    const [isCheckboxChecked3XL, setisCheckboxChecked3XL] = useState(false);

    const [selectedColorsS, setSelectedColorsS] = useState([]);
    const [selectedColorsM, setSelectedColorsM] = useState([]);
    const [selectedColorsL, setSelectedColorsL] = useState([]);
    const [selectedColorsXL, setSelectedColorsXL] = useState([]);
    const [selectedColors2XL, setSelectedColors2XL] = useState([]);
    const [selectedColors3XL, setSelectedColors3XL] = useState([]);




    const onSubmit = async (data) => {
        data.Scolor = selectedColorsS
        data.Mcolor = selectedColorsM
        data.Lcolor = selectedColorsL
        data.XLcolor = selectedColorsXL
        data.XXLcolor = selectedColors2XL
        data.XXXLcolor = selectedColors3XL
        data.sellpercet = salePercentage
        data.email =
            console.log(data);


        try {
            const formData = new FormData();

            for (let i = 0; i < data.images.length; i++) {
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


            if (isCheckboxCheckedS) {
                formData.append('Scolor', data.Scolor);
                formData.append('Squantity', parseInt(data.Squantity, 10) || 0);
            } else {
                formData.append('Scolor', '');
                formData.append('Squantity', 0);
            }

            if (isCheckboxCheckedM) {
                formData.append('Mcolor', data.Mcolor);
                formData.append('Mquantity', parseInt(data.Mquantity, 10) || 0);
            } else {
                formData.append('Mcolor', '');
                formData.append('Mquantity', 0);
            }

            if (isCheckboxCheckedL) {
                formData.append('Lcolor', data.Lcolor);
                formData.append('Lquantity', parseInt(data.Lquantity, 10) || 0);
            } else {
                formData.append('Lcolor', '');
                formData.append('Lquantity', 0);
            }

            if (isCheckboxCheckedXL) {
                formData.append('XLcolor', data.XLcolor);
                formData.append('XLquantity', parseInt(data.XLquantity, 10) || 0);
            } else {
                formData.append('XLcolor', '');
                formData.append('XLquantity', 0);
            }

            if (isCheckboxChecked2XL) {
                formData.append('XXLcolor', data.XXLcolor);
                formData.append('XXLquantity', parseInt(data.XXLquantity, 10) || 0);
            } else {
                formData.append('XXLcolor', '');
                formData.append('XXLquantity', 0);
            }

            if (isCheckboxChecked3XL) {
                formData.append('XXXLcolor', data.XXXLcolor);
                formData.append('XXXLquantity', parseInt(data.XXXLquantity, 10) || 0);
            } else {
                formData.append('XXXLcolor', '');
                formData.append('XXXLquantity', 0);
            }



            const response = await fetch('https://tahar-server.vercel.app/product', {
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
                setSelectedColorsS([]);
                setSelectedColorsM([]);
                setSelectedColorsL([]);
                setSelectedColorsXL([]);
                setSelectedColors2XL([]);
                setSelectedColors3XL([]);
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



    const handleColorData = (size, data) => {
        switch (size) {
            case 'S':
                setSelectedColorsS(data);
                break;
            case 'M':
                setSelectedColorsM(data);
                break;
            case 'L':
                setSelectedColorsL(data);
                break;
            case 'XL':
                setSelectedColorsXL(data);
                break;
            case '2XL':
                setSelectedColors2XL(data);
                break;
            case '3XL':
                setSelectedColors3XL(data);
                break;
            default:
                break;
        }
    };


    const handleCheckboxS = (e) => {
        setisCheckboxCheckedS(e.target.checked);
    };
    const handleCheckboxM = (e) => {
        setisCheckboxCheckedM(e.target.checked);
    };
    const handleCheckboxL = (e) => {
        setisCheckboxCheckedL(e.target.checked);
    };
    const handleCheckboxXL = (e) => {
        setisCheckboxCheckedXL(e.target.checked);
    };
    const handleCheckbox2XL = (e) => {
        setisCheckboxChecked2XL(e.target.checked);
    };
    const handleCheckbox3XL = (e) => {
        setisCheckboxChecked3XL(e.target.checked);
    };



    const [selectedColors, setSelectedColors] = useState([]);
    const [currentColor, setCurrentColor] = useState('');

    const handleColorClick = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const handleRemoveColor = (color) => {
        setSelectedColors(selectedColors.filter((c) => c !== color));
    };

    const [clearanceOption, setClearanceOption] = useState('');
    const [salePercentage, setSalePercentage] = useState('');

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

    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const updatedImages = [...uploadedImages];

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
        <div className=' container mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">

                <div className="col-span-2 xl:col-span-2">
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
                        <htmlForm action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900   ">Product Title</label>
                                    <input type="text"
                                        {...register("title", { required: true })}
                                        id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Bonnie" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900   ">Price</label>
                                    <input type="number"
                                        {...register("price", { required: true })}
                                        id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Tk. USD." required />
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
                                    <input type="text"
                                        {...register("UploaderEmail", { required: true })}
                                        id="organization" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" disabled placeholder="example@company.com" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900   ">Uploader Role</label>
                                    <input type="text"
                                        {...register("UploaderRole", { required: true })}
                                        id="role" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   " placeholder="Admin" required disabled />
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
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-96 p-2.5"
                            ></textarea>
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-1">
                    
                </div> */}


                <div className='col-span-2 xl:col-span-1'>
                    {/* size S */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">Small</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxCheckedS}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckboxS}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"

                                disabled={!isCheckboxCheckedS}
                                {...register("Squantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxCheckedS && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxCheckedS && <ColorPicker sendData={(data) => handleColorData('S', data)} size='S' />}
                        </div>

                    </div>

                    {/* size M */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">Medium</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxCheckedM}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckboxM}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"

                                disabled={!isCheckboxCheckedM}
                                {...register("Mquantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxCheckedM && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxCheckedM && <ColorPicker sendData={(data) => handleColorData('M', data)} size='M' />}
                        </div>

                    </div>

                    {/* size L */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">Large</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxCheckedL}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckboxL}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"
                                name="countries"
                                disabled={!isCheckboxCheckedL}
                                {...register("Lquantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxCheckedL && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxCheckedL && <ColorPicker sendData={(data) => handleColorData('L', data)} size='L' />}
                        </div>
                    </div>

                    {/* size XL */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">XL</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxCheckedXL}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckboxXL}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"
                                name="countries"
                                disabled={!isCheckboxCheckedXL}
                                {...register("XLquantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxCheckedXL && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxCheckedXL && <ColorPicker sendData={(data) => handleColorData('XL', data)} size='XL' />}
                        </div>
                    </div>

                    {/* size XXL */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">2XL</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxChecked2XL}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckbox2XL}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"
                                name="countries"
                                disabled={!isCheckboxChecked2XL}
                                {...register("XXLquantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxChecked2XL && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxChecked2XL && <ColorPicker sendData={(data) => handleColorData('2XL', data)} size='2XL' />}
                        </div>
                    </div>

                    {/* size XXXL */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-xl 2xl:col-span-2  sm:p-6   ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-xl font-bold ">3XL</span>
                            <input
                                type="checkbox"
                                checked={isCheckboxChecked3XL}
                                className="checkbox checkbox-primary"
                                onChange={handleCheckbox3XL}
                            // {...register("Lsize", { required: true })}
                            />
                        </label>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Select Quantity</label>
                            <input id="settings-language"
                                name="countries"
                                disabled={!isCheckboxChecked3XL}
                                {...register("XXXLquantity")}
                                className={` bg-gray-50 border border-gray-300  text-[#2B3440] sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${!isCheckboxChecked3XL && 'opacity-50'}`} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 ">Choose Color</label>

                            {isCheckboxChecked3XL && <ColorPicker sendData={(data) => handleColorData('3XL', data)} size='3XL' />}
                        </div>
                    </div>
                </div>
                {/* Save button */}
                <div className="col-span-2 xl:col-span-2 flex justify-end">
                    <button
                        className="w-full text-white bg-[#2B3440] btn btn-primary-700 hover:btn-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                    >
                        Save all
                    </button>
                </div>
            </form>
        </div>
    );
};
export default UploadProducts;