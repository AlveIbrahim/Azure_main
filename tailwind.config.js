/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2076bc",
          hover: "#1a5a8a",
        },
        azure: {
          light: "#e6f3ff",
          medium: "#6bb9e7",
          dark: "#2076bc",
        },
      },
      borderRadius: {
        container: "0.5rem",
      },
    },
  },
  plugins: [],
};
