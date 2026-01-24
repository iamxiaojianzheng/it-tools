<script setup lang="ts">
import { useRoute } from 'vue-router';
import { escape, unescape } from 'lodash';

import { useCopy } from '@/composable/copy';

const { t } = useI18n();
const route = useRoute();

const escapeInput = ref((route.query.input as string) || '<title>IT Tool</title>');
const escapeOutput = computed(() => escape(escapeInput.value));
const { copy: copyEscaped } = useCopy({ source: escapeOutput });

const unescapeInput = ref((route.query.input as string) || '&lt;title&gt;IT Tool&lt;/title&gt;');
const unescapeOutput = computed(() => unescape(unescapeInput.value));
const { copy: copyUnescaped } = useCopy({ source: unescapeOutput });

watch(() => route.query.input, (val) => {
  if (val) {
    const inputStr = val as string;
    escapeInput.value = inputStr;
    unescapeInput.value = inputStr;
  }
});
</script>

<template>
  <c-card :title="t('tools.html-entities.escapeTitle')">
    <n-form-item :label="t('tools.html-entities.inputLabel')">
      <c-input-text
        v-model:value="escapeInput" multiline :placeholder="t('tools.html-entities.inputPlaceholder')"
        rows="3" autosize raw-text
      />
    </n-form-item>

    <n-form-item :label="t('tools.html-entities.escapedLabel')">
      <c-input-text
        multiline readonly :placeholder="t('tools.html-entities.escapedPlaceholder')" :value="escapeOutput"
        rows="3" autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyEscaped()">
        {{ t('tools.html-entities.copy') }}
      </c-button>
    </div>
  </c-card>
  <c-card :title="t('tools.html-entities.unescapeTitle')">
    <n-form-item :label="t('tools.html-entities.escapedInputLabel')">
      <c-input-text
        v-model:value="unescapeInput" multiline :placeholder="t('tools.html-entities.unescapePlaceholder')"
        rows="3" autosize raw-text
      />
    </n-form-item>

    <n-form-item :label="t('tools.html-entities.unescapedLabel')">
      <c-input-text
        :value="unescapeOutput" multiline readonly
        :placeholder="t('tools.html-entities.unescapedPlaceholder')" rows="3" autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyUnescaped()">
        {{ t('tools.html-entities.copy') }}
      </c-button>
    </div>
  </c-card>
</template>
