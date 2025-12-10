import React, { useMemo } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

export default function LogoCarousel({ logos = [], slidesPerView = 6 }) {
  
  const list = useMemo(() => {
    const base = logos && logos.length > 0 ? logos : ["/default-logo.svg"];

    
    let result = [...base];
    while (result.length < slidesPerView * 2) {
      result = [...result, ...base];
    }
    return result;
  }, [logos, slidesPerView]);

  return (
    <div className="panel" style={{ padding: 12 }}>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={12}
        loop={true}
        
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          700: { slidesPerView: 4 },
          1000: { slidesPerView },
        }}
        navigation={false}
      >
        {list.map((logo, i) => (
          <SwiperSlide
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt={`logo-${i}`}
              style={{
                maxHeight: 48,
                objectFit: "contain",
                filter: "grayscale(100%) opacity(0.7)", 
                transition: "filter .2s",
              }}
              onMouseOver={(e) => (e.target.style.filter = "none")}
              onMouseOut={(e) =>
                (e.target.style.filter = "grayscale(100%) opacity(0.7)")
              }
              onError={(e) => {
                e.target.src = "/default-logo.svg";
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
