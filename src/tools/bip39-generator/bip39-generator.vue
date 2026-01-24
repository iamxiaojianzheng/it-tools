<script setup lang="ts">
import {
  chineseSimplifiedWordList,
  chineseTraditionalWordList,
  czechWordList,
  englishWordList,
  entropyToMnemonic,
  frenchWordList,
  generateEntropy,
  italianWordList,
  japaneseWordList,
  koreanWordList,
  mnemonicToEntropy,
  portugueseWordList,
  spanishWordList,
} from '@it-tools/bip39';
import { Copy, Refresh } from '@vicons/tabler';

const { t } = useI18n();

const languages = computed(() => ({
  [t('tools.bip39-generator.languages.en')]: englishWordList,
  [t('tools.bip39-generator.languages.zh_CN')]: chineseSimplifiedWordList,
  [t('tools.bip39-generator.languages.zh_TW')]: chineseTraditionalWordList,
  [t('tools.bip39-generator.languages.cs')]: czechWordList,
  [t('tools.bip39-generator.languages.fr')]: frenchWordList,
  [t('tools.bip39-generator.languages.it')]: italianWordList,
  [t('tools.bip39-generator.languages.ja')]: japaneseWordList,
  [t('tools.bip39-generator.languages.ko')]: koreanWordList,
  [t('tools.bip39-generator.languages.pt')]: portugueseWordList,
  [t('tools.bip39-generator.languages.es')]: spanishWordList,
}));

const entropy = ref(generateEntropy());
const passphraseInput = ref('');

const language = ref<string>(t('tools.bip39-generator.languages.en'));
const passphrase = computed({
  get() {
    return withDefaultOnError(() => entropyToMnemonic(entropy.value, languages.value[language.value]), passphraseInput.value);
  },
  set(value: string) {
    passphraseInput.value = value;
    entropy.value = withDefaultOnError(() => mnemonicToEntropy(value, languages.value[language.value]), '');
  },
});

const entropyValidation = useValidation({
  source: entropy,
  rules: [
    {
      validator: value => value === '' || (value.length <= 32 && value.length >= 16 && value.length % 4 === 0),
      message: t('tools.bip39-generator.invalidEntropyLength'),
    },
    {
      validator: value => /^[a-fA-F0-9]*$/.test(value),
      message: t('tools.bip39-generator.invalidEntropyHex'),
    },
  ],
});

const mnemonicValidation = useValidation({
  source: passphrase,
  rules: [
    {
      validator: value => isNotThrowing(() => mnemonicToEntropy(value, languages.value[language.value])),
      message: t('tools.bip39-generator.invalidMnemonic'),
    },
  ],
});

function refreshEntropy() {
  entropy.value = generateEntropy();
}

const { copy: copyEntropy } = useCopy({ source: entropy, text: t('tools.bip39-generator.entropyCopied') });
const { copy: copyPassphrase } = useCopy({ source: passphrase, text: t('tools.bip39-generator.passphraseCopied') });
</script>

<template>
  <div>
    <n-grid cols="3" x-gap="12">
      <n-gi span="1">
        <c-select
          v-model:value="language" searchable :label="t('tools.bip39-generator.languageLabel')"
          :options="Object.keys(languages)"
        />
      </n-gi>
      <n-gi span="2">
        <n-form-item
          :label="t('tools.bip39-generator.entropyLabel')" :feedback="entropyValidation.message"
          :validation-status="entropyValidation.status"
        >
          <n-input-group>
            <c-input-text v-model:value="entropy" :placeholder="t('tools.bip39-generator.entropyPlaceholder')" />

            <c-button @click="refreshEntropy()">
              <n-icon size="22">
                <Refresh />
              </n-icon>
            </c-button>
            <c-button @click="copyEntropy()">
              <n-icon size="22">
                <Copy />
              </n-icon>
            </c-button>
          </n-input-group>
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-form-item
      :label="t('tools.bip39-generator.passphraseLabel')" :feedback="mnemonicValidation.message"
      :validation-status="mnemonicValidation.status"
    >
      <n-input-group>
        <c-input-text
          v-model:value="passphrase" :placeholder="t('tools.bip39-generator.passphrasePlaceholder')"
          raw-text
        />

        <c-button @click="copyPassphrase()">
          <n-icon size="22" :component="Copy" />
        </c-button>
      </n-input-group>
    </n-form-item>
  </div>
</template>
