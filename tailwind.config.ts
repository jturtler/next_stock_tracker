import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
        colors: {
          "primary": "#003366",
          "secondary": "#f5f5f5",
          "accent": "#FFD700",

        'navy-blue': '#003366',
        'light-gray': '#f5f5f5',
        'gold': '#FFD700',



          // header: "#A2C2E4",
          // primary: "#A2C2E4",
          // secondary: '#F5F5DC',
          
          // textPrimary: "#334155",
          // textSecondary: "#be185d",

          // // primary: "#334155",
          // accent: '#A8E6CF',

          // pastelBlue: '#A2C2E4',
          // pastelGreen: '#B2D8B2',
          // pastelLavender: '#D3B4E2',
          // pastelYellow: '#F9E6A1',
          // pastelMint: '#A8E6CF',
          // pastelCoral: '#F6B6B6',
          // pastelGrey: '#D3D3D3',
          // pastelBeige: '#F5F5DC',
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(to bottom, #A2C2E4, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff)',
        }
      },
  },
  plugins: [],
};
export default config;
