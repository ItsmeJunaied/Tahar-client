import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const IncreaseButtonCart = ({ item, onQuantityChange }) => {

    const [quantity, setQuantity] = useState(parseInt(item.ProductQuantity));

    const handleDecrement = (id) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(id, newQuantity);
            console.log(newQuantity)
            // Send PATCH request to update ProductQuantity
            fetch(`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/userCartData/${id}`, {
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
            onQuantityChange(id, newQuantity);
            console.log(newQuantity)
            // Send PATCH request to update ProductQuantity
            fetch(`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/userCartData/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ProductQuantity: newQuantity })
            })
                .then(res => res.json())
                .then(responseData => {
                    console.log(responseData);
                });
        }
    };

    return (
        <div className="flex flex-row justify-evenly align-middle items-center w-[142px] h-[39px] mt-2 border-[2px] border-[#191E1B2B] text-[17px]">
            <button onClick={() => handleDecrement(item.ProductId)}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <button>{item.ProductQuantity}</button>
            <button onClick={() => handleIncrement(item.ProductId)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default IncreaseButtonCart;