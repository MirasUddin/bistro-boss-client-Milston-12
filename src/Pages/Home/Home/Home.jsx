import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Testimonials from "../Featured/Testimonials";
import PopularMenu from "../PopularMenu/PopularMenu";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Category/>
            <PopularMenu/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;