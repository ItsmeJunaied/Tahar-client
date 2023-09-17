import { useContext, useState } from 'react';
import './Collections.css';
import top_bg from '../../../public/photos/topBG2.png'
import { AuthContext } from '../../Provider/AuthProvider';
import CategoryShow from '../Home/CategoryShow/CategoryShow';
import sizeChart from '../../../public/photos/size chart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faX } from '@fortawesome/free-solid-svg-icons';
import ColourChanges from '../../Shared/ColourChanges/ColourChanges';
import { Link, useLoaderData, useParams } from 'react-router-dom';
const Collections = () => {
    const { AllProducts, categoryName } = useContext(AuthContext);
    const { category } = useParams();



    const categoryTitle = categoryName.find(item => item._id === category);

    const categoryWisedata = AllProducts.filter(item => item.category === categoryTitle?.title);

    console.log(categoryWisedata)
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');

    // console.log(anotherState);
    return (
        <div className=' mb-20'>
            <div className="relative overflow-hidden h-96 flex items-center justify-center">
                <img className="w-full h-[479]" src={top_bg} alt="" />
                <div className="absolute bottom-0 top-36 p-4 class-header text-center w-full">
                    {
                        categoryWisedata.map(item =>
                            <p key={item._id} className="text-white  font-bold mb-4 font-sans text-5xl uppercase">
                                {item.category} Collection
                            </p>

                        )
                    }
                    <p className="text-[#DBC896] text-3xl font-bold uppercase">for all your celebrations!</p>
                </div>
            </div>
            <div className=' mx-[70px] mt-10'>
                <p className="text-black text-center mb-10 font-bold  font-sans text-5xl">Collections</p>
                <div className="divider"></div>
                <CategoryShow></CategoryShow>
                <div className=' flex flex-row justify-between items-center mt-20'>
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
                                onClick={() => document.getElementById('my_modal_6').showModal()}
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
                        <button className='w-[126px] h-[47px] bg-[#1C2E37] text-white rounded-full'>View All</button>
                    </div>
                </div>
                <div className="divider w-full mb-10"></div>
                <div className=" pl-5 grid grid-cols-4 gap-16">
                    {
                        categoryWisedata.map(item =>
                            <div key={item._id} >
                                <div className=' w-[431px] h-fit[600px] '>
                                    <Link to={`/product/${item._id}`}>
                                        <img
                                            className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                            src={`https://tahar-server.vercel.app/uploads/${item.images[0]}`}
                                            alt=""
                                        />
                                    </Link>

                                    <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                        <h1 className=" text-[#474747] h-16 text-[19px] uppercase text-xl text-center">{item.title} | {item.category}</h1>
                                        <p className=" text-[#828282]  text-[19px]">${item.price}</p>


                                        {/* colour */}
                                        <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                        <div className=" flex gap-2">
                                            {
                                                parseInt(item.Squantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black"
                                                        onClick={() => {
                                                            setActiveSize('S');
                                                            setActiveID(item._id);
                                                        }}
                                                    >S</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        S
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Mquantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                        setActiveSize('M');
                                                        setActiveID(item._id);
                                                    }}>M</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        M
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Lquantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                        setActiveSize('L');
                                                        setActiveID(item._id);
                                                    }}>L</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        L
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XLquantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                        setActiveSize('XL');
                                                        setActiveID(item._id);
                                                    }}>XL</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXLquantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                        setActiveSize('XXL');
                                                        setActiveID(item._id);
                                                    }}>XXL</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXXLquantity) > 0 ? (
                                                    <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                        setActiveSize('XXXL');
                                                        setActiveID(item._id);
                                                    }}>XXXL</button>
                                                ) : (
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XXXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faTimes} size="2x" />
                                                        </div>
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default Collections;