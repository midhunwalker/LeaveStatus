import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

const approvers = [
  { role: "Employee", img: "/employee.jpg", active: true },
  { role: "Team Lead", img: "/teamlead.jpg", active: true },
  { role: "Project Lead", img: "/projectlead.jpg", active: false },
  { role: "HR", img: "/hr.jpg", active: false },
  { role: "CEO", img: "/ceo.jpg", active: false },
];

export default function LeaveApprovalFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const width = parent.offsetWidth;
          const height = parent.offsetHeight;
          setDimensions({ width, height });
          setIsMobile(width < 640); // vertical mode under 640px
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const step = isMobile
    ? height / (approvers.length + 0.5)
    : width / (approvers.length + 0.3);

  const getOffset = (i: number) => {
    const cycle = i % 5;
    if (cycle === 0) return 0;
    if (cycle === 1) return isMobile ? step * 0.3 : 80;
    if (cycle === 2) return isMobile ? -step * 0.3 : -80;
    if (cycle === 3) return isMobile ? step * 0.3 : 80;
    if (cycle === 4) return 0;
    return 0;
  };

  const points = approvers.map((_, i) => ({
    x: isMobile ? width / 2 : 50 + i * step,
    y: isMobile ? 60 + i * step : height * 0.45 + getOffset(i),
  }));

  const nodeRadius = 20; // circle radius (40px node)

  const buildPaths = () => {
    const paths = [];
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      let tailX, tailY, headX, headY, controlX, controlY;

      if (isMobile) {
        // vertical: bottom edge → top edge
        tailX = start.x;
        tailY = start.y + nodeRadius;
        headX = end.x;
        headY = end.y - nodeRadius;
        controlX = start.x; // vertical curve
        controlY = (tailY + headY) / 2;
      } else {
        // horizontal: right edge → left edge
        tailX = start.x + nodeRadius;
        tailY = start.y;
        headX = end.x - nodeRadius;
        headY = end.y;
        controlX = (tailX + headX) / 2;
        controlY = (tailY + headY) / 2;
      }

      const d = `M ${tailX} ${tailY} Q ${controlX} ${controlY}, ${headX} ${headY}`;
      paths.push(
        <path
          key={i}
          d={d}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          fill="transparent"
        />
      );
    }
    return paths;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-visible">
      {/* dotted line */}
      <svg className="absolute left-0 top-0 w-full h-full" fill="none">
        {buildPaths()}
      </svg>

      {/* approvers */}
      <div
        className={`flex relative h-full ${
          isMobile ? "flex-col items-center" : "items-center"
        }`}
        style={{
          paddingLeft: isMobile ? 0 : "10px",
          paddingTop: isMobile ? "10px" : "5px",
          gap: `${step - 36}px`,
        }}
      >
        {approvers.map((item, i) => {
          const offset = getOffset(i);
          const transform = isMobile
            ? `translateX(${offset}px)`
            : `translateY(${offset}px)`;

          return (
            <div
              key={i}
              className="flex flex-col items-center space-y-1 relative shrink-0"
              style={{ transform }}
            >
              <motion.div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-sm relative
                  ${
                    item.active
                      ? "border-green-500 ring-1 ring-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.img}
                  alt={item.role}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap text-center px-1">
                {item.role}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
