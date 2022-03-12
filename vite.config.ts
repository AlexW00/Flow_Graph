// vite.config.js
import domJsx from "vite-plugin-vue-jsx";

export default {
  plugins: [
    domJsx({
      // pragma: string, // jsxFactory function
      // include: RegExp[] // include file
    }),
  ],
};
