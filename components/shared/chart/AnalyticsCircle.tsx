"use client";

import { formatPriceNGN } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface CircleProps {
  a: number;
  b: number;
  c: number;
}

const AnalyticsCircle: React.FC<CircleProps> = ({ a, b, c }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawCircle = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4; // Adjust radius for responsiveness
      const borderWidth = radius * 0.13; // Adjust border width proportionally

      // Calculate angles for each section with a 5px gap between sections
      const total = a + b + c;
      const gap = (5 * Math.PI) / (2 * radius);
      const aAngle = (a / total) * (2 * Math.PI - 3 * gap);
      const bAngle = (b / total) * (2 * Math.PI - 3 * gap);
      const cAngle = (c / total) * (2 * Math.PI - 3 * gap);

      // Clear canvas before drawing
      ctx.clearRect(0, 0, width, height);

      // Draw green section
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, aAngle);
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = "green";
      ctx.stroke();

      // Draw yellow section
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, aAngle + gap, aAngle + gap + bAngle);
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = "yellow";
      ctx.stroke();

      // Draw red section
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        aAngle + gap + bAngle + gap,
        aAngle + gap + bAngle + gap + cAngle
      );
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = "red";
      ctx.stroke();
    };

    // Redraw circle when window resizes
    window.addEventListener("resize", drawCircle);
    drawCircle(); // Initial draw

    // Cleanup event listener
    return () => window.removeEventListener("resize", drawCircle);
  }, [a, b, c]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        maxWidth: "400px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto", display: "block" }}
      ></canvas>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/icons/nozzle.svg"
            width={24}
            height={26}
            alt="nozzle"
          />
          <span className="text-[0.4rem] font-[700] xs:text-[0.6rem] md:text-[0.85rem]">
            {formatPriceNGN(c)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCircle;
