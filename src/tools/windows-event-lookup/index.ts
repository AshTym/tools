import { ClipboardList } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Windows Event Lookup',
  path: '/windows-event-lookup',
  description: 'Look up common Windows Event IDs with descriptions and severity.',
  keywords: ['windows', 'event', 'log', 'event id', 'security', 'system', 'application', 'evtx', 'audit', 'msp'],
  component: () => import('./windows-event-lookup.vue'),
  icon: ClipboardList,
  createdAt: new Date('2026-03-31'),
});
