import { useEffect, useState } from 'react';
import FindUsInsta from '../Home/FindUsInsta/FindUsInsta';
import './CustomerSpotlight.css';

const CustomerSpotlight = () => {
    const [customerImg, setCustomerImg] = useState([])
    useEffect(() => {
        fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/customarSpotlight')
            .then(res => res.json())
            .then(data => setCustomerImg(data))
    }, [])
    return (
        <div>
            <div className=' bg-[#F9F2EA]'>
                <h1 className=' text-[61px] font-serif text-center pt-10'>Customer Spotlight</h1>
                <div className="divider mt-20"></div>
                <div className=' mt-10 grid grid-cols-4 gap-10 pb-20 mx-[36px]'>
                    {/* <img src="" alt="" /> */}
                    {
                        customerImg.map(image =>
                            <img key={image._id}
                                className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                src={image.image}
                                alt=""
                            />
                        )
                    }
                    {/* <img
                        className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                        src={`data:image/jpeg;base64,${item.images[0]}`}
                        alt=""
                    /> */}
                </div>
            </div>
            <FindUsInsta></FindUsInsta>
        </div>
    );
};

export default CustomerSpotlight;