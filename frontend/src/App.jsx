import { AnimatePresence, motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CosmicBackground from "./components/CosmicBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/Home.jsx"));
const Catalog = lazy(() => import("./pages/Catalog.jsx"));
const CourseDetail = lazy(() => import("./pages/CourseDetail.jsx"));
const Learning = lazy(() => import("./pages/Learning.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const BusinessContact = lazy(() => import("./pages/BusinessContact.jsx"));
const CareerContact = lazy(() => import("./pages/CareerContact.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <CosmicBackground />
      {location.pathname !== "/auth" && 
       location.pathname !== "/dev-dashboard" && 
       location.pathname !== "/dashboard" && 
       location.pathname !== "/checkout" && <Navbar />}
      
      <AnimatePresence mode="popLayout">
        <Suspense fallback={<LoadingScreen />}>
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
        </Suspense>
      </AnimatePresence>

      {location.pathname !== "/dev-dashboard" && location.pathname !== "/dashboard" && <ChatWidget />}
      {location.pathname !== "/checkout" && 
       location.pathname !== "/auth" && 
       location.pathname !== "/dev-dashboard" && 
       location.pathname !== "/dashboard" && <Footer />}
    </>
  );
}
