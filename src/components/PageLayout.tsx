import Nav from "./Nav";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-nav">
        <Nav />
      </div>
      <div className="page-layout">
        <main className="page-content">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
