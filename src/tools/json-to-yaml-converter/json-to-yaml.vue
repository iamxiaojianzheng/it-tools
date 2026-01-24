<script setup lang="ts">
import { stringify } from 'yaml';
import JSON5 from 'json5';
import type { UseValidationRule } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const { t } = useI18n();

const transformer = (value: string) => withDefaultOnError(() => stringify(JSON5.parse(value)), '');

const rules = computed<UseValidationRule<string>[]>(() => [
  {
    validator: (value: string) => value === '' || isNotThrowing(() => stringify(JSON5.parse(value))),
    message: t('tools.json-to-yaml-converter.invalidJson'),
  },
]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.json-to-yaml-converter.jsonInputLabel')"
    :input-placeholder="t('tools.json-to-yaml-converter.jsonInputPlaceholder')"
    :output-label="t('tools.json-to-yaml-converter.yamlOutputLabel')" output-language="yaml"
    :input-validation-rules="rules" :transformer="transformer"
    :copy-label="t('tools.json-to-yaml-converter.copyYaml')"
  />
</template>
