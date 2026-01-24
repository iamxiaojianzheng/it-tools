<script setup lang="ts">
import { useRoute } from 'vue-router';
import { generateMeta } from '@it-tools/oggen';
import _ from 'lodash';
import { image, ogSchemas, twitter, website } from './og-schemas';
import type { OGSchemaType, OGSchemaTypeElementSelect } from './OGSchemaType.type';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const { t } = useI18n();
const route = useRoute();

function getInitialMetadata() {
  const input = (route.query.input as string) || (route.query.filePath as string) || '';
  const initial = {
    'type': 'website',
    'twitter:card': 'summary_large_image',
    'title': '',
    'description': '',
    'url': '',
  };

  if (input) {
    if (input.startsWith('http')) {
      initial.url = input;
    }
    else if (input.length < 60) {
      initial.title = input;
    }
    else {
      initial.description = input;
    }
  }
  return initial;
}

const metadata = ref<{ type: string;[k: string]: any }>(getInitialMetadata());

watch(() => route.query.input, (val) => {
  if (val) {
    const inputStr = val as string;
    if (inputStr.startsWith('http')) {
      metadata.value.url = inputStr;
    }
    else if (inputStr.length < 60) {
      metadata.value.title = inputStr;
    }
    else {
      metadata.value.description = inputStr;
    }
  }
});

watch(
  () => ref(metadata.value.type),
  (_ignored, prevSection) => {
    const section = ogSchemas[prevSection.value];

    if (!section) {
      return;
    }

    section.elements.forEach(({ key }) => {
      metadata.value[key] = '';
    });
  },
);

const sections = computed(() => {
  const secs: OGSchemaType[] = [website, image, twitter];
  const additionalSchema = ogSchemas[metadata.value.type];

  if (additionalSchema) {
    secs.push(additionalSchema);
  }

  return secs;
});

const metaTags = computed(() => {
  const twitterMeta = _.chain(metadata.value)
    .pickBy((_value, k) => k.startsWith('twitter:'))
    .mapKeys((_value, k) => k.replace(/^twitter:/, ''))
    .value();

  const otherMeta = _.pickBy(metadata.value, (_value, k) => !k.startsWith('twitter:'));

  return generateMeta({ ...otherMeta, twitter: twitterMeta }, { generateTwitterCompatibleMeta: true });
});
</script>

<template>
  <div>
    <div v-for="{ name, elements } of sections" :key="name" style="margin-bottom: 15px">
      <div mb-5px font-bold>
        {{ t(name) }}
      </div>

      <n-input-group v-for="{ key, type, label, placeholder, ...element } of elements" :key="key">
        <n-input-group-label style="flex: 0 0 110px">
          {{ t(label) }}
        </n-input-group-label>

        <c-input-text v-if="type === 'input'" v-model:value="metadata[key]" :placeholder="t(placeholder)" clearable />
        <n-dynamic-input
          v-else-if="type === 'input-multiple'" v-model:value="metadata[key]" :min="1"
          :placeholder="t(placeholder)" :default-value="['']" :show-sort-button="true"
        />

        <c-select
          v-else-if="type === 'select'" v-model:value="metadata[key]" w-full :placeholder="t(placeholder)"
          :options="(element as OGSchemaTypeElementSelect).options"
        />
      </n-input-group>
    </div>
  </div>
  <div>
    <n-form-item :label="t('tools.meta-tag-generator.yourMetaTags')">
      <TextareaCopyable :value="metaTags" language="html" />
    </n-form-item>
  </div>
</template>

<style lang="less" scoped>
.n-input-group {
  margin-bottom: 5px;
}

::v-deep(.n-form-item-blank) {
  min-height: 0 !important;
}

::v-deep(.n-dynamic-input-item) {
  margin-bottom: 5px;
}
</style>
