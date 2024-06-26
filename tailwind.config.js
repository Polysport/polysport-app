/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [require("daisyui")],

    theme: {
        extend: {
            colors: {
                primary: "rgba(185, 32, 237, 1)",
            },
            screens: {
                desktop: "1264px",
                tablet: "768px",
                mobile: "320px",
            },
        },
    },
};
