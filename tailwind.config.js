export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(23,23,23,255)",
        active: "rgba(127,248,2,255)",
        primary: "rgb(255, 215, 0)",
        destructive: "rgba(255, 99, 71, 1)",
        // secondaryGradient:"rgb(236, 218, 122)",
        secondary:"rgb(28, 26, 29)",
        secondaryForeground:"rgb(38, 38, 38)",
 
      },
      backgroundColor: {
        background: "rgba(23,23,23,255)",
        secondary: "rgb(28, 26, 29)",
        active: "rgba(127,248,2,255)",
        primary: "rgb(255, 215, 0)",
        secondaryForeground:"rgb(38, 38, 38)",

      },
      backgroundImage: {
        'primaryGradient': 'linear-gradient(180deg, #ffd962 0%, #b36901 100%)',
        'primaryWidget':"linear-gradient(180deg, #e8ce92 0%, #e8ce92 0.01%, #c39c59 100%)",
        'activeGradient': 'linear-gradient(90deg, #fbf1b8, #da9f31)',
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
