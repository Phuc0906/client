/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                grayf1: "#F1F1F3",
                primary: "#1DC071",
                secondary: "#A4D96C",
                lightgray: "#e7ecf3",
            },
        },
    },
    plugins: [],
};
