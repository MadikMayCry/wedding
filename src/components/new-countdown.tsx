"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
// обычный путь:
import { motion } from "motion/react";
// если будет ошибка client boundary, замени строку выше на:
// import { motion } from "motion/react-client";

type DigitProps = { value: number };

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function FlipClockTimer() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [h1, h2, m1, m2, s1, s2] = useMemo(() => {
    const hh = pad2(now.getHours());
    const mm = pad2(now.getMinutes());
    const ss = pad2(now.getSeconds());
    return [hh[0], hh[1], mm[0], mm[1], ss[0], ss[1]].map((d) => +d);
  }, [now]);

  return (
    <div style={wrap}>
      <Digit value={h1} />
      <Digit value={h2} />
      <Colon />
      <Digit value={m1} />
      <Digit value={m2} />
      <Colon />
      <Digit value={s1} />
      <Digit value={s2} />
    </div>
  );
}

/** Одна «карточка» цифры с flip-анимацией */
function Digit({ value }: DigitProps) {
  const prevRef = useRef<number>(value);
  const [animKey, setAnimKey] = useState(0);

  // триггерим анимацию при смене value
  useEffect(() => {
    if (prevRef.current !== value) {
      setAnimKey((k) => k + 1);
      prevRef.current = value;
    }
  }, [value]);

  const prev = usePreviousValue(animKey, value);

  const currStr = String(value);
  const prevStr = String(prev);

  return (
    <div style={card}>
      {/* Статический верх текущего значения */}
      <div style={{ ...half, ...topStatic }}>{currStr}</div>

      {/* Статический низ текущего значения */}
      <div style={{ ...half, ...bottomStatic }}>{currStr}</div>

      {/* Верхняя «створка»: уходит вверх (0 -> -90deg) показывая ПРЕДЫДУЮЩЕЕ */}
      <motion.div
        key={`top-${animKey}`}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: -90 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ ...half, ...topFlip }}
      >
        {prevStr}
      </motion.div>

      {/* Нижняя «створка»: приходит снизу (90 -> 0deg) показывая ТЕКУЩЕЕ */}
      <motion.div
        key={`bot-${animKey}`}
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
        style={{ ...half, ...bottomFlip }}
      >
        {currStr}
      </motion.div>
    </div>
  );
}

/** Двоеточие с лёгким миганием */
function Colon() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      style={colon}
    >
      :
    </motion.div>
  );
}

/** Возвращает предыдущее значение при изменении ключа анимации */
function usePreviousValue<T>(trigger: any, current: T) {
  const ref = useRef(current);
  useEffect(() => {
    ref.current = current;
  }, [trigger]); // обновляем только когда пришла новая итерация анимации
  return ref.current;
}

/* --- Стили (минимум, без зависимостей) --- */
const wrap: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "center",
  perspective: 1000, // важен 3D-perspective
  userSelect: "none",
  fontFamily: "ui-rounded, SF Pro Rounded, Inter, system-ui, -apple-system",
};

const card: React.CSSProperties = {
  position: "relative",
  width: 64,
  height: 88,
  borderRadius: 12,
  background: "#0F172A", // slate-900
  color: "#E5E7EB",
  boxShadow: "0 8px 24px rgba(0,0,0,.35)",
  overflow: "hidden",
  transformStyle: "preserve-3d",
};

const baseHalf: React.CSSProperties = {
  position: "absolute",
  left: 0,
  width: "100%",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: 44,
  lineHeight: 1,
  backfaceVisibility: "hidden",
};

const halfTopCommon: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  background: "linear-gradient(#111827, #0f172a)", // чуть светлее сверху
};
const halfBottomCommon: React.CSSProperties = {
  background: "linear-gradient(#0b1220, #0b1220)", // ровнее снизу
};

const half = baseHalf;
const topStatic: React.CSSProperties = {
  ...halfTopCommon,
  top: 0,
  transformOrigin: "bottom",
  zIndex: 1,
};
const bottomStatic: React.CSSProperties = {
  ...halfBottomCommon,
  bottom: 0,
  transformOrigin: "top",
  zIndex: 0,
};

const topFlip: React.CSSProperties = {
  ...halfTopCommon,
  top: 0,
  transformOrigin: "bottom",
  zIndex: 3,
  background: "linear-gradient(#1f2937, #0f172a)", // слегка выделяем створку
};
const bottomFlip: React.CSSProperties = {
  ...halfBottomCommon,
  bottom: 0,
  transformOrigin: "top",
  zIndex: 2,
};

const colon: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 700,
  opacity: 0.9,
  marginInline: 4,
};
