// app/product/[id]/page.jsx
"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PulseLoader from "@/components/pulseloader";
import {
  ShoppingBag, Heart, ArrowLeft, Star, Shield,
  Truck, RotateCcw, Share2, ChevronLeft, ChevronRight
} from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product,     setProduct]     = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [imgIndex,    setImgIndex]    = useState(0);
  const [wishlisted,  setWishlisted]  = useState(false);
  const [quantity,    setQuantity]    = useState(1);
  const [activeTab,   setActiveTab]   = useState("description");
  const [added,       setAdded]       = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/image/${id}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const { data } = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = product?.images?.length ? product.images : [product?.image].filter(Boolean);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
                    <PulseLoader size="lg" icon="logo" square speed={2400} />
                    <p className="text-sm text-zinc-500" style={{ fontFamily: "'Sora', sans-serif" }}>
                      Loading products…
                    </p>
                  </div>
  );

  if (error || !product) return (
    <div className="min-h-screen bg-[#04050e] flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');`}</style>
      <p className="text-red-400 text-sm">{error || "Product not found."}</p>
      <button onClick={() => router.back()} className="text-xs text-purple-400 hover:text-purple-300 underline">
        Go back
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#04050e] text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pop { 0%,100% { transform:scale(1); } 50% { transform:scale(1.12); } }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .pop { animation: pop 0.3s ease; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2d1f6e; border-radius: 2px; }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 bg-[#04050e]/80 backdrop-blur-md border-b border-[#1a1d35]">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-[10px] font-bold">TC</div>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">Trendy Crafts</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`p-2 rounded-xl border transition-all duration-200 ${wishlisted ? "border-pink-500/50 bg-pink-500/10 text-pink-400" : "border-[#1e2240] text-gray-400 hover:border-purple-500/50 hover:text-purple-300"}`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-pink-400" : ""}`} />
          </button>
          <button className="p-2 rounded-xl border border-[#1e2240] text-gray-400 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-200">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* ── Left: Image gallery ── */}
          <div className="flex flex-col gap-4 fade-up">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0a0c1e] border border-[#1a1d35] group">
              {images[imgIndex] ? (
                <img
                  src={images[imgIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {product.emoji || "🛍"}
                </div>
              )}

              {/* PRO badge */}
              {product.tag && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#0d0f20]/90 backdrop-blur-sm border border-purple-500/30 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-[10px] font-bold text-purple-300 tracking-widest uppercase">{product.tag}</span>
                </div>
              )}

              {/* Image nav arrows — only if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-200 ${
                      imgIndex === i ? "border-purple-500 scale-95" : "border-[#1e2240] hover:border-purple-500/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges — desktop only */}
            <div className="hidden lg:grid grid-cols-3 gap-3 mt-2">
              {[
                { icon: <Truck className="w-4 h-4" />,       label: "Free Delivery",   sub: "On orders above ₹499" },
                { icon: <RotateCcw className="w-4 h-4" />,   label: "Easy Returns",    sub: "Within 7 days"         },
                { icon: <Shield className="w-4 h-4" />,      label: "Secure Payment",  sub: "100% protected"        },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-[#0a0c1e] border border-[#1a1d35]">
                  <span className="text-purple-400">{b.icon}</span>
                  <p className="text-xs font-medium text-white">{b.label}</p>
                  <p className="text-[10px] text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product details ── */}
          <div className="flex flex-col gap-6 fade-up" style={{ animationDelay: "80ms" }}>

            {/* Category + title */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">
                {product.category || "Premium Craft"}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4"
                      fill={n <= Math.round(product.rating ?? 4.9) ? "#f59e0b" : "none"}
                      stroke={n <= Math.round(product.rating ?? 4.9) ? "#f59e0b" : "#4b5563"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-amber-400">{product.rating ?? "4.9"}</span>
                <span className="text-xs text-gray-500">({product.reviews ?? "128"} reviews)</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  (product.stock ?? 1) > 0
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {(product.stock ?? 1) > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-bold tracking-tight">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-600 line-through">₹{product.originalPrice}</span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            {product.shortDesc && (
              <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-purple-500/40 pl-4">
                {product.shortDesc}
              </p>
            )}

            {/* Quantity selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-400 tracking-widest uppercase">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0 bg-[#0a0c1e] border border-[#1e2240] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-light"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-lg font-light"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Total: <span className="text-white font-semibold">₹{(product.price * quantity).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 relative overflow-hidden group ${
                  added
                    ? "bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                }`}
                style={added ? {} : { background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
              >
                {added ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
                {!added && <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />}
              </button>

              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 shrink-0 ${
                  wishlisted
                    ? "border-pink-500/50 bg-pink-500/10 text-pink-400"
                    : "border-[#1e2240] text-gray-400 hover:border-pink-500/50 hover:text-pink-400 hover:bg-pink-500/5"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-pink-400" : ""}`} />
              </button>
            </div>

            {/* Buy now */}
            <button className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition-all duration-200">
              Buy Now
            </button>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#1e2240] to-transparent" />

            {/* Tabs */}
            <div>
              <div className="flex gap-1 bg-[#0a0c1e] border border-[#1e2240] rounded-xl p-1 mb-4">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === "description" && (
                <p className="text-sm text-gray-400 leading-relaxed">
                  {product.description || "This beautiful handcrafted item is made with the finest materials, perfect as a gift or for personal use. Each piece is unique and crafted with care by skilled artisans."}
                </p>
              )}

              {activeTab === "details" && (
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Category",   value: product.category  ?? "Handcrafted"    },
                    { label: "Material",   value: product.material  ?? "Premium Quality" },
                    { label: "Weight",     value: product.weight    ?? "250g"            },
                    { label: "SKU",        value: product._id?.slice(-8).toUpperCase() ?? "TC-0001" },
                    { label: "Ships in",   value: "2–4 business days" },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between py-2.5 border-b border-[#0f1226] last:border-0">
                      <span className="text-xs text-gray-500">{d.label}</span>
                      <span className="text-xs font-medium text-gray-200">{d.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Aisha K.",   rating: 5, text: "Absolutely beautiful! The quality exceeded my expectations.", date: "Mar 10" },
                    { name: "Zara M.",    rating: 5, text: "Perfect gift. Arrived well-packaged and exactly as described.", date: "Feb 28" },
                    { name: "Fatima R.", rating: 4, text: "Lovely product, very well crafted. Will order again.", date: "Feb 15" },
                  ].map((r) => (
                    <div key={r.name} className="p-4 rounded-xl bg-[#0a0c1e] border border-[#1a1d35]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {r.name[0]}
                          </div>
                          <span className="text-xs font-medium">{r.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((n) => (
                            <Star key={n} className="w-3 h-3" fill={n <= r.rating ? "#f59e0b" : "none"} stroke={n <= r.rating ? "#f59e0b" : "#4b5563"} />
                          ))}
                          <span className="text-[10px] text-gray-500 ml-1">{r.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust badges — mobile only */}
        <div className="grid grid-cols-3 gap-3 mt-8 lg:hidden">
          {[
            { icon: <Truck className="w-4 h-4" />,     label: "Free Delivery",  sub: "Above ₹499"   },
            { icon: <RotateCcw className="w-4 h-4" />, label: "Easy Returns",   sub: "Within 7 days" },
            { icon: <Shield className="w-4 h-4" />,    label: "Secure Payment", sub: "100% safe"     },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-[#0a0c1e] border border-[#1a1d35]">
              <span className="text-purple-400">{b.icon}</span>
              <p className="text-[11px] font-medium text-white">{b.label}</p>
              <p className="text-[10px] text-gray-500">{b.sub}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}