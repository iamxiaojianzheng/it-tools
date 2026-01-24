<script setup lang="ts">
import convert from 'xml-js';
import { isValidXML } from '../xml-formatter/xml-formatter.service';
import { withDefaultOnError } from '@/utils/defaults';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

const defaultValue = '<a x="1.234" y="It\'s"/>';
function transformer(value: string) {
  return withDefaultOnError(() => {
    return JSON.stringify(convert.xml2js(value, { compact: true }), null, 2);
  }, '');
}

const rules = computed<UseValidationRule<string>[]>(() => [
  {
    validator: isValidXML,
    message: t('tools.xml-to-json.invalidXml'),
  },
]);
</script>

<template>
  <format-transformer
    :input-label="t('tools.xml-to-json.xmlInputLabel')" :input-default="defaultValue"
    :input-placeholder="t('tools.xml-to-json.xmlInputPlaceholder')"
    :output-label="t('tools.xml-to-json.jsonOutputLabel')" output-language="json" :transformer="transformer"
    :input-validation-rules="rules" :copy-label="t('tools.xml-to-json.copyJson')"
  />
</template>
