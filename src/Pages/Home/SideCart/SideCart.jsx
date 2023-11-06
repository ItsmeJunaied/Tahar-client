import './SideCart.css';
import bagIMG from '../../../../public/photos/Shopping_bag.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import CartCalculation from '../CartCalculation/CartCalculation';
import { Link } from 'react-router-dom';
import cart from '../../../../public/photos/cart.png';
const SideCart = ({ localCartData, setLocalCartData, selectedCurrencyValue, doller }) => {

    // console.log(localCartData.length)

    const { user, AllcartData, setAllCartData } = useContext(AuthContext);
    const [accespted, setAccepted] = useState(false);





    const handleQuantityChange = (itemId, newQuantity) => {
        // console.log('itemId', itemId)
        const updatedData = localCartData.map(item => {
            if (item.ProductId === itemId) {
                return { ...item, ProductQuantity: newQuantity };
            }
            return item;
        });

        // Update the state with the new data
        setLocalCartData(updatedData);
        localStorage.setItem('cartData', JSON.stringify(updatedData));
    };


    let total = 0;
    let shipping = 0;
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


    const handleTerms = (event) => {
        setAccepted(event.target.checked)
    }

    return (
        <div>
            <div className="drawer drawer-end w-[150px] relative z-50 ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn h-10 hover:bg-[#DBC896] border-none bg-[#DBC896] outline-none">
                        <div className="flex items-center "> {/* Wrap content in a flex container */}
                            <img className='mr-2' src={bagIMG} alt="" /> {/* Add margin-right to the image */}
                            <div className='hidden lg:flex'>
                                <h1 className='#1C2E37 text-white dark:text-black'>My Cart</h1>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="drawer-side  z-50 fixed">
                    <label htmlFor="my-drawer-4" className="drawer-overlay fixed "></label>
                    <ul className="menu p-4  fixed df bg-[#f9f2ea] text-base-content  w-80 md:w-[430px]">
                        <h1 className=' text-[20px] font-bold uppercase'>Shopping Cart</h1>
                        <div className="divider"></div>
                        <div className=' flex flex-col gap-10'>

                            {
                                localCartData && localCartData.length > 0 ? (
                                    localCartData.map((item, index) =>
                                        <CartCalculation
                                            selectedCurrencyValue={selectedCurrencyValue}
                                            doller={doller}
                                            key={index}
                                            item={item}
                                            setAllCartData={setAllCartData}
                                            onQuantityChange={handleQuantityChange}
                                        ></CartCalculation>
                                    )
                                ) : (
                                    <div>
                                        <img src={cart} alt="" />
                                    </div>
                                )
                            }


                        </div>

                        <div className="divider mb-2 mt-2"></div>

                        <div className=' w-1/2 flex justify-between align-middle items-center mb-3'>
                            <h1 className=' text-[20px] font-bold  uppercase'>Sub total</h1>
                            <p className='   text-[#828282] text-[20px] font-bold '>
                                {
                                    selectedCurrencyValue === 'BDT' ? `Tk.${(total).toFixed(2)}` : `$${(total).toFixed(2)}`
                                }
                            </p>
                        </div>
                        <div className="divider mb-2 mt-2"></div>
                        <div className=' flex justify-start items-center gap-2'>
                            <div>
                                <input
                                    onClick={handleTerms}
                                    type="checkbox"
                                    name="accept"
                                    className="checkbox"
                                // disabled={localCartData.length === 0 }
                                />
                            </div>
                            <div>
                                <p className='text-[#828282] text-[17px]'>I agree with terms and condition</p>
                            </div>
                        </div>
                        <Link to='/cart' disabled={!accespted} className=' btn w-[300px] md:w-[415px] h-[54px] rounded-[10px] bg-[#066EA138] border-none  text-[18px] font-semibold mt-2'>
                            View Cart
                        </Link>
                        <Link to='/checkout' disabled={!accespted} className='btn w-[300px] md:w-[415px] h-[54px] text-white rounded-[10px] bg-[#1C2E37] border-none  text-[18px] font-semibold mt-2'>
                            Check Out
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideCart;