import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../DataFromBackend/DataFromBackend";


const SocialLogin = () => {
    const { googleSingIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSingIn = () => {
        googleSingIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const saveUser = { name: loggedUser.displayName, email: loggedUser.email }
                fetch(`${Data}/users`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })



                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div>
            <div>
                <div className="divider"></div>
                <div className="text-center my-4">
                    <button onClick={handleGoogleSingIn} className="btn btn-circle btn-outline">
                        <FaGoogle></FaGoogle>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;