import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue-100": "hsl(206, 39%, 69%)",
        "custom-blue-300": "hsl(206, 52%, 51%)",
        "custom-blue-500": "hsl(206, 57%, 40%)",
        "custom-blue-700": "hsl(206, 74%, 26%)",

        "custom-purple-300": "hsl(296, 52%, 51%)",
        "custom-purple-500": "hsl(296, 57%, 40%)",
        "custom-purple-700": "hsl(296, 74%, 26%)",

        "custom-brown-300": "hsl(26, 52%, 51%)",
        "custom-brown-500": "hsl(26, 57%, 40%)",
        "custom-brown-700": "hsl(26, 74%, 26%)",

        "custom-grey-300": "hsl(0, 0%, 51%)",
        "custom-grey-500": "hsl(0, 0%, 40%)",
        "custom-grey-700": "hsl(0, 0%, 26%)",

        "custom-green-100": "hsla(120, 98%, 94%, 1)",
        "custom-green-300": "hsl(116, 52%, 51%)",
        "custom-green-500": "hsl(116, 57%, 40%)",
        "custom-green-700": "hsl(116, 74%, 26%)",

        "custom-white-100": "hsl(0, 0%, 100%)",
        "custom-white-300": "hsl(0, 0%, 96%)",
        "custom-white-600": "hsl(0, 0%, 93%)",
        "custom-white-800": "hsl(0, 0%, 88%)",
        "custom-white-900": "hsl(0, 0%, 82%)",

        "custom-red-100": "hsl(4, 68%, 90%)",
        "custom-red-200": "hsla(351, 91%, 96%, 1)",
        "custom-red-300": "hsl(4, 52%, 51%)",
        "custom-red-400": "hsl(4, 68%, 60%)",
        "custom-red-500": "hsla(346, 97%, 23%, 1)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
