import Nav from "./Nav";
import Footer from "./Footer";
import FadeIn from "./FadeIn";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="home-layout">
      {/* ===== LEFT PANEL - Sticky Photo ===== */}
      <aside className="photo-panel" aria-label="Portrait photo">
        <img 
          src="/images/Rizwan-image.png" 
          alt="Mohd Rizwan - portrait" 
          className="photo-panel__img is-visible" 
          loading="eager" 
        />
      </aside>

      {/* ===== RIGHT PANEL - Scrollable Content ===== */}
      <main className="content-panel">
        <div id="nav-placeholder">
          <Nav />
        </div>
        <div className="content-panel__inner">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
