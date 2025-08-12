import Image from 'next/image';

export default function Blog() {
    return (
        <div>
            <section className="fluid-block blog-banner py-5">
                <div className="container">
                    <a href="#" className="image-container mb-4 rounded-0">
                        <img src="/assets/images/slider-1.jpg" alt="Blog Banner" width={1200} height={600} />
                    </a>
                    <div className="blog-listing">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="card rounded-0 overflow-hidden border-0 shadow-sm">
                                    <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                        <img src="/assets/images/k-1.jpg" alt="Blog Post 1" width={400} height={300} />
                                    </a>
                                    <div className="card-body p-4">
                                        <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green with allover brocade weaves in borderless style</a>
                                        <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="card rounded-0 overflow-hidden border-0 shadow-sm">
                                    <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                        <img src="/assets/images/k-1.jpg" alt="Blog Post 2" width={400} height={300} />
                                    </a>
                                    <div className="card-body p-4">
                                        <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green with allover brocade weaves in borderless style</a>
                                        <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="card rounded-0 overflow-hidden border-0 shadow-sm">
                                    <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                        <img src="/assets/images/k-1.jpg" alt="Blog Post 3" width={400} height={300} />
                                    </a>
                                    <div className="card-body p-4">
                                        <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green with allover brocade weaves in borderless style</a>
                                        <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="card rounded-0 overflow-hidden border-0 shadow-sm">
                                    <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                        <img src="/assets/images/k-1.jpg" alt="Blog Post 4" width={400} height={300} />
                                    </a>
                                    <div className="card-body p-4">
                                        <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green with allover brocade weaves in borderless style</a>
                                        <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog banner end */}
            <section className="fluid-block blog border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-listing main-list">
                                <div className="title-div text-center mb-5 d-flex align-items-center justify-content-between stroke-none">
                                    <h2 className="fw-bold fs-3">All Blog Posts</h2>
                                    <a href="#" className="btn btn-outline-secondary">Explore More <i className="bi bi-chevron-right" /></a>
                                </div>
                                <div className="row g-4">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 5" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 6" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 7" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 8" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 9" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 10" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 11" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card rounded-0 overflow-hidden border-0 mb-2">
                                            <a href="#" className="image-box d-block rounded-0 overflow-hidden">
                                                <img src="/assets/images/k-1.jpg" alt="Blog Post 12" width={400} height={300} />
                                            </a>
                                            <div className="card-body p-4">
                                                <a href="#" className="btn btn-outline-primary mb-3">Daily Wear </a>
                                                <a href="#" className="card-title mb-3 d-block">Pure kanchipuram silk saree dual shade of mild pista green</a>
                                                <p className="card-text post-date"><small className="text-body-secondary">December 31, 2024</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-right-panel">
                                <div className="title-div text-center mb-4 d-flex align-items-center justify-content-between stroke-none">
                                    <h2 className="fw-bold fs-4">Recent Posts</h2>
                                </div>
                                <a href="#" className="card mb-3 rounded-0 overflow-hidden">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img src="/assets/images/k-1.jpg" alt="Recent Post 1" width={150} height={100} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">This is a wider card with supporting text below as a natural</h5>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="card mb-3 rounded-0 overflow-hidden">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img src="/assets/images/k-1.jpg" alt="Recent Post 2" width={150} height={100} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">This is a wider card with supporting text below as a natural</h5>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="card mb-3 rounded-0 overflow-hidden">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img src="/assets/images/k-1.jpg" alt="Recent Post 3" width={150} height={100} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">This is a wider card with supporting text below as a natural</h5>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="card mb-3 rounded-0 overflow-hidden">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img src="/assets/images/k-1.jpg" alt="Recent Post 4" width={150} height={100} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">This is a wider card with supporting text below as a natural</h5>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="btn btn-outline-secondary w-100">Show more posts <i className="bi bi-chevron-right" /></a>
                                <div className="title-div text-center mb-4 mt-5 d-flex align-items-center justify-content-between stroke-none">
                                    <h2 className="fw-bold fs-4">Category</h2>
                                </div>
                                <ul className="d-flex gap-2 flex-wrap ctg">
                                    <li><a href="#" className="py-2 px-3 border">Wedding</a></li>
                                    <li><a href="#" className="py-2 px-3 border">Engagement</a></li>
                                    <li><a href="#" className="py-2 px-3 border">Aniversary</a></li>
                                    <li><a href="#" className="py-2 px-3 border">Birthday</a></li>
                                    <li><a href="#" className="py-2 px-3 border">Daily Wear Sarees</a></li>
                                    <li><a href="#" className="py-2 px-3 border">Party Wear Sarees</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example" className="mt-4">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link rounded-0 border-0 fs-5" href="#"><i className="bi bi-chevron-left" /></a></li>
                            <li className="page-item"><a className="page-link border-0 fs-5" href="#">1</a></li>
                            <li className="page-item"><a className="page-link border-0 fs-5" href="#">2</a></li>
                            <li className="page-item"><a className="page-link border-0 fs-5" href="#">3</a></li>
                            <li className="page-item"><a className="page-link rounded-0 border-0 fs-5" href="#"><i className="bi bi-chevron-right" /></a></li>
                        </ul>
                    </nav>
                </div>
            </section>
            <div className="modal search-modal fade" id="search-modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-0 rounded-0">
                        <div className="modal-body">
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <form>
                                <div className="input-group">
                                    <input type="text" className="form-control rounded-0" placeholder="Search your product" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}