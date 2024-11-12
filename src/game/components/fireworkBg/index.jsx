import { useRef, useEffect } from "react";
function Fireworks() {
  const canvasRef = useRef(null);
  let fireworkArray = [];
  let particleArray = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Firework {
      constructor(x, y, height, yVol, R, G, B) {
        this.x = x;
        this.y = y;
        this.yVol = yVol;
        this.height = height;
        this.R = R;
        this.G = G;
        this.B = B;
        this.radius = 2;
        this.boom = false;
        this.boomHeight = Math.floor(Math.random() * 200) + 50;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.R}, ${this.G}, ${this.B})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
        ctx.fill();
      }

      update() {
        this.y -= this.yVol;
        if (this.radius < 20) this.radius += 0.35;
        if (this.y < this.boomHeight) {
          this.boom = true;
          for (let i = 0; i < 120; i++) {
            particleArray.push(
              new Particle(
                this.x,
                this.y,
                Math.random() * 2 + 1,
                this.R,
                this.G,
                this.B,
                1
              )
            );
          }
        }
        this.draw();
      }
    }

    class Particle {
      constructor(x, y, radius, R, G, B, A) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.R = R;
        this.G = G;
        this.B = B;
        this.A = A;
        this.fade = false;
        this.xVol = Math.random() * 10 - 5;
        this.yVol = Math.random() * 10 - 5;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        ctx.fill();
      }

      update() {
        this.x += this.xVol;
        this.y += this.yVol;
        this.yVol += 0.05; // Gravity effect
        this.A -= 0.02;
        if (this.A < 0) this.fade = true;
        this.draw();
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworkArray.forEach((firework, i) => {
        firework.update();
        if (firework.boom) fireworkArray.splice(i, 1);
      });

      particleArray.forEach((particle, i) => {
        particle.update();
        if (particle.fade) particleArray.splice(i, 1);
      });

      if (fireworkArray.length < 4) {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const height = Math.floor(Math.random() * 20) + 10;
        const yVol = 5;
        const R = Math.floor(Math.random() * 255);
        const G = Math.floor(Math.random() * 255);
        const B = Math.floor(Math.random() * 255);
        fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
      }
    }

    for (let i = 0; i < 6; i++) {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const R = Math.floor(Math.random() * 255);
      const G = Math.floor(Math.random() * 255);
      const B = Math.floor(Math.random() * 255);
      const height = Math.floor(Math.random() * 20) + 10;
      fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
    }
    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: "-1",
        fillStyle: "white",
        backgroundColor: "white",
        fill: "white",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          margin: "0",
          padding: "0",
          fillStyle: "white",
          backgroundColor: "white",
          fill: "white",
          opacity: 0.2,
          zIndex: "-1",
        }}
      ></canvas>
    </div>
  );
}

export default Fireworks;
