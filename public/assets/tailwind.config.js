/** @type { import('tailwindcss').Config }  */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "rgba(185, 32, 237, 1)",
      },
      screens: {
        desktop: "1264px",
        tablet: "768px",
        mobile: "320px",
      }
    },
  },
};
