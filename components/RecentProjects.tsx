"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const Projects = () => {
  return (
    <div id="projects" className="py-20">
      <h1 className="heading">
        Alguns de <span className="text-purple">nossos trabalhos recentes</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-28 md:gap-y-60 my-14 sm:mt-32">
        {projects.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card h-auto  flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <PinContainer title={item.link} href={item.link}>
              <div className="relative h-auto flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden mb-10">
                <div className="sm:max-h-52 h-48 w-full"></div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>
              </a>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Ver projeto
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
