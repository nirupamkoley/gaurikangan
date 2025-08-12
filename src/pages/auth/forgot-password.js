export default function ForgotPassword() {
    return (
        <div>
            <section className="fluid-block bg-light py-2 login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <h2 className="text-center text-dark mt-5 fw-bold ztext-white">Change Password</h2>
                            <div className="card my-5 border-0 rounded-0 overflow-hidden shadow-lg">
                                <div className="card-top bg-light" />
                                <form className="card-body p-5">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Old Password" />
                                        <label htmlFor="floatingPassword">Old Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="New Password" />
                                        <label htmlFor="floatingPassword">New Password</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" />
                                        <label htmlFor="floatingPassword">Confirm Password</label>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-primary w-100">Change Password</button>
                                    </div>
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
        </div>

    )
}