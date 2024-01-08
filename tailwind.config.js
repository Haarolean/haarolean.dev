/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

let conf = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {
            keyframes: {
                "text-shimmer": {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
            },
            animation: {
                "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
            },
        },
        fontFamily: {
            // sans: ["Biotif, sans-serif", ...defaultTheme.fontFamily.sans],
            sans: ["Biotif, sans-serif"],
            heading: "Neuzeit Grotesk Bold, sans-serif",
            code: "Fira Code, monospace",
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                main: {
                    "color-scheme": "dark",
                    primary: "#fe77ff",
                    secondary: "#ead186",
                    accent: "#bd93f9",
                    neutral: "#8f9ba8",
                    "base-100": "#282a36",
                    "base-content": "#f8f8f2",
                    info: "#8be9fd",
                    success: "#50fa7b",
                    warning: "#f1fa8c",
                    error: "#ff5555",
                },
            },
        ],
        darkTheme: "main",
        base: true,
        styled: true,
        utils: true,
        rtl: false,
        prefix: "",
        logs: false,
    },
}

module.exports = conf
