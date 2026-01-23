<script setup lang="ts">
import { parse as parseToml } from 'iarna-toml-esm';
import { stringify as stringifyToYaml } from 'yaml';
import { withDefaultOnError } from '../../utils/defaults';
import { isValidToml } from '../toml-to-json/toml.services';
import type { UseValidationRule } from '@/composable/validation';

const { t } = useI18n();

const transformer = (value: string) => value.trim() === '' ? '' : withDefaultOnError(() => stringifyToYaml(parseToml(value)), '');

const rules = computed<UseValidationRule<string>[]>(() => [
  {
    validator: isValidToml,
    message: t('tools.toml-to-yaml.invalidToml'),
  },
]);
</script>

<template>
  <format-transformer :input-label="t('tools.toml-to-yaml.tomlInputLabel')"
    :input-placeholder="t('tools.toml-to-yaml.tomlInputPlaceholder')"
    :output-label="t('tools.toml-to-yaml.yamlOutputLabel')" output-language="yaml" :input-validation-rules="rules"
    :transformer="transformer" :copy-label="t('tools.toml-to-yaml.copyYaml')" />
</template>
