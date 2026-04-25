import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { FadeUp } from "./components/FadeUp";
import DressCodeSection from "./Pages/DressCode";
import { COLOR_PALETTES as C } from "./utils/global";
import heroImage from "./assets/gxs_hero2.webp";

// ─── Botanical SVG decorations ─────────────────────────────────────────────────
const BotanicalLeft = ({ style = {} }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ ...style }}
  >
    <g opacity="0.55">
      {/* Stem */}
      <path
        d="M100 380 Q85 300 95 220 Q105 140 90 60"
        stroke={C.sweetPea}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Leaves */}
      <path
        d="M95 280 Q60 260 45 230 Q75 235 95 260Z"
        fill={C.sweetPea}
        opacity="0.7"
      />
      <path
        d="M95 280 Q130 255 140 225 Q110 235 95 260Z"
        fill={C.limeCream}
        opacity="0.8"
      />
      <path
        d="M92 200 Q55 175 42 148 Q72 158 92 182Z"
        fill={C.sweetPea}
        opacity="0.6"
      />
      <path
        d="M92 200 Q128 170 138 143 Q108 158 92 182Z"
        fill={C.limeCream}
        opacity="0.7"
      />
      <path
        d="M94 140 Q65 115 55 88 Q82 102 94 125Z"
        fill={C.sweetPea}
        opacity="0.5"
      />
      {/* Flowers */}
      <circle cx="90" cy="60" r="12" fill={C.blushingBride} opacity="0.6" />
      <circle cx="90" cy="60" r="6" fill="#fff" opacity="0.5" />
      <circle cx="78" cy="72" r="9" fill={C.blushingBride} opacity="0.45" />
      <circle cx="103" cy="68" r="8" fill={C.crushedBerry} opacity="0.35" />
      {/* Small berries */}
      <circle cx="60" cy="150" r="4" fill={C.crushedBerry} opacity="0.5" />
      <circle cx="55" cy="160" r="3" fill={C.crushedBerry} opacity="0.4" />
      <circle cx="65" cy="158" r="3.5" fill={C.blushingBride} opacity="0.5" />
    </g>
  </svg>
);

const BotanicalRight = ({ style = {} }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "scaleX(-1)", ...style }}
  >
    <g opacity="0.55">
      <path
        d="M100 380 Q85 300 95 220 Q105 140 90 60"
        stroke={C.sweetPea}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M95 280 Q60 260 45 230 Q75 235 95 260Z"
        fill={C.sweetPea}
        opacity="0.7"
      />
      <path
        d="M95 280 Q130 255 140 225 Q110 235 95 260Z"
        fill={C.limeCream}
        opacity="0.8"
      />
      <path
        d="M92 200 Q55 175 42 148 Q72 158 92 182Z"
        fill={C.sweetPea}
        opacity="0.6"
      />
      <path
        d="M92 200 Q128 170 138 143 Q108 158 92 182Z"
        fill={C.limeCream}
        opacity="0.7"
      />
      <path
        d="M94 140 Q65 115 55 88 Q82 102 94 125Z"
        fill={C.sweetPea}
        opacity="0.5"
      />
      <circle cx="90" cy="60" r="12" fill={C.blushingBride} opacity="0.6" />
      <circle cx="90" cy="60" r="6" fill="#fff" opacity="0.5" />
      <circle cx="78" cy="72" r="9" fill={C.blushingBride} opacity="0.45" />
      <circle cx="103" cy="68" r="8" fill={C.crushedBerry} opacity="0.35" />
      <circle cx="60" cy="150" r="4" fill={C.crushedBerry} opacity="0.5" />
      <circle cx="55" cy="160" r="3" fill={C.crushedBerry} opacity="0.4" />
      <circle cx="65" cy="158" r="3.5" fill={C.blushingBride} opacity="0.5" />
    </g>
  </svg>
);

