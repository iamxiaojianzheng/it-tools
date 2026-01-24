<script setup lang="ts">
import { type FormatOptionsWithLanguage, format as formatSQL } from 'sql-formatter';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();
const inputComponent = ref<any>(null);

const config = reactive<FormatOptionsWithLanguage>({
  keywordCase: 'upper',
  useTabs: false,
  language: 'sql',
  indentStyle: 'standard',
  tabulateAlias: true,
});

const rawSQL = ref('select field1,field2,field3 from my_table where my_condition;');
const prettySQL = computed(() => formatSQL(rawSQL.value, config));
</script>

<template>
  <div class="mx-auto flex flex-col w-full max-w-1200px gap-6">
    <!-- Configuration Area -->
    <div class="flex flex-wrap w-full gap-4">
      <c-select
        v-model:value="config.language"
        class="min-w-200px flex-1"
        :label="t('tools.sql-prettify.dialect')"
        :options="[
          { label: 'GCP BigQuery', value: 'bigquery' },
          { label: 'IBM DB2', value: 'db2' },
          { label: 'Apache Hive', value: 'hive' },
          { label: 'MariaDB', value: 'mariadb' },
          { label: 'MySQL', value: 'mysql' },
          { label: 'Couchbase N1QL', value: 'n1ql' },
          { label: 'Oracle PL/SQL', value: 'plsql' },
          { label: 'PostgreSQL', value: 'postgresql' },
          { label: 'Amazon Redshift', value: 'redshift' },
          { label: 'Spark', value: 'spark' },
          { label: 'Standard SQL', value: 'sql' },
          { label: 'sqlite', value: 'sqlite' },
          { label: 'SQL Server Transact-SQL', value: 'tsql' },
        ]"
      />
      <c-select
        v-model:value="config.keywordCase"
        class="min-w-150px flex-1"
        :label="t('tools.sql-prettify.keywordCase')"
        :options="[
          { label: t('tools.sql-prettify.cases.upper'), value: 'upper' },
          { label: t('tools.sql-prettify.cases.lower'), value: 'lower' },
          { label: t('tools.sql-prettify.cases.preserve'), value: 'preserve' },
        ]"
      />
      <c-select
        v-model:value="config.indentStyle"
        class="min-w-150px flex-1"
        :label="t('tools.sql-prettify.indentStyle')"
        :options="[
          { label: t('tools.sql-prettify.indents.standard'), value: 'standard' },
          { label: t('tools.sql-prettify.indents.tabularLeft'), value: 'tabularLeft' },
          { label: t('tools.sql-prettify.indents.tabularRight'), value: 'tabularRight' },
        ]"
      />
    </div>

    <!-- Editors Area -->
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full items-start">
      <n-form-item :label="t('tools.sql-prettify.inputLabel')" class="w-full">
        <c-input-text
          ref="inputComponent"
          v-model:value="rawSQL"
          :placeholder="t('tools.sql-prettify.inputPlaceholder')"
          rows="7"
          multiline
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          monospace
        />
      </n-form-item>
      <n-form-item :label="t('tools.sql-prettify.outputLabel')" class="w-full">
        <TextareaCopyable
          :value="prettySQL"
          language="sql"
          :follow-height-of="inputComponent?.inputWrapperRef"
        />
      </n-form-item>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* Scoped styles preserved if needed, though most now handled by UnoCSS */
</style>
