import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), "");
    const versionApp = process.env.npm_package_version;
    const config = {
        // vite config
        plugins: [react(), tsconfigPaths()],
        worker: {
            format: "es",
        },
        build: {
            sourcemap: !["production", "staging"].includes(env.VITE_APP_ENV),
            rollupOptions: {
                output: {
                    // assetFileNames: (assetInfo: EmittedAsset) => {
                    // 	const extType = assetInfo.name?.split(".")[1] || '';
                    // 	// const isImg =/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType);
                    // 	const isJsMap = /map/i.test(extType);
                    // 	console.log("vô", extType);
                    // 	if (isJsMap) {

                    // 		return `assets/mapping/[name]-${versionHash}[extname]`;
                    // 	}
                    // 	return `assets/[name]-${versionHash}[extname]`;
                    // },
                    // sourcemapBaseUrl:
                    //     env.VITE_APP_ENV === "development"
                    //         ? "http://swiftfe.test/assets/"
                    //         : "",
                    chunkFileNames:
                        "assets/[name]-[hash]-" + versionApp + ".js",
                    entryFileNames:
                        "assets/[name]-[hash]-" + versionApp + ".js",
                    manualChunks: {
                        vendor_react: [
                            "react",
                            "react-dom",
                            "react-router-dom",
                            "react-redux",
                            "react-i18next",
                            "@tanstack/react-query",
                        ],
                        vendor_shopify: [
                            "@shopify/app-bridge",
                            "@shopify/app-bridge-react",
                        ],
                        vendor_polaris: [
                            "@shopify/polaris",
                            "@shopify/polaris-icons",
                        ],
                        // vendor_lottiefiles: ["@lottiefiles/lottie-player"],
                    },
                },
            },
        },
    };
    // console.log(config, env,env.VITE_APP_ENV);
    return config;
});

// https://rollupjs.org/plugin-development/#this-emitfile
// interface EmittedAsset {
// 	type: 'asset';
// 	name?: string;
// 	needsCodeReference?: boolean;
// 	fileName?: string;
// 	source?: string | Uint8Array;
// }
