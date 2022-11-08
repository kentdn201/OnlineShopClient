import { Carousel } from "antd";

import React from "react";

const contentStyle = {
  height: "360px",
  color: "#fff",
  lineHeight: "360px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselAsset = () => {
  return (
    <Carousel autoplay style={{ padding: "0 64px" }}>
      <div>
        <h3 style={contentStyle}>
          <img
            alt="carousel"
            style={{ width: "100%", height: 360 }}
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/10/4/638004801120320356_F-H1_800x300.png"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            alt="carousel"
            style={{ width: "100%", height: 360 }}
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/10/31/638028570776479412_F-H1_800x300.png"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            alt="carousel"
            style={{ width: "100%", height: 360 }}
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/11/1/638028599985512353_F-H1_800x300.png"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            alt="carousel"
            style={{ width: "100%", height: 360 }}
            src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/11/2/638029800043175015_F-H1_800x300.png"
          />
        </h3>
      </div>
    </Carousel>
  );
};

export default CarouselAsset;
