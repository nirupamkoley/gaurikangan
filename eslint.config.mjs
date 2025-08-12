import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Start by extending the default Next.js core-vitals rules
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    // Custom rule settings
    rules: {
      // Disable exhaustive-deps warning for useEffect hook
      "react-hooks/exhaustive-deps": "off", // You can switch this to "warn" or "error" if needed

      // Disable the warning for using <img> tag instead of <Image> component
      "@next/next/no-img-element": "off", // Turn off the warning for <img> elements

      // Disable the warning for using <a> tag for internal navigation
      "@next/next/no-html-link-for-pages": "off", // Turn off the warning for <a> navigation
    },
  },
];

export default eslintConfig;