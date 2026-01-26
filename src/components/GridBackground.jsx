import React from "react";

const GridBackground = () => {
    return (
        <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full fill-[var(--foreground)]/5 stroke-[var(--foreground)]/5 pointer-events-none"
        >
            <defs>
                <pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x="-1"
                    y="-1"
                >
                    <path d="M.5 40V.5H40" fill="none"></path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    );
};
export default GridBackground;
