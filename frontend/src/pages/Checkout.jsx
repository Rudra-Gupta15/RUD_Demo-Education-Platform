import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../state/CartContext.jsx";
import { Lock, CreditCard, Smartphone, ShieldCheck, Check, ArrowRight, Shield, Award, ChevronLeft } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";

export default function Checkout() {
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Calculations
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceStr = item.price || "0";
      const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, ""));
      return total + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceStr = item.originalPrice || item.price || "0";
      const orig = parseFloat(priceStr.replace(/[^\d.]/g, ""));
      return total + (isNaN(orig) ? 0 : orig);
    }, 0);
  };

  const total = calculateTotal();
  const originalTotal = calculateOriginalTotal();
  const discounts = originalTotal - total;
  const discountPercent = originalTotal > 0 ? Math.round(((originalTotal - total) / originalTotal) * 100) : 0;
  const subtotal = total;
  const gst = total * 0.18;
  const finalTotal = subtotal + gst;

  if (cartCount === 0) {
    return (
      <section className="relative min-h-screen bg-white pt-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Session Empty
          </div>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Your session is empty.</h2>
          <p className="text-slate-500 font-medium mb-12 max-w-md mx-auto">Re-initialize your learning roadmap by selecting a specialization from our catalog.</p>
          <Link to="/courses" className="bg-slate-900 text-white font-black py-4 px-10 rounded-xl text-xs uppercase tracking-[0.2em] transition hover:bg-brandprimary">
            Explore Catalog
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 relative">
      <SEO 
        title="Secure Checkout | Finalize Your Enrollment" 
        description="Complete your enrollment in ConvoSec AI's specialized technical programs. Secure your seat in the upcoming cohort today."
      />
      {/* Structural Background */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />

      {/* Checkout Header: Ultra Minimal */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-6 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">ConvoSec <span className="text-slate-400 font-medium italic">Checkout</span></span>
        </Link>
        <Link to="/cart" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition">
          <ChevronLeft size={14} /> Back to Cart
        </Link>
      </header>

      <main className="container-shell relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left Column: Transaction Details */}
          <div className="lg:col-span-7 space-y-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                Secure Transaction Layer
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">Complete <br /> Enrollment.</h1>
              <p className="text-slate-500 font-medium text-lg max-w-lg">Finalize your professional credentials and secure your seat in the upcoming cohort.</p>
            </Reveal>

            {/* Payment Portal */}
            <Reveal delay={0.2}>
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Payment Infrastructure</h2>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Shield size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Encrypted</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    { id: "upi", name: "UPI Transfer", desc: "Instant clearance via QR or VPA.", icon: Smartphone },
                    { id: "cards", name: "Credit/Debit Cards", desc: "Visa, Mastercard, or RuPay.", icon: CreditCard },
                    { id: "netbanking", name: "Institutional Banking", desc: "Direct secure bank transfer.", icon: Lock },
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${paymentMethod === method.id ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400'}`}>
                            <method.icon size={20} />
                          </div>
                          <div>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-1">{method.name}</h3>
                            <p className={`text-[11px] font-medium transition-colors ${paymentMethod === method.id ? 'text-slate-400' : 'text-slate-500'}`}>{method.desc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-white bg-white text-slate-900 scale-110' : 'border-slate-100 group-hover:border-slate-300'}`}>
                          {paymentMethod === method.id && <Check size={12} strokeWidth={4} />}
                        </div>
                      </div>

                      {paymentMethod === "upi" && method.id === "upi" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 pt-6 border-t border-white/10 space-y-4"
                        >
                          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-[11px] leading-relaxed italic text-slate-400">
                            A dynamic payment gateway will be initialized upon clicking "Finalize Enrollment". Please keep your mobile device ready for authorization.
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Verification Detail */}
            <Reveal delay={0.4}>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-1">Guaranteed Quality</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Full access to verified industrial curriculum and mentor networks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-1">Purchase Protection</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Secure transaction processing with a 30-day success guarantee.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Order Summary (Sticky Control Pane) */}
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <div className="lg:sticky lg:top-32 bg-white border border-slate-900 rounded-none overflow-hidden shadow-[30px_30px_0px_-5px_rgba(15,23,42,0.05)]">
                <div className="bg-slate-900 p-8 text-white">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-slate-500">Order Manifest</h2>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-6 group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden border border-white/10 shrink-0 transition-all duration-500">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-white line-clamp-1 uppercase tracking-wider">{item.title}</p>
                            <p className="text-[10px] text-slate-500 font-bold">PROFESSIONAL TRACK</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-white">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-4 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-6">
                    <div className="flex justify-between">
                      <span>Gross Val</span>
                      <span className="text-slate-900">₹{originalTotal.toFixed(2)}</span>
                    </div>
                    {discounts > 0 && (
                      <div className="flex justify-between text-brandprimary">
                        <span>Corporate Discount</span>
                        <span>-₹{discounts.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-slate-900">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Tax (GST 18%)</span>
                      <span className="text-slate-900">+₹{gst.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end py-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Payable</span>
                      <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">₹{finalTotal.toFixed(2)}</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">{cartCount} ITEM{cartCount > 1 ? 'S' : ''}</span>
                  </div>

                  <button 
                    onClick={async () => {
                      try {
                        for (const item of cartItems) {
                          await fetch(`/api/courses/${item.id}/enroll`, {
                            method: "POST",
                            headers: {
                              "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                          });
                        }
                        alert("Enrollment successful! Redirecting to your dashboard.");
                        navigate("/dashboard");
                      } catch (err) {
                        console.error("Enrollment failed", err);
                        alert("Transaction processing issue. Please contact support.");
                      }
                    }}
                    className="w-full relative group bg-slate-900 text-white rounded-none px-8 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-brandprimary overflow-hidden shadow-2xl shadow-slate-200"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Finalize Enrollment
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>

                  <div className="flex items-center justify-center gap-6 opacity-30 pt-4">
                    <div className="flex items-center gap-2">
                      <Shield size={10} />
                      <span className="text-[8px] font-black uppercase tracking-widest">PCI-DSS Level 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={10} />
                      <span className="text-[8px] font-black uppercase tracking-widest">ISO 27001 Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </main>

      {/* Corporate Footer (Minimal) */}
      <footer className="relative z-10 border-t border-slate-100 py-12">
        <div className="container-shell flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">"Pioneering Industrial Intelligence & Cyber Defense."</p>
          <div className="flex gap-8">
            {['Refund Policy', 'Privacy Shield', 'Security Protocols'].map(item => (
              <Link key={item} to="#" className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:text-brandprimary transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

