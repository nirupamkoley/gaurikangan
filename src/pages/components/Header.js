import React, { useEffect, useState } from "react";
import { getTotalCartItem } from '../../helpers/Helper';
import { useRouter } from 'next/router';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    // Use the cart context instead of local state
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [cartUpdated, setCartUpdated] = useState(false);

    useEffect(() => {
        console.log('cart number: ', getTotalCartItem());

        const interval = setInterval(() => {
            const updatedCartItems = getTotalCartItem();
            if (updatedCartItems !== totalCartItems) {
                setTotalCartItems(updatedCartItems);
                setCartUpdated(true);
                // Reset update animation after 2 seconds
                setTimeout(() => {
                    setCartUpdated(false);
                }, 2000);
            }
        }, 2000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, [totalCartItems]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Check if we're in a browser environment before accessing DOM
            if (typeof window !== 'undefined' && typeof bootstrap !== 'undefined') {
                const modal = document.getElementById('exampleModal1');
                if (modal) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) bootstrapModal.hide();
                }
            }
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>



            {/* ******** new html header *********** */}

            <header>
                <div className="top-bar border-bottom">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="left">
                                <ul className="d-flex gap-2 align-items-center">
                                    <li><span>Free shipping and returns over ₹499</span></li>
                                    <li>
                                        <span className="d-flex align-items-center">
                                            <i className="fa-light fa-phone-volume" />
                                            Call: <a href="#">+91 1234567890</a>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="d-flex align-items-center">
                                            <i className="fa-light fa-envelope" />
                                            Email: <a href="#">info@gaurikangan.com</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="right">
                                <select className="form-select form-select-sm border-0 rounded-0" aria-label="Default select example">
                                    <option selected={true}>India ( INR ₹ )</option>
                                    {/* <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                { /* Topbar end */}
                <nav className="navbar navbar-expand-lg" id="navbar_top">
                    <div className="container">
                        <Link className="navbar-brand" href="/"><img src="/assets/images/logo.png" alt="gourikangan" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /></button>

                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item dropdown has-megamenu position-relative">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">All</a>
                                    <div className="dropdown-menu megamenu border-0 rounded-4" role="menu">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Saree Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Gadwal Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Banarasi Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Trend Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-megamenu position-relative">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Cosmetics</a>
                                    <div className="dropdown-menu megamenu border-0 rounded-4" role="menu">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Jewellery Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Gadwal Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Banarasi Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Trend Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-megamenu position-relative">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Jewellery
                                        Collections</a>
                                    <div className="dropdown-menu megamenu border-0 rounded-4" role="menu">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Jewellery Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Gadwal Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Banarasi Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">
                                                <h4 className="badge rounded-pill">Trend Collections</h4>
                                                <ul>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanchipuram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Banarasi Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Kanjeevaram Fashion Saree
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">
                                                            Mysore Fashion Saree
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="#">Gifts</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">More</a></li>
                            </ul>
                        </div>
                        <div className="icon-menu">
                            <ul className="d-flex align-items-center gap-4">
                                <form onSubmit={handleSearchSubmit}>
                                    <div className="input-group search">
                                        <input
                                            type="text"
                                            className="form-control rounded-5"
                                            id="searchInput"
                                            placeholder=""
                                            aria-describedby="button-addon2"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <li>
                                    <a href="/my-account/wishlist">
                                        <i className="fa-light fa-heart" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/auth/login">
                                        <i className="fa-light fa-user" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/checkout">
                                        <i className="fa-light fa-cart-shopping" />
                                        <span className="badge position-absolute translate-middle badge rounded-pill bg-danger"> {totalCartItems} </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}