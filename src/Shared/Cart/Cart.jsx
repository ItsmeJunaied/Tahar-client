import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { AuthContext } from '../../Provider/AuthProvider';
import IncreaseButtonCart from '../IncreaseButtonCart/IncreaseButtonCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Cart = () => {
    const { user, localCartData, setLocalCartData, selectedCurrencyValue, doller } = useContext(AuthContext);



    const handleQuantityChange = (itemId, newQuantity) => {

        const updatedData = localCartData.map(item => {
            if (item.ProductId === itemId) {
                return { ...item, ProductQuantity: newQuantity };
            }
            return item;

        });

        // Update the state with the new data
        setLocalCartData(updatedData);
        localStorage.setItem('cartData', JSON.stringify(updatedData))
    };

    const [selectedOption, setSelectedOption] = useState('Inside Dhaka - Tk. 80');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(e.target.value);
    }

    let total = 0;
    let quantity = 0;

    if (localCartData) {
        for (const product of localCartData) {
            const productPrice = selectedCurrencyValue === 'BDT' ?
                (product.ProductSale === 'Sale' ? product.salePriceInBDT : product.priceInBDT) :
                (product.ProductSale === 'Sale' ? product.salePriceInUSD : product.priceInUSD);

            quantity = quantity + product.ProductQuantity;
            total = (total + productPrice * product.ProductQuantity);
        }
    }

    let shippingCost = 0;

    if (selectedOption === 'Inside Dhaka - Tk. 80') {
        shippingCost = 80;
    } else {
        shippingCost = 120;
    }

    let totalWithShipping = total + shippingCost;
    let totalWithVat = totalWithShipping * 1.05; // Including 5% VAT


    const handleRemoveItem = (id, size) => {
        const updatedCartData = localCartData.filter(item => item.ProductId !== id || item.ProductSize !== size);

        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        setLocalCartData(updatedCartData);
    }

    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto py-20 ">
                <div className="flex shadow-md rounded-3xl">
                    <div className=" w-full bg-white px-10 py-10 rounded-3xl">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>

                            <h2 className="font-semibold text-2xl">Total Items-{localCartData.length}</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/4 pl-16 text-center">Quantity</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/4 text-center">Price</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/4 pl-10 text-center">Total</h3>
                        </div>
                        {
                            localCartData.map((item, index) =>
                                <div key={index} className="flex items-center justify-between hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <div className="flex w-2/5">
                                        <div className="w-20">
                                            <img className="h-24" src={`https://tahar-server-production.up.railway.app/uploads/${item.ProductImage}`} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{item.ProductName}</span>
                                            <div className=' flex flex-row align-middle items-center gap-2'>
                                                <div>
                                                    <p className='text-[#474747] text-[17px]'>Color - </p>
                                                </div>
                                                <div className="w-5 h-5 mt-2 rounded-full" style={{ backgroundColor: item?.selectedColor }}></div>
                                            </div>
                                            <span className="text-red-500 text-xs">Size - {item.ProductSize}</span>
                                            <button
                                                onClick={() => handleRemoveItem(item.ProductId, item.ProductSize)}
                                                className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                        </div>
                                    </div>

                                    <IncreaseButtonCart key={item.ProductId} className='w-1/5'
                                        item={item}
                                        onQuantityChange={handleQuantityChange}>

                                    </IncreaseButtonCart>

                                    <span className="text-center w-1/5 font-semibold text-md">
                                        <p className=" text-[#828282] text-[13px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            <p className='text-lg font-bold'>
                                                {selectedCurrencyValue === 'BDT' ? (
                                                    item.ProductSale === 'Sale' ?
                                                        (item.salePriceInBDT && `Tk.${item.salePriceInBDT}`) :
                                                        (item.priceInBDT && `Tk.${item.priceInBDT}`)
                                                ) : (
                                                    item.ProductSale === 'Sale' ?
                                                        (item.salePriceInUSD && `$${item.salePriceInUSD}`) :
                                                        (item.priceInUSD && `$${item.priceInUSD}`)
                                                )}
                                            </p>

                                        </p>
                                    </span>


                                    {/* total price */}
                                    <span className="text-center w-1/5 font-semibold text-sm">
                                        {
                                            selectedCurrencyValue === 'BDT'? `Tk.${(total).toFixed(2)}`  : `$${(total).toFixed(2)}`
                                        }
                                        {/* Tk. {(parseInt((item.ProductPrice)) * parseInt(item.ProductQuantity)).toFixed(2)} */}
                                    </span>
                                </div>
                            )
                        }


                        <div className=' flex flex-row justify-between items-center'>
                            <Link to='/' className=' flex justify-center items-center h-[50px] w-[200px] bg-[#1C2E37] border-none rounded-[10px] text-white'>
                                <FontAwesomeIcon className='' icon={faArrowLeft} /> Continue Shopping
                            </Link>

                            <Link to='/checkout' className='flex justify-center items-center h-[50px] w-[200px] bg-[#1C2E37] border-none rounded-[10px] text-white'>
                                Check Out <FontAwesomeIcon className='' icon={faArrowRight} />
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


export default Cart;