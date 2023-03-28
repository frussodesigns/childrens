import CopyPlugin from "copy-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const newConfiguration = {
  ...currentConfiguration,
  plugins: [
    ...currentConfiguration.plugins,
    // 1. Make the wasm file available to the build system
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
        },
      ],
    }),
    // 2. Polyfill fs and path module from node
    new NodePolyfillPlugin()
  ],
  externals: {
    ...currentConfiguration.externals,
    // 3. Avoid warning if reanimated is not present
    "react-native-reanimated": "require('react-native-reanimated')",
    "react-native-reanimated/lib/reanimated2/core":
      "require('react-native-reanimated/lib/reanimated2/core')",
  },
}