import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const CartCalculation = ({ item ,setAllCartData, onQuantityChange }) => {
    // console.log(item._id)
    const [quantity, setQuantity] = useState(parseInt(item.ProductQuantity));

    const handleDecrement = (id) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange( id,newQuantity);
            console.log(newQuantity)
            // Send PATCH request to update ProductQuantity
            fetch(`https://tahar-server.vercel.app/userCartData/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ProductQuantity: newQuantity
                })
            })
                .then(res => res.json())
                .then(responseData => {
                    console.log(responseData);
                });
        }
    };

    const handleIncrement = (id) => {
        if (quantity < parseInt(item.ProductHeightQuantity)) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange( id, newQuantity);
            console.log(newQuantity)
            // Send PATCH request to update ProductQuantity
            fetch(`https://tahar-server.vercel.app/userCartData/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ProductQuantity: newQuantity })
            })
                .then(res => res.json())
                .then(responseData => {
                    console.log(responseData);
                });
        }
    };
    return (
        <div>
            <div className=' flex flex-row gap-5'>
                <div>
                    <img className=' w-[100px] h-[100px]'
                        src={`https://tahar-server.vercel.app/uploads/${item.ProductImage}`}
                        alt="" />
                </div>
                <div>
                    <h1 className=' text-[#474747] text-[17px]'>{item.ProductName}</h1>
                    <div className=' flex justify-between'>
                        <p className='text-[#828282] text-[13px] mt-2'>BDT {item.ProductPrice}</p>
                        <p className='text-[#828282] text-[13px] mt-2'>Size {item.ProductSize}</p>
                    </div>
                    <div className='flex flex-row justify-evenly align-middle items-center w-[142px] h-[39px] mt-2 border-[2px] border-[#191E1B2B] text-[17px]'>
                        <button onClick={()=>handleDecrement(item._id)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <button>{quantity}</button>
                        <button onClick={()=>handleIncrement(item._id)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCalculation;