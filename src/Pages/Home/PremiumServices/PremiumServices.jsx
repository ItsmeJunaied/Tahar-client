import './PremiumServices';
import PremiumServices1 from '../../../../public/photos/fabrics.png'
import PremiumServices2 from '../../../../public/photos/delivery.png'
import PremiumServices3 from '../../../../public/photos/customer.png'
import PremiumServices4 from '../../../../public/photos/shipping.png'
import PremiumServices5 from '../../../../public/photos/orderTrack.png'
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const PremiumServices = () => {
    const { there } = useContext(AuthContext);
    return (
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${there === 'light' ? 'border-[#C7C7C7]' : 'border-[#565656]'} border-[3px] mt-20 w-full max-w-[900px] mx-auto my-auto rounded-[15px]`}>
            <div className='flex flex-col justify-center items-center p-5'>
                <img className='w-fit h-fit' src={PremiumServices1} alt="" />
                <p className={`${there === 'light' ? 'text-[#878787]' : 'text-[#9a8f70]'} font-Helvetica_Now_Display-Medium text-center mt-5 text-[16.87px]`}>High End Fabrics</p>
            </div>
            <div className='flex flex-col justify-center items-center p-5'>
                <img className='w-fit h-fit' src={PremiumServices2} alt="" />
                <p className={`${there === 'light' ? 'text-[#878787]' : 'text-[#9a8f70]'} font-Helvetica_Now_Display-Medium text-center mt-5 text-[16.87px]`}>Cash on Delivery</p>
            </div>
            <div className='flex flex-col justify-center items-center p-5'>
                <img className='w-fit h-fit' src={PremiumServices3} alt="" />
                <p className={`${there === 'light' ? 'text-[#878787]' : 'text-[#9a8f70]'} font-Helvetica_Now_Display-Medium text-center mt-5 text-[16.87px]`}>5,000+ Happy Customers</p>
            </div>
            <div className='flex flex-col justify-center items-center p-5'>
                <img className='w-fit h-fit' src={PremiumServices4} alt="" />
                <p className={`${there === 'light' ? 'text-[#878787]' : 'text-[#9a8f70]'} font-Helvetica_Now_Display-Medium text-center mt-5 text-[16.87px]`}>Worldwide Shipping</p>
            </div>
            <div className='flex flex-col justify-center items-center p-5'>
                <img className='w-fit h-fit' src={PremiumServices5} alt="" />
                <p className={`${there === 'light' ? 'text-[#878787]' : 'text-[#9a8f70]'} font-Helvetica_Now_Display-Medium text-center mt-5 text-[16.87px]`}>Order Tracking System</p>
            </div>
        </div>

    );
};

export default PremiumServices;