const FloralDivider = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      margin: "32px 0",
    }}
  >
    <div
      style={{
        height: 1,
        width: 80,
        background: `linear-gradient(to right, transparent, ${C.blushingBride})`,
      }}
    />
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="4" fill={C.blushingBride} />
      <circle cx="14" cy="4" r="3" fill={C.sweetPea} opacity="0.7" />
      <circle cx="14" cy="24" r="3" fill={C.sweetPea} opacity="0.7" />
      <circle cx="4" cy="14" r="3" fill={C.sweetPea} opacity="0.7" />
      <circle cx="24" cy="14" r="3" fill={C.sweetPea} opacity="0.7" />
      <circle cx="7" cy="7" r="2.5" fill={C.blushingBride} opacity="0.6" />
      <circle cx="21" cy="7" r="2.5" fill={C.blushingBride} opacity="0.6" />
      <circle cx="7" cy="21" r="2.5" fill={C.blushingBride} opacity="0.6" />
      <circle cx="21" cy="21" r="2.5" fill={C.blushingBride} opacity="0.6" />
    </svg>
    <div
      style={{
        height: 1,
        width: 80,
        background: `linear-gradient(to left, transparent, ${C.blushingBride})`,
      }}
    />
  </div>
);

// ─── Nav ───────────────────────────────────────────────────────────────────────
const Nav = ({ active }) => {
  const links = ["Home", "Details", "FAQs" ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrolled ? `rgba(245, 243, 238, 0.92)` : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.4s, box-shadow 0.4s",
          boxShadow: scrolled ? `0 1px 0 ${C.blushingBride}55` : "none",
        }}
      >
        <button
          onClick={() => scrollTo("home")}
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18,
              color: C.crushedBerry,
              letterSpacing: "0.08em",
              fontStyle: "italic",
            }}
          >
            G &amp; S
          </span>
        </button>
        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color:
                  active === l.toLowerCase() ? C.crushedBerry : C.deepSlate,
                fontWeight: active === l.toLowerCase() ? 600 : 400,
                borderBottom:
                  active === l.toLowerCase()
                    ? `1px solid ${C.blushingBride}`
                    : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.3s, border-color 0.3s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
          className="nav-mobile"
        >
          <span style={{ fontSize: 22, color: C.crushedBerry }}>☰</span>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 99,
              background: `rgba(245,243,238,0.97)`,
              padding: "20px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              borderBottom: `1px solid ${C.blushingBride}44`,
            }}
          >
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.deepSlate,
                }}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
};

// ─── SECTION: Hero ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: C.babyPowder,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Botanical corners */}
      <motion.div
        style={{ position: "absolute", left: -20, top: "10%", width: 180, y }}
      >
        <BotanicalLeft />
      </motion.div>
      <motion.div
        style={{ position: "absolute", right: -20, top: "10%", width: 180, y }}
      >
        <BotanicalRight />
      </motion.div>
      {/* Bottom botanicals */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 160,
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
        }}
      >
        <BotanicalLeft style={{ transform: "scaleY(-1) translateY(-40px)" }} />
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 160,
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
        }}
      >
        <BotanicalRight style={{ transform: "scaleY(-1) translateY(-40px)" }} />
      </motion.div>

      <motion.div
        style={{
          opacity,
          textAlign: "center",
          zIndex: 2,
          padding: "10px 24px 60px",
        }}
      >
        {/* Pre-title */}

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={heroImage}
            fetchpriority="high"
            style={{
              width: "100%",
              maxWidth: "600px", // Adjust this number to make it smaller/larger
              height: "auto",
              display: "block",
              margin: "0 auto", // Centers the image
              borderRadius: "8px", // Optional: adds a nice soft corner
            }}
            alt="Gian and Sophie"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 17,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.warmGrey,
            margin: "0 0 10px 25px",
          }}
        >
          are getting married
        </motion.p>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            display: "inline-block",
            border: `1px solid ${C.blushingBride}88`,
            padding: "10px 28px",
            borderRadius: 40,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 17,
              color: C.crushedBerry,
              letterSpacing: "0.1em",
              fontStyle: "italic",
            }}
          >
            Save the Date
          </span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{ marginTop: 60 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
            onClick={() =>
              document
                .getElementById("details")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 9,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: C.warmGrey,
              }}
            >
              scroll
            </span>
            <svg width="14" height="20" viewBox="0 0 14 20">
              <path
                d="M7 1v18M1 13l6 6 6-6"
                stroke={C.blushingBride}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Detail Card ───────────────────────────────────────────────────────────────
const DetailCard = ({ icon, title, lines, delay = 0 }) => (
  <FadeUp
    delay={delay}
    style={{ textAlign: "center", flex: "1 1 220px", padding: "32px 24px" }}
  >
    <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
    <h3
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 400,
        color: C.crushedBerry,
        marginBottom: 12,
        letterSpacing: "0.05em",
      }}
    >
      {title}
    </h3>
    {lines.map((l, i) => (
      <p
        key={i}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 13,
          color: C.deepSlate,
          margin: "4px 0",
          lineHeight: 1.7,
          letterSpacing: "0.04em",
        }}
      >
        {l}
      </p>
    ))}
  </FadeUp>
);

