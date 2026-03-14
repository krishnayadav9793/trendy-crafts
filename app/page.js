"use client"
import ItemBox from "@/components/itemCard";
import Header from "@/components/header";
import PulseLoader from "@/components/pulseloader";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/image");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const { data } = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Fetch error:", e);
        setError("Failed to load products. Please try again.");
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-950 font-sans">

      {/* Header — must be full width, not constrained */}
      <Header />

      <main className="flex-1 w-full px-4 py-6 md:px-8 lg:px-12">

        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
            <PulseLoader size="lg" icon="logo" square speed={2400} />
            <p className="text-sm text-zinc-500" style={{ fontFamily: "'Sora', sans-serif" }}>
              Loading products…
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <PulseLoader size="md" variant="error" icon="x" />
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs text-purple-400 hover:text-purple-300 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-zinc-500 text-sm">No products found.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
              <ItemBox key={item._id} item={item} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}