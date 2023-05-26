
const FoodCard = ({item}) => {
    
    const { name, image, price, recipe } = item;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-2 rounded-md bg-black text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end mx-auto">
                    <button className="btn btn-outline border-0 border-b-4 mt-4 border-orange-400 bg-slate-200 hover:border-orange-400 hover:text-orange-400">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;