"use client"
import Image from "next/image";
import ItemBox from "@/components/itemCard";
import Header from "@/components/header";
import { useEffect, useState } from "react";
export default function Home() {
  const [ products, setProducts ] = useState([]);
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

    <div className="flex min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <div className="flex flex-row gap-4">
        {products.map((item) => (
          <ItemBox key={item._id} item={item} />
        ))}


      </div>


    </div>
  );
}
