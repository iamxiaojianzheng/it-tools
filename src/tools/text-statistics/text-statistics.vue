<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getStringSizeInBytes } from './text-statistics.service';
import { formatBytes } from '@/utils/convert';

const { t } = useI18n();
const route = useRoute();

const text = ref((route.query.input as string) || (route.query.filePath as string) || '');

watch(() => route.query.input, (val) => {
  if (val) {
    text.value = val as string;
  }
});

watch(() => route.query.filePath, (val) => {
  if (val) {
    text.value = val as string;
  }
});
</script>

<template>
  <c-card>
    <c-input-text v-model:value="text" multiline :placeholder="t('tools.text-statistics.placeholder')" rows="5" />

    <div mt-5 flex>
      <n-statistic :label="t('tools.text-statistics.characterCount')" :value="text.length" flex-1 />
      <n-statistic
        :label="t('tools.text-statistics.wordCount')" :value="text === '' ? 0 : text.split(/\s+/).length"
        flex-1
      />
      <n-statistic
        :label="t('tools.text-statistics.lineCount')"
        :value="text === '' ? 0 : text.split(/\r\n|\r|\n/).length" flex-1
      />
      <n-statistic
        :label="t('tools.text-statistics.byteSize')" :value="formatBytes(getStringSizeInBytes(text))"
        flex-1
      />
    </div>
  </c-card>
</template>
