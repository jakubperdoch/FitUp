import React from "react";
import InformationCardFirst from "@/assets/images/information-card--first.svg";
import InformationCardSecond from "@/assets/images/information-card--second.svg";
import InformationCardThird from "@/assets/images/information-card--third.svg";
import InformationCardFourth from "@/assets/images/information-card--fourth.svg";
import InformationCardFifth from "@/assets/images/information-card--fifth.svg";

const RandomImageComponent = ({ height, width }) => {
  const images = [
    <InformationCardFirst height={height} width={width} />,
    <InformationCardSecond height={height} width={width} />,
    <InformationCardThird height={height} width={width} />,
    <InformationCardFourth height={height} width={width} />,
    <InformationCardFifth height={height} width={width} />,
  ];

  return images[Math.floor(Math.random() * images.length)];
};

export default RandomImageComponent;