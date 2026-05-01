import { useCart } from "../state/CartContext.jsx";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Star, Heart, Bookmark, Tag } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import { demoCourses } from "../data/courses.js";

export default function Cart() {
  const { cartItems, removeFromCart, cartCount, addToCart } = useCart();

  // Calculate total price
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
  const discountPercent = originalTotal > 0 ? Math.round(((originalTotal - total) / originalTotal) * 100) : 0;

  // Get recommendations based on the first item in the cart
  const firstItem = cartItems[0];
  const recommendations = firstItem
    ? demoCourses
      .filter((c) => c.topic === firstItem.topic && !cartItems.some((cart) => cart.id === c.id))
      .slice(0, 5)
    : demoCourses.slice(0, 5);

  return (
    <section className="container-shell min-h-screen pt-32 pb-16">
      {cartCount === 0 ? (
        <>
          <Reveal>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Shopping Cart
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-semibold">
              Your cart is currently empty.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col items-center justify-center text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your cart is empty</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Link
              to="/learning"
              className="mt-6 inline-flex items-center gap-2 bg-brandprimary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-100"
            >
              Explore Courses
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Title + Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Shopping Cart
              </h1>
              <p className="text-slate-500 mt-2 text-sm font-semibold">
                {cartCount} Course{cartCount > 1 ? "s" : ""} in Cart
              </p>
            </Reveal>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm items-start hover:shadow-md transition-shadow duration-200"
                >
                  {/* Image */}
                  <div className="w-full sm:w-44 h-32 sm:h-28 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.badges && item.badges.includes("Premium") && (
                      <span className="absolute bottom-2 left-2 bg-brandprimary text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-bold text-slate-900 line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 truncate font-medium">
                      By {item.instructor}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-black text-amber-600">{item.rating || 4.5}</span>
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < Math.floor(item.rating || 4.5) ? "currentColor" : "none"}
                            className={i < Math.floor(item.rating || 4.5) ? "text-amber-500" : "text-slate-300"}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        ({item.reviews ? item.reviews.toLocaleString() : "1,245"} ratings)
                      </span>
                    </div>

                    {/* Meta info */}
                    <p className="text-[10px] md:text-xs text-slate-400 mt-3 flex items-center gap-2 flex-wrap font-medium">
                      <span>32.5 total hours</span>
                      <span>•</span>
                      <span>412 lectures</span>
                      <span>•</span>
                      <span>All Levels</span>
                    </p>
                  </div>

                  {/* Right Actions & Pricing */}
                  <div className="flex sm:flex-col justify-between items-end sm:items-end w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50 gap-4">
                    {/* Actions */}
                    <div className="flex flex-row sm:flex-col gap-3 sm:gap-1.5 text-xs text-brandprimary font-bold">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hover:text-indigo-800 transition"
                      >
                        Remove
                      </button>
                      <button className="hover:text-indigo-800 transition text-slate-400 font-medium">
                        Save for Later
                      </button>
                      <button className="hover:text-indigo-800 transition text-slate-400 font-medium">
                        Move to Wishlist
                      </button>
                    </div>

                    {/* Prices */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-brandprimary font-black">
                        <span className="text-sm md:text-base">{item.price}</span>
                        <Tag size={12} className="fill-brandprimary text-brandprimary" />
                      </div>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-400 line-through mt-0.5">{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary / Sidebar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm lg:mt-24">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total:</p>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-900">₹{total.toFixed(2)}</span>
              {originalTotal > total && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400 line-through">₹{originalTotal.toFixed(2)}</span>
                  <span className="text-xs font-bold text-indigo-600">{discountPercent}% off</span>
                </div>
              )}
            </div>

            <Link to="/checkout" className="w-full mt-6 bg-brandprimary hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <p className="text-[10px] text-slate-400 text-center mt-2 font-semibold">You won't be charged yet</p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-brandprimary focus:outline-none"
              />
              <button className="rounded-xl border border-brandprimary text-brandprimary hover:bg-indigo-50 px-4 py-2 text-xs font-extrabold transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations section */}
      <div className="mt-20 border-t border-slate-100 pt-12">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">You might also like</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 overscroll-x-contain">
          {recommendations.map((course) => (
            <div
              key={course.id}
              className="w-72 flex-shrink-0 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              <div className="h-36 bg-slate-100 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.badges && course.badges.includes("Premium") && (
                  <span className="absolute bottom-2 left-2 bg-brandprimary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Premium
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-brandprimary transition">
                    {course.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium truncate">By {course.instructor}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-bold text-slate-800">{course.rating}</span>
                    <div className="flex items-center text-amber-500">
                      <Star size={10} fill="currentColor" />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      ({course.reviews ? course.reviews.toLocaleString() : "1.2k"})
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through">{course.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(course)}
                    className="p-1.5 rounded-lg bg-indigo-50 hover:bg-brandprimary text-brandprimary hover:text-white transition"
                    title="Add to cart"
                  >
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
