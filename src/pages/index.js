import React from "react";
import Slider from "react-slick";
import { getPrice, getOtherPrice, addToWishList } from "../helpers/Helper";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

// server side props. fetch api
export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/1`);

        // Check if the response is valid
        if (!res.ok) {
            return {
                notFound: true,
            };
        }

        const data = await res.json();
        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        // Return a fallback or error page
        return {
            notFound: true,
        };
    }
}

export default function Home({ data }) {
    // console.log("Home data", data);
    const [banners, setBanners] = React.useState(data.banner);
    const [collections, setCollections] = React.useState(data.new_arrivals);
    const [featured, setFeatured] = React.useState(data.randomSraeeProducts);
    const [category, setCategory] = React.useState(data.categories);

    var settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    };


    // slick category 2 test start






    const getSliderSettings = (sldnm, sldnm2, inslm) => ({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 200,
        margin: inslm,
        // slidesToShow: 5,
        slidesToShow: sldnm,
        slidesToScroll: sldnm2,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: sldnm2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    });



    // slick category 2 test end



    const handleAddToWishlist = (productId) => {
        addToWishList(productId);
        Swal.fire({
            icon: "success",
            title: "Product added to wishlist",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    // handle add to wishlist
    const handleWishlistClick = async (productId) => {
        let wishlist = await addToWishList(productId); // Await the asynchronous function
        if (wishlist.success) {
            Swal.fire({
                icon: "success",
                title: wishlist.message[0],
            });
        } else {
            Swal.fire({
                icon: "error",
                title: wishlist.message[0],
            });
        }
    };

    return (
        <>
            <section className="banner-section">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        {banners.map((banner, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {banners.map((banner, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <img
                                    src={process.env.NEXT_PUBLIC_HOST_URL + banner.thumnanail}
                                    className="d-block w-100"
                                    alt={banner.altText || `Slide ${index + 1}`}
                                //   width={1920}
                                //   height={800}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            {/* Banner end */}





            {/* ++++++++++ */}

            <section className="fluid-block features py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="left">
                                    <div className="icon">
                                        <i className="fa-light fa-truck-fast" />
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">Free-Shipping</div>
                                    <small>Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="left">
                                    <div className="icon">
                                        <i className="fa-light fa-headset" />
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">Support 24/7</div>
                                    <small>Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="left">
                                    <div className="icon">
                                        <i className="fa-light fa-indian-rupee-sign" />
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">Money Return</div>
                                    <small>Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="left">
                                    <div className="icon">
                                        <i className="fa-light fa-credit-card" />
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">Secure Payment</div>
                                    <small>Lorem ipsum dolor sit amet, consectetur</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ++++++++++ */}

            <section className="fluid-block collections">
                <div className="container">
                    <div className="title-div text-center mb-4">
                        <div className="left">
                            <h2 className="text-uppercase mb-0 fw-bold">Our all Products</h2>
                            <small>Damet consectetur incididunt</small>
                        </div>
                    </div>
                    <ul className="nav nav-pills mb-3 justify-content-center gap-2 mb-5" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link rounded-5 px-4 active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Jewellery</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link rounded-5 px-4" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Cosmetics</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                            <div className="row g-5">
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge dark">New Arrival</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-1.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            { /* <div class="badge dark">New Arrival</div> */}
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-2.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge primary">Popular</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-3.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge dark">Best Seller</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-4.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                            <div className="row g-5">
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge dark">New Arrival</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-14.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            { /* <div class="badge dark">New Arrival</div> */}
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-15.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge primary">Popular</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-16.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card border-0 rounded-0">
                                        <a href="product-listing.html" className="card-img">
                                            <div className="badge dark">Best Seller</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist">
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img src="assets/images/t-17.jpg" alt="" className="img-fluid square-img" />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">Imitation Ring</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor
                                                    incididunt</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                                    <strong className="fs-5">₹1999</strong>
                                                </div>
                                                <div className="right">
                                                    <span className="text-success">In Stock</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-primary-light rounded-5">View All</a>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}


            <section className="fluid-block fluid-carousel overflow-hidden pt-3">
                <div className="container-fluid">
                    <Slider className="catagory-slider-2"  {...getSliderSettings(5, 5, 0)}>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-9.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Earrings</div>
                                <img src="assets/images/t-10.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Necklaces</div>
                                <img src="assets/images/t-11.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-12.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-13.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-9.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-10.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-9.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="card border-0 rounded-4 overflow-hidden">
                            <a href="product-listing.html" className="card-img">
                                <div className="title">Bracelates</div>
                                <img src="assets/images/t-12.jpg" alt="" className="img-fluid" />
                            </a>
                        </div>
                    </Slider>
                </div>
            </section>

            {/* ++++++++++ */}
            <section className="fluid-block offer-block pt-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <a href="#" className="d-block rounded-4 overflow-hidden"><img src="assets/images/offer-3.jpg" className="img-fluid" /></a>
                        </div>
                        <div className="col-lg-6">
                            <a href="#" className="d-block rounded-4 overflow-hidden"><img src="assets/images/offer-4.jpg" className="img-fluid" /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}
            <section className="fluid-block collections pt-2">
                <div className="container">
                    <div className="title-div text-center">
                        <div className="left">
                            <h2 className="text-uppercase mb-0 fw-bold">Featured Products</h2>
                            <small>Damet consectetur incididunt</small>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    <div className="badge dark">New Arrival</div>
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-1.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    { /* <div class="badge dark">New Arrival</div> */}
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-2.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    <div className="badge primary">Popular</div>
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-3.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    <div className="badge dark">Best Seller</div>
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-4.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    { /* <div class="badge dark">Best Seller</div> */}
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-5.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    { /* <div class="badge dark">Best Seller</div> */}
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-6.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    <div className="badge dark">Best Seller</div>
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-7.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card border-0 rounded-0">
                                <a href="product-listing.html" className="card-img">
                                    { /* <div class="badge dark">Best Seller</div> */}
                                    <div className="icons-bar">
                                        <div className="icon active" title="Wishlist">
                                            <i className="fa-light fa-heart" />
                                        </div>
                                        <div className="icon" title="Share">
                                            <i className="fa-light fa-share-nodes" />
                                        </div>
                                        <div className="icon" title="Add to Cart">
                                            <i className="fa-light fa-cart-shopping" />
                                        </div>
                                    </div>
                                    <img src="assets/images/p-8.jpg" alt="" className="img-fluid square-img" />
                                </a>
                                <div className="card-body p-0 py-4">
                                    <div className="info">
                                        <h3 className="fs-4">Imitation Ring</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt</p>
                                    </div>
                                    <div className="price d-flex align-items-center">
                                        <div className="left d-flex align-items-center gap-2">
                                            <span className="text-decoration-line-through text-muted fs-5">₹2499</span>
                                            <strong className="fs-5">₹1999</strong>
                                        </div>
                                        <div className="right">
                                            <span className="text-success">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-primary-light">View All</a>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}


            {/* ----------------------- */}

            {/* ++++++++++ */}


            <section className="fluid-block offer-section pt-4">
                <div className="container">
                    <div className="offer-wrap d-flex align-items-center justify-content-center">
                        <div className="caption text-center">
                            <h2 className="display-3 text-white fw-bold text-uppercase mb-0">BLACK FRIDAY</h2>
                            <h4 className="fw-bold text-white fs-4 text-uppercase mb-4 bg-primary py-1 rounded-2 bg-gold">Get 25%
                                off on
                                ₹449 or more!</h4>
                            <small className="fs-5 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco.</small>

                            <div className="offer-time d-flex align-items-center justify-content-center gap-3 mt-4" id="offerCountdown">
                                <div className="time-item d-flex align-items-center justify-content-center">
                                    <div>
                                        <div className="fs-4 mb-0" id="days">00</div>
                                        <small>Days</small>
                                    </div>
                                </div>
                                <div className="time-item d-flex align-items-center justify-content-center">
                                    <div>
                                        <div className="fs-4 mb-0" id="hours">00</div>
                                        <small>Hours</small>
                                    </div>
                                </div>
                                <div className="time-item d-flex align-items-center justify-content-center">
                                    <div>
                                        <div className="fs-4 mb-0" id="minutes">00</div>
                                        <small>minutes</small>
                                    </div>
                                </div>
                                <div className="time-item d-flex align-items-center justify-content-center">
                                    <div>
                                        <div className="fs-4 mb-0" id="seconds">00</div>
                                        <small>Seconds</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}


            {/* ------------------------------- */}

            {/* ++++++++++ */}


            <section className="fluid-block collections category pb-5 pt-0">
                <div className="container">
                    <div className="title-div text-center">
                        <h2 className="text-uppercase mb-0 fw-bold">Top Brands</h2>
                        <small>Lorem Dolor collections ammet</small>
                    </div>
                    <Slider className="catagory-slider"  {...getSliderSettings(4, 4, 0)}>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-14.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Colections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-15.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Pendant Collections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge primary">Popular</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-16.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Earrings Colections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-17.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Ring Collections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-15.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-14.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-16.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge primary">Best Price</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-15.jpg" alt="" className="img-fluid" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">Best Selling</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-17.jpg" alt="" className="img-fluid" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-primary-light">View All</a>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}

            {/* -------------------------------- */}




            {/* ++++++++++ */}

            <section className="fluid-block collections category bg-light">
                <div className="container">
                    <div className="title-div text-center">
                        <h2 className="text-uppercase mb-0 fw-bold">Recomended Items</h2>
                        <small>Lorem Dolor collections ammet</small>
                    </div>
                    <Slider className="catagory-slider"   {...getSliderSettings(4, 4, 0)}>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-2.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Colections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-3.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Pendant Collections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge primary">Popular</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-5.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Earrings Colections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-17.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Ring Collections</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-15.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-5">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">New Arrival</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-14.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                <div className="badge dark">New Arrival</div>
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-6.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge primary">Best Price</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-7.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 rounded-0">
                            <a href="product-listing.html" className="card-img">
                                { /* <div class="badge dark">Best Selling</div> */}
                                <div className="icons-bar">
                                    <div className="icon active" title="Wishlist">
                                        <i className="fa-light fa-heart" />
                                    </div>
                                    <div className="icon" title="Share">
                                        <i className="fa-light fa-share-nodes" />
                                    </div>
                                    <div className="icon" title="Add to Cart">
                                        <i className="fa-light fa-cart-shopping" />
                                    </div>
                                </div>
                                <img src="assets/images/t-8.jpg" alt="" className="img-fluid square-img" />
                            </a>
                            <div className="card-body p-0 py-4">
                                <div className="info">
                                    <h3 className="fs-4">Necklace Collection</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    </p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    <div className="left d-flex align-items-center gap-2">
                                        <strong className="fs-5">₹1999</strong>
                                        <span className="text-decoration-line-through text-muted">₹2499</span>
                                    </div>
                                    <div className="right">
                                        <span className="text-success">In Stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                    <div className="text-center mt-5">
                        <a href="/shop" className="btn btn-primary-light">View All</a>
                    </div>
                </div>
            </section>

            {/* ++++++++++ */}

            {/* -------------------------- */}



            {/* ++++++++++ */}

            <section className="fluid-block offer-block">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <a href="#" className="d-block rounded-4 overflow-hidden shadow-lg"><img src="assets/images/offer-1.jpg" className="img-fluid" /></a>
                        </div>
                        <div className="col-lg-6">
                            <a href="#" className="d-block rounded-4 overflow-hidden shadow-lg"><img src="assets/images/offer-2.jpg" className="img-fluid" /></a>
                        </div>
                    </div>
                </div>
            </section>


            <section className="fluid-block newsletter py-4 border-bottom">
                <div className="container">
                    <div className="row align-items-center g-4">
                        { /* Newsletter Left */}
                        <div className="col-lg-5">
                            <form className="newsletter-form">
                                <div className="input-group">
                                    <input type="email" className="form-control rounded-start-5" id="newsletterEmail" placeholder="Enter your email" required />
                                    <button className="btn btn-primary rounded-end-5 px-4" type="submit">
                                        Subscribe <i className="fa-solid fa-paper-plane-top me-1" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        { /* Features Right */}
                        <div className="col-lg-7">
                            <div className="d-flex flex-wrap justify-content-lg-end gap-5">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="feature-icon bg-light text-muted rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="fa-light fa-truck-fast fs-4" />
                                    </span>
                                    <span className="small text-muted">Free Shipping</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="feature-icon bg-light text-muted rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="fa-light fa-headset fs-4" />
                                    </span>
                                    <span className="small text-muted">24/7 Support</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="feature-icon bg-light text-muted rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="fa-light fa-indian-rupee-sign fs-4" />
                                    </span>
                                    <span className="small text-muted">Money Back</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}