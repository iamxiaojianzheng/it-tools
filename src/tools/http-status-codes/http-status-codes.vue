<script setup lang="ts">
import { codesByCategories } from './http-status-codes.constants';
import { useFuzzySearch } from '@/composable/fuzzySearch';

const { t } = useI18n();
const search = ref('');

const categoryMapping: Record<string, string> = {
  '1xx informational response': '1xx',
  '2xx success': '2xx',
  '3xx redirection': '3xx',
  '4xx client error': '4xx',
  '5xx server error': '5xx',
};

const getTranslatedCategory = (category: string) => {
  if (category === 'Search results') {
    return t('tools.http-status-codes.searchResults');
  }

  const key = categoryMapping[category];
  return key ? t(`tools.http-status-codes.categoryMapping.${key}`) : category;
};

const localizedCodesByCategories = computed(() => codesByCategories.map(({ category, codes }) => ({
  category,
  codes: codes.map(code => ({
    ...code,
    name: t(`tools.http-status-codes.codes.c${code.code}.name`, code.name),
    description: t(`tools.http-status-codes.codes.c${code.code}.description`, code.description),
  })),
})));

const flatLocalizedCodes = computed(() =>
  localizedCodesByCategories.value.flatMap(({ codes, category }) =>
    codes.map(code => ({ ...code, category: getTranslatedCategory(category) })),
  ),
);

const { searchResult } = useFuzzySearch({
  search,
  data: flatLocalizedCodes,
  options: {
    keys: [
      { name: 'code', weight: 4 },
      { name: 'name', weight: 3 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 1 },
    ],
  },
});

const codesByCategoryFiltered = computed(() => {
  if (!search.value) {
    return localizedCodesByCategories.value;
  }

  return [{ category: 'Search results', codes: searchResult.value }];
});
</script>

<template>
  <div flex flex-col gap-2>
    <c-input-text v-model:value="search" :placeholder="t('tools.http-status-codes.searchPlaceholder')" autofocus
      raw-text mb-10 />

    <div v-for="{ codes, category } of codesByCategoryFiltered" :key="category" mb-8>
      <div mb-2 text-xl font-bold>
        {{ getTranslatedCategory(category) }}
      </div>

      <div flex flex-col gap-2>
        <c-card v-for="{ code, description, name, type } of codes" :key="code">
          <div text-lg font-bold>
            {{ code }} {{ name }}
          </div>
          <div op-70>
            {{ description }} {{ type !== 'HTTP' ? t('tools.http-status-codes.forType', { type }) : '' }}
          </div>
        </c-card>
      </div>
    </div>
  </div>
</template>
