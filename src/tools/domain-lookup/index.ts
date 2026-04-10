import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Domain Lookup',
  path: '/domain-lookup',
  description: 'WHOIS registration details and email DNS checks (MX, SPF, DKIM, DMARC) for any domain in a single view.',
  keywords: ['whois', 'domain', 'registrar', 'registration', 'expiry', 'nameserver', 'dns', 'lookup', 'email', 'mx', 'spf', 'dkim', 'dmarc', 'mail', 'spoofing', 'deliverability'],
  component: () => import('./domain-lookup.vue'),
  icon: World,
  fullscreen: true,
  createdAt: new Date('2026-04-09'),
});
