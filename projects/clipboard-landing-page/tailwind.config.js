module.exports = {
  content: ["./*.html"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    colors: {
      cyan: "hsl(171, 66%, 44%)",
      blue: "hsl(233, 100%, 69%)",
      gray: {
        100: "hsl(201, 11%, 66%)",
        200: "hsl(210, 10%, 33%)",
      },
      white: "hsl(0, 0%, 100%)",
    },
    fontFamily: {
      "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
    },
    backgroundImage: {
      "header-desktop":
        "linear-gradient(hsla(0, 0%, 100%, 0.4), hsla(0, 0%, 100%, 0.4)), url(../assets/images/bg-header-desktop.png)",
      "header-mobile":
        "linear-gradient(hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0.1)), url(../assets/images/bg-header-mobile.png)",
    },
    extend: {},
  },
  plugins: [],
};
