import React, { Fragment, useEffect } from "react";
import Navigation from "../components/navigation/navigation";
import { delete_cookie } from "../constData";
import {
  PresentationChartLineIcon,
  ChartBarIcon,
  TruckIcon,
  CashIcon,
} from "@heroicons/react/outline";

function Home() {
  useEffect(() => {
    delete_cookie("user");
  }, []);

  const features = [
    {
      name: "Competitive software",
      description:
        "Fresh team, with fresh ideas and strong desire to take over the resturan software branch.",
      icon: ChartBarIcon,
    },
    {
      name: "Free software",
      description:
        "At the moment we are in a demo phase and any feedback would be gladly appreciated, so we decided to publish our software free out of charge with no hidden fees.",
      icon: CashIcon,
    },
    {
      name: "Orders are instant",
      description: "Ordering food has never been easier, scan order and enjoy!",
      icon: TruckIcon,
    },
    {
      name: "Admin side of things",
      description:
        "Managing everything from one place has never been easier, fly through orders with breeze and feel the money flowing into your bank account.",
      icon: PresentationChartLineIcon,
    },
  ];

  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <Navigation />
          </div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 grid grid-cols-2 md:gap-1 gap-12">
            <div className="sm:text-center lg:text-left col-span-2 md:col-span-1">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Software to bring your</span>{" "}
                <span className="block text-orange-600 xl:inline">
                  good food to life
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                We aim with our software to digitalize any food oriented
                business and make it even more successful, by providing the
                tools for it. Our software stands out with its colorful ui and
                it simplistic way of doing things. 😎
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
