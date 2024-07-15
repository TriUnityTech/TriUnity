import React from "react";

interface ServiceCardProps {
  title: string;
  bgImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, bgImage }) => {
  return (
    <div
      className="service-card flex items-center sm:min-h-80 md:min-h-64 justify-center text-center p-16 rounded-3xl border border-purple"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="service-title text-white">{title}</p>
    </div>
  );
};

export default ServiceCard;
