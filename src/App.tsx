import React, { useRef } from "react";
import "./App.css";

const App = () => {
	const parentRef = useRef<HTMLDivElement | null>(null);
	const firstRef = useRef<HTMLDivElement | null>(null);
	const secondRef = useRef<HTMLDivElement | null>(null);
	const resizerRef = useRef<HTMLDivElement | null>(null);
	const mouseXCor = useRef(0);
	const firstWidth = useRef(0);
	const shouldDrag = useRef(false);

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!firstRef.current) return;
		// Get Current Mouse position
		shouldDrag.current = true;
		mouseXCor.current = e.clientX;
		firstWidth.current = firstRef.current.getBoundingClientRect().width;
	};

	const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		shouldDrag.current = false;
		if (!firstRef.current || !resizerRef.current || !secondRef.current) return;
		resizerRef.current.style.removeProperty("cursor");
		document.body.style.removeProperty("cursor");

		firstRef.current.style.removeProperty("user-select");
		firstRef.current.style.removeProperty("pointer-events");

		secondRef.current.style.removeProperty("user-select");
		secondRef.current.style.removeProperty("pointer-events");
	};

	const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (
			!parentRef.current ||
			!firstRef.current ||
			!resizerRef.current ||
			!secondRef.current ||
			!shouldDrag.current
		)
			return;
		resizerRef.current.style.cursor = "col-resize";
		document.body.style.cursor = "col-resize";

		firstRef.current.style.userSelect = "none";
		firstRef.current.style.pointerEvents = "none";

		secondRef.current.style.userSelect = "none";
		secondRef.current.style.pointerEvents = "none";

		// How far the mouse has been moved
		const dx = e.clientX - mouseXCor.current;

		const newLeftWidth =
			((firstWidth.current + dx) * 100) /
			parentRef.current.getBoundingClientRect().width;
		firstRef.current.style.width = `${newLeftWidth}%`;
	};

	return (
		<div
			ref={parentRef}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			className="w-screen h-screen flex"
		>
			<div ref={firstRef}>Left</div>
			<div
				ref={resizerRef}
				className="w-2 bg-gray-900 resize-cursor"
				onMouseDown={onMouseDown}
			></div>
			<div ref={secondRef} style={{ flex: "1 1 0%" }}>
				Right
			</div>
		</div>
	);
};

export default App;
