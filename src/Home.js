import React from 'react'
import Header from './Header';
import Product from './Product';
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <Header />
            <img 
                className="home__image"
                // src="https://interviewquery-assets.s3-us-west-1.amazonaws.com/images/Amazon_Banner.png"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                alt=""
            />

            {/* product id, title, price, rating, image */}
            <div className="home__row">
                <Product
                    id="12321341"
                    title="The Power of Pivoting"
                    price={11.96}
                    rating={4}
                    image="https://images-platform.99static.com//40HpnwANNvsJJc0DI4MBvFvNIPU=/422x112:1471x1161/fit-in/500x500/99designs-contests-attachments/124/124595/attachment_124595315"
                />
                <Product
                    id="12321342"
                    title="IPhone 14 Plus"
                    price={1299.99}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/61YSNhAb00L._AC_UF894,1000_QL80_.jpg"
                />
            </div>

            <div className="home__row">
                <Product
                    id="12321343"
                    title="6 pcs Fridge Storage Bins"
                    price={36.99}
                    rating={4}
                    image="https://food.fnr.sndimg.com/content/dam/images/food/products/2022/1/24/rx_refrigerator-organizer-bins.jpeg.rend.hgtvcom.616.616.suffix/1643049170642.jpeg"
                />
                <Product
                    id="12321344"
                    title="ULTREAN Air Fryer"
                    price={119.99}
                    rating={3}
                    image="https://m.media-amazon.com/images/I/61TG1L3DV1L._AC_UF894,1000_QL80_.jpg"
                />
                <Product
                    id="12321345"
                    title="HP Touch-Screen Laptop"
                    price={599.99}
                    rating={4}
                    image="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6510/6510531_rd.jpg"
                />
            </div>

            <div className="home__row">
                <Product
                    id="12321346"
                    title="Giant Stuffed Grey TeddyBear"
                    price={98.78}
                    rating={2}
                    image="https://i5.walmartimages.com/asr/37eb14c4-cb81-4fd0-8318-812b08e8c805.970c588f36d6ace429c09933c3398e0e.jpeg"
                />
            </div>
        </div>
    )
}

export default Home