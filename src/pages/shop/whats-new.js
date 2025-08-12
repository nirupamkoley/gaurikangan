import React from "react";
import Slider from "react-slick";
import { getPrice, getOtherPrice, addToWishList } from "../../helpers/Helper";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import Image from "next/image";

// fetch api
// serverside props
export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_products/1`);

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

export default function Shop({ data }) {

    const [pageNo, setPageNo] = React.useState(1);
    const [is_loading, setIsLoading] = React.useState(false);
    const [products, setProducts] = React.useState(data.products);
    const [totalProductCount, setTotalProductCount] = React.useState(data.count);
    const [filterCategories, setFilterCategories] = React.useState(data.filter);
    const [selectedFilters, setSelectedFilters] = React.useState({});
    const [isFilterSelected, setIsFilterSelected] = React.useState(false);
    // first load
    const [isFirstLoad, setIsFirstLoad] = React.useState(true);

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

    // Pagination
    const fetchProducts = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_products/${pageNo}`);
            const data = await res.json();
            setProducts((prevProducts) => [...prevProducts, ...data.products]);
            setTotalProductCount(data.count);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setIsLoading(false);
    }, [pageNo]);

    // get filter category id
    const getFilterCategoryId = React.useCallback(() => {
        let newFiltersArray = [];
        for (const [key, value] of Object.entries(selectedFilters)) {
            if (value) {
                newFiltersArray.push(key);
            }
        }
        return newFiltersArray;
    }, [selectedFilters]);

    // fetch api with filters
    const fetchFilteredProducts = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const filterCategoryId = getFilterCategoryId();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filtered_all_products/${pageNo}/${filterCategoryId.join(",")}`);
            const data = await res.json();
            setProducts((prevProducts) => [...prevProducts, ...data.products]);
            setTotalProductCount(data.count);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
        setIsLoading(false);
    }, [pageNo, getFilterCategoryId]);

    // when page scroll hit the bottom
    React.useEffect(() => {
        let lastScrollTop = 0; // Track the last scroll position

        const handleScroll = () => {
            const scrollTop = window.scrollY; // Current scroll position
            const isScrollingDown = scrollTop > lastScrollTop; // Check if scrolling down

            if (isScrollingDown && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setPageNo((prevPage) => prevPage + 1);
            }

            lastScrollTop = scrollTop; // Update the last scroll position
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fetch products when pageNo changes
    React.useEffect(() => {
        if ((pageNo > 1) && !isFilterSelected) {
            fetchProducts();
        } else if ((pageNo == 1) && !isFirstLoad && !isFilterSelected) {
            fetchProducts();
        } else if (isFilterSelected) {
            fetchFilteredProducts();
            console.log("Selected Filters:", selectedFilters);
        }
    }, [pageNo, isFilterSelected, fetchProducts, fetchFilteredProducts, isFirstLoad, selectedFilters]);

    // filter products
    const handleFilterChange = (e, filterId) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (e.target.checked) {
                newFilters[filterId] = true;
            } else {
                delete newFilters[filterId];
            }

            // Update isFilterSelected based on whether there are any selected filters
            setIsFilterSelected(Object.keys(newFilters).length > 0);
            console.log("Selected Filters:", newFilters);
            return newFilters;
        });
        setPageNo(1); // Reset page number when filters change
        setProducts([]); // Clear products when filters change
        setTotalProductCount(0); // Reset total product count
        setIsFirstLoad(false); // Set first load to false
    };

    // when setSelectedFilters changes
    React.useEffect(() => {
        if (isFilterSelected) {
            fetchFilteredProducts();
        }
    }, [isFilterSelected, fetchFilteredProducts]);

    return (
        <div>
            <section className="fluid-block new-arrivals sarees p-listing pt-0">
                <div className="title-div text-center mb-0 stroke-none sticky-top" id="sticky-title">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between py-5">
                            <div className="left d-flex align-items-center gap-2">
                                <h2 className="fw-bold mb-0">What&apos;s New</h2>
                                <div className="fs-5 ms-2 text-muted">({totalProductCount} results)</div>
                            </div>
                            <div className="right">
                                {/* Filter  */}
                                <div className="filter-div d-flex justify-content-between align-items-center mb-0 gap-3">
                                    {/* <div className="left d-flex justify-content-between align-items-center gap-1">
                                        <label htmlFor="inputGroupSelect01" className="form-label w-50 mb-0">Sort By:</label>
                                        <select className="form-select rounded-0" aria-label="Large select example">
                                            <option selected>New Arrivals</option>
                                            <option value={1}>Best Seller</option>
                                            <option value={2}>Recomendations</option>
                                            <option value={3}>Price: Low to High</option>
                                            <option value={3}>Price: High to Low</option>
                                        </select>
                                    </div> */}
                                    <div className="right d-flex align-items-center">
                                        <button className="f-btn rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><i className="bi bi-filter-left" /> Filter<span className="badge text-bg-primary">{Object.keys(selectedFilters).length}</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/* Left Filters */}
                    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header border-bottom p-4">
                            <h5 className="offcanvas-title fw-bold" id="offcanvasExampleLabel">Filter By</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body p-4">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            Price
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div className="range-slider-wrap px-2">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div id="slider-range" />
                                                    </div>
                                                </div>
                                                <div className="row slider-labels d-flex align-items-center justify-content-between">
                                                    <div className="caption">
                                                        <strong><span id="slider-range-value1" /></strong>
                                                    </div>
                                                    <div className="caption">
                                                        <strong><span id="slider-range-value2" /></strong>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <form className="d-flex justify-content-between align-items-center">
                                                            <input type="hidden" name="min-value" defaultValue />
                                                            <input type="hidden" name="max-value" defaultValue />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                {/* Product */}
                                {filterCategories.map((category) => (
                                    <div className="accordion-item" key={category.id}>
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#flush-collapse-${category.id}`}
                                                aria-expanded="false"
                                                aria-controls={`flush-collapse-${category.id}`}
                                            >
                                                {category.filter_title}
                                            </button>
                                        </h2>
                                        <div
                                            id={`flush-collapse-${category.id}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body d-flex flex-wrap gap-2 pt-0">
                                                {category.children.map((subCategory) => (
                                                    <div className="f-item" key={subCategory.id}>
                                                        <input
                                                            type="checkbox"
                                                            className="btn-check"
                                                            id={`btn-check-${subCategory.id}`}
                                                            autoComplete="off"
                                                            onChange={(e) => handleFilterChange(e, subCategory.id)}
                                                        />
                                                        <label
                                                            className="btn btn-outline-danger"
                                                            htmlFor={`btn-check-${subCategory.id}`}
                                                        >
                                                            {subCategory.filter_title}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Filter End */}
                    <div className="collections" style={{ minHeight: "100vh" }}>
                        <div className="row g-5">
                            {/* {console.log(products)} */}
                            {products.map((product, index) => (
                                <div className="col-lg-3 col-md-4 col-sm-4 col-6" key={index}>
                                    <div className="card border-0 rounded-0">
                                        <div className="wishlist-icon" title="Wishlist" onClick={() => handleWishlistClick(product.id)}>
                                            <i className="fa-regular fa-heart" />
                                        </div>
                                        <a href={`/shop/${product.slug}`} className="card-img">
                                            {/* {product.badge && <div className={`badge ${product.badgeType}`}>{product.badge}</div>} */}
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.featuredimage}`}
                                                alt={product.name}
                                                // width={500}
                                                // height={500}
                                                className="img-fluid"
                                                layout="responsive"
                                            />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-5">{product.name}</h3>
                                                <p>{product.short_desc}</p>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <strong className="fs-4">
                                                        ₹{getPrice(product.mrp, product.discounted_price, product.product_type)}
                                                    </strong>
                                                    <span className="text-decoration-line-through text-muted">
                                                        ₹{getOtherPrice(product.mrp, product.discounted_price, product.product_type)}
                                                    </span>
                                                </div>
                                                 <div className="right">
                                                    {product.stock > 0 ? (
                                                        <span className="text-success">In Stock</span>
                                                    ) : product.stock_status == 1 ? (
                                                        <span className="text-success">Preorder Available</span>
                                                    ) : (
                                                        <span className="text-danger">Out of Stock</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="fluid-block features-2 text-center py-5">
                <div className="container">
                    <div className="row">
                        {/* show loader */}
                        {is_loading && (
                            <Loader />
                        )}
                    </div>
                </div>
            </section>
            {/* Product Listing end */}
        </div>

    )
}
