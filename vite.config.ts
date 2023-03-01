import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssPxToViewport from "postcss-px-to-viewport";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  base: "./", // 开发或生产环境服务的公共基础路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 路径别名
    },
    extensions: [".js", ".ts", ".json"], // 导入时想要省略的扩展名列表
  },
  css: {
    // 定义样式全局变量
    preprocessorOptions: {
      scss: {
        additionalData: `@import '/src/styles/variables.scss';`, // 全局变量
      },
      less: {
        additionalData: `@import '/src/styles/variables.less';`, // 全局变量
      },
    },
    postcss: {
      plugins: [
        // viewport 移动端布局适配
        // postcssPxToViewport({
        //   viewportWidth: 750,
        // }),
      ],
    },
  },
  optimizeDeps: {
    force: true, // 强制进行依赖预构建
  },
  server: {
    open: true, // 自动打开浏览器
    host: true, // 监听所有地址，多一个网络地址可以访问
    proxy: {
      // 字符串简写写法
      "/foo": "http://localhost:4567",
      // 选项写法
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 正则表达式写法
      "^/fallback/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
      // 使用 proxy 实例
      "/backend": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      },
      // Proxying websockets or socket.io
      "/socket.io": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
  },
  build: {
    outDir: "build", // 打包文件的输出目录
    assetsDir: "static", // 静态资源的存放目录
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
  },
});
