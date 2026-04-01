import { BuildingSkyscraper } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'M365 License SKU Decoder',
  path: '/m365-sku-decoder',
  description: 'Look up Microsoft 365 license SKU string IDs and GUIDs.',
  keywords: ['microsoft', 'm365', 'office', 'license', 'sku', 'guid', 'intune', 'azure', 'exchange', 'teams', 'defender', 'o365'],
  component: () => import('./m365-sku-decoder.vue'),
  icon: BuildingSkyscraper,
  createdAt: new Date('2026-03-31'),
});
