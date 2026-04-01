import { Lock } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Password Policy Reference',
  path: '/password-policy-reference',
  description: 'Reference guide for Active Directory, Azure AD/Entra ID, and NIST 800-63B password policy settings, defaults, and ranges.',
  keywords: ['password', 'policy', 'active directory', 'azure ad', 'entra', 'gpo', 'lockout', 'complexity', 'nist', 'pso', 'fine-grained', 'ad'],
  component: () => import('./password-policy-reference.vue'),
  icon: Lock,
  createdAt: new Date('2026-03-31'),
});
