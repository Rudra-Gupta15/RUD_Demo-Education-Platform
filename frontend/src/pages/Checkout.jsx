import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext.jsx";
import { Lock, CreditCard, Smartphone, ShieldCheck, Check } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

export default function Checkout() {
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();
  const [country, setCountry] = useState("India");
  const [stateTerritory, setStateTerritory] = useState("Maharashtra");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Calculations
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return total + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((total, item) => {
      const orig = item.originalPrice ? parseFloat(item.originalPrice.replace(/[^\d.]/g, "")) : parseFloat(item.price.replace(/[^\d.]/g, ""));
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
      <section className="container-shell min-h-screen pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <Reveal>
          <h2 className="text-2xl font-black text-slate-800">Your checkout is empty</h2>
          <p className="text-slate-500 mt-2">Add some courses to your cart before checking out.</p>
          <Link to="/learning" className="mt-6 inline-flex bg-brandprimary text-white font-bold py-3 px-6 rounded-xl text-sm transition hover:bg-indigo-700">
            Explore Courses
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Checkout Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-brandprimary" size={28} />
          <span>Synapse<span className="text-brandprimary">Learn</span></span>
        </Link>
        <Link to="/cart" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition">
          Cancel
        </Link>
      </header>

      <main className="container-shell py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
            </Reveal>



            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Payment method</h2>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Lock size={12} /> Secure and encrypted
                </span>
              </div>

              {/* Options */}
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
                
                {/* UPI Option */}
                <div className={`p-4 transition ${paymentMethod === "upi" ? "bg-slate-50" : "bg-white"}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === "upi"} 
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 text-brandprimary focus:ring-brandprimary" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-800">UPI</span>
                        <div className="flex items-center bg-white border border-slate-100 rounded px-2 py-0.5 text-[10px] font-black tracking-widest text-slate-400">UPI</div>
                      </div>
                      
                      {paymentMethod === "upi" && (
                        <div className="mt-4 bg-white border border-slate-200/60 rounded-xl p-4 text-xs font-medium text-slate-600 space-y-3 shadow-sm animate-fade-in">
                          <p>After generating the QR code you can use your preferred UPI app to complete the payment.</p>
                          <p className="font-bold text-slate-800">Click the "Proceed" button to generate a QR code for UPI payment.</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Cards Option */}
                <div className={`p-4 transition ${paymentMethod === "cards" ? "bg-slate-50" : "bg-white"}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === "cards"} 
                      onChange={() => setPaymentMethod("cards")}
                      className="mt-1 text-brandprimary focus:ring-brandprimary" 
                    />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">Cards</span>
                      <div className="flex items-center gap-1.5 opacity-70">
                        <span className="text-[10px] font-bold text-slate-400">VISA</span>
                        <span className="text-[10px] font-bold text-slate-400">MC</span>
                        <span className="text-[10px] font-bold text-slate-400">RuPay</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Net Banking */}
                <div className={`p-4 transition ${paymentMethod === "netbanking" ? "bg-slate-50" : "bg-white"}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === "netbanking"} 
                      onChange={() => setPaymentMethod("netbanking")}
                      className="mt-1 text-brandprimary focus:ring-brandprimary" 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-slate-800">Net Banking</span>
                    </div>
                  </label>
                </div>

                {/* Mobile Wallets */}
                <div className={`p-4 transition ${paymentMethod === "wallets" ? "bg-slate-50" : "bg-white"}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      checked={paymentMethod === "wallets"} 
                      onChange={() => setPaymentMethod("wallets")}
                      className="mt-1 text-brandprimary focus:ring-brandprimary" 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-slate-800">Mobile Wallets</span>
                    </div>
                  </label>
                </div>

              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 mb-20">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-3">Order details ({cartCount})</h2>
              
              <div className="divide-y divide-slate-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-12 h-10 object-cover rounded-md border border-slate-100" />
                      <p className="text-xs font-bold text-slate-800 line-clamp-1 max-w-sm">{item.title}</p>
                    </div>
                    <span className="text-xs font-black text-slate-900">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-1 bg-slate-50 border-0 p-6 space-y-6 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Order summary</h2>
            
            <div className="space-y-3 text-sm font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Original Price:</span>
                <span className="text-slate-800 font-semibold">₹{originalTotal.toFixed(2)}</span>
              </div>
              {discounts > 0 && (
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Discounts ({discountPercent}% Off):</span>
                  <span>-₹{discounts.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2 text-slate-800 font-semibold">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-xs">
                <span>GST (18%):</span>
                <span>+₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-300 pt-4 text-xl font-bold text-slate-900">
                <span>Total ({cartCount} course{cartCount > 1 ? "s" : ""}):</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-medium italic mt-2">
              Applicable GST is included in your total.
            </p>

            <p className="text-xs text-slate-500 mt-6 leading-relaxed">
              By completing your purchase, you agree to these <Link to="#" className="text-brandprimary hover:underline font-semibold">Terms of Use</Link>.
            </p>

            <button 
              onClick={() => {
                alert("Payment portal simulated successfully!");
                navigate("/learning");
              }}
              className="w-full bg-brandprimary hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-100"
            >
              <Lock size={16} fill="currentColor" className="text-white" />
              <span>Proceed</span>
            </button>

            {/* Money-back Guarantee */}
            <div className="border-t border-slate-100 pt-6 text-center space-y-1">
              <h4 className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                30-Day Money-Back Guarantee
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                Not satisfied? Get a full refund within 30 days. Simple and straightforward!
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
