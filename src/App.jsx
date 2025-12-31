 import React, { useRef, useState } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(1);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.globalAlpha = opacity;

    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    ctxRef.current = ctx;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    ctxRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" mb={2}>
         React Paint App
      </Typography>

      
      <Typography>Color</Typography>
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <Typography>Brush Size</Typography>
        <Slider
          min={1}
          max={20}
          value={brushSize}
          onChange={(e, val) => setBrushSize(val)}
          sx={{ width: 150 }}
        />

        <Typography>Opacity</Typography>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={opacity}
          onChange={(e, val) => setOpacity(val)}
          sx={{ width: 150 }}
        />

        <Button variant="contained" color="error" onClick={clearCanvas}>
          Clear
        </Button>
      </Box>
 
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{
          border: "2px solid #000",
          borderRadius: "8px",
          cursor: "crosshair"
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </Box>
  );
}

export default App;

