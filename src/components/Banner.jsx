import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, MobileStepper, IconButton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import banner1 from "../assests/images/banner1.png";
import banner2 from "../assests/images/banner2.png";
import banner3 from "../assests/images/banner3.png";
import banner4 from "../assests/images/banner4.png";

const images = [banner1, banner2, banner3, banner4];

export default function Banner() {
  const [activeStep, setActiveStep] = useState(0);
  const swiperRef = useRef(null);
  const maxSteps = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      swiperRef.current?.slideNext();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => swiperRef.current?.slideNext();
  const handleBack = () => swiperRef.current?.slidePrev();

  return (
    <Box
      sx={{
        position: "relative",
        mt: 3,
        borderRadius: 2,
        overflow: "hidden",
        maxWidth: "100%",
      }}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        resistanceRatio={0.85}
        style={{ width: "100%" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={src}
              alt={`slide-${index}`}
              sx={{
                width: "100%",
                height: { xs: 180, sm: 220, md: 300 },
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <IconButton
        onClick={handleBack}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.7)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ justifyContent: "center", mt: 1, background: "transparent" }}
        nextButton={<div />}
        backButton={<div />}
      />
    </Box>
  );
}
