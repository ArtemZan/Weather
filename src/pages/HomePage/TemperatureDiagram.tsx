import { DrawBezierCurve, DrawCurve, setCanvasDimensions, ToWorldSpace, Vec2 } from "CanvasRendering";
import { useEffect, useRef } from "react";

export default function TemperatureDiagram({ temperatures, interval, offset }: { temperatures: number[], interval: number, offset: number }) {
    const canvas = useRef<HTMLCanvasElement>();
    const context = useRef<CanvasRenderingContext2D>();

    const columnWidth = (interval === 12 ? 50 : 30)

    useEffect(() => {
        context.current = canvas.current.getContext("2d");

        Draw();
    })

    function Draw() {
        if (context.current === null) {
            console.error("Trying to draw before initialising rendering context");
            return;
        }

        const ctx = context.current;

        setCanvasDimensions(parseInt(canvas.current.style.width), 100);

        const max = Math.max(...temperatures)
        const min = Math.min(...temperatures)

        const tempPoints: Vec2[] = temperatures.map((temp, index) => new Vec2(index * (interval === 1 ? 0.0132 : 0.155) - 1, temp / (max - min)));

        const colorFunc = (index: number, point: Vec2) => `rgb(${point.y * 200 + 250}, ${point.y * 100 + 250}, ${-point.y * 200})`


        DrawCurve(ctx, tempPoints, colorFunc, 3)

        for (let p = 0; p < tempPoints.length - 1; p++) {
            const p1 = tempPoints[p], p2 = tempPoints[p + 1]
            //DrawBezierCurve(ctx, [p1, new Vec2((p2.x + p1.x) / 2, p1.y), new Vec2((p2.x + p1.x) / 2, p2.y), p2], 10, colorFunc, 2);
        }
    }

    let width = (temperatures.length - 1) * (columnWidth + interval / 24)

    return (
        <canvas ref={canvas} height={100} width={(temperatures.length - 2) * (columnWidth + interval / 24)} style={{ width, paddingLeft: columnWidth / 2, marginLeft: offset }} >

        </canvas>
    )
}