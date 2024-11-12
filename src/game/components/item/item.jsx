import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import Fireworks from "../disappear";
const Item = ({
  x,
  y,
  value,
  onRemoveItem,
  zIndex,
  start,
  isCanClick,
  onStop,
  isOver,
  isAuto,
  setNext,
}) => {
  const [countDown, setCountDown] = useState(3);
  const interval = useRef();
  const timeout = useRef();
  const [checked, setChecked] = useState(false);

  const handleClick = (event) => {
    event?.stopPropagation();
    setChecked(true);
    if (start != isOver) {
      if (isCanClick) {
        interval.current = setInterval(() => {
          setCountDown((prev) => prev - 0.1);
        }, 100);
        if (isAuto) {
          setTimeout(() => {
            setNext();
          }, 1500);
        } else setNext();
        timeout.current = setTimeout(() => {
          onRemoveItem();
          clearInterval(interval.current);
        }, 3000);
      } else {
        onStop();
      }
    }
  };

  useEffect(() => {
    if (isOver) {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    }
  }, [isOver]);

  useEffect(() => {
    if (isAuto) {
      console.log(isAuto, value);
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuto]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, []);
  return (
    <button
      style={{
        position: "absolute",
        width: "50px",
        height: "50px",
        zIndex: zIndex,
        left: `${x}%`,
        top: `${y}%`,
        borderRadius: "100%",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        boxShadow: " 0 8px 15px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        padding: "0px",
        opacity: countDown / 3,
        background: checked ? "rgba(255, 138, 138, 1)" : "",
      }}
      onClick={handleClick}
    >
      <div style={{ position: "relative" }}>
        {checked && <Fireworks />}
        {value}
        <br />
        {checked ? `${countDown.toFixed(1)}s` : ""}
      </div>
    </button>
  );
};
Item.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  zIndex: PropTypes.number.isRequired,
  start: PropTypes.bool.isRequired,
  isCanClick: PropTypes.bool.isRequired,
  onStop: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  isAuto: PropTypes.bool.isRequired,
  setNext: PropTypes.func.isRequired,
};
export default memo(Item);
