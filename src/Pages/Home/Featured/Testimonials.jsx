import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";



const Testimonials = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])

    return (
        <section className="my-20">
            <SectionTitle
                subHeading={"What our client say"}
                heading={"Testimonials"}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >

                        <div className="text-center mt-20 flex flex-col mx-24 items-center">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}

                            />
                            <p className="py-8">{review.details}</p>
                            <h2 className="text-2xl text-orange-400"> {review.name}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;