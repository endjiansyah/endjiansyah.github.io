/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {

      container: {
          padding:{
              sm: '20px',
              md: '20px'
          },
          screens:{
              xl: '1170px',
          },
          center:true,
      },
    },
  plugins: [],
}