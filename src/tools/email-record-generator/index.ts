import { Mail } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Email Record Generator',
  path: '/email-record-generator',
  description: 'Generate SPF and DMARC DNS TXT records. Pick your mail providers and policies, copy the output straight into your DNS.',
  keywords: ['spf', 'dmarc', 'dns', 'email', 'txt', 'record', 'generator', 'mail', 'authentication', 'spoofing', 'deliverability'],
  component: () => import('./email-record-generator.vue'),
  fullscreen: true,
  icon: Mail,
  createdAt: new Date('2026-04-06'),
});
