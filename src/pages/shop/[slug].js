import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import { getPrice, getOtherPrice, addToWishList, calculateDiscountPercentage, getSku, addToCart } from "../../helpers/Helper";
import Swal from "sweetalert2";
import Link from "next/link";
import Cookies from "js-cookie";

// fetch api
// serverside props
export async function getServerSideProps(context) {
    // Get the slug from the context
    const { slug } = context.query;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_details/${slug}`);
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

export default function ShopSlug({ data }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
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
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

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

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    const handleIncreaseQty = () => {
        setSelectQty(prevQty => prevQty + 1);
    };

    const handleDecreaseQty = () => {
        if (selectQty > 1) {
            setSelectQty(prevQty => prevQty - 1);
        }
    };

    // details page data
    console.log("Product Details", data.productDetails);
    const [details, setDetails] = React.useState(data.productDetails);
    const [productDescription, setProductDescription] = React.useState(data.description);
    const [productImages, setProductImages] = React.useState(
        data.productDetails.images ? data.productDetails.images.split(",") : [] // Split the string into an array
    );
    const [relatedProducts, setRelatedProducts] = React.useState(data.relatedProducts);
    const [productType, setProductType] = React.useState(data.productDetails.product_type);
    const [productMrp, setProductMrp] = React.useState(data.productDetails.mrp);
    const [productDiscountedPrice, setProductDiscountedPrice] = React.useState(data.productDetails.discounted_price);
    const [productSku, setProductSku] = React.useState(data.productDetails.sku);
    const [productSpecifications, setProductSpecifications] = React.useState(
        data.productDetails.specifications
            ? JSON.parse(data.productDetails.specifications)
            : [] // Default to an empty array if null
    );
    const [showSellingPrice, setShowSellingPrice] = React.useState(getPrice(productMrp, productDiscountedPrice, productType));
    const [showDiscountPrice, setShowDiscount] = React.useState(getOtherPrice(productMrp, productDiscountedPrice, productType));
    const [showSku, setShowSku] = React.useState((productType == 1 ? productSku : getSku(productSku, 0)));
    const [selectedVariation, setSelectedVariation] = React.useState(productSpecifications[0]);
    const [selectQty, setSelectQty] = React.useState(1);
    const [isShareVisible, setIsShareVisible] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Check if the _customer_token cookie exists
        const token = Cookies.get("_customer_token");
        setIsUserLoggedIn(!!token); // Set to true if the token exists
    }, []);

    useEffect(() => {
        const setElementStyles = (element, styles) => {
            for (const property in styles) {
                element.style[property] = styles[property];
            }
        };

        const calculateDominantColor = (sliderItem) => {
            const imgElement = sliderItem.querySelector('img');
            if (!imgElement) {
                console.warn("No image found in slider item.");
                return;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = document.createElement('img'); // Create an image element
            image.crossOrigin = 'Anonymous';

            image.onload = () => {
                if (image.naturalWidth === 0 || image.naturalHeight === 0) {
                    console.warn("Image not fully loaded or invalid dimensions.");
                    return;
                }

                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
                const colorCounts = {};

                for (let i = 0; i < imageData.length; i += 4) {
                    const r = imageData[i];
                    const g = imageData[i + 1];
                    const b = imageData[i + 2];
                    const rgb = `rgb(${r},${g},${b})`;
                    colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
                }

                let dominantColor = '';
                let maxCount = 0;
                for (const color in colorCounts) {
                    if (colorCounts[color] > maxCount) {
                        maxCount = colorCounts[color];
                        dominantColor = color;
                    }
                }

                if (dominantColor) {
                    setElementStyles(sliderItem, { backgroundColor: dominantColor });
                }
            };

            image.onerror = () => {
                console.error("Failed to load image:", imgElement.src);
            };

            image.src = imgElement.src;
        };

        const sliderItems = document.querySelectorAll('.slider-item');
        sliderItems.forEach((sliderItem) => calculateDominantColor(sliderItem));
    }, [productImages]);

    const updateVariationPrice = (variation, index) => {
        setSelectedVariation(variation);
        let mrpJson = typeof productMrp == 'string' && JSON.parse(productMrp);
        let discountedPriceJson = typeof productDiscountedPrice == 'string' && JSON.parse(productDiscountedPrice);
        setShowSellingPrice(getPrice(mrpJson[index], discountedPriceJson[index], 1));
        setShowDiscount(getOtherPrice(mrpJson[index], discountedPriceJson[index], 1));
        setShowSku(getSku(productSku, index));
    };

    // handle add to cart
    const handleAddToCart = (buy_now = false) => {
        const currentStock = parseInt(details.stock);
        const stockStatus = details.stock_status;

        if (buy_now) {
            if (currentStock >= 1 || stockStatus == 1) {
                // Quantity check only if product is in stock
                if (currentStock >= 1 && currentStock < selectQty) {
                    Swal.fire({
                        icon: "error",
                        title: "Not enough stock available",
                        text: `Only ${currentStock} item(s) currently in stock. Please adjust your quantity.`,
                    });
                    return;
                }

                const isAddingAsPreOrder = currentStock < 1 && stockStatus == 1;
                addToCart(details.id, details.user_id, showSellingPrice, selectQty, [], selectedVariation, isAddingAsPreOrder);
                window.location.href = "/checkout";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Out of Stock",
                    text: "This product is currently unavailable.",
                });
            }
        } else {
            if (currentStock >= 1 && currentStock < selectQty) {
                Swal.fire({
                    icon: "error",
                    title: "Not enough stock available",
                    text: `Only ${currentStock} item(s) currently in stock. Please adjust your quantity.`,
                });
                return;
            }

            if (currentStock >= 1) { // Product is in stock
                addToCart(details.id, details.user_id, showSellingPrice, selectQty, [], selectedVariation, false); // isPreOrder = false
                Swal.fire({
                    icon: "success",
                    title: "Product Added to Cart",
                });
            } else if (stockStatus == 1) { //out of stock but pre-orderable
                addToCart(details.id, details.user_id, showSellingPrice, selectQty, [], selectedVariation, true); // isPreOrder = true
                Swal.fire({
                    icon: "info",
                    title: "Product Added for Pre-order!",
                    text: "This item has been added to your cart as a pre-order.",
                });
            } else { // out of stock
                Swal.fire({
                    icon: "error",
                    title: "Out of Stock",
                    text: "This product cannot be added to cart as it is currently unavailable.",
                });
            }
        }
    };

    const toggleShare = () => {
        setIsShareVisible((prev) => !prev);
    };

    const handleStarClick = (value) => {
        setRating(value); // Update the rating state
    };

    return (
        <div>
            <section className="fluid-block fluid-block new-arrivals p-listing p-details pt-0">
                <div className="container col-lg-7 mx-auto">
                    <div className="fluid-block px-0 py-4">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Product details</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product__carousel">
                                <div className="gallery-parent">
                                    <Slider asNavFor={nav2} ref={slider => (sliderRef1 = slider)}>
                                        {productImages.map((image, index) => (
                                            <div className="slider-item" key={index}>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${image}`}
                                                    alt={`Product Image ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                    <Slider
                                        asNavFor={nav1}
                                        ref={slider => (sliderRef2 = slider)}
                                        slidesToShow={4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        arrows={false}
                                        className={`thumbnail-slider`}
                                    >
                                        {productImages.map((image, index) => (
                                            <div className="slider-item" key={index}>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_HOST_URL}${image}`}
                                                    alt={`Product Image ${index + 1}`}
                                                    className="img-fluid"
                                                    width={200}
                                                    height={200}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-panel">
                                <span className="badge rounded-pill bg-info p-2 px-3 text-uppercase">Best Seller</span>
                                <span className="badge rounded-pill bg-danger p-2 px-3 text-uppercase">15% OFF</span>
                                <h2 className="title">{details.name}</h2>
                                <p className="caption">{details.short_desc}</p>
                                <div className="d-flex price-box mb-3">
                                    <div className="price">Rs. {showSellingPrice}</div>
                                    <div className="p-info">MRP inclusive of all taxes </div>
                                </div>
                                <div className="ratings">
                                    <span><i className="bi bi-star-fill"></i> 4.5</span> 6958 Verified Reviews
                                </div>
                                {details.product_type == '2' && (
                                    <div className="block">
                                        <h5 className="block-title">Available Colors</h5>
                                        <select className="form-select" onChange={(e) => updateVariationPrice(e.target.value, e.target.selectedIndex)}>
                                            {productSpecifications.map((specification, index) => (
                                                <option key={index} value={specification}>{specification}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="d-flex mt15 s_form">
                                    <div className="quantity">
                                        <button className="minus" aria-label="Decrease" onClick={handleDecreaseQty}>&minus;</button>
                                        <input
                                            type="number"
                                            className="input-box"
                                            value={selectQty}
                                            min={1}
                                            max={10}
                                            onChange={(e) => setSelectQty(parseInt(e.target.value, 10) || 1)}
                                        />
                                        <button className="plus" aria-label="Increase" onClick={handleIncreaseQty}>&#43;</button>
                                    </div>
                                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={() => handleAddToCart(false)}>Add to Cart</button>
                                </div>
                                <div className="block highlight-block">
                                    <h5 className="block-title">Product Details</h5>
                                    <ul className="bullet play_i">
                                        <div className="block p-details" dangerouslySetInnerHTML={{ __html: productDescription }} />
                                    </ul>
                                </div>
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    {/* <div className="accordion-item">
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <div className="block delivery">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <ul className="iconic_list">
                                                                <li><i className="bi bi-box-seam"></i> <strong>Express delivery</strong> might be available</li>
                                                                <li><i className="bi bi-credit-card"></i> <strong>Pay on delivery delivery</strong> might be available</li>
                                                                <li><i className="bi bi-arrow-left-right"></i> <strong>Hassle free 7, 15 and 30 days</strong> Return & Exchange might be available</li>
                                                                <li><i className="bi bi-emoji-smile"></i> <strong>Try & Buy</strong> might be available</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                                aria-controls="panelsStayOpen-collapseTwo">
                                                Product Details
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                            <div className="accordion-body">
                                                <div className="block p-details">
                                                    <div dangerouslySetInnerHTML={{ __html: productDescription }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-details-tab pt-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mt-5 rounded-4 border-0 shadow-lg customer-reviews">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between pb-4 mb-5 border-bottom">
                                            <div className="left">
                                                <h2 className="fs-4 fw-bold text-dark">Customer Reviews</h2>
                                            </div>
                                            <div className="right">
                                                {isUserLoggedIn ? (
                                                    <button className="btn btn-primary p-2 review-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Leave a Review</button>
                                                ) : (
                                                    <p className="text-muted">Please log in to leave a review.</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row g-5">
                                            <div className="col-lg-6">
                                                {/* <div className="card rounded-0 border-0">
                                                    <div className="card-body p-0">
                                                        <div className="card-title d-flex align-items-center gap-2 mb-3">
                                                            <div className="left">
                                                                <div className="ratings bg-success text-white rounded-1">
                                                                    <i className="bi bi-star-fill" /> 4.5
                                                                </div>
                                                            </div>
                                                            <div className="right d-flex">
                                                                <h6 className="fw-bold fs-5 mb-0">Commpletely satisfied</h6>
                                                            </div>
                                                        </div>
                                                        <small>Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut. Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his.</small>
                                                    </div>
                                                    <div className="card-footer py-3 px-0">
                                                        <span>Published 54 minutes ago</span>
                                                    </div>
                                                </div> */}
                                                No reviews yet.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fluid-block collections category pb-5 border-bottom pt-0">
                <div className="container">
                    <div className="title-div text-center">
                        <h2 className="text-uppercase mb-0 fw-bold">You may also like</h2>
                        <small>Explore More Stunning Sarees</small>
                    </div>
                    <div className="catagory-slider">
                        <Slider className="top-products" {...settings}>
                            {relatedProducts.map((product, index) => (
                                <div className="card border-0 rounded-0" key={index}>
                                    <Link href={`/shop/${product.slug}`} className="card-img">
                                        <div className="badge dark">New Arrival</div>
                                        <div className="icons-bar">
                                            <div
                                                className="icon active"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="left"
                                                data-bs-title="Wishlist"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleWishlistClick(product.id);
                                                }}
                                            >
                                                <i className="fa-light fa-heart" />
                                            </div>
                                            <div
                                                className="icon"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="left"
                                                data-bs-title="Share"
                                                onClick={e => {
                                                    e.preventDefault();

                                                }}
                                            >
                                                <i className="fa-light fa-share-nodes" />
                                            </div>
                                            <div
                                                className="icon"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="left"
                                                data-bs-title="Add to Cart"
                                                onClick={() => {
                                                    handleAddToCart(false);
                                                }}
                                            >
                                                <i className="fa-light fa-cart-shopping" />
                                            </div>
                                        </div>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.featuredimage}`}
                                            alt={product.name}
                                            className="img-fluid square-img"
                                            width={300}
                                            height={300}
                                        />
                                    </Link>
                                    <div className="card-body p-0 py-4">
                                        <div className="info">
                                            <Link href={`/shop/${product.slug}`}>
                                                <h3 className="fs-4">{product.name}</h3>
                                            </Link>
                                            <p>{product.short_desc}</p>
                                        </div>
                                        <div className="price d-flex align-items-center">
                                            <div className="left d-flex align-items-center gap-2">
                                                <span className="text-decoration-line-through text-muted">
                                                    ₹{getOtherPrice(product.mrp, product.discounted_price, product.product_type)}
                                                </span>
                                                <strong className="fs-5">
                                                    ₹{getPrice(product.mrp, product.discounted_price, product.product_type)}
                                                </strong>
                                                <div className="right">
                                                    {product.stock && parseInt(product.stock) > 0 ? (
                                                        <span className="text-success">In Stock</span>
                                                    ) : product.stock_status == 1 ? (
                                                        <span className="text-success">Preorder</span>
                                                    ) : (
                                                        <span className="text-danger">Out of Stock</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/shop" className="btn btn-secondary">View All</Link>
                    </div>
                </div>
            </section>
            {/* Similar Products end */}

            <div className="modal modal-lg fade review-form" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0 border-0">
                        <div className="modal-header border-0 px-4">
                            <h2 className="modal-title fs-3 fw-bold text-dark" id="exampleModalLabel">Write a review</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="Ratings" className="col-form-label">Ratings</label>
                                    <div className="d-flex align-items-center gap-2 ratings">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <i
                                                key={value}
                                                className={`bi bi-star${value <= rating ? "-fill" : ""}`}
                                                style={{ cursor: "pointer", color: value <= rating ? "#ffc107" : "#e4e5e9" }}
                                                onClick={() => handleStarClick(value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Title of your review</label>
                                    <input type="text" className="form-control shadow-none" id="recipient-name" placeholder="If you could say it in one sentence, what would you say?" />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Your review</label>
                                    <textarea className="form-control shadow-none" rows={5} id="message-text" placeholder="Write your review to help others learn about this online business" defaultValue={""} />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Upload Photo ( Optional )</label>
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="inputGroupFile02" />
                                        <label className="input-group-text rounded-0" htmlFor="inputGroupFile02">Upload</label>
                                    </div>
                                </div> */}
                                <div className="mb-3">
                                    <div className="form-check d-flex gap-2">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            I agree to the <Link href="/policies/termsandconditions">Terms and Conditions</Link>
                                        </label>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary">Submit Review</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}