<script setup lang="ts">
import { Check, Copy } from '@vicons/tabler';

const activeTab = ref('spf');
const copiedValue = ref<string | null>(null);

function copyValue(value: string) {
  navigator.clipboard.writeText(value);
  copiedValue.value = value;
  setTimeout(() => {
    copiedValue.value = null;
  }, 1500);
}

// --- SPF ---
const spfProviders = ref<string[]>([]);
const spfCustomIps = ref('');
const spfEnforcement = ref('-all');

const spfProviderOptions = [
  { label: 'Microsoft 365', value: 'include:spf.protection.outlook.com' },
  { label: 'Google Workspace', value: 'include:_spf.google.com' },
  { label: 'SendGrid', value: 'include:sendgrid.net' },
  { label: 'Mailchimp / Mandrill', value: 'include:spf.mandrillapp.com' },
  { label: 'Mailgun', value: 'include:mailgun.org' },
  { label: 'Amazon SES', value: 'include:amazonses.com' },
  { label: 'Zoho Mail', value: 'include:zoho.com' },
  { label: 'Postmark', value: 'include:spf.mtasv.net' },
  { label: 'Proton Mail', value: 'include:_spf.protonmail.ch' },
  { label: 'Fastmail', value: 'include:spf.messagingengine.com' },
  { label: 'HubSpot', value: 'include:_spf.hubspot.com' },
  { label: 'Zendesk', value: 'include:mail.zendesk.com' },
  { label: 'Freshdesk', value: 'include:email.freshdesk.com' },
  { label: 'Salesforce', value: 'include:_spf.salesforce.com' },
  { label: 'Mimecast', value: 'include:_netblocks.mimecast.com' },
];

const spfEnforcementOptions = [
  { label: '-all (hard fail, recommended)', value: '-all' },
  { label: '~all (soft fail)', value: '~all' },
  { label: '?all (neutral, not recommended)', value: '?all' },
];

const spfRecord = computed(() => {
  const parts = ['v=spf1'];
  for (const p of spfProviders.value) {
    parts.push(p);
  }
  const ips = spfCustomIps.value
    .split(/[\s,;]+/)
    .map(ip => ip.trim())
    .filter(Boolean);
  for (const ip of ips) {
    if (ip.includes('/')) {
      parts.push(ip.includes(':') ? `ip6:${ip}` : `ip4:${ip}`);
    }
    else if (ip.includes(':')) {
      parts.push(`ip6:${ip}`);
    }
    else {
      parts.push(`ip4:${ip}`);
    }
  }
  parts.push(spfEnforcement.value);
  return parts.join(' ');
});

const spfLookupCount = computed(() => {
  return spfProviders.value.length;
});

// --- DMARC ---
const dmarcPolicy = ref('reject');
const dmarcSubdomainPolicy = ref('');
const dmarcPercentage = ref(100);
const dmarcRuaEmail = ref('');
const dmarcRufEmail = ref('');
const dmarcAdkim = ref('');
const dmarcAspf = ref('');

const dmarcPolicyOptions = [
  { label: 'reject (block failing mail)', value: 'reject' },
  { label: 'quarantine (send to spam)', value: 'quarantine' },
  { label: 'none (monitor only)', value: 'none' },
];

const dmarcAlignmentOptions = [
  { label: 'Relaxed (default)', value: '' },
  { label: 'Strict', value: 's' },
];

const dmarcRecord = computed(() => {
  const parts = [`v=DMARC1; p=${dmarcPolicy.value}`];
  if (dmarcSubdomainPolicy.value) {
    parts.push(`sp=${dmarcSubdomainPolicy.value}`);
  }
  if (dmarcPercentage.value < 100) {
    parts.push(`pct=${dmarcPercentage.value}`);
  }
  if (dmarcRuaEmail.value.trim()) {
    const emails = dmarcRuaEmail.value.split(/[\s,;]+/).filter(Boolean).map(e => `mailto:${e.replace(/^mailto:/, '')}`).join(',');
    parts.push(`rua=${emails}`);
  }
  if (dmarcRufEmail.value.trim()) {
    const emails = dmarcRufEmail.value.split(/[\s,;]+/).filter(Boolean).map(e => `mailto:${e.replace(/^mailto:/, '')}`).join(',');
    parts.push(`ruf=${emails}`);
  }
  if (dmarcAdkim.value) {
    parts.push(`adkim=${dmarcAdkim.value}`);
  }
  if (dmarcAspf.value) {
    parts.push(`aspf=${dmarcAspf.value}`);
  }
  return parts.join('; ');
});
</script>

