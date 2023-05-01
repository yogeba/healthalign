/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'

  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-radial":
          "radial-gradient(ellipse farthest-corner at center, var(--tw-gradient-stops))",
        "gradient-radial-at-t":
          "radial-gradient(ellipse farthest-corner at top, var(--tw-gradient-stops))",
      }),
      animation: {
        blob: "blob 7s infinite",
        "blob-fast": "blob 5s infinite",
        "delay-2000": "blob 7s infinite 2s",
        "delay-4000": "blob 7s infinite 4s",
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "25%": {
            transform: "translate(20px, 0) scale(1.2)",
          },
          "50%": {
            transform: "translate(0, 20px) scale(0.8)",
          },
          "75%": {
            transform: "translate(-20px, 0) scale(1.2)",
          },
        },
      },
      colors: {
        "first-color-dark": "hsl(var(--hue), 8%, 20%)",
        "title-color": "hsl(var(--hue), 4%, 95%)",
        "text-color": "hsl(var(--hue), 4%, 75%)",
        "body-color": "hsl(var(--hue), 8%, 12%)",
        "container-color": "hsl(var(--hue), 8%, 16%)",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["hover", "focus"],
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
