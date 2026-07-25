import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";
const AIAssistant = lazy(() => import("./components/AIAssistant"));

export default function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/:page" element={<InnerPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </>
  );
}
