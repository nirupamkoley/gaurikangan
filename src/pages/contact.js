export default function Contact() {
    return (
        <div>
            <section className="fluid-block contact border-bottom">
                <div className="container col-lg-7">
                    <div className="title-div text-center">
                        <h2 className="text-uppercase fw-bold mb-0">Get In Touch With Us</h2>
                        <small className="fs-5 text-muted">Contact Byrappa</small>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-12">
                            <div className="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7776.101919293287!2d77.577606!3d12.968591!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1608fab66d39%3A0xda11377154ca0b1d!2sByrappa%20Silks!5e0!3m2!1sen!2sin!4v1746096218782!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h2 className="fs-4 fw-bold mb-4 text-dark">Contact Information</h2>
                            <div className="card rounded-0">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-4">
                                        <div className="left">
                                            <div className="icon"><i className="bi bi-geo-alt" /></div>
                                        </div>
                                        <div className="right">
                                            <span className="fs-5">184, Chickpet Rd, opp. Devata Market, Ragipet, Chickpet, Bengaluru, Karnataka 560053</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mb-4 border-bottom pb-4">
                                        <div className="left">
                                            <div className="icon"><i className="bi bi-envelope" /></div>
                                        </div>
                                        <div className="right">
                                            <span className="fs-5"><a href="mailto:byrappasilks@gmail.com">byrappasilk@gmail.com</a></span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="left">
                                            <div className="icon"><i className="bi bi-telephone" /></div>
                                        </div>
                                        <div className="right">
                                            <span className="fs-5"><a href="tel:9019391045">+91 9019391045</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-form">
                                <h2 className="fs-4 fw-bold mb-4 text-dark">Get a Free Quote</h2>
                                <form>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control rounded-0 shadow-none" id="name" placeholder="enter your name" />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control rounded-0 shadow-none" id="email" placeholder="enter email" />
                                        <label htmlFor="email">Email Address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control rounded-0 shadow-none" id="phone" placeholder="enter phone number" />
                                        <label htmlFor="phone">Phone Number</label>
                                    </div>
                                    <div className="form-floating">
                                        <textarea className="form-control rounded-0 shadow-none" placeholder="Leave a comment here" id="message" style={{ height: 100 }} defaultValue={""} />
                                        <label htmlFor="message">Message</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal search-modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <i className="bi bi-star-fill" />
                                        <i className="bi bi-star-fill" />
                                        <i className="bi bi-star-fill" />
                                        <i className="bi bi-star-fill" />
                                        <i className="bi bi-star-fill" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Title of your review</label>
                                    <input type="text" className="form-control shadow-none" id="recipient-name" placeholder="If you could say it in one sentence, what would you say?" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Your review</label>
                                    <textarea className="form-control shadow-none" rows={5} id="message-text" placeholder="Write your review to help others learn about this online business" defaultValue={""} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Upload Photo ( Optional )</label>
                                    <div className="input-group">
                                        <input type="file" className="form-control" id="inputGroupFile02" />
                                        <label className="input-group-text rounded-0" htmlFor="inputGroupFile02">Upload</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check d-flex gap-2">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut.
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
    );
}