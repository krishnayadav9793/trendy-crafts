"use client"
import Image from "next/image";
import ItemBox from "@/components/itemCard";
import Header from "@/components/header";
import { useEffect, useState } from "react";
export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const image = async () => {
      const res = await fetch("/api/image")
      const data = await res.json();
      console.log(data.data);
      setProducts(data.data);
    }
    image();
  }, [])
  return (

    // Root layout
    <div className="flex flex-col min-h-screen w-full bg-zinc-950 font-sans">
      <div className="w-screen">
          <Header />
      </div>
      
      <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <ItemBox key={item._id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
