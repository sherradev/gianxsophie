import { COLOR_PALETTES as C } from "../utils/global";
import { motion, useInView } from 'framer-motion';
import { FadeUp } from "../components/FadeUp";

const DressCodeSection = () => {
  const swatches = [
    { name: "Baby Powder", code: "11-0501 TSX", color: C.babyPowder, border: true },
    { name: "Blushing Bride", code: "12-1310 TCX", color: C.blushingBride },
    { name: "Crushed Berry", code: "18-1418 TCX", color: C.crushedBerry },
    { name: "Lime Cream", code: "12-0312 TCX", color: C.limeCream },
    { name: "Sweet Pea", code: "15-0531 TCX", color: C.sweetPea },
  ];

  return (
    <FadeUp delay={0.2}>
      <div
        style={{
          border: `1px solid ${C.blushingBride}66`,
          borderRadius: 4,
          padding: "40px 48px",
          textAlign: "center",
          background: `${C.babyPowder}88`,
        }}
      >
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
          Dress Code
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32,
            fontWeight: 400,
            color: C.crushedBerry,
            margin: "0 0 8px",
            fontStyle: "italic",
          }}
        >
          Formal Attire
        </h3>
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {[
            ["Gentlemen", "Suit & Tie"],
            ["Ladies", "Long Gown / Cocktail Dress"],
          ].map(([role, guide]) => (
            <div key={role}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.deepSlate,
                  margin: "0 0 4px",
                }}
              >
                {role}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18,
                  color: C.warmGrey,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {guide}
              </p>
            </div>
          ))}
        </div>

        {/* Pantone swatch grid */}
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: C.warmGrey,
            marginBottom: 20,
          }}
        >
          Colour Palette
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {swatches.map(({ name, code, color, border }) => (
            <motion.div
              key={name}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              transition={{ duration: 0.25 }}
              style={{
                width: 90,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                background: "#fff",
                cursor: "default",
              }}
            >
              {/* Colour block */}
              <div
                style={{
                  height: 80,
                  background: color,
                  border: border ? `1px solid ${C.warmGrey}33` : "none",
                }}
              />
              {/* Label area — white card below, exactly like Pantone */}
              <div className="bg-white p-2 pb-[10px]">
                <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,
            fontWeight: 700, 
            textTransform: "uppercase", 
            marginLeft: 5,
            height: 15,
            textAlign: "left"
          }}>
                  PANTONE®
                </div>
                <div  style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,  
            marginLeft: 5,
            height: 15,
            textAlign: "left"
          }}>
                  {code}
                </div>
                <div  style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 10,  
            marginLeft: 5,
            marginBottom: 15,
            fontWeight: 700, 
            textAlign: "left",
            height: 15,
          }}>
                  {name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
};

export default DressCodeSection;