// ─── SECTION: Details ──────────────────────────────────────────────────────────
const DetailsSection = () => (
  <section
    id="details"
    style={{
      background: C.offWhite,
      padding: "100px 24px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Bg blush circle */}
    <div
      style={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: C.blushingBride,
        opacity: 0.07,
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -80,
        left: -80,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: C.limeCream,
        opacity: 0.15,
      }}
    />

    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <FadeUp>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.warmGrey,
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          The Celebration
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 300,
            color: C.deepSlate,
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          Wedding Details
        </h2>
      </FadeUp>

      <FloralDivider />

      {/* Cards row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <DetailCard
          icon="📅"
          title="Date & Time"
          lines={[
            "Wednesday",
            "July 7, 2027, 3 PM", 
          ]}
          delay={0.1}
        />
        <div
          style={{
            width: 1,
            background: `${C.blushingBride}44`,
            margin: "40px 0",
            alignSelf: "stretch",
          }}
          className="divider-line"
        />
        <DetailCard
          icon="💒"
          title="Church"
          lines={[
            "Our Mother of Perpetual Help Redemptorist Church,", 
            "San Lorenzo Ruiz, Dumaguete City",
          ]}
          delay={0.2}
        />
        <div
          style={{
            width: 1,
            background: `${C.blushingBride}44`,
            margin: "40px 0",
            alignSelf: "stretch",
          }}
          className="divider-line"
        />
        <DetailCard
          icon="📍"
          title="Venue"
          lines={["The Barn at Mango Ranch,","Valencia"]}
          delay={0.3}
        />
      </div>

      <FloralDivider />

      {/* Dress code */}
      <DressCodeSection />

      {/* Principal sponsors note */}
      {/* <FadeUp delay={0.3} style={{ textAlign: "center", marginTop: 48 }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: C.warmGrey, marginBottom: 8 }}>Principal Sponsors</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: C.deepSlate, fontStyle: "italic" }}>
          Ninong: Barong and black slacks &nbsp;·&nbsp; Ninang: Beige long gown
        </p>
      </FadeUp> */}
    </div>
    <style>{`.divider-line { display: block; } @media(max-width:640px){.divider-line{display:none!important;}}`}</style>
  </section>
);

// ─── Accordion ────────────────────────────────────────────────────────────────
const Accordion = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        borderBottom: `1px solid ${C.blushingBride}55`,
        overflow: "hidden",
      }}
    >
      {/* Wrapping the entire top area in the button. 
         Adding a hover state makes it clear the WHOLE thing is clickable.
      */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
          outline: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            color: C.deepSlate,
            fontWeight: 400,
            flexGrow: 1, // This ensures the text area takes up all space
            paddingRight: "16px", // Keeps text from hitting the '+'
          }}
        >
          {q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            color: C.blushingBride,
            fontSize: 22,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                color: C.warmGrey,
                lineHeight: 1.8,
                paddingBottom: 20,
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── SECTION: FAQs ────────────────────────────────────────────────────────────
const FAQsSection = () => {
  const faqs = [
    {
      q: "When is the RSVP deadline?",
      a: "Please RSVP by September 25, 2026. This helps us finalise seating and catering. We appreciate your prompt response!",
    },
    {
      q: "Will there be a reception after the ceremony?",
      a: "Absolutely! A dinner reception will follow immediately after the ceremony. Please stay and celebrate with us!",
    },
    {
      q: "Can I bring a plus-one?",
      a: "Your invitation will specify whether it is for one or two guests. If you are unsure, please reach out to us directly via the contact numbers below.",
    },
    { q: "Are children welcome?", a: "No, lol." },
  ];

  return (
    <section
      id="faqs"
      style={{
        background: C.babyPowder,
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: C.limeCream,
          opacity: 0.08,
        }}
      />

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 8 }}>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: C.warmGrey,
              marginBottom: 12,
            }}
          >
            Questions
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 300,
              color: C.deepSlate,
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            Frequently Asked
          </h2>
        </FadeUp>
        <FloralDivider />
        <div>
          {faqs.map((f, i) => (
            <Accordion key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── SECTION: RSVP ────────────────────────────────────────────────────────────
const RSVPSection = () => {
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    attending: "yes",
    dietary: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((v) => ({ ...v, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name.trim()) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    border: `1px solid ${C.blushingBride}77`,
    borderRadius: 3,
    background: `${C.babyPowder}cc`,
    outline: "none",
    fontFamily: "'Jost', sans-serif",
    fontSize: 13,
    color: C.deepSlate,
    letterSpacing: "0.03em",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };
  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: 10,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: C.warmGrey,
    display: "block",
    marginBottom: 8,
  };

  return (
    <section
      id="rsvp"
      style={{
        background: C.offWhite,
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Berry blob */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: C.crushedBerry,
          opacity: 0.05,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: C.blushingBride,
          opacity: 0.08,
        }}
      />

      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <FadeUp style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: C.warmGrey,
              marginBottom: 12,
            }}
          >
            Kindly Reply By December 25
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 300,
              color: C.deepSlate,
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            RSVP
          </h2>
        </FadeUp>
        <FloralDivider />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: "center",
                padding: "60px 32px",
                border: `1px solid ${C.blushingBride}66`,
                borderRadius: 4,
                background: `${C.babyPowder}99`,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 34,
                  fontWeight: 300,
                  color: C.crushedBerry,
                  margin: "24px 0 12px",
                  fontStyle: "italic",
                }}
              >
                Thank you, {form.name.split(" ")[0]}!
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 13,
                  color: C.warmGrey,
                  lineHeight: 1.8,
                  letterSpacing: "0.03em",
                }}
              >
                {form.attending === "yes"
                  ? "We're so thrilled you'll be joining us. We can't wait to celebrate with you!"
                  : "We'll miss you dearly. Thank you for letting us know."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FadeUp delay={0.1}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      style={inputStyle}
                    />
                  </div>
                  {/* Attending */}
                  <div>
                    <label style={labelStyle}>Will you be attending?</label>
                    <div style={{ display: "flex", gap: 12 }}>
                      {[
                        ["yes", "Joyfully accepts"],
                        ["no", "Regretfully declines"],
                      ].map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() =>
                            setForm((v) => ({ ...v, attending: val }))
                          }
                          style={{
                            flex: 1,
                            padding: "14px",
                            border: `1px solid ${form.attending === val ? C.crushedBerry : C.blushingBride + "77"}`,
                            borderRadius: 3,
                            cursor: "pointer",
                            background:
                              form.attending === val
                                ? `${C.crushedBerry}11`
                                : "transparent",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 16,
                            color:
                              form.attending === val
                                ? C.crushedBerry
                                : C.warmGrey,
                            fontStyle: "italic",
                            transition: "all 0.3s",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Number of guests */}
                  <div>
                    <label style={labelStyle}>Number of Guests</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {["1", "2", "3", "4"].map((n) => (
                        <option key={n} value={n}>
                          {n} guest{n !== "1" ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Dietary */}
                  <div>
                    <label style={labelStyle}>Dietary Requirements</label>
                    <input
                      name="dietary"
                      value={form.dietary}
                      onChange={handleChange}
                      placeholder="Any allergies or dietary notes"
                      style={inputStyle}
                    />
                  </div>
                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message for the couple</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Share your well wishes…"
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    style={{
                      background: C.crushedBerry,
                      color: C.babyPowder,
                      border: "none",
                      cursor: "pointer",
                      padding: "18px 40px",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      borderRadius: 3,
                      marginTop: 8,
                      transition: "background 0.3s",
                    }}
                  >
                    Send RSVP
                  </motion.button>
                </div>
              </FadeUp>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{
      background: C.deepSlate,
      padding: "56px 24px",
      textAlign: "center",
    }}
  >
    <p
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        color: C.blushingBride,
        fontStyle: "italic",
        margin: "20px 0 8px",
      }}
    >
      Gian &amp; Sophie
    </p>
    <p
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 10,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: `${C.babyPowder}55`,
        margin: 0,
      }}
    >
      7th of July, 2027 · The Barn at Mango Ranch, Valencia
    </p>
  </footer>
);

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "details", "faqs", "rsvp"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.babyPowder}; }
        input:focus, textarea:focus, select:focus { border-color: ${C.blushingBride} !important; }
        ::selection { background: ${C.blushingBride}55; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.babyPowder}; }
        ::-webkit-scrollbar-thumb { background: ${C.blushingBride}; border-radius: 2px; }
      `}</style>
      <Nav active={active} />
      <HeroSection />
      <DetailsSection />
      <FAQsSection />
      <Footer />
    </>
  );
}
