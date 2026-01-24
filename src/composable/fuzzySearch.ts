import { type MaybeRef, get } from '@vueuse/core';
import Fuse from 'fuse.js';
import { computed, shallowRef, watch } from 'vue';

export { useFuzzySearch };

function useFuzzySearch<Data>({
  search,
  data,
  options = {},
}: {
  search: MaybeRef<string>
  data: MaybeRef<Data[]>
  options?: Fuse.IFuseOptions<Data> & { filterEmpty?: boolean }
}) {
  const fuse = shallowRef(new Fuse(get(data), options));

  watch(() => get(data), (newData) => {
    fuse.value = new Fuse(newData, options);
  }, { deep: false });

  const filterEmpty = options.filterEmpty ?? true;

  const searchResult = computed<Data[]>(() => {
    const query = get(search);

    if (!filterEmpty && query === '') {
      return get(data);
    }

    return fuse.value.search(query).map(({ item }) => item);
  });

  return { searchResult };
}
