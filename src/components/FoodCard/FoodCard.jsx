import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Data } from "../../Pages/Shared/DataFromBackend/DataFromBackend";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {

    const { name, image, price, recipe, _id } = item;
    const {user} = useContext(AuthContext);
    const [, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation()
    
    
    const handleAddToCart = item => {
        console.log(item);
        if(user && user.email){
            const orderItem = {menuItemId: _id, name, image, price, email: user.email}
            fetch(`${Data}/carts`,{
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderItem)
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                if(data.insertedId){
                    refetch(); // refetch cart to update the number of items in the cart
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Food added on the cart.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
        else(
            Swal.fire({
                title: '',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/login', {state: {from: location}} )
                }
              })
        )
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-2 rounded-md bg-black text-white">${price}</p>
            <div className="card-body text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end mx-auto">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 mt-4 border-orange-400 bg-slate-200 hover:border-orange-400 hover:text-orange-400">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;