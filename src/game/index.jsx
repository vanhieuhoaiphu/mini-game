import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css"

const MiniGame = () => {
  const status = useMemo(() => ({ start: 0, clear: 1, over: 2 }), []);
  const ref = useRef();
  const inputRef = useRef();
  const [pointList, setPointList] = useState([]);
  const [timmer, setTimer] = useState(0);
  const [start, setStart] = useState(-1);
  const [startTimer, setStartTimer] = useState(false);

  const handleRenderItem = () => {
    if (inputRef.current.value >= 1) {
      setStart(status.start);
      setTimer(0);
      setStartTimer(true);
      const maxY = 100;
      const maxX = 100;
      const arr = [];
      for (let i = 1; i <= inputRef.current.value; i++) {
        arr.push({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
          value: i,
          checked: false,
          
        });
      }
      setPointList(arr);
    } else {
      alert("Please input a positive integer!");
    }
  };

  const handleClick = (item, event) => {
    if (start != status.over) {
      event.currentTarget.classList.remove("animation-button");
      const data = pointList.find((item) => !item?.checked);
      if (item.value === data.value) {
        setTimeout(() => {
          setPointList((pre) => {
            const updateList = JSON.parse(JSON.stringify(pre));
            const indexCheck = updateList.findIndex(
              (item) => item.value === data.value
            );
            updateList.splice(indexCheck, 1);
            if (updateList.length === 0) {
              setStart(status.clear);
              setStartTimer(false);
            }
            return [...updateList];
          });
        }, 1000);
        const indexCheck = pointList.findIndex(
          (item) => item.value === data.value
        );
        pointList[indexCheck].checked = true;
        event.currentTarget.classList.add("animation-button");
      } else {
        setStart(status.over);
        setStartTimer(false);
      }
    }
  };

  useEffect(() => {
    let timmer;
    if (startTimer) {
      timmer = setInterval(() => {
        setTimer((prev) => prev + 0.1);
      }, 100);
    } else clearInterval(timmer);

    return () => {
      clearInterval(timmer);
    };
  }, [startTimer]);

  return (
    <div>
      {start != status.clear && start != status.over ? (
        <h2>LET&apos;S PLAY</h2>
      ) : start === status.clear ? (
        <h2 style={{ color: "green" }}>ALL CLEARED</h2>
      ) : (
        <h2 style={{ color: "red" }}>GAME OVER</h2>
      )}
      <div>
        <label>Point:</label>
        <input className="beautiful-input" ref={inputRef} type="number" style={{ marginLeft: "100px" }} />
      </div>
      <div>
        <label>Time:</label>
        <label style={{ marginLeft: "100px" }}>{timmer.toFixed(1)}s</label>
      </div>
      <button
      className="button"
        onClick={handleRenderItem}
      
      >
        {start === -1 ? "Play" : "Restart"}
      </button>
      <button
        onClick={handleRenderItem}
         className="button"
      >
        Auto Play
      </button>
      <div style={
        {
          padding:"0 50px 50px 0"
        }
      } 
      className="component"
      >
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "70vh",
          position: "relative",
        }}
      >
        {pointList.map((item) => (
          <button
            key={item.value}
            style={{
              position: "absolute",
              width: "50px",
              height: "50px",
              zIndex: inputRef.current.value - item.value,
              left: `${item.x}%`,
              top: `${item.y}%`,
              borderRadius: "100%",
              border: "1px solid black",
              textAlign: "center",
              padding: "0px",
            }}
            onClick={(event) => {
              handleClick(item, event);
            }}
          >
            {item.value}
          </button>
        ))}
      </div>
      </div>
     
    </div>
  );
};
export default MiniGame;
