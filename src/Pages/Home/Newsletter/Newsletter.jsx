import './Newsletter.css';

const Newsletter = () => {
    return (
        <div className='Newsletter h-full flex flex-col justify-center items-center'>
            <h1 className='text-[#DBC896] text-[28px] text-center max-w-[750px] px-4'>Subscribe to our newsletter to get the latest updates on our new apparel and clothing!</h1>
            <div className='flex flex-col md:flex-row gap-4 mt-2'>
                <input type="text" placeholder="Type your email address" className="input input-bordered w-full md:w-[467px] h-[75px] bg-transparent text-[#717171] border-[3px] border-[#3A3A3A]" />
                <button className='w-full md:w-[207px] h-[75px] rounded-[9px] bg-[#DBC896] text-[#000000] text-[19px] font-semibold mt-4 md:mt-0'>Submit</button>
            </div>
        </div>
    );

};

export default Newsletter;