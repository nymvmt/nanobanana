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