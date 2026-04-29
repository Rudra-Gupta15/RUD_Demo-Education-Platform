import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import CosmicBackground from "./components/CosmicBackground.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import About from "./pages/About.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Auth from "./pages/Auth.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Courses from "./pages/Courses.jsx";
import Home from "./pages/Home.jsx";
import Learning from "./pages/Learning.jsx";
import NotFound from "./pages/NotFound.jsx";
import Projects from "./pages/Projects.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

export default function App() {
  const location = useLocation();

  return (
    <>
      <CosmicBackground />
      <Navbar />
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
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticleDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <ChatWidget />
      {location.pathname !== "/checkout" && <Footer />}
    </>
  );
}
