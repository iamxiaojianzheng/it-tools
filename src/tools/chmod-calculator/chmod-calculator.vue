<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useThemeVars } from 'naive-ui';

import InputCopyable from '../../components/InputCopyable.vue';
import { computeChmodOctalRepresentation, computeChmodSymbolicRepresentation, parseChmod } from './chmod-calculator.service';

import type { Group, Scope } from './chmod-calculator.types';

const themeVars = useThemeVars();

const { t } = useI18n();
const route = useRoute();

const scopes: { scope: Scope; title: string }[] = [
  { scope: 'read', title: t('tools.chmod-calculator.read') },
  { scope: 'write', title: t('tools.chmod-calculator.write') },
  { scope: 'execute', title: t('tools.chmod-calculator.execute') },
];
const groups: Group[] = ['owner', 'group', 'public'];

const initialPermissions = (route.query.input as string) ? parseChmod(route.query.input as string) : undefined;

const permissions = ref(initialPermissions || {
  owner: { read: false, write: false, execute: false },
  group: { read: false, write: false, execute: false },
  public: { read: false, write: false, execute: false },
});

watch(() => route.query.input, (val) => {
  if (val) {
    const parsed = parseChmod(val as string);
    if (parsed) {
      permissions.value = parsed;
    }
  }
});

const octal = computed(() => computeChmodOctalRepresentation({ permissions: permissions.value }));
const symbolic = computed(() => computeChmodSymbolicRepresentation({ permissions: permissions.value }));
</script>

<template>
  <div>
    <n-table :bordered="false" :bottom-bordered="false" single-column class="permission-table">
      <thead>
        <tr>
          <th class="text-center" scope="col" />
          <th class="text-center" scope="col">
            {{ t('tools.chmod-calculator.owner') }}
          </th>
          <th class="text-center" scope="col">
            {{ t('tools.chmod-calculator.group') }}
          </th>
          <th class="text-center" scope="col">
            {{ t('tools.chmod-calculator.public') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ scope, title } of scopes" :key="scope">
          <td class="line-header">
            {{ title }}
          </td>
          <td v-for="group of groups" :key="group" class="text-center">
            <!-- <n-switch v-model:value="permissions[group][scope]" /> -->
            <n-checkbox v-model:checked="permissions[group][scope]" size="large" />
          </td>
        </tr>
      </tbody>
    </n-table>

    <div class="octal-result">
      {{ octal }}
    </div>
    <div class="octal-result">
      {{ symbolic }}
    </div>

    <InputCopyable :value="`chmod ${octal} path`" readonly />
  </div>
</template>

<style lang="less" scoped>
.octal-result {
  text-align: center;
  font-size: 50px;
  font-family: monospace;
  color: v-bind('themeVars.primaryColor');
  margin: 20px 0;
}

.permission-table {

  td,
  th {
    padding: 15px;

    @media screen and (max-width: 600px) {
      padding: 5px;
    }
  }
}

.line-header {
  font-weight: bold;
  text-align: right;
  max-width: 80px;
}

.text-center {
  text-align: center;
}
</style>
