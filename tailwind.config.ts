import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      gray: "#F0F2F5",
      "disabled-gray": "#a5a9ad",
      orange: "#FF663A",
      "hover-gray": "#E8E9EA",
      blue: "#0FB7E2",
      yellow: "#e3ea07",
      red: "#ea0707",
      black: "#070000",
      black1: "#070000",
      brown: "#604040",
      green: "#58C99C",
      "icon-green": "#58C99C",
      white: "#FFFFFF",
      "gray-nav": "#F4F5FB",
      "gray-category": "#F8F7F4",
      purple: "#C62EFD",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        login_image: "url('/images/login_image.png')",
        google: "url('images/google.png')",
      },
    },
  },
  plugins: [],
}
export default config
