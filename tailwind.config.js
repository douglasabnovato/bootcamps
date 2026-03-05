/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Permite controle manual do tema escuro
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui"],
      },
      colors: {
        // Sugestão de paleta para a learnTECH
        brand: {
          primary: "#00D1FF",
          secondary: "#7000FF",
          dark: "#0A0A0B",
        },
      },
    },
  },
  plugins: [],
};
