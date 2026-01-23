<script setup lang="ts">
import { parse as parseYaml } from 'yaml';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

function transformer(value: string) {
  return withDefaultOnError(() => {
    const obj = parseYaml(value, { merge: true });
    return obj ? JSON.stringify(obj, null, 3) : '';
  }, '');
}

const rules = computed<UseValidationRule<string>[]>(() => [
  {
    validator: (value: string) => isNotThrowing(() => parseYaml(value)),
    message: t('tools.yaml-to-json-converter.invalidYaml'),
  },
]);
</script>

<template>
  <format-transformer :input-label="t('tools.yaml-to-json-converter.yamlInputLabel')"
    :input-placeholder="t('tools.yaml-to-json-converter.yamlInputPlaceholder')"
    :output-label="t('tools.yaml-to-json-converter.jsonOutputLabel')" output-language="json"
    :input-validation-rules="rules" :transformer="transformer"
    :copy-label="t('tools.yaml-to-json-converter.copyJson')" />
</template>
