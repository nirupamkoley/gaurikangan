import Image from 'next/image';

export default function AboutUs() {
    return (
        <div>
            <section className="fluid-block about-section border-bottom">
                <div className="container">
                    <div className="row clearfix">
                        {/*Content Column*/}
                        <div className="content-column col-md-6 col-sm-12 col-xs-12 mt-5">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <div className="title fs-2">About Us</div>
                                    <h2 className="text-dark display-5 fw-bold">We Are The Leader In <br /> The Silk Industry</h2>
                                </div>
                                <div className="text">
                                    <p>Indian culture is full of heritage and tradition. Even in the 21st century, Indian women love to wear sarees. After years of saree evolution, toady sarees come in various trending designs.</p>
                                    <p>Keeping changing trends, and traditional form of saree making in mind, a store was established in 1945. Seven decades on... it&apos;s one of the most trusted and admired names in the world of silk sarees.</p>
                                    <p>Byrappa Silks was started in Chickpet, Bangalore. Since our inception, we&apos;ve emphasised on three aspects of our business-development of new products on a regular basis, building fair and trustworthy relationship with our producers, and maintaining exceptional quality standards in all our offerings.</p>
                                </div>
                            </div>
                        </div>
                        {/*Image Column*/}
                        <div className="image-column col-md-6 col-sm-12 col-xs-12">
                            <div className="inner-column" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="image">
                                    <img src="/assets/images/t-8.jpg" alt="" width={500} height={500} />
                                </div>
                            </div>
                        </div>
                        <div className='content-column'>
                            <div className='text'>
                                <p> Over the decades, we&apos;ve delighted our customers with our top notch products and services, and have always made sure that they get great value for their money. Our strength lies in our design originality, age-old saree making wisdom, unparalleled attention to the minutest of detail, and sublime mastery over weaving exceptional silk sarees.</p>
                                <p>Our sarees are made from the finest silk chosen by us, and created by our master crafters, who are associated with us for years. Our saree range includes - Antique Kanchipuram Sarees, New Generation Soft-wear Sarees, Shimmer Light Brocades, Designer Jadhkan Sarees, and Stretchable Kanchipuram Wedding Sarees. We offer a broad collection of sarees from various parts of Andhra Pradesh, Tamil Nadu, other South Indian States.</p>
                                <p>Today, we cater to both domestic and international customers, and use reliable logistics partners for delivery. Our significant online presence, and flexible return policies, make us an ideal choice for saree lovers from across the world to shop from, and wow one&apos;s senses.</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row clearfix g-5">
                        <div className="col-lg-4 content-column">
                            <div className="card rounded-0">
                                <div className="card-body p-5 text mb-0">
                                    <h4 className="card-title fw-bold mb-4 text-dark fs-3">Some quick example text to build on the card title and make up</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 content-column">
                            <div className="card rounded-0">
                                <div className="card-body p-5 text mb-0">
                                    <h4 className="card-title fw-bold mb-4 text-dark fs-3">Some quick example text to build on the card title and make up</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 content-column">
                            <div className="card rounded-0">
                                <div className="card-body p-5 text mb-0">
                                    <h4 className="card-title fw-bold mb-4 text-dark fs-3">Some quick example text to build on the card title and make up</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
            {/* Feature 2 end */}
        </div>
    );
}