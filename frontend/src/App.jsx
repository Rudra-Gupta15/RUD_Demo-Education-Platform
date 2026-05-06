import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CosmicBackground from "./components/CosmicBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import About from "./pages/About.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Auth from "./pages/Auth.jsx";
import Blog from "./pages/Blog.jsx";
import BusinessContact from "./pages/BusinessContact.jsx";
import CareerContact from "./pages/CareerContact.jsx";
import Catalog from "./pages/Catalog.jsx";
import Checkout from "./pages/Checkout.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Home from "./pages/Home.jsx";
import Learning from "./pages/Learning.jsx";
import NotFound from "./pages/NotFound.jsx";
import Projects from "./pages/Projects.jsx";
import Cart from "./pages/Cart.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <CosmicBackground />
      {location.pathname !== "/auth" && location.pathname !== "/dev-dashboard" && location.pathname !== "/checkout" && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Catalog />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticleDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact/business" element={<BusinessContact />} />
            <Route path="/contact/careers" element={<CareerContact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dev-dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {location.pathname !== "/dev-dashboard" && <ChatWidget />}
      {location.pathname !== "/checkout" && location.pathname !== "/auth" && location.pathname !== "/dev-dashboard" && <Footer />}
    </>
  );
}
