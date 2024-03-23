import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const CartCalculation = ({ item, onQuantityChange, selectedCurrencyValue, doller }) => {
    // console.log(item)
    const [quantity, setQuantity] = useState(parseInt(item.ProductQuantity));

    const handleDecrement = (id) => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(id, newQuantity);
            console.log(id, newQuantity)
        }
    };

    const handleIncrement = (id) => {
        if (quantity < parseInt(item.ProductHeightQuantity)) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange(id, newQuantity);
            console.log(newQuantity)
        }
    };
    return (
        <div>
            <div className=' flex flex-row gap-5'>
                <div>
                    <img className=' w-[100px] h-[100px]'
                        src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${item.ProductImage}`}
                        alt="" />
                </div>
                <div>
                    <h1 className=' text-[#474747] text-[17px]'>{item.ProductName}</h1>
                    <div className=' flex flex-row align-middle items-center gap-2'>
                        <div>
                            <p className='text-[#474747] text-[17px]'>Color - </p>
                        </div>
                        <div className="w-5 h-5 mt-2 rounded-full" style={{ backgroundColor: item?.selectedColor }}></div>
                    </div>
                    <div className=' flex justify-between mt-2'>
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
                        {/* <p className='text-[#828282] text-[13px] mt-2'>BDT {item.ProductPrice}</p> */}
                        <p className='text-[#828282] text-[13px] '>Size {item.ProductSize}</p>
                    </div>
                    <div className='flex flex-row justify-evenly align-middle items-center w-[142px] h-[39px] mt-2 border-[2px] border-[#191E1B2B] text-[17px]'>
                        <button onClick={() => handleDecrement(item.ProductId)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <button>{quantity}</button>
                        <button onClick={() => handleIncrement(item.ProductId)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCalculation;