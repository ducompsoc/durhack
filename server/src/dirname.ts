import path from "node:path"

/**
 * The full path to either `server/src/` or `server/dist/` folder, depending on execution context
 * (development using tsx -> `src`, production using node -> `dist`).
 * It's important that we import this value across the project instead of using `import.meta.dirname` because
 * transpiled output from `src` is 'flattened' into `dist` - folder structure is not maintained.
 */
export const dirname = import.meta.dirname

/**
 * The full path to the `server/` directory.
 */
export const projectDirname = path.resolve(dirname, "..")
