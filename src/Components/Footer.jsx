import React, { useState } from "react";
import {
  FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter,
  FaYoutube, FaArrowRight, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaChevronDown, FaChevronUp
} from "react-icons/fa";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: [
      { label: "Poeage Technology", href: "https://poeagetechnology.com" },
      { label: "Poeage Builder's", href: "https://poeagebuilders.com" },
      { label: "Poeage Digital Marketing", href: "https://poeagedigitalmarketing.com" },
      { label: "Poeage Nexus", href: "https://poeagenexus.com" },
      { label: "Poeage Hub", href: "https://poeagehub.com" },
      { label: "Poeage IT Solutions", href: "https://poeageitsolutions.com" },
      { label: "Poeage Web Server", href: "https://poeagewebservers.com" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/aboutus" },
      { label: "Company", href: "/companies" },
      { label: "Careers", href: "/carriers" },
      { label: "Contact", href: "/contactus" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contactus" },
      { label: "Help Center", href: "/helpcenter" },
      { label: "Privacy Policy", href: "/privacypolicy" },
      { label: "Terms of Service", href: "/termsandconditions" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const SOCIALS = [
  { icon: FaWhatsapp, href: "https://wa.me/917358096160", label: "WhatsApp" },
  { icon: FaInstagram, href: "https://instagram.com/poeagetechnology/", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer style={{ fontFamily: "'Montserrat',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

        @keyframes ft-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes ft-blink { 0%,100%{opacity:1} 50%{opacity:0.35} }

        .ft-track {
          display: flex;
          width: max-content;
          animation: ft-marquee 24s linear infinite;
        }
        .ft-track:hover { animation-play-state: paused; }

        .ft-word {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 900;
          font-size: clamp(56px,10vw,130px);
          line-height: 0.9;
          color: transparent;
          -webkit-text-stroke: 2px #1d4ed8;
          letter-spacing: -0.02em;
          padding: 0 24px;
          white-space: nowrap;
          cursor: default;
          user-select: none;
          transition: color 0.3s;
        }
        .ft-word:hover { color: rgba(29,78,216,0.06); }

        .ft-dot {
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 900;
          font-size: clamp(56px,10vw,130px);
          line-height: 0.9;
          color: #93c5fd;
          padding: 0 4px;
          white-space: nowrap;
          user-select: none;
        }

        .ft-dotgrid {
          background-image: radial-gradient(circle, rgba(29,78,216,0.1) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .ft-link {
          position: relative;
          display: inline-block;
          font-family: 'Montserrat', sans-serif !important;
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e3a8a;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #2563eb;
          transition: width 0.28s ease;
        }
        .ft-link:hover { color: #2563eb; }
        .ft-link:hover::after { width: 100%; }

        .ft-social {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: #fff;
          border: 1.5px solid #bfdbfe;
          color: #2563eb;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .ft-social:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(29,78,216,0.28);
        }

        .ft-input {
          background: #fff;
          border: 1.5px solid #bfdbfe;
          color: #0f172a;
          outline: none;
          font-family: 'Montserrat', sans-serif !important;
          font-weight: 500;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ft-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .ft-input::placeholder { color: #93c5fd; }

        .ft-acc { overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s; }
        .ft-acc.open { max-height: 400px; opacity: 1; }
        .ft-acc.closed { max-height: 0; opacity: 0; }

        .ft-bar {
          width: 32px; height: 3px;
          background: linear-gradient(90deg, #1d4ed8, #60a5fa);
          border-radius: 2px;
          margin-bottom: 14px;
        }
        .ft-blink { animation: ft-blink 2s ease-in-out infinite; }

        .ft-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          background: #fff;
          border: 1.5px solid #bfdbfe;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .ft-card:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
          box-shadow: 0 8px 24px rgba(29,78,216,0.22);
          transform: translateY(-2px);
        }
        .ft-card:hover .ft-ci { color: #fff !important; }
        .ft-card:hover .ft-ct { color: #fff !important; }

        @media (max-width: 768px) {
          .ft-desktop-links { display: none !important; }
          .ft-mobile-acc { display: flex !important; }
        }
        @media (min-width: 769px) {
          .ft-mobile-acc { display: none !important; }
        }
      `}</style>

      {/* ── MAIN BODY ── */}
      <div className="ft-dotgrid" style={{ background: "#f0f7ff", borderTop: "3px solid #1d4ed8" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#1d4ed8,#60a5fa,#1d4ed8)", marginTop: -3 }} />

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.25rem 3.5rem" }}>
          <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", alignItems: "start" }}>

            {/* ── LEFT: Brand ── */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#1d4ed8,#60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(29,78,216,0.3)" }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 22, fontWeight: 900, color: "#fff" }}>P</span>
                </div>
                <div>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.01em" }}>
                    Poeage <span style={{ color: "#1d4ed8" }}>Group's</span>
                  </span>
                  <p style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
                    Human × AI Solutions
                  </p>
                </div>
              </div>

              <div className="ft-bar" />

              <p style={{ fontSize: "0.875rem", lineHeight: 1.85, color: "#334155", maxWidth: 320, marginBottom: "1.25rem", fontWeight: 500 }}>
               Poeage Group is a diversified enterprise building scalable businesses 
across technology, infrastructure, and digital innovation.</p>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", borderRadius: "9999px", border: "1.5px solid #bfdbfe", background: "#dbeafe", padding: "0.375rem 1rem" }}>
                <span className="ft-blink" style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1d4ed8" }}>Available for new projects</span>
              </div>

              <div style={{ display: "flex", gap: "0.625rem", marginBottom: "1.75rem" }}>
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="ft-social">
                    <s.icon style={{ fontSize: 15 }} />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div style={{ borderRadius: "1rem", border: "1.5px solid #bfdbfe", background: "#fff", padding: "1.25rem", boxShadow: "0 4px 20px rgba(29,78,216,0.07)" }}>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.875rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>Get weekly updates</p>
                <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.875rem", fontWeight: 500 }}>Tips, case studies & exclusive offers.</p>
                {subscribed ? (
                  <div style={{ borderRadius: "0.625rem", background: "#dbeafe", border: "1px solid #93c5fd", padding: "0.625rem 1rem", fontSize: "0.8125rem", fontWeight: 700, color: "#1d4ed8" }}>
                    ✓ You're subscribed! Welcome aboard.
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      className="ft-input"
                      style={{ flex: 1, borderRadius: "0.625rem", padding: "0.625rem 0.875rem", fontSize: "0.8125rem" }}
                    />
                    <button onClick={handleSubscribe} style={{ width: 42, height: 42, borderRadius: "0.625rem", flexShrink: 0, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(29,78,216,0.3)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      <FaArrowRight style={{ color: "#fff", fontSize: 13 }} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Links + Contact ── */}
            <div>
              {/* Desktop grid */}
              <div className="ft-desktop-links" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
                {FOOTER_LINKS.map((col) => (
                  <div key={col.heading}>
                    <div className="ft-bar" />
                    <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.6875rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0f172a", marginBottom: "1.125rem" }}>
                      {col.heading}
                    </h4>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="ft-link">{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Mobile accordion */}
              <div className="ft-mobile-acc" style={{ flexDirection: "column", gap: "0.5rem" }}>
                {FOOTER_LINKS.map((col, i) => (
                  <div key={col.heading} style={{ borderRadius: "0.875rem", border: "1.5px solid #bfdbfe", background: "#fff", overflow: "hidden", boxShadow: "0 2px 8px rgba(29,78,216,0.06)" }}>
                    <button onClick={() => setOpenSection(openSection === i ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1.125rem", background: "transparent", border: "none", cursor: "pointer" }}>
                      <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.75rem", fontWeight: 900, color: "#0f172a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {col.heading}
                      </span>
                      {openSection === i ? <FaChevronUp style={{ color: "#2563eb", fontSize: 11 }} /> : <FaChevronDown style={{ color: "#94a3b8", fontSize: 11 }} />}
                    </button>
                    <div className={`ft-acc ${openSection === i ? "open" : "closed"}`}>
                      <ul style={{ listStyle: "none", margin: 0, padding: "0.25rem 1.125rem 1rem", borderTop: "1px solid #e0f2fe", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {col.links.map((link, li) => (
                          <li key={link.label} style={{ paddingTop: li === 0 ? "0.75rem" : 0 }}>
                            <a href={link.href} className="ft-link">{link.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ marginTop: "2rem", paddingTop: "1.75rem", borderTop: "1.5px solid #bfdbfe" }}>
                <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.6875rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0f172a", marginBottom: "1rem" }}>
                  Contact
                </h4>
                <div style={{ display: "grid", gap: "0.625rem", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))" }}>
                  {[
                    { icon: FaPhone, label: "+91 805 688 9616", href: "tel:+918056889616" },
                    { icon: FaEnvelope, label: "info@poeage.com", href: "mailto:info@poeage.com" },
                    { icon: FaMapMarkerAlt, label: "Erode, Tamil Nadu", href: "#" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="ft-card">
                      <c.icon className="ft-ci" style={{ color: "#2563eb", fontSize: 14, flexShrink: 0 }} />
                      <span className="ft-ct" style={{ fontSize: "0.75rem", color: "#1e3a8a", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Strip */}
              <div style={{ marginTop: "1.75rem", borderRadius: "1rem", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", boxShadow: "0 8px 30px rgba(29,78,216,0.3)" }}>
                <div>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.9375rem", fontWeight: 900, color: "#fff", marginBottom: "0.125rem" }}>
                    Ready to build something amazing?
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#bfdbfe", fontWeight: 500 }}>Starting at Poeage Group's</p>
                </div>
                <a href="/quotes" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: "#1d4ed8", borderRadius: "9999px", padding: "0.625rem 1.25rem", fontSize: "0.8125rem", fontWeight: 800, textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Get Free Quote <FaArrowRight style={{ fontSize: 11 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLLING WORDMARK ── */}
      <div style={{ background: "#ffffff", borderTop: "2px solid #bfdbfe", borderBottom: "2px solid #bfdbfe", padding: "0.625rem 0", overflow: "hidden" }}>
        <div className="ft-track">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="ft-word">Poeage Group's</span>
              <span className="ft-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ background: "#0f172a" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
              © {new Date().getFullYear()} Poeage Group's. All rights reserved.
              <span style={{ margin: "0 0.5rem", color: "#334155" }}>·</span>
              Made with ♥ in Erode, Tamil Nadu.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a key={item} href={`/${item.toLowerCase()}`}
                  style={{ fontSize: "0.75rem", color: "#475569", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  {item}
                </a>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <span className="ft-blink" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
                <span style={{ fontSize: "0.75rem", color: "#3b82f6", fontWeight: 600 }}>All systems operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}