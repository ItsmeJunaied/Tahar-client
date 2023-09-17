import React, { useContext, useState } from 'react';
import './Cart.css';
import { AuthContext } from '../../Provider/AuthProvider';
import IncreaseButtonCart from '../IncreaseButtonCart/IncreaseButtonCart';
const Cart = () => {
    const { user, AllcartData, setAllCartData } = useContext(AuthContext);


    const ParticularUserdata = AllcartData.filter(item => item.customerEmail === user?.email);

    console.log(AllcartData);
    console.log(ParticularUserdata);
    const handleQuantityChange = (itemId, newQuantity) => {

        const updatedData = AllcartData.map(item => {
            if (item._id === itemId) {
                return { ...item, ProductQuantity: newQuantity };
            }
            return item;
        });

        // Update the state with the new data
        setAllCartData(updatedData);
    };

    const [selectedOption, setSelectedOption] = useState('Inside Dhaka - Tk. 80');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(e.target.value);
    }

    let total = 0;
    let quantity = 0;

    for (const product of ParticularUserdata) {
        quantity = quantity + product.ProductQuantity;
        total = total + product.ProductPrice * product.ProductQuantity;
    }

    let shippingCost = 0;

    if (selectedOption === 'Inside Dhaka - Tk. 80') {
        shippingCost = 80;
    } else {
        shippingCost = 120;
    }

    let totalWithShipping = total + shippingCost;
    let totalWithVat = totalWithShipping * 1.05; // Including 5% VAT

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-20">
                <div className="flex shadow-md ">
                    <div className="w-3/4 bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>

                            <h2 className="font-semibold text-2xl">Total Items-{ParticularUserdata.length}</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                            <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                        </div>
                        {
                            ParticularUserdata.map(item =>
                                <div key={item._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <div className="flex w-2/5">
                                        <div className="w-20">
                                            <img className="h-24" src={`https://tahar-server.vercel.app/uploads/${item.ProductImage}`} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{item.ProductName}</span>
                                            <span className="text-red-500 text-xs">Size - {item.ProductSize}</span>
                                            <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                                        </div>
                                    </div>

                                    <IncreaseButtonCart key={item._id}
                                        item={item}
                                        onQuantityChange={handleQuantityChange}>

                                    </IncreaseButtonCart>

                                    <span className="text-center w-1/5 font-semibold text-sm">Tk.  {item.ProductPrice}</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">
                                        Tk. {parseInt(item.ProductPrice) * parseInt(item.ProductQuantity)}
                                    </span>
                                </div>
                            )
                        }


                        <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                            Continue Shopping
                        </a>
                    </div>
                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {ParticularUserdata.length}</span>
                            <span className="font-semibold text-sm">Tk. {total}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select
                                value={selectedOption}
                                onChange={handleChange}
                                className="block p-2 text-gray-600 w-full text-sm">
                                <option>Inside Dhaka - Tk. 80</option>
                                <option>Outside Dhaka - Tk. 120</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Vat</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>5% Vat</option>
                            </select>
                        </div>
                        <div className="py-10">
                            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>Tk. {totalWithVat.toFixed(2)}</span>
                            </div>
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Cart;