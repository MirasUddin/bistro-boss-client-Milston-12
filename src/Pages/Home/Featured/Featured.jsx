import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg"
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <div className="text-orange-500">
                <SectionTitle
                    heading={"Featured Items"}
                    subHeading={"check it out"}
                ></SectionTitle>
            </div>
            <div className="md:flex justify-center items-center py-20 px-16 bg-slate-500 bg-opacity-40">
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug, 20, 2029</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi autem labore quod sapiente provident ex, laboriosam laborum adipisci itaque obcaecati!</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 ">Oder Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;