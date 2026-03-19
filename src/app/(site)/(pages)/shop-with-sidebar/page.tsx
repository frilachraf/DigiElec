import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import { apiClient } from "@/lib/api-client";
export const metadata: Metadata = {
  title: "Shop Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Page for NextCommerce Template",
  // other metadata
};

const ShopWithSidebarPage = async () => {
    // const { data, success, error } = await apiClient.get('/wc/products')
    const res = await fetch('http://localhost:8000/api/wc/products')
    // const {data: wc} = await apiClient.get("/wc/products")
    const data = await res.json()
    console.log(data.data)

  return (
    <main className="">
    <ShopWithSidebar data={data.data}/>
     {/* <pre className="mt-40 text-wrap">
     {JSON.stringify(data.data)}
     </pre> */}
    </main>
  );
};

export default ShopWithSidebarPage;
