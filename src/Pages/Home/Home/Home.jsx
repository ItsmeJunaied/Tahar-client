
import Banner from '../Banner/Banner';
import CategoryShow from '../CategoryShow/CategoryShow';
import CollectionCard from '../CollectionCard/CollectionCard';
import FindUsInsta from '../FindUsInsta/FindUsInsta';
import FromalCategory from '../FromalCategory/FromalCategory';
import ModelVideoShocase from '../ModelVideoShocase/ModelVideoShocase';
import PremiumServices from '../PremiumServices/PremiumServices';
import ShopByCategory from '../ShopByCategory/ShopByCategory';
import './Home.css';
const Home = () => {
    
    return (
        <div>
            <div>
                <Banner></Banner>
            </div>
            <div>

                <div className=' lg:mx-[100px]'>
                    <CategoryShow></CategoryShow>
                    <ShopByCategory></ShopByCategory>
                    <CollectionCard></CollectionCard>
                    <PremiumServices></PremiumServices>
                    <ModelVideoShocase></ModelVideoShocase>
                    <FromalCategory></FromalCategory>
                    <FindUsInsta></FindUsInsta>
                </div>
            </div>
        </div>
    );
};

export default Home;