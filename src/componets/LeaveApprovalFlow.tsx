import { motion } from "framer-motion";
import React, { useRef, useEffect, useState, useCallback } from "react";

const approvers = [
  { role: "Employee", img: "/employee.jpg", active: true },
  { role: "Team Lead", img: "/teamlead.jpg", active: true },
  { role: "Project Lead", img: "/projectlead.jpg", active: false },
  { role: "HR", img: "/hr.jpg", active: false },
  { role: "CEO", img: "/ceo.jpg", active: false },
];

interface NodePosition {
  centerX: number;
  centerY: number;
}

export default function LeaveApprovalFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  const [isMobile, setIsMobile] = useState(false);
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);

  // Measure node center positions after render
  const measureNodes = useCallback(() => {
    if (!containerRef.current) return;

    const positions: NodePosition[] = [];
    let allMeasured = true;

    nodeRefs.current.forEach((node, index) => {
      if (!node) {
        allMeasured = false;
        return;
      }

      const rect = node.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();

      // Only store the center point
      positions[index] = {
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: rect.top - containerRect.top + rect.height / 2,
      };
    });

    if (allMeasured && positions.length === approvers.length) {
      setNodePositions(positions);
    }
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const width = parent.offsetWidth;
          const height = parent.offsetHeight;
          setDimensions({ width, height });
          setIsMobile(width < 640);
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Re-measure when dimensions change
  useEffect(() => {
    const timeoutId = setTimeout(measureNodes, 100);
    return () => clearTimeout(timeoutId);
  }, [dimensions, measureNodes]);

  const { width, height } = dimensions;
  const step = isMobile
    ? height / (approvers.length + 0.5)
    : width / (approvers.length + 0.3);

  // positioning pattern: center → below → above → below → center
  const getOffset = (i: number) => {
    const cycle = i % 5;
    if (cycle === 0) return 0;
    if (cycle === 1) return isMobile ? step * 0.3 : 80;
    if (cycle === 2) return isMobile ? -step * 0.3 : -80;
    if (cycle === 3) return isMobile ? step * 0.3 : 80;
    if (cycle === 4) return 0;
    return 0;
  };

  const buildPaths = () => {
    if (nodePositions.length !== approvers.length) return null;

    const paths: JSX.Element[] = [];

    for (let i = 0; i < nodePositions.length - 1; i++) {
      const start = nodePositions[i];
      const end = nodePositions[i + 1];

      if (!start || !end) continue;

      // Connect directly from center to center
      const d = `M ${start.centerX} ${start.centerY} L ${end.centerX} ${end.centerY}`;

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
      {/* Dotted connecting lines */}
      <svg className="absolute left-0 top-0 w-full h-full" fill="none">
        {buildPaths()}
      </svg>

      {/* Approvers */}
      <div
        className={`flex relative h-full ${
          isMobile ? "flex-col items-center" : "items-center"
        }`}
        style={{
          paddingLeft: isMobile ? 0 : "50px",
          paddingTop: isMobile ? "50px" : "5px",
          gap: isMobile ? `${step * 0.8}px` : `${step - 40}px`,
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
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="flex flex-col items-center space-y-1 relative shrink-0"
              style={{ transform }}
            >
              <motion.div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden shadow-sm
                  ${
                    item.active
                      ? "border-green-500 ring-1 ring-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                whileHover={{ scale: 1.05 }}
                onHoverStart={measureNodes}
                onHoverEnd={measureNodes}
              >
                <img
                  src={item.img}
                  alt={item.role}
                  className="w-full h-full object-cover"
                  onLoad={measureNodes}
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