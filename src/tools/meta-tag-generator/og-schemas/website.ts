import type { OGSchemaType } from '../OGSchemaType.type';

const typeOptions = [
  { label: 'Website', value: 'website' },
  { label: 'Article', value: 'article' },
  { label: 'Book', value: 'book' },
  { label: 'Profile', value: 'profile' },
  {
    type: 'group',
    label: 'Music',
    key: 'Music',
    children: [
      { label: 'Song', value: 'music.song' },
      { label: 'Music album', value: 'music.album' },
      { label: 'Playlist', value: 'music.playlist' },
      { label: 'Radio station', value: 'music.radio_station' },
    ],
  },
  {
    type: 'group',
    label: 'Video',
    key: 'Video',
    children: [
      { label: 'Movie', value: 'video.movie' },
      { label: 'Episode', value: 'video.episode' },
      { label: 'TV show', value: 'video.tv_show' },
      { label: 'Other video', value: 'video.other' },
    ],
  },
];

export const website: OGSchemaType = {
  name: 'tools.meta-tag-generator.generalInformation',
  elements: [
    {
      type: 'select',
      label: 'tools.meta-tag-generator.pageType',
      placeholder: 'tools.meta-tag-generator.pageTypePlaceholder',
      key: 'type',
      options: typeOptions,
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.websiteTitle',
      placeholder: 'tools.meta-tag-generator.websiteTitlePlaceholder',
      key: 'title',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.websiteDescription',
      placeholder: 'tools.meta-tag-generator.websiteDescriptionPlaceholder',
      key: 'description',
    },
    {
      type: 'input',
      label: 'tools.meta-tag-generator.pageUrl',
      placeholder: 'tools.meta-tag-generator.pageUrlPlaceholder',
      key: 'url',
    },
  ],
};
