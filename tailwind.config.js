export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(23,23,23,255)",
         active: "rgba(127,248,2,255)",
        primary: "rgba(8, 235, 153,1)",
        destructive: "rgba(255, 99, 71, 1)",
        secondaryGradient:"rgb(236, 218, 122)",
        secondary:"rgb(255, 215, 0)"
      },
      backgroundColor: {
        background: "rgba(23,23,23,255)",
        secondary: "rgba(35,35,35,255)",
        active: "rgba(127,248,2,255)",
        primary: "rgba(23,23,23,255)",
      },
      backgroundImage: {
       'primary-radial': 'radial-gradient(circle, rgb(1, 124, 80) 0%, rgb(2, 23, 14) 100%)',
        'primary-radial-alt': 'radial-gradient(circle, rgba(1,112,73,1) 0%, rgba(2,46,29,1) 100%)',
         'primary-linear-180': 'linear-gradient(180deg, rgba(8,235,153,1) 0%, rgba(2,171,110,1) 100%)',
         'secondary-gradient': 'linear-gradient(180deg, rgba(236, 218, 122, 1) 0%, rgba(201, 171, 81, 1) 100%)',
      },
      borderRadius: {
        lg: "20px",
        md: "10px",
        sm: "5px",
      },
      borderColor: {
        DEFAULT: "rgba(31,41,55,1)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar')],
};
