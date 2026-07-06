import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import sbs1 from "../assets/sbs1.jpeg";
import sbs2 from "../assets/sbs2.jpeg";
import sbs3 from "../assets/sbs3.jpeg";

export default function Landing() {
  const images = [sbs1,sbs2,sbs3];
  const [current, setCurrent] = useState(0);

  // Change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>Smart Booking System</h1>
          <p>Book rooms smarter, faster and easier.</p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Login
            </Link>
            <Link to="/register" className="secondary-btn">
              Register
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}