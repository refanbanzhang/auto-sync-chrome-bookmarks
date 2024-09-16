// vite.config.ts
import { defineConfig } from "file:///D:/workspace/learn-chrome-plugin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/workspace/learn-chrome-plugin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///D:/workspace/learn-chrome-plugin/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// src/manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "My Chrome Extension",
  version: "1.0.0",
  description: "A Chrome extension template",
  permissions: ["storage", "bookmarks"],
  action: {
    default_popup: "index.html"
  },
  background: {
    service_worker: "src/background.ts"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"]
    }
  ]
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [vue(), crx({ manifest: manifest_default })],
  server: {
    watch: {
      include: ["src/**"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0Lmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcbGVhcm4tY2hyb21lLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya3NwYWNlXFxcXGxlYXJuLWNocm9tZS1wbHVnaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3dvcmtzcGFjZS9sZWFybi1jaHJvbWUtcGx1Z2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBXYXRjaE9wdGlvbnMgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9zcmMvbWFuaWZlc3QuanNvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCBjcngoeyBtYW5pZmVzdCB9KV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKiddXHJcbiAgICB9IGFzIFdhdGNoT3B0aW9ucyAmIHsgaW5jbHVkZT86IHN0cmluZ1tdIH1cclxuICB9XHJcbn0pIiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJNeSBDaHJvbWUgRXh0ZW5zaW9uXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBDaHJvbWUgZXh0ZW5zaW9uIHRlbXBsYXRlXCIsXHJcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJzdG9yYWdlXCIsIFwiYm9va21hcmtzXCJdLFxyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIlxyXG4gIH0sXHJcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcclxuICAgIFwic2VydmljZV93b3JrZXJcIjogXCJzcmMvYmFja2dyb3VuZC50c1wiXHJcbiAgfSxcclxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXCI8YWxsX3VybHM+XCJdLFxyXG4gICAgICBcImpzXCI6IFtcInNyYy9jb250ZW50LnRzXCJdXHJcbiAgICB9XHJcbiAgXVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFrQztBQUNuVSxPQUFPLFNBQVM7QUFDaEIsU0FBUyxXQUFXOzs7QUNGcEI7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLGFBQWUsQ0FBQyxXQUFXLFdBQVc7QUFBQSxFQUN0QyxRQUFVO0FBQUEsSUFDUixlQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLFNBQVcsQ0FBQyxZQUFZO0FBQUEsTUFDeEIsSUFBTSxDQUFDLGdCQUFnQjtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNGOzs7QURiQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUNsQyxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsUUFBUTtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
