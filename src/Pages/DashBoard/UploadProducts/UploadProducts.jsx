import { useForm } from 'react-hook-form';
import './UploadProducts.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import ColorPicker from '../../../Shared/ColorPicker/ColorPicker';
import Swal from 'sweetalert2';
const img_token = import.meta.env.VITE_IMAGE_TOKEN;
const UploadProducts = () => {
    const { user, loggedUser, categoryName, fabricsdata } = useContext(AuthContext);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()



    const [isCheckboxCheckedS, setisCheckboxCheckedS] = useState(true);
    const [isCheckboxCheckedL, setisCheckboxCheckedL] = useState(true);
    const [isCheckboxCheckedM, setisCheckboxCheckedM] = useState(true);
    const [isCheckboxCheckedXL, setisCheckboxCheckedXL] = useState(true);
    const [isCheckboxChecked2XL, setisCheckboxChecked2XL] = useState(true);
    const [isCheckboxChecked3XL, setisCheckboxChecked3XL] = useState(true);

    const [selectedColorsS, setSelectedColorsS] = useState([]);
    const [selectedColorsM, setSelectedColorsM] = useState([]);
    const [selectedColorsL, setSelectedColorsL] = useState([]);
    const [selectedColorsXL, setSelectedColorsXL] = useState([]);
    const [selectedColors2XL, setSelectedColors2XL] = useState([]);
    const [selectedColors3XL, setSelectedColors3XL] = useState([]);


    const [images, setImages] = useState([]);

    // console.log(images)
    const handleImageUpload = (e) => {
        const newImages = [...images, e.target.files[0]];
        setImages(newImages);
    }

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const onSubmit = async (data) => {
        data.Scolor = selectedColorsS
        data.Mcolor = selectedColorsM
        data.Lcolor = selectedColorsL
        data.XLcolor = selectedColorsXL
        data.XXLcolor = selectedColors2XL
        data.XXXLcolor = selectedColors3XL


        console.log(data);


        try {
            const formData = new FormData();

            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }

            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('Clearance', data.Clearance);
            formData.append('description', data.description);
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
                setSelectedColorsS(null);
                setSelectedColorsM(null);
                setSelectedColorsL(null);
                setSelectedColorsXL(null);
                setSelectedColors2XL(null);
                setSelectedColors3XL(null);
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

    return (
        <div>
            <div>

                <div>
                    <section className="max-w-4xl p-6 mx-auto bg-[#DBC896] rounded-md shadow-md   mt-20">
                        <h1 className="text-3xl text-center uppercase font-bold text-white  dark:text-white">Upload Product</h1>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className=' flex gap-5'>
                                <div className="mb-4 w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...register("title", { required: true })}
                                        required
                                    />
                                </div>

                                <div className="mb-4 w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...register("price", { required: true })}
                                        required
                                    />
                                </div>
                            </div>
                            <input type="file" name='images'
                                {...register("images", { required: true })} multiple
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs" />

                            <div className=''>
                                <div className=' flex flex-row w-full justify-between gap-3'>
                                    {/* Size S */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">S</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxCheckedS}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckboxS}

                                            />
                                        </label>

                                        {isCheckboxCheckedS && (
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Quantity"
                                                    className={`input input-bordered w-full max-w-xs ${!isCheckboxCheckedS && 'opacity-50'}`}
                                                    disabled={!isCheckboxCheckedS}
                                                    {...register("Squantity")}
                                                />
                                                <div className=' mt-2'>
                                                    <h1>Choose Colour</h1>
                                                    {isCheckboxCheckedS && <ColorPicker sendData={(data) => handleColorData('S', data)} size='S' />}
                                                </div>
                                            </div>)}
                                    </div>
                                    {/* Size M */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">M</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxCheckedM}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckboxM}
                                            // {...register("Msize", { required: true })}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Quantity"
                                            className={`input input-bordered w-full max-w-xs ${!isCheckboxCheckedM && 'opacity-50'}`}
                                            disabled={!isCheckboxCheckedM}
                                            {...register("Mquantity")}
                                        />
                                        <div className=' mt-2'>
                                            <h1>Choose Colour</h1>
                                            {isCheckboxCheckedM && <ColorPicker sendData={(data) => handleColorData('M', data)} size='M' />}
                                        </div>
                                    </div>

                                </div>
                                <div className=' flex flex-row w-full justify-between gap-3'>
                                    {/* size L */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">L</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxCheckedL}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckboxL}
                                            // {...register("Lsize", { required: true })}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Quantity"
                                            className={`input input-bordered w-full max-w-xs ${!isCheckboxCheckedL && 'opacity-50'}`}
                                            disabled={!isCheckboxCheckedL}
                                            {...register("Lquantity")}
                                        />
                                        <div className=' mt-2'>
                                            <h1>Choose Colour</h1>
                                            {isCheckboxCheckedL && <ColorPicker sendData={(data) => handleColorData('L', data)} size='L' />}
                                        </div>
                                    </div>
                                    {/* size xl */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">X</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxCheckedXL}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckboxXL}
                                            // {...register("XLsize", { required: true })}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Quantity"
                                            className={`input input-bordered w-full max-w-xs ${!isCheckboxCheckedXL && 'opacity-50'}`}
                                            disabled={!isCheckboxCheckedXL}
                                            {...register("XLquantity", { required: true })}
                                        />
                                        <div className=' mt-2'>
                                            <h1>Choose Colour</h1>
                                            {isCheckboxCheckedXL && <ColorPicker sendData={(data) => handleColorData('XL', data)} size='XL' />}
                                        </div>
                                    </div>
                                </div>
                                <div className=' flex flex-row w-full justify-between gap-3'>

                                    {/* size 2xl */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">2XL</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxChecked2XL}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckbox2XL}
                                            // {...register("2XLsize", { required: true })}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Quantity"
                                            className={`input input-bordered w-full max-w-xs ${!isCheckboxChecked2XL && 'opacity-50'}`}
                                            disabled={!isCheckboxChecked2XL}
                                            {...register("XXLquantity")}
                                        />
                                        <div className=' mt-2'>
                                            <h1>Choose Colour</h1>
                                            {isCheckboxChecked2XL && <ColorPicker sendData={(data) => handleColorData('2XL', data)} size='2XL' />}
                                        </div>
                                    </div>
                                    {/* size 3xl */}
                                    <div className="form-control border-[2px] rounded-[15px]  p-10 w-1/2">
                                        <label className="label cursor-pointer">
                                            <span className="label-text">3XL</span>
                                            <input
                                                type="checkbox"
                                                checked={isCheckboxChecked3XL}
                                                className="checkbox checkbox-primary"
                                                onChange={handleCheckbox3XL}
                                            // {...register("3XLsize", { required: true })}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Quantity"
                                            className={`input input-bordered w-full max-w-xs ${!isCheckboxChecked3XL && 'opacity-50'}`}
                                            disabled={!isCheckboxChecked3XL}
                                            {...register("XXXLquantity")}
                                        />
                                        <div className=' mt-2'>
                                            <h1>Choose Colour</h1>
                                            {isCheckboxChecked3XL && <ColorPicker sendData={(data) => handleColorData('3XL', data)} size='3XL' />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <select
                                    defaultValue="Pick One"
                                    {...register("category", { required: true })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="Pick One" disabled>Pick One Category</option>
                                    {categoryName.map(item => (
                                        <option key={item._id} value={item.title}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>

                            </div>


                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Fabrics</label>
                                <select
                                    defaultValue="Pick One"
                                    {...register("fabrics", { required: true })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="Pick One" disabled>Pick One Fabrics</option>
                                    {fabricsdata.map(item => (
                                        <option key={item._id} value={item.fabricsType}>
                                            {item.fabricsType}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            {/* Add more quantity input fields for other sizes as needed */}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    {...register("gender")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value=''>Pick One</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Clearance">
                                    Clearance
                                </label>
                                <select
                                    id="C"
                                    {...register("Clearance")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option disabled >Pick One</option>
                                    <option value="Sale">Sale</option>
                                    <option value="Not Sale">Not Sale</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", { required: true })}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-36"
                                ></textarea>
                            </div>




                            <div className="flex items-center justify-end">
                                <input
                                    type="submit"
                                    value="Add Product"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                />
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UploadProducts;