import { useEffect, useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
const Line = ({ lc, fireForeColor }) => {
  const sparkAnimDuration = 3.5 + Math.random() * 3;
  const fireWidth = 0.25 + Math.random() * 10;
  const fireHeight = 0.25 + Math.random() * 10;

  return (
    <div
      className="frwdLine"
      style={{ transform: `rotate3d(0, 1, 0, ${Math.random() * 360}deg)` }}
    >
      <div
        className="frwdSpark"
        style={{
          animation: `frwdSpark-${lc} ${sparkAnimDuration}s cubic-bezier(0.39, 0.575, 0.565, 1) infinite`,
        }}
      >
        <div
          className="frwdFire"
          style={{
            background: fireForeColor,
            width: `${fireWidth}px`,
            height: `${fireHeight}px`,
            animation: `frwdFire-${lc} ${sparkAnimDuration}s linear infinite`,
          }}
        ></div>
      </div>
    </div>
  );
};
Line.propTypes = {
  lc: PropTypes.number,
  fireForeColor: PropTypes.string,
};
const Fireworks = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const getRandomColor = () => {
      const colors = [
        () =>
          `rgb(${Math.round(Math.random() * 55) + 200},${
            Math.round(Math.random() * 100) + 100
          },${Math.round(Math.random() * 100) + 100})`,
        () =>
          `rgb(${Math.round(Math.random() * 100) + 100},${
            Math.round(Math.random() * 55) + 200
          },${Math.round(Math.random() * 100) + 100})`,
        () =>
          `rgb(${Math.round(Math.random() * 100) + 100},${
            Math.round(Math.random() * 100) + 100
          },${Math.round(Math.random() * 55) + 200})`,
        () =>
          `rgb(${Math.round(Math.random() * 100) + 100},${
            Math.round(Math.random() * 55) + 200
          },${Math.round(Math.random() * 55) + 200})`,
        () =>
          `rgb(${Math.round(Math.random() * 55) + 200},${
            Math.round(Math.random() * 100) + 100
          },${Math.round(Math.random() * 55) + 200})`,
        () =>
          `rgb(${Math.round(Math.random() * 55) + 200},${
            Math.round(Math.random() * 55) + 200
          },${Math.round(Math.random() * 100) + 100})`,
      ];
      const randIndex = Math.floor(Math.random() * colors.length);
      return [colors[randIndex](), colors[randIndex]()];
    };

    const fireColors = getRandomColor();
    const fireForeColor = fireColors[0];
    const fireBackColor = fireColors[1];
    const countLinesPerFirework = 50 + Math.round(Math.random() * 50);
    const newLines = Array.from({ length: countLinesPerFirework }, (_, lc) => (
      <Line
        key={lc}
        lc={lc + 1}
        fireForeColor={fireForeColor}
        fireBackColor={fireBackColor}
      />
    ));

    setLines(newLines);

    const generateStyles = () => {
      let styles = "";

      for (let lc = 1; lc <= countLinesPerFirework; lc++) {
        const fireRotateX = Math.ceil(Math.random() * 3) * 360;
        const fireRotateY = Math.ceil(Math.random() * 3) * 360;
        const fireRotateZ = Math.ceil(Math.random() * 3) * 360;
        const fireTransform = `rotate3d(1, 0, 0, ${fireRotateX}deg) rotate3d(0, 1, 0, ${fireRotateY}deg) rotate3d(0, 0, 1, ${fireRotateZ}deg)`;
        styles += `
          @keyframes frwdSpark-${lc} {
            100% {
              transform: rotate3d(0, 0, 1, ${
                Math.random() * 360
              }deg) translate3d(${Math.round(
          Math.random() * 200 + 100
        )}px, 0, 0);
            }
          }

         @keyframes frwdFire-${lc} {
            0% {
            transform: rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg) rotate3d(0, 0, 1, 0deg);
            }
            100% {
            transform: ${fireTransform};
            }
  }`;
      }

      const styleElement = document.createElement("style");
      styleElement.innerHTML = styles;
      document.head.appendChild(styleElement);
    };

    generateStyles();
  }, []);

  return (
    <div className="frwdStage">
      <div className="frwdFireworks">{lines}</div>
    </div>
  );
};

export default Fireworks;
