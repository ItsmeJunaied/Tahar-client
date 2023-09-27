import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sale.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ColourChanges from '../../Shared/ColourChanges/ColourChanges';
import CategoryShow from '../Home/CategoryShow/CategoryShow';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import sizeChart from '../../../public/photos/size chart.png';
import top_bg from '../../../public/photos/topBG2.png'
import { Link } from 'react-router-dom';
import Filter from '../../Shared/Filter/Filter';

const Sale = () => {
    const { AllProducts } = useContext(AuthContext);

    const ShopSale = AllProducts.filter(item => item.Clearance === 'Sale');
    // console.log(ShopWomen)

    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');

    // console.log(anotherState);
    return (
        <div className=' mb-20'>
            <div className="relative overflow-hidden h-96 flex items-center justify-center">
                <img className="w-full h-[479]" src={top_bg} alt="" />
                <div className="absolute bottom-0 top-36 p-4 class-header text-center w-full">
                    <p className="text-white  font-bold mb-4 font-sans text-5xl">Collections</p>
                    <p className="text-[#DBC896] text-3xl font-bold">for all your celebrations!</p>
                </div>
            </div>
            <div className=' mx-[70px] mt-10'>
                <p className="text-black text-center mb-10 font-bold  font-sans text-5xl">Collections</p>
                <div className="divider"></div>
                <CategoryShow></CategoryShow>

                <Filter></Filter>

                <div className="divider w-full mb-10"></div>
                <div className=" pl-5 grid grid-cols-4 gap-16">
                    {
                        ShopSale?.map(item =>
                            <div key={item._id} className=' w-[431px] h-fit[600px] '>
                                <Link to={`/product/${item._id}`}>
                                    <img
                                        className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                        src={`http://localhost:5000/uploads/${item.images[0]}`}
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
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default Sale;