import type { OGSchemaType } from '../OGSchemaType.type';

export const twitter: OGSchemaType = {
  name: 'tools.meta-tag-generator.twitterInformation',
  elements: [
    {
      type: 'select',
      options: [
        { label: 'Summary', value: 'summary' },
        { label: 'Summary with large image', value: 'summary_large_image' },
        { label: 'Application', value: 'app' },
        { label: 'Player', value: 'player' },
      ],
      label: 'tools.meta-tag-generator.cardType',
      placeholder: 'tools.meta-tag-generator.cardTypePlaceholder',
      key: 'twitter:card',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.siteAccount',
      placeholder: 'tools.meta-tag-generator.siteAccountPlaceholder',
      key: 'twitter:site',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.creatorAccount',
      placeholder: 'tools.meta-tag-generator.creatorAccountPlaceholder',
      key: 'twitter:creator',
    },
  ],
};
