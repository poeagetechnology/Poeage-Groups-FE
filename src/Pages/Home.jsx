import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, MoveRight, Users, Briefcase, Building2, Factory, Star, CheckCircle } from "lucide-react";

/* ═══════════════════════════════════════
   ANIMATED GRID CANVAS — Hero BG
═══════════════════════════════════════ */
function GridCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf;
    let t = 0;

    function draw() {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / 80) + 1;
      const rows = Math.ceil(H / 80) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 80;
          const y = j * 80;
          const wave = Math.sin(t + i * 0.4 + j * 0.3) * 0.5 + 0.5;
          const alpha = wave * 0.18 + 0.04;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,165,255,${alpha})`;
          ctx.fill();
        }
      }
      for (let j = 0; j < Math.ceil(H / 80) + 1; j++) {
        const y = j * 80;
        const alpha = (Math.sin(t * 0.5 + j * 0.2) * 0.5 + 0.5) * 0.05;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(100,165,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 1 }} />;
}

/* ═══════════════════════════════════════
   TICKER / MARQUEE
═══════════════════════════════════════ */
function Ticker({ items, dark = false, speed = 32 }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: dark ? "#0B2457" : "#EBF2FF", borderTop: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(30,100,220,0.1)", borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(30,100,220,0.1)" }}>
      <motion.div animate={{ x: ["0%", "-33.33%"] }} transition={{ duration: speed, ease: "linear", repeat: Infinity }} style={{ display: "inline-flex" }}>
        {tripled.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.3)" : "rgba(30,100,220,0.45)", padding: "13px 36px", display: "inline-flex", alignItems: "center", gap: 36, whiteSpace: "nowrap" }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: dark ? "rgba(100,160,255,0.4)" : "#1E64DC", display: "inline-block", flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   COUNTER
═══════════════════════════════════════ */
function Counter({ to, duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(to.replace(/\D/g, ""));
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * n));
      if (p < 1) requestAnimationFrame(tick); else setVal(n);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  const prefix = to.includes("₹") ? "₹" : "";
  const suffix = to.includes("+") ? "+" : "";
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════
   REVEAL
═══════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 36 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   WORD REVEAL
═══════════════════════════════════════ */
function WordReveal({ text, delay = 0 }) {
  return (
    <span style={{ display: "inline" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span style={{ display: "inline-block" }} initial={{ y: "108%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.85, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const companies = [
    { name: "Technologies", slug: "poeage-technologies", tag: "AI & Software",    desc: "AI-driven platforms and enterprise-grade software built for tomorrow's challenges." },
    { name: "Builders",     slug: "poeage-builders",     tag: "Infrastructure",   desc: "Civil and commercial construction at landmark scale." },
    { name: "Web Services", slug: "poeage-web-services", tag: "Cloud Engineering",desc: "Cloud-native architecture engineered for reliability at scale." },
    { name: "IT Solutions", slug: "poeage-it-solutions", tag: "Enterprise IT",    desc: "End-to-end managed IT and digital transformation." },
  ];

  const stats = [
    { display: "10+",   label: "Industries Served", raw: "10" },
    { display: "1000+", label: "Professionals",      raw: "1000" },
    { display: "3+",    label: "Years of Growth",    raw: "3" },
    { display: "₹10+",  label: "Million in Projects",raw: "10" },
  ];

  const areas = [
    { title: "Technology & Software",         Icon: Users },
    { title: "Infrastructure & Construction", Icon: Building2 },
    { title: "Consulting & Recruitment",      Icon: Briefcase },
    { title: "Cloud & IT Services",           Icon: Factory },
    { title: "Training & Development",        Icon: CheckCircle },
    { title: "Enterprise Solutions",          Icon: Star },
  ];

  const marqueeItems = ["Poeage Technologies", "Poeage Builders", "Poeage Web Services", "Poeage IT Solutions", "Enterprise Solutions", "Cloud Services", "AI Platforms", "Infrastructure"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue:      #1A5FD4;
          --blue-deep: #0B2457;
          --blue-mid:  #1E64DC;
          --blue-lite: #3B82F6;
          --blue-pale: #EBF2FF;
          --sky:       #60A5FA;
          --white:     #FFFFFF;
          --off:       #F8FAFF;
          --ink:       #0A1628;
          --ink2:      #1E2D4A;
          --muted:     #64748B;
          --border:    rgba(30,100,220,0.12);
          --shadow-b:  0 20px 60px rgba(26,95,212,0.15);
        }

        /* ─── NAV ─── */
        .pnav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 22px 56px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .pnav.scrolled {
          padding: 14px 56px;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(24px);
          box-shadow: 0 1px 0 rgba(30,100,220,0.08), 0 8px 32px rgba(26,95,212,0.06);
        }
        .pnav-logo {
          display: flex; align-items: center; gap: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
          font-size: 15px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; text-decoration: none; transition: color 0.4s ease;
        }
        .pnav.scrolled .pnav-logo { color: var(--blue-deep); }
        .pnav-diamond {
          width: 30px; height: 30px; background: var(--blue-mid);
          display: flex; align-items: center; justify-content: center;
          clip-path: polygon(50% 0%,100% 50%,50% 100%,0% 50%); flex-shrink: 0;
        }
        .pnav-diamond span { font-size: 13px; color: #fff; font-weight: 800; }
        .pnav-links { display: flex; align-items: center; gap: 32px; }
        .pnav-link {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.65); text-decoration: none;
          transition: color 0.2s ease; position: relative;
        }
        .pnav.scrolled .pnav-link { color: rgba(10,22,40,0.5); }
        .pnav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: var(--blue-mid); border-radius: 1px; transition: width 0.3s ease; }
        .pnav-link:hover::after { width: 100%; }
        .pnav-link:hover { color: rgba(255,255,255,0.95); }
        .pnav.scrolled .pnav-link:hover { color: var(--blue-mid); }
        .pnav-btn {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: var(--blue-mid); color: #fff;
          padding: 11px 24px; border: none; border-radius: 6px;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px rgba(30,100,220,0.35);
          transition: all 0.25s ease;
        }
        .pnav-btn:hover { background: var(--blue); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(30,100,220,0.45); }

        /* ─── HERO ─── */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0B1F4A 0%, #0D2A6B 40%, #1040A0 75%, #1A5FD4 100%);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .hero-mesh {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 80% 30%, rgba(96,165,250,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 10% 70%, rgba(11,36,87,0.8) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(59,130,246,0.12) 0%, transparent 60%);
        }
        .hero-circle-1 { position: absolute; top: -120px; right: -120px; width: 600px; height: 600px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); pointer-events: none; }
        .hero-circle-2 { position: absolute; top: -60px; right: -60px; width: 400px; height: 400px; border-radius: 50%; border: 1px solid rgba(96,165,250,0.08); pointer-events: none; }

        /* ─── BADGE ─── */
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(12px); color: rgba(255,255,255,0.85);
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase; padding: 8px 18px; border-radius: 100px;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #60A5FA; flex-shrink: 0; animation: blink 2s ease infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ─── DISPLAY ─── */
        .display-hero {
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
          line-height: 0.9; letter-spacing: -0.04em;
          font-size: clamp(64px, 10vw, 152px); color: #fff;
        }
        .display-hero-italic {
          font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-style: italic;
          font-size: clamp(60px, 9vw, 140px); line-height: 0.92; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #93C5FD, #60A5FA, #3B82F6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ─── EYEBROW ─── */
        .eyebrow {
          font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 400;
          letter-spacing: 0.28em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 14px;
        }
        .eyebrow-line { width: 28px; height: 1px; flex-shrink: 0; }

        /* ─── SECTION TITLES ─── */
        .section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: var(--ink); }
        .section-title-white { color: #fff; }
        .section-serif { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: var(--blue-mid); }

        /* ─── COMPANY CARDS ─── */
        .companies-grid {
          display: grid; grid-template-columns: 1.5fr 1fr 1fr;
          grid-template-rows: auto auto; gap: 20px;
        }
        .co-hero { grid-row: span 2; }

        .co-card {
          background: #fff; border: 1px solid rgba(30,100,220,0.1); border-radius: 20px;
          padding: 36px 32px; position: relative; overflow: hidden; cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .co-card:hover { transform: translateY(-6px); box-shadow: 0 28px 80px rgba(26,95,212,0.14); border-color: rgba(30,100,220,0.25); }
        .co-card-dark { background: linear-gradient(145deg,#0B2457 0%,#0F327A 60%,#1A5FD4 100%); border-color: transparent; min-height: 420px; display: flex; flex-direction: column; justify-content: space-between; }
        .co-card-dark:hover { box-shadow: 0 32px 80px rgba(26,95,212,0.35); }
        .co-card-sm { min-height: 190px; display: flex; flex-direction: column; justify-content: space-between; }
        .co-watermark {
          position: absolute; right: -8px; bottom: -12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
          font-size: 120px; line-height: 1; color: rgba(30,100,220,0.05);
          pointer-events: none; user-select: none; transition: color 0.4s ease;
        }
        .co-card:hover .co-watermark { color: rgba(30,100,220,0.09); }
        .co-card-dark .co-watermark { color: rgba(255,255,255,0.05); }
        .co-card-dark:hover .co-watermark { color: rgba(255,255,255,0.09); }
        .co-tag { font-family: 'DM Mono', monospace; font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blue-mid); background: var(--blue-pale); border: 1px solid var(--border); padding: 5px 12px; border-radius: 4px; display: inline-block; margin-bottom: 18px; }
        .co-tag-dark { color: rgba(147,197,253,0.85); background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); }
        .co-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; letter-spacing: -0.03em; color: var(--ink); margin-bottom: 12px; }
        .co-name-dark { color: #fff; }
        .co-name-lg { font-size: clamp(28px, 4vw, 44px); line-height: 1.05; }
        .co-name-sm { font-size: clamp(20px, 2.5vw, 28px); line-height: 1.1; }
        .co-desc { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 17px; line-height: 1.65; color: var(--muted); }
        .co-desc-dark { color: rgba(255,255,255,0.5); font-size: 16px; }
        .co-desc-sm { font-size: 14.5px; }
        .co-arrow { position: absolute; top: 28px; right: 28px; width: 38px; height: 38px; border-radius: 50%; background: var(--blue-pale); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--blue-mid); transition: all 0.3s ease; }
        .co-arrow-dark { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); }
        .co-card:hover .co-arrow { background: var(--blue-mid); color: #fff; border-color: transparent; transform: rotate(-45deg); }

        /* ─── STATS ─── */
        .stats-band { background: linear-gradient(135deg,#0B2457 0%,#0F327A 50%,#1A5FD4 100%); display: grid; grid-template-columns: repeat(4,1fr); position: relative; overflow: hidden; }
        .stats-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(96,165,250,0.08) 0%, transparent 70%); pointer-events: none; }
        .stat-cell { padding: 60px 36px; border-right: 1px solid rgba(255,255,255,0.07); position: relative; text-align: center; }
        .stat-cell:last-child { border-right: none; }
        .stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: clamp(44px,6vw,72px); letter-spacing: -0.04em; line-height: 1; color: #fff; }
        .stat-unit { display: block; margin-top: 8px; font-family: 'DM Mono', monospace; font-size: 9.5px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .stat-bar { position: absolute; bottom: 0; left: 36px; right: 36px; height: 2px; background: linear-gradient(90deg, var(--sky), transparent); border-radius: 1px; opacity: 0.35; }

        /* ─── AREAS ─── */
        .area-item { display: grid; grid-template-columns: 40px 48px 1fr 20px; gap: 18px; align-items: center; padding: 24px 0; border-bottom: 1px solid rgba(30,100,220,0.07); transition: padding-left 0.3s ease; position: relative; overflow: hidden; }
        .area-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(90deg, rgba(30,100,220,0.05), transparent); transition: width 0.4s ease; }
        .area-item:hover::before { width: 100%; }
        .area-item:hover { padding-left: 12px; }
        .area-num { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: var(--blue-mid); opacity: 0.6; }
        .area-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--blue-pale); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .area-item:hover .area-icon { background: var(--blue-mid); border-color: var(--blue-mid); }
        .area-item:hover .area-icon svg { color: #fff !important; }
        .area-label { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }

        /* ─── PROCESS ─── */
        .process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .process-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 44px 36px; position: relative; overflow: hidden; transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease; }
        .process-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(96,165,250,0.25); transform: translateY(-4px); }
        .process-bg-num { position: absolute; right: 16px; top: -8px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 140px; line-height: 1; color: rgba(255,255,255,0.025); pointer-events: none; user-select: none; transition: color 0.4s ease; }
        .process-card:hover .process-bg-num { color: rgba(96,165,250,0.06); }
        .process-step { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(147,197,253,0.7); background: rgba(96,165,250,0.1); border: 1px solid rgba(96,165,250,0.2); padding: 5px 14px; border-radius: 4px; display: inline-block; margin-bottom: 28px; }
        .process-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: clamp(28px,3.5vw,42px); color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 18px; }
        .process-body { font-family: 'Playfair Display', serif; font-weight: 400; font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.4); }

        /* ─── TESTIMONIAL ─── */
        .testimonial-card { background: #fff; border-radius: 28px; padding: 64px; border: 1px solid rgba(30,100,220,0.1); box-shadow: 0 24px 80px rgba(26,95,212,0.08); position: relative; overflow: hidden; }
        .testimonial-card::before { content: '\u201C'; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 260px; line-height: 0.55; color: rgba(30,100,220,0.05); position: absolute; top: 24px; left: 20px; pointer-events: none; user-select: none; }
        .testimonial-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--blue-mid), var(--sky), var(--blue-mid)); }
        .quote-text { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; font-size: clamp(19px,2.4vw,26px); line-height: 1.7; color: var(--ink2); position: relative; z-index: 1; margin-bottom: 48px; }
        .quote-meta { display: flex; align-items: center; gap: 18px; padding-top: 36px; border-top: 1px solid rgba(30,100,220,0.08); position: relative; z-index: 1; }
        .quote-avatar { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, var(--blue-mid), var(--blue-deep)); display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 15px; flex-shrink: 0; }
        .quote-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); }
        .quote-role { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-top: 3px; }

        /* ─── BUTTONS ─── */
        .btn-blue { display: inline-flex; align-items: center; gap: 10px; background: var(--blue-mid); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 30px; border: none; border-radius: 8px; text-decoration: none; cursor: pointer; box-shadow: 0 8px 28px rgba(30,100,220,0.35); transition: all 0.25s ease; }
        .btn-blue:hover { background: #1751B8; transform: translateY(-2px); box-shadow: 0 16px 48px rgba(30,100,220,0.45); }
        .btn-white { display: inline-flex; align-items: center; gap: 10px; background: #fff; color: var(--blue-mid); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 15px 30px; border: none; border-radius: 8px; text-decoration: none; cursor: pointer; box-shadow: 0 8px 32px rgba(0,0,0,0.2); transition: all 0.25s ease; }
        .btn-white:hover { background: #F0F7FF; transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,0,0,0.28); }
        .btn-outline { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: rgba(255,255,255,0.7); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 28px; border: 1.5px solid rgba(255,255,255,0.18); border-radius: 8px; cursor: pointer; text-decoration: none; transition: all 0.25s ease; }
        .btn-outline:hover { border-color: rgba(96,165,250,0.5); color: #fff; background: rgba(255,255,255,0.06); }
        .btn-outline-blue { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: var(--blue-mid); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 26px; border: 1.5px solid rgba(30,100,220,0.2); border-radius: 8px; cursor: pointer; transition: all 0.25s ease; }
        .btn-outline-blue:hover { background: var(--blue-pale); border-color: rgba(30,100,220,0.35); }

        /* ─── CTA ─── */
        .cta-section { background: linear-gradient(135deg,#0B1F4A 0%,#0B2457 40%,#0F327A 70%,#1A5FD4 100%); padding: 140px 56px; text-align: center; position: relative; overflow: hidden; }
        .cta-orb { position: absolute; border-radius: 50%; pointer-events: none; }

        /* ─── UTILITY ─── */
        .blue-line { width: 48px; height: 3px; background: var(--blue-mid); border-radius: 2px; }
        .section-wrap { max-width: 1200px; margin: 0 auto; }

        /* ════════════════════════════════════════════
           MOBILE RESPONSIVE BREAKPOINTS
        ════════════════════════════════════════════ */

        /* ── Tablet: 820px ── */
        @media (max-width: 820px) {

          /* Nav */
          .pnav { padding: 18px 24px; }
          .pnav.scrolled { padding: 12px 24px; }
          .pnav-links { display: none; }

          /* Hero */
          .hero-inner-content {
            padding: 120px 28px 72px !important;
          }
          .hero-sub-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .hero-sub-row > p {
            max-width: 100% !important;
          }
          .hero-cta-col {
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
          .hero-mini-stats {
            gap: 20px !important;
            margin-top: 48px !important;
          }

          /* Companies */
          .companies-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .co-hero {
            grid-row: span 1 !important;
            grid-column: span 2 !important;
          }
          .co-card-dark { min-height: 320px !important; }

          /* Stats */
          .stats-band { grid-template-columns: 1fr 1fr !important; }
          .stat-cell { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .stat-cell:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.07) !important; }
          .stat-cell:nth-last-child(-n+2) { border-bottom: none; }

          /* Business Areas split */
          .split-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sticky-col { position: static !important; }

          /* Process */
          .process-grid { grid-template-columns: 1fr !important; }

          /* About strip split */
          .about-split { grid-template-columns: 1fr !important; gap: 36px !important; }

          /* CTA */
          .cta-section { padding: 100px 28px !important; }
          .cta-footer { padding: 16px 24px !important; flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
        }

        /* ── Mobile: 560px ── */
        @media (max-width: 560px) {

          /* Hero */
          .badge { font-size: 8px !important; letter-spacing: 0.12em !important; padding: 7px 14px !important; }
          .hero-inner-content { padding: 100px 20px 60px !important; }
          .display-hero { font-size: clamp(48px, 13vw, 72px) !important; }
          .display-hero-italic { font-size: clamp(44px, 12vw, 68px) !important; }
          .hero-cta-col { flex-direction: column !important; }
          .btn-white, .btn-outline { width: 100% !important; justify-content: center !important; }
          .hero-mini-stats { gap: 16px !important; padding-top: 28px !important; margin-top: 36px !important; }

          /* Companies */
          .companies-grid { grid-template-columns: 1fr !important; }
          .co-hero { grid-column: span 1 !important; }
          .co-card { padding: 28px 24px !important; }
          .co-card-dark { min-height: 280px !important; }

          /* Section padding */
          .section-pad { padding: 72px 20px !important; }
          .section-title { font-size: clamp(32px, 9vw, 48px) !important; }

          /* Stats */
          .stats-band { grid-template-columns: 1fr 1fr !important; }
          .stat-cell { padding: 40px 20px !important; }
          .stat-num { font-size: clamp(36px, 9vw, 52px) !important; }
          .stat-bar { left: 20px; right: 20px; }

          /* Areas */
          .area-item { grid-template-columns: 32px 42px 1fr 16px !important; gap: 12px !important; padding: 18px 0 !important; }
          .area-icon { width: 42px !important; height: 42px !important; }
          .area-label { font-size: 13px !important; }

          /* Process */
          .process-card { padding: 32px 24px !important; }
          .process-title { font-size: clamp(24px, 7vw, 34px) !important; }
          .process-body { font-size: 15px !important; }

          /* Testimonial */
          .testimonial-card { padding: 40px 28px !important; border-radius: 20px !important; }
          .quote-text { font-size: clamp(16px, 4.5vw, 20px) !important; margin-bottom: 32px !important; }
          .quote-meta { flex-wrap: wrap !important; gap: 12px !important; }
          .quote-verified { display: none !important; }

          /* About strip */
          .about-strip { padding: 60px 20px !important; }
          .about-split { gap: 28px !important; }

          /* Eyebrow */
          .eyebrow { font-size: 8.5px !important; gap: 10px !important; }

          /* CTA */
          .cta-section { padding: 80px 20px !important; }
          .cta-headline { font-size: clamp(44px, 14vw, 72px) !important; }
          .cta-sub { font-size: 17px !important; }
          .cta-btns { flex-direction: column !important; align-items: stretch !important; }
          .cta-btns .btn-white,
          .cta-btns .btn-outline { width: 100% !important; justify-content: center !important; }
        }

        /* ── Small phones: 400px ── */
        @media (max-width: 400px) {
          .hero-inner-content { padding: 90px 16px 52px !important; }
          .section-pad { padding: 60px 16px !important; }
          .companies-grid { gap: 12px !important; }
          .badge { font-size: 7.5px !important; padding: 6px 12px !important; }
          .display-hero { font-size: clamp(40px, 12vw, 60px) !important; }
          .display-hero-italic { font-size: clamp(38px, 11.5vw, 58px) !important; }
          .co-card { padding: 22px 18px !important; border-radius: 16px !important; }
        }
      `}</style>

      <div style={{ background: "var(--off)", overflowX: "hidden" }}>

        {/* ═══════ HERO ═══════ */}
        <section className="hero" ref={heroRef}>
          <div className="hero-mesh" />
          <GridCanvas />
          <div className="hero-circle-1" />
          <div className="hero-circle-2" />

          <motion.div
            className="hero-inner-content"
            style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 64px 80px" }}
          >
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
              <div className="badge">
                <span className="badge-dot" />
                Multi-Industry Enterprise Conglomerate — Est. 2022
              </div>
            </motion.div>

            {/* Headline */}
            <div style={{ marginBottom: 44, maxWidth: 920 }}>
              <div className="display-hero"><WordReveal text="BUILDING" delay={0.15} /></div>
              <div className="display-hero-italic"><WordReveal text="Tomorrow's" delay={0.28} /></div>
              <div className="display-hero"><WordReveal text="ENTERPRISES" delay={0.42} /></div>
            </div>

            {/* Sub row */}
            <motion.div
              className="hero-sub-row"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
              style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, maxWidth: 900, alignItems: "start" }}
            >
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(17px,2vw,22px)", fontWeight: 400, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: 500 }}>
                Four specialized companies operating across technology, infrastructure, cloud engineering, and enterprise IT — unified by a single vision for scale.
              </p>
              <div className="hero-cta-col" style={{ display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
                <button className="btn-white" onClick={() => navigate("/companies")}>Explore Portfolio <ArrowUpRight size={13} /></button>
                <button className="btn-outline" onClick={() => navigate("/aboutus")}>About the Group</button>
              </div>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              className="hero-mini-stats"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
              style={{ display: "flex", gap: 28, marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}
            >
              {[["4", "Companies"], ["10+", "Industries"], ["1,000+", "Professionals"], ["₹10M+", "Project Value"]].map(([n, l]) => (
                <div key={l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 2 }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 28, height: 48, borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "center", paddingTop: 10 }}>
              <div style={{ width: 3, height: 8, borderRadius: 2, background: "rgba(147,197,253,0.7)" }} />
            </motion.div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
          </motion.div>
        </section>

        {/* ═══════ TICKER 1 ═══════ */}
        <Ticker items={marqueeItems} dark />

        {/* ═══════ COMPANIES ═══════ */}
        <section className="section-pad" style={{ padding: "100px 48px", background: "#fff" }}>
          <div className="section-wrap">
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div className="eyebrow" style={{ color: "var(--blue-mid)", marginBottom: 16 }}>
                    <span className="eyebrow-line" style={{ background: "var(--blue-mid)" }} />
                    Our Portfolio
                  </div>
                  <h2 className="section-title" style={{ fontSize: "clamp(36px,5vw,60px)" }}>
                    Four Businesses.<br />
                    <span className="section-serif" style={{ fontSize: "0.85em" }}>One Unstoppable Vision.</span>
                  </h2>
                </div>
                <button className="btn-outline-blue" onClick={() => navigate("/companies")}>All Companies <MoveRight size={14} /></button>
              </div>
            </Reveal>

            <div className="companies-grid">
              <Reveal delay={0.05}>
                <div className="co-card co-card-dark co-hero" onClick={() => navigate(`/companies/${companies[0].slug}`)}>
                  <div className="co-watermark">{companies[0].name.charAt(0)}</div>
                  <div className="co-arrow co-arrow-dark"><ArrowUpRight size={15} /></div>
                  <div>
                    <div className="co-tag co-tag-dark">{companies[0].tag}</div>
                    <h3 className="co-name co-name-dark co-name-lg">Poeage<br />{companies[0].name}</h3>
                  </div>
                  <p className="co-desc co-desc-dark">{companies[0].desc}</p>
                </div>
              </Reveal>
              {companies.slice(1).map((c, i) => (
                <Reveal key={c.slug} delay={0.1 + i * 0.07}>
                  <div className="co-card co-card-sm" onClick={() => navigate(`/companies/${c.slug}`)}>
                    <div className="co-watermark">{c.name.charAt(0)}</div>
                    <div className="co-arrow"><ArrowUpRight size={14} /></div>
                    <div>
                      <div className="co-tag">{c.tag}</div>
                      <h3 className="co-name co-name-sm">Poeage {c.name}</h3>
                    </div>
                    <p className="co-desc co-desc-sm">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ TICKER 2 ═══════ */}
        <Ticker items={["10+ Industries", "1000+ Professionals", "₹10M+ Projects", "3+ Years Active", "4 Companies", "Enterprise Grade"]} />

        {/* ═══════ STATS ═══════ */}
        <div className="stats-band">
          {stats.map(({ display, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="stat-cell">
                <div className="stat-num"><Counter to={display} /></div>
                <span className="stat-unit">{label}</span>
                <div className="stat-bar" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ═══════ BUSINESS AREAS ═══════ */}
        <section className="section-pad" style={{ padding: "100px 48px", background: "#fff" }}>
          <div className="section-wrap">
            <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 96, alignItems: "start" }}>
              <Reveal>
                <div className="sticky-col" style={{ position: "sticky", top: 120 }}>
                  <div className="eyebrow" style={{ color: "var(--blue-mid)", marginBottom: 20 }}>
                    <span className="eyebrow-line" style={{ background: "var(--blue-mid)" }} />
                    What We Do
                  </div>
                  <h2 className="section-title" style={{ fontSize: "clamp(40px,5.5vw,68px)", marginBottom: 20 }}>
                    OUR<br /><span className="section-serif">Business</span><br />AREAS
                  </h2>
                  <div className="blue-line" style={{ marginBottom: 24 }} />
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 19, fontWeight: 400, color: "var(--muted)", lineHeight: 1.8, maxWidth: 360, marginBottom: 36 }}>
                    Six pillars powering enterprise transformation — from code to concrete, cloud to consulting.
                  </p>
                  <button className="btn-blue" onClick={() => navigate("/companies")}>All Services <ArrowRight size={13} /></button>
                </div>
              </Reveal>
              <ul style={{ listStyle: "none" }}>
                {areas.map(({ title, Icon }, i) => (
                  <Reveal key={title} delay={i * 0.06}>
                    <li className="area-item">
                      <span className="area-num">0{i + 1}</span>
                      <div className="area-icon"><Icon size={18} color="var(--blue-mid)" strokeWidth={1.75} /></div>
                      <span className="area-label">{title}</span>
                      <ArrowRight size={14} style={{ color: "rgba(30,100,220,0.3)", flexShrink: 0 }} />
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════ PROCESS ═══════ */}
        <section className="section-pad" style={{ padding: "100px 48px", background: "linear-gradient(135deg,#0B2457 0%,#0D2E75 50%,#1A5FD4 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "56px 56px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <div className="eyebrow" style={{ color: "rgba(147,197,253,0.7)", marginBottom: 18 }}>
                    <span className="eyebrow-line" style={{ background: "rgba(147,197,253,0.5)" }} />
                    Methodology
                  </div>
                  <h2 className="section-title section-title-white" style={{ fontSize: "clamp(40px,5.5vw,68px)" }}>
                    HOW WE BUILD<br />
                    <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700, color: "rgba(147,197,253,0.85)", fontSize: "0.9em" }}>&amp; Scale</span>
                  </h2>
                </div>
                <div style={{ height: 1, flex: 1, minWidth: 60, maxWidth: 200, background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)", alignSelf: "center" }} />
              </div>
            </Reveal>
            <div className="process-grid">
              {[
                { num: "01", title: "Strategy",  sub: "Vision & Research", desc: "Deep market analysis, goal alignment, and a precision roadmap with measurable milestones that define success from day one." },
                { num: "02", title: "Execution", sub: "Build & Deliver",   desc: "Cross-functional sprints, disciplined delivery, and relentless focus on quality, speed, and operational reliability." },
                { num: "03", title: "Scale",     sub: "Grow & Amplify",    desc: "Proven models expanded — wider market reach, stronger revenue streams, and unshakeable operational resilience." },
              ].map(({ num, title, sub, desc }, i) => (
                <Reveal key={num} delay={i * 0.1}>
                  <div className="process-card">
                    <div className="process-bg-num">{num}</div>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div className="process-step">{num} · {sub}</div>
                      <h3 className="process-title">{title}</h3>
                      <p className="process-body">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ ABOUT STRIP ═══════ */}
        <section className="about-strip" style={{ background: "var(--blue-pale)", borderTop: "1px solid rgba(30,100,220,0.1)", borderBottom: "1px solid rgba(30,100,220,0.1)", padding: "80px 48px" }}>
          <div className="section-wrap">
            <div className="about-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <Reveal>
                <div className="eyebrow" style={{ color: "var(--blue-mid)", marginBottom: 20 }}>
                  <span className="eyebrow-line" style={{ background: "var(--blue-mid)" }} />
                  Our Foundation
                </div>
                <h2 className="section-title" style={{ fontSize: "clamp(32px,4.5vw,56px)" }}>
                  Built for Endurance.<br />
                  <span className="section-serif">Designed for Scale.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, fontWeight: 400, color: "#5A6A88", lineHeight: 1.8, marginBottom: 32 }}>
                  Since 2022, Poeage Group has established itself as a diversified enterprise conglomerate — combining technological expertise with operational discipline to deliver exceptional outcomes across industries.
                </p>
                <button className="btn-blue" onClick={() => navigate("/aboutus")}>Our Story <ArrowRight size={13} /></button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════ TESTIMONIAL ═══════ */}
        <section className="section-pad" style={{ padding: "100px 48px", background: "#fff" }}>
          <div className="section-wrap">
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
                <div className="eyebrow" style={{ color: "var(--blue-mid)" }}>
                  <span className="eyebrow-line" style={{ background: "var(--blue-mid)" }} />
                  Client Perspective
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="var(--blue-mid)" opacity="0.85" /></svg>)}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="testimonial-card">
                <p className="quote-text">
                  Poeage Group transformed our operations across multiple business units with solutions so scalable and reliable, we stopped thinking about infrastructure entirely — and focused on what matters: growth.
                </p>
                <div className="quote-meta">
                  <div className="quote-avatar">HO</div>
                  <div>
                    <p className="quote-name">Head of Operations</p>
                    <p className="quote-role">Enterprise Client — Technology Sector</p>
                  </div>
                  <div className="quote-verified" style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>Verified Client</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="cta-section">
          <motion.div className="cta-orb" animate={{ scale: [1,1.5,1], opacity: [0.1,0.2,0.1] }} transition={{ duration: 8, repeat: Infinity }}
            style={{ top: "-20%", left: "25%", width: 700, height: 700, background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 65%)" }} />
          <motion.div className="cta-orb" animate={{ scale: [1.3,1,1.3], opacity: [0.08,0.18,0.08] }} transition={{ duration: 10, repeat: Infinity, delay: 3 }}
            style={{ bottom: "-30%", right: "5%", width: 800, height: 800, background: "radial-gradient(circle, rgba(30,100,220,0.18) 0%, transparent 60%)" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
            <Reveal>
              <div className="eyebrow" style={{ color: "rgba(147,197,253,0.6)", justifyContent: "center", marginBottom: 36 }}>
                <span className="eyebrow-line" style={{ background: "rgba(147,197,253,0.4)" }} />
                Start a Conversation
                <span className="eyebrow-line" style={{ background: "rgba(147,197,253,0.4)" }} />
              </div>
              <h2 className="cta-headline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(52px,9.5vw,140px)", letterSpacing: "-0.045em", lineHeight: 0.86, color: "#fff", marginBottom: 36 }}>
                LET'S BUILD<br />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: "italic", fontSize: "0.82em", background: "linear-gradient(135deg,#93C5FD,#60A5FA,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tomorrow.</span>
              </h2>
              <p className="cta-sub" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 21, fontWeight: 400, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 56px" }}>
                Partner with Poeage Group — four companies, one relentless drive to build enterprises that endure.
              </p>
              <div className="cta-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/contactus" className="btn-white">Get in Touch <ArrowUpRight size={13} /></Link>
                <button className="btn-outline" onClick={() => navigate("/companies")}>Our Companies</button>
              </div>
            </Reveal>
          </div>

          <div className="cta-footer" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 56px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>© 2025 Poeage Group</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Chennai, India — Est. 2022</span>
          </div>
        </section>

      </div>
    </>
  );
}