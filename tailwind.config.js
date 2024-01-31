/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors:{
        green:"#005700",
        gray:"#464F54",
       
      },
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

