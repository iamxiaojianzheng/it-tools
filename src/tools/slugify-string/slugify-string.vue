<script setup lang="ts">
import { useRoute } from 'vue-router';
import slugify from '@sindresorhus/slugify';
import { withDefaultOnError } from '@/utils/defaults';
import { useCopy } from '@/composable/copy';

const { t } = useI18n();
const route = useRoute();

const input = ref((route.query.input as string) || (route.query.filePath as string) || '');
const slug = computed(() => withDefaultOnError(() => slugify(input.value), ''));
const { copy } = useCopy({ source: slug, text: t('tools.slugify-string.copied') });

watch(() => route.query.input, (val) => {
  if (val) {
    input.value = val as string;
  }
});

watch(() => route.query.filePath, (val) => {
  if (val) {
    input.value = val as string;
  }
});
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input" multiline :placeholder="t('tools.slugify-string.inputPlaceholder')"
      :label="t('tools.slugify-string.inputLabel')" autofocus raw-text mb-5
    />

    <c-input-text
      :value="slug" multiline readonly :placeholder="t('tools.slugify-string.outputPlaceholder')"
      :label="t('tools.slugify-string.outputLabel')" mb-5
    />

    <div flex justify-center>
      <c-button :disabled="slug.length === 0" @click="copy()">
        {{ t('tools.slugify-string.copy') }}
      </c-button>
    </div>
  </div>
</template>
