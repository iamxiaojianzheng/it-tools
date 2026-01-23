<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import MemoEn from './git-memo.content.md';
import MemoZh from './git-memo.content.zh.md';

const { locale } = useI18n();
const themeVars = useThemeVars();

const Memo = computed(() => (locale.value === 'zh' ? MemoZh : MemoEn));
</script>

<template>
  <div>
    <component :is="Memo" />
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  overflow: auto;
}
</style>
