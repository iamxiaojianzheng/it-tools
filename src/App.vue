<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { tools } from './tools';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

// Add plugin-enter listener
const router = useRouter();
const isRuckMode = computed(() => !!(window as any).ruck || new URLSearchParams(window.location.search).has('ruck'));

watch(isRuckMode, (val) => {
  if (val) {
    document.body.classList.add('ruck-plugin-mode');
  } else {
    document.body.classList.remove('ruck-plugin-mode');
  }
}, { immediate: true });

if ((window as any).ruck) {
  (window as any).ruck.onPluginEnter((payload: any) => {
    // Navigate to the tool matching the 'code' from manifest
    if (payload.code) {
      // Find tool where path matches /code (e.g., code "ascii-text-drawer" -> path "/ascii-text-drawer")
      const tool = tools.find((t) => t.path === `/${payload.code}`);
      if (tool) {
        router.push(tool.path);
      }
    }
  });
}

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

/* Ruck Plugin Mode Styles */
body.ruck-plugin-mode .n-layout-sider {
  display: none !important;
}

body.ruck-plugin-mode .n-layout-header {
  display: none !important;
}

body.ruck-plugin-mode .layout-header {
  display: none !important;
}

body.ruck-plugin-mode .tool-layout {
  display: none !important;
}

body.ruck-plugin-mode nav {
  display: none !important;
}

body.ruck-plugin-mode header {
  display: none !important;
}

body.ruck-plugin-mode .it-tools-wrapper {
  padding: 0 !important;
}

.content .n-layout-scroll-container {
  padding: 0 !important;
}

body.ruck-plugin-mode .tool-content {
  padding: 0 !important;
}

/* Remove default padding for naive-ui layout content in ruck mode */
body.ruck-plugin-mode .content ::v-deep(.n-layout-scroll-container) {
  padding: 0 !important;
}

/* Ensure tool-content stays side-by-side in ruck mode */
body.ruck-plugin-mode .tool-content {
  flex-wrap: nowrap !important;
  align-items: stretch !important;
  height: 100% !important;
  width: 100% !important;
  padding: 20px !important;
}

body.ruck-plugin-mode .tool-content ::v-deep(& > *) {
  flex: 1 1 0% !important;
  min-width: 0 !important;
  height: 100% !important;
}

/* Hide breadcrumbs or other nav-like elements if necessary */
body.ruck-plugin-mode .n-breadcrumb {
  display: none !important;
}

body.ruck-plugin-mode .c-card {
  /* min-width: 100vw;
  min-height: 100vh; */
}
</style>
