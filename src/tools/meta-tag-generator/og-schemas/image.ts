import type { OGSchemaType } from '../OGSchemaType.type';

export const image: OGSchemaType = {
  name: 'tools.meta-tag-generator.imageInformation',
  elements: [
    {
      type: 'input',
      label: 'tools.meta-tag-generator.imageUrl',
      placeholder: 'tools.meta-tag-generator.imageUrlPlaceholder',
      key: 'image',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.imageAlt',
      placeholder: 'tools.meta-tag-generator.imageAltPlaceholder',
      key: 'image:alt',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.imageWidth',
      placeholder: 'tools.meta-tag-generator.imageWidthPlaceholder',
      key: 'image:width',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.imageHeight',
      placeholder: 'tools.meta-tag-generator.imageHeightPlaceholder',
      key: 'image:height',
    },
  ],
};
