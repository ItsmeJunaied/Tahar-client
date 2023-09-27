import CatShowSliders from './CatShowSliders/CatShowSliders';
import './ShopByCategory.css';
import sizeChart from '../../../../public/photos/size chart.png';
import { Link } from 'react-router-dom';
import Filter from '../../../Shared/Filter/Filter';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
const ShopByCategory = () => {
    const { AllProducts } = useContext(AuthContext);
    const [activeFabric, setActiveFabric] = useState('');
    const [filteredFroduct,setFilteredProfuct] = useState([]);
    return (
        <div>
            <h1 className=' text-center font-bold text-[28px] mt-[47px]'>Shop by Categories</h1>


            <Filter activeFabric={activeFabric} setActiveFabric={setActiveFabric} AllProducts={AllProducts} setFilteredProfuct={setFilteredProfuct} ></Filter>

            <div className="divider w-full"></div>


            {/* another section */}
            <CatShowSliders activeFabric={activeFabric} filteredFroduct={filteredFroduct}></CatShowSliders>
        </div>
    );
};

export default ShopByCategory;