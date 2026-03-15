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
    <>
      {/* Fixed background — locked in place, never scrolls, covers the full viewport always */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundColor: "#09090b",
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 10%, rgba(109,40,217,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 90%, rgba(109,40,217,0.12) 0%, transparent 55%)
          `,
        }}
      />

      {/* Scrollable content layer on top of the fixed bg */}
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex flex-col min-h-screen w-full font-sans"
      >
        <Header />

        <main className="flex-1 w-full">
          <div className="px-4 py-6 md:px-8 lg:px-12">

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

          </div>
        </main>
      </div>
    </>
  );
}