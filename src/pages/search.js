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
                    <div className="collections" style={{ minHeight: "100vh" }}>
                        <div className="row g-5">
                            {products.map((product, index) => (
                                <div className="col-lg-3" key={index}>
                                    <div className="card border-0 rounded-0">
                                        <div
                                            className="wishlist-icon"
                                            title="Wishlist"
                                            onClick={() => handleWishlistClick(product.id)}
                                        >
                                            <i className="fa-regular fa-heart" />
                                        </div>
                                        <a href={`/shop/${product.slug}`} className="card-img">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_HOST_URL}${product.featuredimage}`}
                                                alt={product.name}
                                                className="img-fluid"
                                                // width={500} // Adjust width as needed
                                                // height={500} // Adjust height as needed
                                            />
                                        </a>
                                        <div className="card-body p-0 py-4">
                                            <div className="info">
                                                <h3 className="fs-4">{product.name}</h3>
                                            </div>
                                            <div className="price d-flex align-items-center">
                                                <div className="left d-flex align-items-center gap-2">
                                                    <strong className="fs-4">
                                                        ₹{getPrice(product.mrp, product.discounted_price, product.product_type)}
                                                    </strong>
                                                    {product.discounted_price && (
                                                        <span className="text-decoration-line-through text-muted">
                                                            ₹{getOtherPrice(product.mrp, product.discounted_price, product.product_type)}
                                                        </span>
                                                    )}
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
                    {loading && <p className="text-center mt-4">Loading more products...</p>}
                </>
            ) : (
                <p>{isFirstLoad ? "Loading products..." : "No products found for your search."}</p>
            )}
        </div>
    );
}