<template>
  <div style="flex: 1 1 900px; max-width: 1400px; margin-top: 0;">
    <n-tabs v-model:value="activeTab" type="segment" animated>
      <n-tab-pane name="spf" tab="SPF">
        <div class="mt-4">
          <div class="record-box mb-4">
            <div class="mb-1 text-xs op-50">
              TXT record on your root domain (@)
            </div>
            <div class="record-output">
              <pre class="record-text">{{ spfRecord }}</pre>
              <c-button circle variant="text" style="width:24px;height:24px;flex-shrink:0;" @click="copyValue(spfRecord)">
                <n-icon size="14" :component="copiedValue === spfRecord ? Check : Copy" />
              </c-button>
            </div>
            <div v-if="spfLookupCount > 8" class="mt-2 text-xs" style="color: #f0a020;">
              {{ spfLookupCount }} DNS lookups selected. SPF has a 10-lookup limit.
            </div>
          </div>

          <div class="mb-3 text-sm font-semibold">
            Mail providers
          </div>
          <div class="mb-4">
            <n-checkbox-group v-model:value="spfProviders">
              <div class="grid grid-cols-1 gap-2 lg:grid-cols-3 sm:grid-cols-2">
                <n-checkbox
                  v-for="opt in spfProviderOptions"
                  :key="opt.value"
                  :value="opt.value"
                  :label="opt.label"
                />
              </div>
            </n-checkbox-group>
          </div>

          <div class="mb-3 text-sm font-semibold">
            Custom IPs or ranges (optional)
          </div>
          <c-input-text
            v-model:value="spfCustomIps"
            placeholder="e.g. 203.0.113.5, 198.51.100.0/24"
            raw-text
            mb-4
          />

          <div class="mb-3 text-sm font-semibold">
            Enforcement
          </div>
          <n-select
            v-model:value="spfEnforcement"
            :options="spfEnforcementOptions"
            style="max-width: 400px; margin-bottom: 16px;"
          />
        </div>
      </n-tab-pane>

      <n-tab-pane name="dmarc" tab="DMARC">
        <div class="mt-4">
          <div class="record-box mb-4">
            <div class="mb-1 text-xs op-50">
              TXT record on _dmarc.yourdomain.com
            </div>
            <div class="record-output">
              <pre class="record-text">{{ dmarcRecord }}</pre>
              <c-button circle variant="text" style="width:24px;height:24px;flex-shrink:0;" @click="copyValue(dmarcRecord)">
                <n-icon size="14" :component="copiedValue === dmarcRecord ? Check : Copy" />
              </c-button>
            </div>
          </div>

          <div class="mb-3 text-sm font-semibold">
            Policy
          </div>
          <n-select
            v-model:value="dmarcPolicy"
            :options="dmarcPolicyOptions"
            style="max-width: 400px; margin-bottom: 16px;"
          />

          <div class="mb-3 text-sm font-semibold">
            Subdomain policy (optional)
          </div>
          <n-select
            v-model:value="dmarcSubdomainPolicy"
            :options="[{ label: 'Same as main policy', value: '' }, ...dmarcPolicyOptions]"
            style="max-width: 400px; margin-bottom: 16px;"
          />

          <div class="mb-3 text-sm font-semibold">
            Percentage of mail to apply policy to
          </div>
          <n-slider v-model:value="dmarcPercentage" :min="0" :max="100" :step="5" mb-4 />
          <div class="mb-4 text-xs op-50">
            {{ dmarcPercentage }}% of failing mail will be acted on. Use less than 100% for gradual rollout.
          </div>

          <div class="mb-3 text-sm font-semibold">
            Aggregate report email (rua)
          </div>
          <c-input-text
            v-model:value="dmarcRuaEmail"
            placeholder="e.g. dmarc-reports@yourdomain.com"
            raw-text
            mb-4
          />

          <div class="mb-3 text-sm font-semibold">
            Forensic report email (ruf, optional)
          </div>
          <c-input-text
            v-model:value="dmarcRufEmail"
            placeholder="e.g. dmarc-forensic@yourdomain.com"
            raw-text
            mb-4
          />

          <div class="mb-3 text-sm font-semibold">
            DKIM alignment
          </div>
          <n-radio-group v-model:value="dmarcAdkim" mb-4>
            <n-radio
              v-for="opt in dmarcAlignmentOptions"
              :key="opt.value"
              :value="opt.value"
              :label="opt.label"
              style="margin-right: 16px;"
            />
          </n-radio-group>

          <div class="mb-3 text-sm font-semibold">
            SPF alignment
          </div>
          <n-radio-group v-model:value="dmarcAspf" mb-4>
            <n-radio
              v-for="opt in dmarcAlignmentOptions"
              :key="opt.value"
              :value="opt.value"
              :label="opt.label"
              style="margin-right: 16px;"
            />
          </n-radio-group>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped>
.record-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(30, 165, 76, 0.25);
  border-radius: 6px;
  padding: 12px 14px;
}

.record-output {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.record-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.83rem;
  color: #1ea54c;
  line-height: 1.65;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
}
</style>
