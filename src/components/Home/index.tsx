import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = async () => {
  const res = await fetch('http://localhost:8000/ui/home/all')
  const categoriesRes = await fetch('http://localhost:8000/categories')
   const data = await res.json()
   const categories = await categoriesRes.json()
   console.log(categories, res)

  return (
    <main>
      <Hero data={data.hero}/>
      <Categories data={categories.data}/>
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      {/* <Testimonials /> */}
      <Newsletter />
    </main>
  );
};

export default Home;
