import SideBar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { apiRequest } from "../../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

// server side props
export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies._customer_token || null;
    
    // fetch user data
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/fetch_shipping_addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    // Check if the response is valid
    if (!res.ok) {
        return {
          notFound: true,
        };
    }

    const data = await res.json();
    // check if user is authenticated
    if (!data.success) {
        // destroy the cookie
        Cookies.remove("_customer_token");
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }
    return {
        props: {
            data,
        },
    };
}


export default function Address({ data }) {

    // console.log('user data', data);
    const [user_data, setUserData] = useState(data.userDetails);
    const [addressList, setAddressList] = useState(data.shippingAddressList);
    const [isLoading, setIsLoading] = useState(false);

    // user information
    const [contactID, setContactID] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [contact, setContact] = useState('');
    const [alt_contact, setAltContact] = useState('');
    const [addressField, setAddressField] = useState('');
    const [pin_code, setPincode] = useState('');
    const [area, setArea] = useState('');
    const [location, setLocation] = useState('home');

    // add new address
    const addNewAddressButton = async () => {
        setContactID('');
        setFname('');
        setLname('');
        setContact('');
        setAltContact('');
        setAddressField('');
        setPincode('');
        setArea('');
        setLocation('home');
    }

    // fetch addresses
    const fetchAddressData = async (id) => {
        let formData = new FormData();
        formData.append("user_id", user_data.user_id);
        formData.append("id", id);

        const res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/user/fetch_shipping_address`, {
            method: "POST",
            body: formData,
        });
        if (res.success) {
            setContactID(res.shippingDetails.id);
            setFname(res.shippingDetails.fname);
            setLname(res.shippingDetails.lname);
            setContact(res.shippingDetails.contact);
            setAltContact(res.shippingDetails.alt_contact);
            setAddressField(res.shippingDetails.address);
            setPincode(res.shippingDetails.pin_code);
            setArea(res.shippingDetails.area);
            setLocation(res.shippingDetails.location);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nothing to Show!',
            });
        }
    }

    // save address
    const saveAddress = async () => {
        let formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("contact", contact);
        formData.append("alt_contact", alt_contact);
        formData.append("address", addressField);
        formData.append("pin_code", pin_code);
        formData.append("area", area);
        formData.append("location", location);
        formData.append("customer_id", user_data.user_id);
        let res; // Declare res outside the if-else block

        if (contactID) {
            formData.append("id", contactID);

            res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/user/update_shipping_address`, {
                method: "POST",
                body: formData,
            });
        }else {
            res = await apiRequest(`${process.env.NEXT_PUBLIC_API_URL}/user/add_shipping_address`, {
                method: "POST",
                body: formData,
            });
        }

        if (res.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message,
            });
            setContactID('');
            setFname('');
            setLname('');
            setContact('');
            setAltContact('');
            setAddressField('');
            setPincode('');
            setArea('');
            setLocation('home');
            setAddressList(res.shippingAddressList);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.message,
            });
        }
    }

    return (
        <div>
            <section className="fluid-block cart profile border-bottom">
                <div className="container">
                    <div className="row col-lg-10 col-sm-12 mx-auto">
                        {/* Left Column */}
                        <SideBar userData={user_data} />
                        {/* Right Column */}
                        <div className="col-lg-9">
                            <div className="card rounded-2 profile-form address-form">
                                <div className="card-body p-4">
                                    <div className="field-item mb-4">
                                        <div className="d-flex align-items-center gap-3 justify-content-between mb-4">
                                            <div className="card-title fw-bold fs-5">Manage Addresses</div>
                                            <button className="btn btn-outline-secondary btn-sm rounded-2 fw-bold text-uppercase add-btn" onClick={addNewAddressButton}><i className="bi bi-plus-lg" /> Add New Address</button>
                                        </div>
                                        {/* Title end */}
                                        <div className="p-4 bg-light rounded-0 border">
                                            <div className="card-title fw-bold fs-5 fs-sm text-uppercase mb-3">Update Address Info</div>
                                            <div className="row g-3">
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={fname} onChange={(e) => setFname(e.target.value)} />
                                                        <label htmlFor="Name">First Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={lname} onChange={(e) => setLname(e.target.value)} />
                                                        <label htmlFor="Name">Last Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
                                                        <label htmlFor="Mobile">10-digit mobile number</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={alt_contact} onChange={(e) => setAltContact(e.target.value)} />
                                                        <label htmlFor="AlternatePhone">Alternate Phone (Optional)</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={pin_code} onChange={(e) => setPincode(e.target.value)} />
                                                        <label htmlFor="Pincode">Pincode</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-floating">
                                                        <input type="text" className="form-control" value={area} onChange={(e) => setArea(e.target.value)} />
                                                        <label htmlFor="Locality">Locality</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-floating">
                                                        <select 
                                                            className="form-control" 
                                                            id="countrySelect" 
                                                            // disabled={true} 
                                                            defaultValue="IN">
                                                            <option value="IN">India</option>
                                                        </select>
                                                        <label htmlFor="countrySelect">Country</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-floating">
                                                        <textarea className="form-control" style={{ height: 100 }} value={addressField} onChange={(e) => setAddressField(e.target.value)} />
                                                        <label htmlFor="floatingTextarea2Disabled">Address (Area and Street)</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="field-item">
                                                        <div className="d-flex align-items-center gap-4">
                                                            <div className="card-title fs-5 mb-2 fs-sm">Address Type</div>
                                                            {/* Title end */}
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="flexRadioDefault1"
                                                                    checked={location === 'home'} // Correctly set the checked attribute
                                                                    onChange={() => setLocation('home')} // Update the state when selected
                                                                />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    Home
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="flexRadioDefault"
                                                                    id="flexRadioDefault2"
                                                                    checked={location === 'work'} // Correctly set the checked attribute
                                                                    onChange={() => setLocation('work')} // Update the state when selected
                                                                />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                    Work
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        isLoading ? 
                                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md mt-4" disabled>
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                Loading...
                                                            </button>
                                                        : 
                                                            <button className="btn btn-primary rounded-2 fw-bold text-uppercase btn-md mt-4" onClick={saveAddress}>Save Address</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Address Form end */}
                                    {addressList && addressList.map((item, index) => (
                                        <div className="card selected-address" key={index}>
                                            <div className="card-body">
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <div className="badge text-muted p-2 text-uppercase">{item.location}</div>
                                                    <div className="btn-group dd">
                                                        <button type="button" className="btn btn-danger rounded-2 btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="#000000" fill="none">
                                                                <path d="M13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6C12.8284 6 13.5 5.32843 13.5 4.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                                <path d="M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                                                                <path d="M13.5 19.5C13.5 18.6716 12.8284 18 12 18C11.1716 18 10.5 18.6716 10.5 19.5C10.5 20.3284 11.1716 21 12 21C12.8284 21 13.5 20.3284 13.5 19.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                            </svg>
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#" onClick={() => fetchAddressData(item.id)}>Edit</a></li>
                                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-4 py-2 mb-2 border-bottom">
                                                    <div className="fw-bold">{item.fname} {item.lname}</div>
                                                    <div className="fw-bold">{item.contact} / {item.alt_contact}</div>
                                                </div>
                                                <p className="mb-0">{item.address} - <strong>{item.pin_code}</strong></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}