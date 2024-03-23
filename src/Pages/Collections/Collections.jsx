import { useContext, useEffect, useState } from 'react';

import top_bg from '../../../public/photos/topBG2.png'
import { AuthContext } from '../../Provider/AuthProvider';
import CategoryShow from '../Home/CategoryShow/CategoryShow';
import sizeChart from '../../../public/photos/size chart.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSlash, faTimes, faX } from '@fortawesome/free-solid-svg-icons';
import ColourChanges from '../../Shared/ColourChanges/ColourChanges';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Filter from '../../Shared/Filter/Filter';
import CollectionFilter from './CollectionFilter';
const Collections = () => {
    const { AllProducts, categoryName, favouriteData, setFavouriteData } = useContext(AuthContext);
    const { category } = useParams();
    const [activeFabric, setActiveFabric] = useState('');

    console.log(categoryName)
    console.log(AllProducts)
    const categoryTitle = categoryName.find(item => item._id === category);
    const categoryWisedata = AllProducts.filter(item => item.category === categoryTitle?.title);

    console.log(categoryWisedata)
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');

    const handlefavourite = (id) => {
        let favourites = JSON.parse(localStorage.getItem('favourite')) || [];

        const index = favourites.indexOf(id);

        if (index !== -1) {
            // If already in favourites, remove it
            favourites.splice(index, 1);
        } else {
            // If not in favourites, add it
            favourites.push(id);
        }

        localStorage.setItem('favourite', JSON.stringify(favourites));

        setFavouriteData(favourites)
    }

    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem('favourite'));
        setFavouriteData(retrievedData);
    }, [setFavouriteData])
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
                <p className="text-black dark:text-white text-center mb-10 font-bold  font-sans text-5xl">Collections</p>
                <div className="divider"></div>
                <CategoryShow></CategoryShow>

                {/* <Filter  ></Filter> */}
                <CollectionFilter categoryWisedata={categoryWisedata} activeFabric={activeFabric} setActiveFabric={setActiveFabric}></CollectionFilter>

                <div className="divider w-full mb-10"></div>
                <div className=" pl-5 grid grid-cols-4 gap-16">

                    {categoryWisedata.length === 0 ? (
                        <div className="w-full h-fit text-center">
                            <p className="text-black text-center font-bold [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-2xl ">Products Coming Soon</p>
                        </div>
                    ) : (

                        activeFabric === '' ? (
                            categoryWisedata && categoryWisedata.map(item =>
                                <div key={item._id} className=' w-[431px] h-fit '>
                                    {/* <Link to={`/product/${item._id}`}> */}
                                    <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                            src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${item.images[0]}`}
                                            alt="" />
                                        <button onClick={() => handlefavourite(item._id)} style={{ position: 'absolute', top: 13, right: 8 }}>
                                            <div
                                                id="MdiheartoutlineRoot"
                                                className="overflow-hidden bg-[rgba(28,_46,_55,_0.61)] flex flex-row justify-center gap-2 w-20 h-8 items-center rounded-[104px]"
                                            >
                                                <FontAwesomeIcon className=' text-white ' icon={faHeart} />
                                                <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                    {JSON.parse(localStorage.getItem('favourite'))?.includes(item._id) ? 'Liked' : 'Like'}
                                                </div>
                                            </div>
                                        </button>
                                        <button>
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
                                        </button>
                                    </div>
                                    {/* </Link> */}

                                    <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                        <Link to={`/product/${item._id}`}><h1 className=" text-[#474747] h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]">{item.title} | {item.category}</h1></Link>
                                        <p className=" text-[#828282]  text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">${item.price}</p>


                                        {/* colour */}
                                        <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                        <div className=" flex gap-2">
                                            {
                                                parseInt(item.Squantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`}
                                                        onClick={() => {
                                                            setActiveSize('S');
                                                            setActiveID(item._id);
                                                        }}
                                                    >S</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('M');
                                                            setActiveID(item._id);
                                                        }}>M</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('L');
                                                            setActiveID(item._id);
                                                        }}>L</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XL');
                                                            setActiveID(item._id);
                                                        }}>XL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXL');
                                                            setActiveID(item._id);
                                                        }}>XXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXXL');
                                                            setActiveID(item._id);
                                                        }}>XXXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                </div>
                            )
                        ) : (

                            categoryWisedata &&
                            categoryWisedata.filter((item) => item.fabrics === activeFabric).map((item) => (

                                <div key={item._id} className=' w-[431px] h-fit '>
                                    {/* <Link to={`/product/${item._id}`}> */}
                                    <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                            src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${item.images[0]}`}
                                            alt="" />
                                        <button onClick={() => handlefavourite(item._id)} style={{ position: 'absolute', top: 13, right: 8 }}>
                                            <div
                                                id="MdiheartoutlineRoot"
                                                className="overflow-hidden bg-[rgba(28,_46,_55,_0.61)] flex flex-row justify-center gap-2 w-20 h-8 items-center rounded-[104px]"
                                            >
                                                <FontAwesomeIcon className=' text-white ' icon={faHeart} />
                                                <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                    {JSON.parse(localStorage.getItem('favourite'))?.includes(item._id) ? 'Liked' : 'Like'}
                                                </div>
                                            </div>
                                        </button>
                                        <button>
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
                                        </button>
                                    </div>
                                    {/* </Link> */}

                                    <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                        <Link to={`/product/${item._id}`}><h1 className=" text-[#474747] h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]">{item.title} | {item.category}</h1></Link>
                                        <p className=" text-[#828282]  text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">${item.price}</p>


                                        {/* colour */}
                                        <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                        <div className=" flex gap-2">
                                            {
                                                parseInt(item.Squantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`}
                                                        onClick={() => {
                                                            setActiveSize('S');
                                                            setActiveID(item._id);
                                                        }}
                                                    >S</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('M');
                                                            setActiveID(item._id);
                                                        }}>M</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('L');
                                                            setActiveID(item._id);
                                                        }}>L</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XL');
                                                            setActiveID(item._id);
                                                        }}>XL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXL');
                                                            setActiveID(item._id);
                                                        }}>XXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXXL');
                                                            setActiveID(item._id);
                                                        }}>XXXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
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
                                </div>
                            ))
                        )
                    )}



                </div>
            </div>
        </div>

    );
};

export default Collections;