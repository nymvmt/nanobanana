// FIX: Converted all JSX to React.createElement calls to be compatible with a .ts file.
import React from 'react';

// Icon components defined for use in the UI
const SunIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
    React.createElement("path", { d: "M12 2v2" }),
    React.createElement("path", { d: "M12 20v2" }),
    React.createElement("path", { d: "m4.93 4.93 1.41 1.41" }),
    React.createElement("path", { d: "m17.66 17.66 1.41 1.41" }),
    React.createElement("path", { d: "M2 12h2" }),
    React.createElement("path", { d: "M20 12h2" }),
    React.createElement("path", { d: "m6.34 17.66-1.41 1.41" }),
    React.createElement("path", { d: "m19.07 4.93-1.41 1.41" })
);

const CloudStormIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }),
    React.createElement("path", { d: "m9.2 22 3-7h-4l3 7" })
);

const SunsetIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M12 10V2" }),
    React.createElement("path", { d: "m4.93 10.93 1.41 1.41" }),
    React.createElement("path", { d: "M2 18h2" }),
    React.createElement("path", { d: "M20 18h2" }),
    React.createElement("path", { d: "m19.07 10.93-1.41 1.41" }),
    React.createElement("path", { d: "M22 22H2" }),
    React.createElement("path", { d: "m16 6-4 4-4-4" }),
    React.createElement("path", { d: "M12 10v8" })
);

const CloudFogIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }),
    React.createElement("path", { d: "M2 20h20" }),
    React.createElement("path", { d: "M6 16h12" })
);

const CloudDrizzleIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }),
    React.createElement("path", { d: "M8 19v1" }),
    React.createElement("path", { d: "M8 14v1" }),
    React.createElement("path", { d: "M12 19v1" }),
    React.createElement("path", { d: "M12 14v1" }),
    React.createElement("path", { d: "M16 16v1" }),
    React.createElement("path", { d: "M16 21v1" })
);

const SnowflakeIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M2 12h20" }),
    React.createElement("path", { d: "m19.07 4.93-1.41 1.41" }),
    React.createElement("path", { d: "m6.34 17.66-1.41 1.41" }),
    React.createElement("path", { d: "m19.07 19.07-1.41-1.41" }),
    React.createElement("path", { d: "m6.34 6.34-1.41-1.41" }),
    React.createElement("path", { d: "M12 2v20" }),
    React.createElement("path", { d: "m4.93 19.07 1.41-1.41" }),
    React.createElement("path", { d: "m17.66 6.34 1.41-1.41" })
);

const SunriseIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M12 2v8" }),
    React.createElement("path", { d: "m4.93 10.93 1.41 1.41" }),
    React.createElement("path", { d: "M2 18h2" }),
    React.createElement("path", { d: "M20 18h2" }),
    React.createElement("path", { d: "m19.07 10.93-1.41 1.41" }),
    React.createElement("path", { d: "M22 22H2" }),
    React.createElement("path", { d: "m8 6 4-4 4 4" }),
    React.createElement("path", { d: "M12 10v12" })
);

const StarIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
);

export const BrushIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" }),
    React.createElement("path", { d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" })
);

export const EraserIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" }),
    React.createElement("path", { d: "M22 21H7" }),
    React.createElement("path", { d: "m5 12 5 5" })
);

export const ClearIcon = () => React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
},
    React.createElement("path", { d: "M3 6h18" }),
    React.createElement("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }),
    React.createElement("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
    React.createElement("line", { x1: "10", x2: "10", y1: "11", y2: "17" }),
    React.createElement("line", { x1: "14", x2: "14", y1: "11", y2: "17" })
);


export const WEATHER_PRESETS = [
    { name: 'Sunny Day', prompt: 'Bright sunny day with a clear blue sky', icon: React.createElement(SunIcon) },
    { name: 'Stormy', prompt: 'Dramatic cloudy sky before a storm', icon: React.createElement(CloudStormIcon) },
    { name: 'Sunset', prompt: 'Golden hour sunset with warm light', icon: React.createElement(SunsetIcon) },
    { name: 'Misty', prompt: 'Misty and foggy morning', icon: React.createElement(CloudFogIcon) },
    { name: 'Rainy', prompt: 'A gentle rainy day with wet surfaces', icon: React.createElement(CloudDrizzleIcon) },
    { name: 'Snowy', prompt: 'A snowy winter scene with soft light', icon: React.createElement(SnowflakeIcon) },
    { name: 'Rainbow', prompt: 'Vibrant rainbow after a storm', icon: React.createElement(SunriseIcon) },
    { name: 'Starry Night', prompt: 'A clear night with a starry sky', icon: React.createElement(StarIcon) }
];