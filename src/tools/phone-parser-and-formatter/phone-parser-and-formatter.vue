<script setup lang="ts">
import { getCountries, getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js/max';
import lookup from 'country-code-lookup';
import {
  formatTypeToHumanReadable,
  getDefaultCountryCode,
  getFullCountryName,
} from './phone-parser-and-formatter.models';
import { withDefaultOnError } from '@/utils/defaults';
import { booleanToHumanReadable } from '@/utils/boolean';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const rawPhone = ref('');
const defaultCountryCode = ref(getDefaultCountryCode());
const validation = useValidation({
  source: rawPhone,
  rules: [
    {
      validator: value => value === '' || /^[0-9 +\-()]+$/.test(value),
      message: t('tools.phone-parser.invalid'),
    },
  ],
});

const parsedDetails = computed(() => {
  if (!validation.isValid) {
    return undefined;
  }

  const parsed = withDefaultOnError(() => parsePhoneNumber(rawPhone.value, defaultCountryCode.value), undefined);

  if (!parsed) {
    return undefined;
  }

  return [
    {
      label: t('tools.phone-parser.labels.country'),
      value: parsed.country,
    },
    {
      label: t('tools.phone-parser.labels.country'),
      value: getFullCountryName(parsed.country),
    },
    {
      label: t('tools.phone-parser.labels.callingCode'),
      value: parsed.countryCallingCode,
    },
    {
      label: t('tools.phone-parser.labels.isValid'),
      value: booleanToHumanReadable(parsed.isValid()),
    },
    {
      label: t('tools.phone-parser.labels.isPossible'),
      value: booleanToHumanReadable(parsed.isPossible()),
    },
    {
      label: t('tools.phone-parser.labels.type'),
      value: formatTypeToHumanReadable(parsed.getType()),
    },
    {
      label: t('tools.phone-parser.labels.internationalFormat'),
      value: parsed.formatInternational(),
    },
    {
      label: t('tools.phone-parser.labels.nationalFormat'),
      value: parsed.formatNational(),
    },
    {
      label: t('tools.phone-parser.labels.e164Format'),
      value: parsed.format('E.164'),
    },
    {
      label: t('tools.phone-parser.labels.rfc3966Format'),
      value: parsed.format('RFC3966'),
    },
  ];
});

const countriesOptions = getCountries().map(code => ({
  label: `${lookup.byIso(code)?.country || code} (+${getCountryCallingCode(code)})`,
  value: code,
}));
</script>

<template>
  <div>
    <c-select
      v-model:value="defaultCountryCode" :label="t('tools.phone-parser.countryLabel')"
      :options="countriesOptions" searchable mb-5
    />

    <c-input-text
      v-model:value="rawPhone" :placeholder="t('tools.phone-parser.placeholder')"
      :label="t('tools.phone-parser.phoneNumberLabel')" :validation="validation" mb-5
    />

    <n-table v-if="parsedDetails">
      <tbody>
        <tr v-for="{ label, value } in parsedDetails" :key="label">
          <td font-bold>
            {{ label }}
          </td>
          <td>
            <span-copyable v-if="value" :value="value" />
            <span v-else op-70>
              {{ t('tools.phone-parser.unknown') }}
            </span>
          </td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>
