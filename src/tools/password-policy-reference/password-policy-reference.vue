<script setup lang="ts">
import { Check, Copy } from '@vicons/tabler';
import { policySections } from './password-policy-reference.constants';
import { useFuzzySearch } from '@/composable/fuzzySearch';

const search = ref('');
const copiedValue = ref<string | null>(null);

const severityColor = {
  Info: 'default',
  Warning: 'warning',
  Critical: 'error',
} as const;

const allPolicies = policySections.flatMap(({ policies, category, source }) =>
  policies.map(p => ({ ...p, category, source })),
);

const { searchResult } = useFuzzySearch({
  search,
  data: allPolicies,
  options: {
    keys: [
      { name: 'name', weight: 3 },
      { name: 'category', weight: 2 },
      'description',
      'default',
      'source',
    ],
  },
});

const filtered = computed(() => {
  if (!search.value) {
    return policySections;
  }
  return [{ category: 'Search results', source: '', policies: searchResult.value }];
});

function copyValue(value: string) {
  navigator.clipboard.writeText(value);
  copiedValue.value = value;
  setTimeout(() => {
    copiedValue.value = null;
  }, 1500);
}
</script>

<template>
  <div style="flex: 1 1 900px; max-width: 1400px; margin-top: -28px;">
    <c-input-text
      v-model:value="search"
      placeholder="Search policies, settings, or recommendations..."
      autofocus
      raw-text
      mb-10
    />

    <div v-for="{ policies, category, source } of filtered" :key="category" mb-8>
      <div mb-4 text-xl>
        {{ category }}
        <span v-if="source" op-40 text-sm ml-2>{{ source }}</span>
      </div>

      <div class="grid grid-cols-1 gap-12px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <c-card
          v-for="{ name, default: defaultVal, range, description, severity } of policies"
          :key="name"
          class="flex flex-col justify-between"
        >
          <div>
            <div flex items-start justify-between gap-2 mb-2>
              <n-tag size="small" :type="severityColor[severity]">
                {{ severity }}
              </n-tag>
              <c-tooltip :tooltip="copiedValue === defaultVal ? 'Copied!' : 'Copy default value'">
                <c-button
                  circle
                  variant="text"
                  style="width: 24px; height: 24px;"
                  @click.stop="copyValue(defaultVal)"
                >
                  <n-icon size="14" :component="copiedValue === defaultVal ? Check : Copy" />
                </c-button>
              </c-tooltip>
            </div>

            <div class="text-sm font-semibold mb-1">
              {{ name }}
            </div>

            <div class="font-mono text-primary mb-1" style="font-size: 0.75rem;">
              Default: {{ defaultVal }}
            </div>

            <div class="text-xs text-neutral-400 mb-2" style="font-size: 0.7rem;">
              Range: {{ range }}
            </div>

            <div
              class="text-xs text-neutral-500 dark:text-neutral-400"
              style="-webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;"
            >
              {{ description }}
            </div>
          </div>
        </c-card>
      </div>
    </div>
  </div>
</template>
