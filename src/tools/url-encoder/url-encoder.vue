<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { useValidation } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const encodeInput = ref('Hello world :)');
const encodeOutput = computed(() => withDefaultOnError(() => encodeURIComponent(encodeInput.value), ''));

const encodedValidation = useValidation({
  source: encodeInput,
  rules: [
    {
      validator: value => isNotThrowing(() => encodeURIComponent(value)),
      message: t('tools.url-encoder.invalidString'),
    },
  ],
});

const { copy: copyEncoded } = useCopy({ source: encodeOutput, text: t('tools.url-encoder.copiedEncoded') });

const decodeInput = ref('Hello%20world%20%3A)');
const decodeOutput = computed(() => withDefaultOnError(() => decodeURIComponent(decodeInput.value), ''));

const decodeValidation = useValidation({
  source: decodeInput,
  rules: [
    {
      validator: value => isNotThrowing(() => decodeURIComponent(value)),
      message: t('tools.url-encoder.invalidString'),
    },
  ],
});

const { copy: copyDecoded } = useCopy({ source: decodeOutput, text: t('tools.url-encoder.copiedDecoded') });
</script>

<template>
  <c-card :title="t('tools.url-encoder.encode')">
    <c-input-text v-model:value="encodeInput" :label="t('tools.url-encoder.inputLabel')" :validation="encodedValidation"
      multiline autosize :placeholder="t('tools.url-encoder.inputPlaceholder')" rows="2" mb-3 />

    <c-input-text :label="t('tools.url-encoder.outputLabel')" :value="encodeOutput" multiline autosize readonly
      :placeholder="t('tools.url-encoder.outputPlaceholder')" rows="2" mb-3 />

    <div flex justify-center>
      <c-button @click="copyEncoded()">
        {{ t('tools.url-encoder.copy') }}
      </c-button>
    </div>
  </c-card>
  <c-card :title="t('tools.url-encoder.decode')">
    <c-input-text v-model:value="decodeInput" :label="t('tools.url-encoder.decodeInputLabel')"
      :validation="decodeValidation" multiline autosize :placeholder="t('tools.url-encoder.decodeInputPlaceholder')"
      rows="2" mb-3 />

    <c-input-text :label="t('tools.url-encoder.decodeOutputLabel')" :value="decodeOutput" multiline autosize readonly
      :placeholder="t('tools.url-encoder.decodeOutputPlaceholder')" rows="2" mb-3 />

    <div flex justify-center>
      <c-button @click="copyDecoded()">
        {{ t('tools.url-encoder.copy') }}
      </c-button>
    </div>
  </c-card>
</template>
