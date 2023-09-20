/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  // important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
      },
      width: {
        108: "27rem",
        120: "30rem",
        132: "33rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        base: {
          primary: colors.cyan[900],
          secondary: colors.cyan[800],
          accent: colors.cyan[400],
          neutral: colors.slate[900],
          "base-100": colors.slate[800],
          info: colors.indigo[600],
          success: colors.green[600],
          warning: colors.amber[600],
          error: colors.rose[700],

          "--rounded-box": ".4rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.4rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
    darkTheme: "base",
  },
  plugins: [require("daisyui")],
};
