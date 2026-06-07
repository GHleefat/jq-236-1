/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "board-bg": "#F5DEB3",
        "board-line": "#8B4513",
        "piece-red": "#C41E3A",
        "piece-black": "#1A1A1A",
        "hint-green": "rgba(46, 139, 87, 0.5)",
        "wood-dark": "#8B4513",
        "wood-light": "#DEB887",
      },
      fontFamily: {
        kai: ['"KaiTi"', '"STKaiti"', "serif"],
      },
      boxShadow: {
        piece:
          "2px 2px 6px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(0,0,0,0.2), inset 1px 1px 3px rgba(255,255,255,0.3)",
        "piece-selected": "0 0 0 3px #FFD700, 2px 2px 6px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
