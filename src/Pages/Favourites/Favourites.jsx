import React, { useContext, useEffect, useState } from 'react';
import CategoryShow from '../Home/CategoryShow/CategoryShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Provider/AuthProvider';
import top_bg from '../../../public/photos/topBG2.png'
import ColourChanges from '../../Shared/ColourChanges/ColourChanges';
import { Link } from 'react-router-dom';

const Favourites = () => {
    const { favouriteData, setFavouriteData, AllProducts , there, doller ,selectedCurrencyValue} = useContext(AuthContext);



    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');
    const [showFavouriteData, setShowFavouriteData] = useState([]);

    useEffect(() => {
        // Load favouriteData from localStorage if it's empty
        if (favouriteData.length === 0) {
            const favourites = JSON.parse(localStorage.getItem('favourite')) || [];
            setFavouriteData(favourites);
        }

        // Filter AllProducts based on favouriteData
        setShowFavouriteData(AllProducts.filter(item => favouriteData.includes(item._id)));
    }, [AllProducts, favouriteData, setFavouriteData]);

    console.log(favouriteData)
    const handlefavourite = (id) => {
        let favourites = [...favouriteData]; // Make a copy of favouriteData

        const index = favourites.indexOf(id);

        if (index !== -1) {
            // If already in favourites, remove it
            favourites.splice(index, 1);
        } else {
            // If not in favourites, add it
            favourites.push(id);
        }

        localStorage.setItem('favourite', JSON.stringify(favourites));

        setFavouriteData(favourites);
    }


    return (
        <div className=" mb-20  ">
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

                <div className="divider w-full mb-10"></div>
                <div className=" pl-5 grid grid-cols-4 gap-16">
                    {
                        showFavouriteData.map(item =>
                            <div key={item._id} className=' w-[431px] h-fit '>
                                {/* <Link to={`/product/${item._id}`}> */}
                                <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                        src={`https://taharz.onrender.com/uploads/${item.images[0]}`}
                                        alt="" />

                                    <div>
                                        {
                                            item.Clearance === 'Sale' && (
                                                <div
                                                    className="absolute top-3 left-3 bg-[rgba(255,_75,_64,_0.71)] flex flex-col justify-center w-20 h-8 items-center rounded-[63.22041702270508px]"
                                                >
                                                    <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                        {`${item?.sellpercet}% Off`}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {/* </Link> */}
                                <Link to={`/product/${item._id}`}>
                                    <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">

                                        <h1 className={`  ${there === 'light' ? 'text-black' : 'text-white'}  h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]`}>{item.title} | {item.category}
                                        </h1>

                                        <p className={` ${there === 'light' ? 'text-black' : 'text-[#DBC896]'}  text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]`}>

                                            {selectedCurrencyValue === 'BDT' ? (item.Clearance === 'Sale' ? (
                                                <>
                                                    <span className={`line-through  text-[#828282] `}>Tk.{parseInt(item.price).toFixed(2)}</span> Tk.{((parseInt(item.price) - (parseInt(item.price) * (parseInt(item?.sellpercet) / 100)))).toFixed(2)}
                                                </>
                                            ) : (
                                                `Tk.${item.price}`
                                            )) : (item.Clearance === 'Sale' ? (
                                                <>
                                                    <span className="line-through text-[#828282]">${parseFloat(item.price * 2.5 * doller).toFixed(2)}</span>
                                                    $ {(((parseInt(item.price) * 2.5 * doller) - ((parseInt(item.price) * 2.5 * doller) * (parseInt(item?.sellpercet)) / 100))).toFixed(2)}
                                                </>
                                            ) : (
                                                `$${item.price * 2.5 * doller}`
                                            ))}

                                        </p>


                                        {/* colour */}
                                        <ColourChanges key={item._id} there={there} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                        <div className=" flex gap-2">
                                            {
                                                parseInt(item.Squantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >S</button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        S
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />

                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Mquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >M</button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        M
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Lquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >L</button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        L
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >XL</button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        XL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >
                                                        XXL
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        XXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXXLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center ${there === 'light' ? 'text-[#5A5A5A] bg-[#ebebeb] ' : 'text-black bg-[#DBC896] border-[#DBC896]'}  
                                                `} >XXXL</button>
                                                ) : (
                                                    <button
                                                        className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center  ${there === 'light' ? 'bg-[#ebebeb] text-[#5A5A5A]' : 'bg-[#DBC896] text-black border-[#DBC896]'} relative`}
                                                        disabled
                                                    >
                                                        XXXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default Favourites;