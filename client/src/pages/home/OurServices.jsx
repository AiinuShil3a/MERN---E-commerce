import React from "react";

const serviceList = [
  {
    id: 1,
    title: "High-Quality Products",
    description: "We offer",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "High-Quality Products",
    description: "We offer",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 3,
    title: "High-Quality Products",
    description: "We offer",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 4,
    title: "High-Quality Products",
    description: "We offer",
    image: "/images/home/services/assurance.png",
  },
]

const OurServices = () => {
  return (
    <div className="section-container bg gradient-to-r from=[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-12">
        <div className="md:w-1/2 space-y-7 px-4">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {
              serviceList.map((service) => (
                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red cursor-pointer hover:border hover:text-blue transition-all duration-200">
                  <img src={service.image} alt="This is images" className="mx-auto h-16" />
                  <h5 className="pt-3 font-semibold">{service.title}</h5>
                  <p className="text-[#bd9090]">{service.description}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <div className="text-left md:wd:w-4/5">
            <p className="subtitle"> OUR STORY & SERVICES </p>
          </div>
          <h2 className="title">Oue Journey And Services</h2>
          <p className="my-5 text-blue leading-[30px]">
            We provide a curated selection of high-quality tech-inspired
            products, backed by fast shipping and exceptional customer
            service.Our mission is to empower and inspire tech enthusiasts
            through our carefully chosen merchandise and community engagement
            initiatives.
          </p>
          <button className="btn bg-red px-8 py-3 font-semibold text-white rounded-full">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
