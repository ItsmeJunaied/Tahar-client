import CatShowSliders from './CatShowSliders/CatShowSliders';
import './ShopByCategory.css';
import sizeChart from '../../../../public/photos/size chart.png';
import { Link } from 'react-router-dom';
const ShopByCategory = () => {
    return (
        <div>
            <h1 className=' text-center font-bold text-[28px] mt-[47px]'>Shop by Categories</h1>
            <div className=' flex flex-row justify-between items-center'>
                <div className='hidden lg:flex gap-3 text-[18px] text-[#7D7D7D]'>
                    <button>Punjabis</button>
                    <button>Modal</button>
                    <button>Muslin</button>
                    <button>Cotton</button>
                    <button>Georgette</button>
                </div>
                <div className=' flex flex-row gap-2'>
                    <div>
                        <button
                            className=' w-[126px] h-[47px] border-[2px] border-[#1C2E37] rounded-full'
                            onClick={() => document.getElementById('my_modal_5').showModal()}
                        >Size Chart</button>

                        <dialog id="my_modal_5" className="modal  ">
                            <div className="modal-box w-11/12 max-w-5xl bg-transparent shadow-none">
                                <img className=' w-[900px] h-[800px]' src={sizeChart} alt="" />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 shadow-lg shadow-gray-500">✕</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <select className="select w-[126px] h-[43px] border-[2px] border-[#1C2E37] rounded-full">
                        <option disabled selected>Filter</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
                    </select>
                    <Link to='/viewAll' className='w-[126px] h-[47px] bg-[#1C2E37] p-3 text-white rounded-full'>View All</Link>
                </div>
            </div>
            <div className="divider w-full"></div>


            {/* another section */}
            <CatShowSliders></CatShowSliders>
        </div>
    );
};

export default ShopByCategory;