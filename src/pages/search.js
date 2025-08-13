import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { getPrice, getOtherPrice, addToWishList } from '../helpers/Helper';

export default function SearchPage() {
    const router = useRouter();
    const { q } = router.query; // Extract the search query from the URL
    const [products, setProducts] = useState([]); // State to store fetched products
    const [totalProductCount, setTotalProductCount] = useState(0); // Total product count
    const [loading, setLoading] = useState(false); // State to manage loading
    const [pageNo, setPageNo] = useState(1); // State to track the current page
    const [isFirstLoad, setIsFirstLoad] = useState(true); // State to track the first load

    // Handle add to wishlist
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

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true); // Set loading state to true
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${pageNo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: q }),
            });
            const data = await res.json();
            if (data.success) {
                setProducts((prevProducts) => [...prevProducts, ...data.products]); // Append new products
                setTotalProductCount(data.count); // Update total product count
            } else {
                console.error("API returned an error:", data.message); // Log API error
            }
        } catch (error) {
            console.error("Error fetching products:", error); // Log fetch error
        }
        setLoading(false); // Set loading state to false
    }, [q, pageNo]); // Dependencies include query and page number

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loading &&
                products.length < totalProductCount // Only fetch if more products are available
            ) {
                setPageNo((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading, products.length, totalProductCount]);

    // Fetch products when pageNo or query changes
    useEffect(() => {
        if (q) {
            if (isFirstLoad) {
                setProducts([]); // Clear previous results only on the first load
                setPageNo(1); // Reset to the first page
            }
            fetchProducts();
        }
        setIsFirstLoad(false);
    }, [q, pageNo, fetchProducts]);

    return (
        <div className="container mt-4">
            <h1>Search Results for {q}</h1>
            {products.length > 0 ? (
                <>
                    <div className="collections p-listing">
                        <div className="row">
                            {products.map((product, index) => (
                                <div className="col-lg-3 col-md-4 col-sm-4 col-6" key={index}>
                                    <div className="card border-0 rounded-5 shadow-lg overflow-hidden">
                                        <a href={`/shop/${product.slug}`} className="card-img">
                                            <div className="badge dark zzprimary">New Arrival</div>
                                            <div className="icons-bar">
                                                <div className="icon active" title="Wishlist" onClick={(e) => { e.preventDefault(); handleWishlistClick(product.id); }}>
                                                    <i className="fa-light fa-heart" />
                                                </div>
                                                <div className="icon" title="Share">
                                                    <i className="fa-light fa-share-nodes" />
                                                </div>
                                                <div className="icon" title="Add to Cart">
                                                    <i className="fa-light fa-cart-shopping" />
                                                </div>
                                            </div>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.featuredimage}`}
                                                alt={product.name}
                                                className="img-fluid square-img"
                                            />
                                        </a>
                                        <div className="card-body p-4 py-4">
                                            <div className="info">
                                                <a href={`/shop/${product.slug}`} className="item-title mb-2">{product.name}</a>
                                                <div className="d-flex align-items-center justify-content-between py-2 border-bottom mb-3">
                                                    <div className="ratings d-flex align-items-center gap-2">
                                                        <span><i className="bi bi-star-fill" /> 4.5</span> <a href="#" className="text-muted">548 Reviews</a>
                                                    </div>
                                                    <div className="text-success pt-2">
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
                                            <div className="price d-flex align-items-center justify-content-between">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <span className="text-decoration-line-through text-muted fs-5"> ₹{getOtherPrice(product.mrp, product.discounted_price, product.product_type)}</span>
                                                    <strong className="fs-5">  ₹{getPrice(product.mrp, product.discounted_price, product.product_type)}</strong>
                                                </div>
                                                <div className="right">
                                                    <a href={`/shop/${product.slug}`} className="btn btn-success">Buy Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {loading && <p className="text-center mt-4">Loading more products...</p>}
                </>
            ) : (
                <p>{isFirstLoad ? "Loading products..." : "No products found for your search."}</p>
            )}
        </div>
    );
}