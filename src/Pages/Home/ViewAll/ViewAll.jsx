import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import ColourChanges from '../../../Shared/ColourChanges/ColourChanges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHeart, faSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import CategoryShow from '../CategoryShow/CategoryShow';
import Filter from '../../../Shared/Filter/Filter';

const ViewAll = () => {
    const { AllProducts, setFavouriteData } = useContext(AuthContext);

    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');
    const [activeFabric, setActiveFabric] = useState('');
    const [filteredFroduct, setFilteredProfuct] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const totalPages = Math.ceil(AllProducts.length / itemsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = AllProducts.slice(startIndex, endIndex);

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

    return (
        <div className=' mx-[100px] '>
            <CategoryShow></CategoryShow>

            <Filter activeFabric={activeFabric} setActiveFabric={setActiveFabric} AllProducts={AllProducts} setFilteredProfuct={setFilteredProfuct} ></Filter>

            <div className=' divider'></div>

            <div className="  grid grid-cols-4 gap-10">
                {
                    activeFabric === '' && filteredFroduct.length <= 0 ? (

                        productsToShow && productsToShow.map(item =>
                            <div key={item._id} >
                                <div key={item._id} className=' w-[431px] h-fit '>
                                    {/* <Link to={`/product/${item._id}`}> */}
                                    <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                            src={`https://taharz.onrender.com/uploads/${item.images[0]}`}
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
                                                    <button
                                                        className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black"
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    ) :

                        filteredFroduct.length > 0 ? (

                            filteredFroduct && filteredFroduct.map(item =>
                                <div key={item._id} >
                                    <div key={item._id} className=' w-[431px] h-fit '>
                                        {/* <Link to={`/product/${item._id}`}> */}
                                        <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                                src={`https://taharz.onrender.com/uploads/${item.images[0]}`}
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
                                                        <button
                                                            className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black"
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        ) : (productsToShow &&
                            productsToShow.filter((item) => item.fabrics === activeFabric).map((item) => (

                                <div key={item._id} >
                                    <div key={item._id} className=' w-[431px] h-fit '>
                                        {/* <Link to={`/product/${item._id}`}> */}
                                        <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                                src={`https://taharz.onrender.com/uploads/${item.images[0]}`}
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
                                                        <button
                                                            className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black"
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
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
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))
                }

            </div>
            {/* pagination */}
            <div>

                <div className=' mt-[100px] mb-[65px]'>
                    <ol className="flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00000045] text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Prev Page</span>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => setCurrentPage(number)}
                                    className={`block h-10 w-12  border  rounded-lg  text-white text-center leading-8 ${number === currentPage ? 'bg-white text-[#4f797c] border border-[#4f797c]  ' : 'bg-[#4f797c] text-white'}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#00000045] text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Next Page</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </li>
                    </ol>

                </div>
            </div>
        </div>
    );
};

export default ViewAll;