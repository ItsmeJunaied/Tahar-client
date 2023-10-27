import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import './Searchbar.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
const Searchbar = () => {
    const { AllProducts } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isContainerVisible, setIsContainerVisible] = useState(false);

    const handleSearchClick = () => {
        setIsActive(prevState => !prevState);
        setIsContainerVisible(prevState => !prevState); 
    };

    const handleCancelClick = () => {
        setIsActive(false);
        setIsContainerVisible(false); 
        setSearchData("");
        setInputValue('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const searchBox = document.querySelector(".search-box");
    
            if (searchBox && !searchBox.contains(event.target)) {
                setIsActive(false);
                setIsContainerVisible(false);
                setSearchData("");
                setInputValue('');
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    

    const setSearchData = (data) => {
        const searchData = document.querySelector(".search-data");
        if (searchData) {
            searchData.classList.toggle("active");
            searchData.innerHTML = data;
        }
    };

    const shuffledProducts = [...AllProducts].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 4);
    return (
        <div className=' mr-5'>
            <div className={`search-box ${isActive ? 'active' : ''} relative`}>
                <input
                    type="text"
                    placeholder="Type to search.."
                    className={isActive ? 'active' : ''}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onClick={() => setIsContainerVisible(true)} // Show the container on input click
                />
                {isContainerVisible && (


                    <div className=' absolute z-50 bg-white text-black w-[800px] rounded-lg h-fit show-container mt-5'>
                        <div><h1 className=' text-lg font-semibold text-center mt-2'>Recommended For You</h1></div>
                        <div className='flex flex-row px-10 py-10 shadow-xl gap-5'>
                            {inputValue.toLowerCase() === ''
                                ? selectedProducts.map(item =>
                                    <div className=' ' key={item._id}>
                                        <Link to={`/product/${item._id}`}>

                                            <div className=' flex flex-row '>
                                                <img
                                                    className=' w-[200px] h-[250px] object-cover rounded-lg '
                                                    src={`http://localhost:5000/uploads/${item.images[0]}`} alt="" />
                                            </div>
                                            <h1 className=" mt-3 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-center">{item.title}</h1>
                                            <h1 className=" mt-3 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-center">Tk. {item.price}</h1>
                                        </Link>
                                    </div>
                                )
                                : AllProducts
                                    .filter((item) =>
                                        (inputValue.toLowerCase() === '' || item.title.toLowerCase().includes(inputValue))
                                    )
                                    .length > 0
                                    ? AllProducts
                                        .filter((item) =>
                                            (inputValue.toLowerCase() === '' || item.title.toLowerCase().includes(inputValue))
                                        )
                                        .map(item =>
                                            <div className=' ' key={item._id}>
                                                <Link to={`/product/${item._id}`}>

                                                    <div className=' flex flex-row '>
                                                        <img
                                                            className=' w-[200px] h-[250px] object-cover rounded-lg '
                                                            src={`http://localhost:5000/uploads/${item.images[0]}`} alt="" />
                                                    </div>
                                                    <h1 className=" mt-3 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-center">{item.title}</h1>
                                                    <h1 className=" mt-3 [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-center">Tk. {item.price}</h1>
                                                </Link>
                                            </div>
                                        )
                                    : <div>No product found</div>
                            }
                        </div>
                    </div>
                )}
                <div className={`search-icon ${isActive ? 'active' : ''}`} onClick={handleSearchClick}>
                    <FontAwesomeIcon className=' text-3xl mr-5' icon={faMagnifyingGlass} />
                </div>
                <div className={`cancel-icon ${isActive ? 'active' : ''}`} onClick={handleCancelClick}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="search-data"></div>
            </div>
        </div>
    );
};

export default Searchbar;