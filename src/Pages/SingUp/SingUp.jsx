import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Data } from "../Shared/DataFromBackend/DataFromBackend";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";



const SingUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate()


    const onSubmit = data => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;

                console.log(loggedUser);
                updateUserProfile(data.name, data.photoUPL)
                    .then(() => {

                        const saveUser = {name: data.name, email: data.email}
                        fetch(`${Data}/users`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data);
                                if (data.insertedId) {

                                    reset()
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Profile created successful',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })
            .catch((error => {
                console.log(error.message);
            }))
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sing Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sing Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input  {...register("name", { required: true })} type="text" name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Please Type your name</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input  {...register("photoUPL", { required: true })} type="text" placeholder="photo UPL" className="input input-bordered" />
                                {errors.photoUPL && <span className="text-red-500">photo UPL is  Required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">Please Type your Email</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", { required: true, minLength: 6, maxLength: 20 })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Please Type your Password</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sing Up</button>
                                <p className='mt-2 text-center link'><small>Have an Account? <Link to="/login">go to Login</Link></small></p>
                                <SocialLogin/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingUp;