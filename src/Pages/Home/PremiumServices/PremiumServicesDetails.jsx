import React from 'react';
import PremiumServices1 from '../../../../public/photos/fabrics.png'
import PremiumServices2 from '../../../../public/photos/delivery.png'
import PremiumServices3 from '../../../../public/photos/customer.png'
import PremiumServices4 from '../../../../public/photos/shipping.png'
import PremiumServices5 from '../../../../public/photos/orderTrack.png'
const PremiumServicesDetails = () => {
    return (
        <div>
            <div className='grid md:grid-cols-3 lg:grid-cols-5 border-[3px] mt-20 w-[800px] h-[196px] rounded-[15px] mx-auto my-auto'>
            <div className=' flex flex-col justify-center items-center '>
                <img src={PremiumServices1} alt="" />
                <p>Fabrics</p>
            </div>
            <div className=' flex flex-col justify-center items-center '>
                <img src={PremiumServices2} alt="" />
                <p>Fabrics</p>
            </div>
            <div className=' flex flex-col justify-center items-center '>
                <img src={PremiumServices3} alt="" />
                <p>Fabrics</p>
            </div>
            <div className=' flex flex-col justify-center items-center '>
                <img src={PremiumServices4} alt="" />
                <p>Fabrics</p>
            </div>
            <div className=' flex flex-col justify-center items-center '>
                <img src={PremiumServices5} alt="" />
                <p>Fabrics</p>
            </div>
        </div>
        </div>
    );
};

export default PremiumServicesDetails;