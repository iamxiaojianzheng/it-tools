<script setup lang="ts">
import cronstrue from 'cronstrue';
import 'cronstrue/locales/zh_CN';
import { isValidCron } from 'cron-validator';
import { useStyleStore } from '@/stores/style.store';

function isCronValid(v: string) {
  return isValidCron(v, { allowBlankDay: true, alias: true, seconds: true });
}

const styleStore = useStyleStore();

const { t, locale } = useI18n();

const cron = ref('40 * * * *');
const cronstrueConfig = reactive({
  verbose: true,
  dayOfWeekStartIndexZero: true,
  use24HourTimeFormat: true,
  throwExceptionOnParseError: true,
});

const helpers = [
  {
    symbol: '*',
    meaning: t('tools.crontab-generator.helpers.any'),
    example: '* * * *',
    equivalent: t('tools.crontab-generator.helpers.eqMinute'),
  },
  {
    symbol: '-',
    meaning: t('tools.crontab-generator.helpers.range'),
    example: '1-10 * * *',
    equivalent: t('tools.crontab-generator.helpers.eqMinutesRange'),
  },
  {
    symbol: ',',
    meaning: t('tools.crontab-generator.helpers.list'),
    example: '1,10 * * *',
    equivalent: t('tools.crontab-generator.helpers.eqMinutesList'),
  },
  {
    symbol: '/',
    meaning: t('tools.crontab-generator.helpers.step'),
    example: '*/10 * * *',
    equivalent: t('tools.crontab-generator.helpers.eqEvery10Minutes'),
  },
  {
    symbol: '@yearly',
    meaning: t('tools.crontab-generator.helpers.yearly'),
    example: '@yearly',
    equivalent: t('tools.crontab-generator.helpers.eqYearly'),
  },
  {
    symbol: '@annually',
    meaning: t('tools.crontab-generator.helpers.annually'),
    example: '@annually',
    equivalent: t('tools.crontab-generator.helpers.eqYearly'),
  },
  {
    symbol: '@monthly',
    meaning: t('tools.crontab-generator.helpers.monthly'),
    example: '@monthly',
    equivalent: t('tools.crontab-generator.helpers.eqMonthly'),
  },
  {
    symbol: '@weekly',
    meaning: t('tools.crontab-generator.helpers.weekly'),
    example: '@weekly',
    equivalent: t('tools.crontab-generator.helpers.eqWeekly'),
  },
  {
    symbol: '@daily',
    meaning: t('tools.crontab-generator.helpers.daily'),
    example: '@daily',
    equivalent: t('tools.crontab-generator.helpers.eqDaily'),
  },
  {
    symbol: '@midnight',
    meaning: t('tools.crontab-generator.helpers.midnight'),
    example: '@midnight',
    equivalent: t('tools.crontab-generator.helpers.eqDaily'),
  },
  {
    symbol: '@hourly',
    meaning: t('tools.crontab-generator.helpers.hourly'),
    example: '@hourly',
    equivalent: t('tools.crontab-generator.helpers.eqHourly'),
  },
  {
    symbol: '@reboot',
    meaning: t('tools.crontab-generator.helpers.reboot'),
    example: '',
    equivalent: '',
  },
];

const cronString = computed(() => {
  if (isCronValid(cron.value)) {
    return cronstrue.toString(cron.value, {
      ...cronstrueConfig,
      locale: locale.value.replace('-', '_'),
    });
  }
  return ' ';
});

const cronValidationRules = [
  {
    validator: (value: string) => isCronValid(value),
    message: t('tools.crontab-generator.invalidCron'),
  },
];
</script>

<template>
  <div class="crontab-generator-wrapper">
    <c-card>
      <div mx-auto max-w-sm>
        <c-input-text v-model:value="cron" size="large" placeholder="* * * * *" :validation-rules="cronValidationRules"
          mb-3 />
      </div>

      <div class="cron-string">
        {{ cronString }}
      </div>

      <n-divider />

      <n-form :show-feedback="false" :label-placement="styleStore.isSmallScreen ? 'top' : 'left'" label-width="auto">
        <n-grid x-gap="24" :cols="styleStore.isSmallScreen ? 1 : 3">
          <n-grid-item flex justify-center>
            <n-form-item :label="t('tools.crontab-generator.verbose')">
              <n-switch v-model:value="cronstrueConfig.verbose" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item flex justify-center>
            <n-form-item :label="t('tools.crontab-generator.use24Hour')">
              <n-switch v-model:value="cronstrueConfig.use24HourTimeFormat" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item flex justify-center>
            <n-form-item :label="t('tools.crontab-generator.zeroBasedDay')">
              <n-switch v-model:value="cronstrueConfig.dayOfWeekStartIndexZero" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </c-card>

    <c-card mt-3>
      <div style="overflow-x: auto">
        <pre>
┌──────────── {{ t('tools.crontab-generator.seconds') }}
| ┌────────── {{ t('tools.crontab-generator.minutes') }}
| | ┌──────── {{ t('tools.crontab-generator.hours') }}
| | | ┌────── {{ t('tools.crontab-generator.dayOfMonth') }}
| | | | ┌──── {{ t('tools.crontab-generator.month') }}
| | | | | ┌── {{ t('tools.crontab-generator.dayOfWeek') }}
| | | | | |
* * * * * * {{ t('tools.crontab-generator.command') }}</pre>
      </div>

      <div v-show="styleStore.isSmallScreen">
        <c-card v-for="{ symbol, meaning, example, equivalent } in helpers" :key="symbol" mb-3 important:border-none>
          <div>{{ t('tools.crontab-generator.symbol') }}: <strong>{{ symbol }}</strong></div>
          <div>{{ t('tools.crontab-generator.meaning') }}: <strong>{{ meaning }}</strong></div>
          <div>{{ t('tools.crontab-generator.example') }}: <strong><code>{{ example }}</code></strong></div>
          <div>{{ t('tools.crontab-generator.equivalent') }}: <strong>{{ equivalent }}</strong></div>
        </c-card>
      </div>

      <c-table v-show="!styleStore.isSmallScreen" :data="helpers" :headers="[
        { label: t('tools.crontab-generator.symbol'), key: 'symbol' },
        { label: t('tools.crontab-generator.meaning'), key: 'meaning' },
        { label: t('tools.crontab-generator.example'), key: 'example' },
        { label: t('tools.crontab-generator.equivalent'), key: 'equivalent' },
      ]" />
    </c-card>
  </div>
</template>

<style lang="less" scoped>
::v-deep(input) {
  font-size: 30px;
  font-family: monospace;
  padding: 5px;
  text-align: center;

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
}

.cron-string {
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  margin: 5px 0 15px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
}

pre {
  overflow: auto;
  padding: 10px 0;
}
</style>
