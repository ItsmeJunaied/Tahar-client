import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FrequentkyBought = ({ data }) => {
    const { user, AllProducts, localCartData, setLocalCartData } = useContext(AuthContext);

    
    // const matchedData= AllProducts.filter(item=> item.category === data.category && item.gender === data.gender);


    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const [randomdata, setData] = useState('');
    const [totalPrice, SetTotalPrice] = useState('');

    // Shuffle and select first three products
    useEffect(() => {
        const randomdata = shuffleArray([...AllProducts]).slice(0, 3);
        const randomdataPrice = randomdata.map(item => parseInt(item.price));
        const totalPrice = randomdataPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        setData(randomdata)
        SetTotalPrice(totalPrice)
    }, [AllProducts]);

    // console.log(randomdata)



    const [selectedSizes, setSelectedSizes] = useState({});

    const handleOptionClick = (event, productId) => {
        event.preventDefault()
        const newSize = event.target.value;
        setSelectedSizes(prevSizes => ({
            ...prevSizes,
            [productId]: newSize
        }));
    };

    const [selectedData, setSelectedData] = useState([])

    const handleCheckBox = (productId) => {
        const filter = AllProducts.find(item => item._id === productId);
        const ProductHeightQuantity = getProductHeightQuantity(selectedSizes[productId], filter);

        const existingProduct = selectedData.find(item => item.ProductId === productId);

        if (!existingProduct) {
            const selectedProductInfo = {
                ...(user?.email && { customerEmail: user.email }),
                ...(user?.displayName && { customerName: user.displayName }),
                ProductName: filter.title,
                ProductImage: filter.images[0],
                ProductPrice: filter.price,
                ProductSize: selectedSizes[productId],
                ProductQuantity: 1,
                ProductId: filter._id,
                ProductHeightQuantity: ProductHeightQuantity
            };

            setSelectedData(prevData => [...prevData, selectedProductInfo]);
        } else {
            setSelectedData(prevData => prevData.filter(item => item.ProductId !== productId));
        }
    };

    const getProductHeightQuantity = (activeSize, filter) => {
        switch (activeSize) {
            case "S":
                return filter.Squantity;
            case "M":
                return filter.Mquantity;
            case "L":
                return filter.Lquantity;
            case "XL":
                return filter.XLquantity;
            case "XXL":
                return filter.XXLquantity;
            case "XXXL":
                return filter.XXXLquantity;
            default:
                return null; // Handle the case where activeSize is not one of the expected values
        }
    };





    // console.log('selectedData',selectedData)
    // console.log('localCartData',localCartData);


    const handleAddCart = () => {

        const updatedCartData = [...localCartData, ...selectedData];
        setLocalCartData(updatedCartData);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <div className="bg-[#f1f0eb] flex flex-col justify-center gap-12 w-full h-[627px] items-center px-16">
            <div className="text-center text-3xl [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-[#1c1c1c]">
                Frequently Bought Together
            </div>
            <div className="self-stretch flex flex-row ml-1 gap-3 items-start">

                <div className="flex flex-col mr-6 gap-4  w-2/5">
                    <div className="flex flex-row gap-3 items-center justify-between mb-3 ml-0">
                        {
                            randomdata && randomdata.map((item, index) => (
                                <React.Fragment key={item._id}>
                                    {item.images && item.images[0] && (
                                        <img
                                            src={`http://localhost:5000/uploads/${item.images[0]}`}
                                            className="mr-0 w-[194px] h-[188px]"
                                        />
                                    )}
                                    <div className=' '>
                                        {index !== randomdata.length - 1 && (
                                            <FontAwesomeIcon icon={faPlus} style={{ color: "#525252" }} />
                                        )}
                                    </div>
                                </React.Fragment>
                            ))
                        }


                    </div>
                    {/*  */}
                    <div className=' flex flex-col items-end gap-4'>
                        <div className="border-solid flex flex-row justify-between w-[435px] h-20 shrink-0 items-center px-5 border-[#0000008C] border-2 rounded-lg">
                            <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-[#3d3d3d]">
                                Total
                            </div>
                            <div
                                id="BDT3"
                                className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-[#3d3d3d]"
                            >
                                BDT {totalPrice}
                            </div>
                        </div>
                        <div className="bg-[#1c2e37] flex flex-col justify-center w-[435px] h-20 shrink-0 items-center rounded-lg">
                            <button onClick={handleAddCart} className="text-base [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold tracking-[0.17] leading-[20.8px] text-white">
                                Add Selected to Cart
                            </button>
                        </div>
                    </div>
                </div>


                <div className="divider divider-horizontal"></div>

                <div className="self-center flex flex-col justify-between gap-8 w-3/5">
                    {
                        randomdata && randomdata.map(item =>
                            <div key={item._id} className="border-solid border-[rgba(25,_30,_27,_0.14)] flex flex-row justify-between items-center px-4 border-2 rounded-lg">
                                <div className="bg-[#0000000F] flex flex-col justify-center pl-8 w-1/2 h-20 items-baseline my-3 rounded-lg">
                                    <div className="text-lg  [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#3d3d3d]">
                                        {item.title} | {item.category}
                                    </div>
                                </div>
                                <div className="bg-[#0000000F] flex flex-row justify-center gap-8 h-20 items-center pl-8 pr-6 py-8 rounded-lg">
                                    <select
                                        // value={selectedOption}  // Set the selected value based on the state
                                        onChange={(event) => handleOptionClick(event, item._id)}

                                        value={selectedSizes[item._id] || ''}
                                        className="select select-bordered w-full bg-[#E3E2DD] border-none outline-none hover:outline-none hover:border-none focus:outline-none focus:border-none text-lg  [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#3d3d3d]">
                                        <option disabled selected>Pick ONe</option>
                                        {
                                            parseInt(item.Squantity) > 0 ? (
                                                <option value="S">S</option>
                                            ) : null
                                        }
                                        {
                                            parseInt(item.Mquantity) > 0 ? (
                                                <option value="M">M</option>
                                            ) : null
                                        }
                                        {
                                            parseInt(item.Lquantity) > 0 ? (
                                                <option value="L">L</option>
                                            ) : null
                                        }
                                        {
                                            parseInt(item.XLquantity) > 0 ? (
                                                <option value="XL">XL</option>
                                            ) : null
                                        }
                                        {
                                            parseInt(item.XXLquantity) > 0 ? (
                                                <option value="2XL">2XL</option>
                                            ) : null
                                        }
                                        {
                                            parseInt(item.XXXLquantity) > 0 ? (
                                                <option value="3XL">3XL</option>
                                            ) : null
                                        }

                                    </select>
                                </div>
                                <div className="bg-[#0000000F] flex flex-col justify-center pl-8 h-20 items-start rounded-lg">
                                    <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#3d3d3d] mr-20">
                                        BDT {item.price}
                                    </div>
                                </div>
                                <input onClick={() => handleCheckBox(item._id)} type="checkbox" className="checkbox checkbox-[#000000] border-[2px] border-[#000000]" />
                            </div>
                        )
                    }


                </div>
            </div>
        </div>

    );
};

export default FrequentkyBought;