import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import Item from "./components/item/item";
import Fireworks from "./components/fireworkBg";

const MiniGame = () => {
  const status = useMemo(() => ({ start: 0, clear: 1, over: 2 }), []);
  const ref = useRef();
  const inputRef = useRef();
  const [pointList, setPointList] = useState([]);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(-1);
  const [startTimer, setStartTimer] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [next, setNext] = useState(1);
  const timerRef = useRef();

  const handleStart = useCallback(() => {
    setStart(status.start);
    setNext(1);
    setStartTimer(true);
    setTimer(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRenderItem = useCallback(() => {
    if (inputRef.current?.value >= 1) {
      handleStart();
      const maxY = 100;
      const maxX = 100;
      const arr = [];
      for (let i = 1; i <= inputRef.current?.value; i++) {
        arr.push({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
          value: i,
          checked: false,
          key: crypto.randomUUID(),
        });
      }
      setPointList(arr);
    } else {
      alert("Please input a positive integer!");
    }
  }, [handleStart]);

  const handleStop = useCallback(() => {
    console.log("check");

    setStart(status.over);
    setStartTimer(false);
    clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (startTimer) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 0.1);
      }, 100);
    } else clearInterval(timerRef.current);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (pointList.length === 0 && start === status.start) {
      setStart(status.clear);
      setStartTimer(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointList]);

  return (
    <div>
      {start === status.clear && <Fireworks />}

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          zIndex: 9999999999,
        }}
      >
        <div style={{ paddingBottom: "16px" }}>
          {start != status.clear && start != status.over ? (
            <h2>LET&apos;S PLAY</h2>
          ) : start === status.clear ? (
            <h2 style={{ color: "green" }}>ALL CLEARED</h2>
          ) : (
            <h2 style={{ color: "red" }}>GAME OVER</h2>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
            <h2>Point:</h2>
            <input
              className="beautiful-input"
              ref={inputRef}
              type="number"
              style={{ marginLeft: "100px", border: "2px solid #007bff" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
            <h2>Time:</h2>
            <label style={{ marginLeft: "100px" }}>{timer.toFixed(1)}s</label>
          </div>
          <button className="button" onClick={handleRenderItem}>
            {start === -1 ? "Play" : "Restart"}
          </button>
          {start === status.start && (
            <button
              onClick={() => setIsAuto(!isAuto)}
              className="button"
              style={{ marginLeft: "10px" }}
            >
              {isAuto ? "Auto play off" : "Auto play on"}
            </button>
          )}
        </div>
        <div
          style={{
            padding: "0 50px 50px 0",
            flex: "1",
          }}
          className="component"
        >
          <div
            ref={ref}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {pointList.map((item) => (
              <Item
                isCanClick={next === item.value}
                setNext={() => setNext(next + 1)}
                isAuto={next === item.value && isAuto}
                onStop={handleStop}
                onRemoveItem={() => {
                  setPointList((pre) =>
                    pre.filter((itemFilter) => itemFilter.value !== item.value)
                  );
                }}
                start={start === status.start}
                key={item.key}
                isOver={start === status.over}
                x={item.x}
                zIndex={Number(inputRef.current.value) - Number(item.value)}
                y={item.y}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MiniGame;
