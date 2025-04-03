import { lazy } from "react";

// Function that returns the resolved import dynamically
export function ReactLazyLoadImport(
  pathFunction: () => Promise<any>,  // pathFunction should return a Promise of any type (the module)
  namedExport?: string              // namedExport is an optional string (since not all imports might use it)
) {
  return lazy(() =>
    pathFunction().then((module) => {
      if (namedExport) {
        if (!module[namedExport]) {
          throw new Error(
            `Named export '${namedExport}' not found in the module`
          );
        }
        return { default: module[namedExport] };
      }
      return { default: module.default }; // ✅ Correctly return default export
    })
  );
}

// // Example of how to use a function for dynamic imports
// const FooterHomePage = ReactLazyLoadImport(() =>
//   import("@/components/FooterHomePage/index.jsx")
// );
// const SkillsMainPage = ReactLazyLoadImport(() =>
//   import("@/components/SkillsMainPage")
// );
// const ReactLazyLoadingImage = ReactLazyLoadImport(() =>
//   import("@/lazyloadings/ReactLazyLoadingImage/index.js")
// );
