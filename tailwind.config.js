/** @type {import('tailwindcss').Config} */
const widthExtension = {
  'full-content': '980px',
};

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        ...widthExtension,
      },
      width: {
        ...widthExtension,
      },
      colors: {
        'turquoise-100': '#57BBBF',
        'turquoise-200': 'rgb(49,127,129)',
        'green-100': '#459346',
        'green-200': '#497949'
      },
      fontFamily: {
        'heading': ['Oswald', 'sans-serif'],
        'body': ['Oswald', 'sans-serif'],
      },
      gridTemplateColumns: {
        'auto-sm': 'repeat(auto-fill,minmax(120px,1fr))',
      },
      backgroundImage: {
        'site-background': "url('/site-background.png')",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
