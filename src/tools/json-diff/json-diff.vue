<script setup lang="ts">
import { useRoute } from 'vue-router';
import JSON5 from 'json5';

import DiffsViewer from './diff-viewer/diff-viewer.vue';
import { withDefaultOnError } from '@/utils/defaults';
import { isNotThrowing } from '@/utils/boolean';

const route = useRoute();
const rawLeftJson = ref((route.query.input as string) || (route.query.filePath as string) || '');
const rawRightJson = ref((route.query.filePath2 as string) || '');

const leftJson = computed(() => withDefaultOnError(() => JSON5.parse(rawLeftJson.value), undefined));
const rightJson = computed(() => withDefaultOnError(() => JSON5.parse(rawRightJson.value), undefined));

const { t } = useI18n();

const jsonValidationRules = [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => JSON5.parse(value)),
    message: t('tools.json-diff.invalidJson'),
  },
];
</script>

<template>
  <c-input-text
    v-model:value="rawLeftJson" :validation-rules="jsonValidationRules"
    :label="t('tools.json-diff.firstJson')" :placeholder="t('tools.json-diff.firstJsonPlaceholder')" rows="20" multiline
    test-id="leftJson" raw-text monospace
  />

  <c-input-text
    v-model:value="rawRightJson" :validation-rules="jsonValidationRules"
    :label="t('tools.json-diff.secondJson')" :placeholder="t('tools.json-diff.secondJsonPlaceholder')" rows="20"
    multiline test-id="rightJson" raw-text monospace
  />

  <DiffsViewer :left-json="leftJson" :right-json="rightJson" />
</template>
