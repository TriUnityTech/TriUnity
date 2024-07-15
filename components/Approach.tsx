import React from "react";
import ServiceCard from "./ui/ServiceCard";

const services = [
  {
    title: "Criação de métricas KPI",
    bgImage: "/S3.jpg",
  },
  {
    title: "Estruturação de BI",
    bgImage: "/S4.jpg",
  },
  {
    title: "Automação de Rotinas Administrativas",
    bgImage: "/S1.jpg",
  },
  {
    title: "Criação de relatórios e dashboards automatizados",
    bgImage: "/S2.jpeg",
  },
];

const Approach: React.FC = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        Serviços de<span className="text-purple"> BI e Automação</span>
      </h1>
      <div className="services gap-5 grid mt-9 sm:text-2xl font-bold sm:grid-cols-2 items-center justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            bgImage={service.bgImage}
          />
        ))}
      </div>
    </section>
  );
};

export default Approach;
