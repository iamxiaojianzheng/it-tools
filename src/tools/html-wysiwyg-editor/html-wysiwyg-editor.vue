<script setup lang="ts">
import { format } from 'prettier';
import htmlParser from 'prettier/plugins/html';
import { useStorage } from '@vueuse/core';
import Editor from './editor/editor.vue';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();

const html = useStorage('html-wysiwyg-editor--html', t('tools.html-wysiwyg-editor.defaultValue'));

const formattedHtml = asyncComputed(() => format(html.value, { parser: 'html', plugins: [htmlParser] }), '');
</script>

<template>
  <div flex flex-col gap-4>
    <Editor v-model:html="html" />
    <TextareaCopyable :value="formattedHtml" language="html" />
  </div>
</template>
