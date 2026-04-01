export const policySections: {
  category: string
  source: string
  policies: {
    name: string
    default: string
    range: string
    description: string
    severity: 'Info' | 'Warning' | 'Critical'
  }[]
}[] = [
  {
    category: 'Active Directory Domain Password Policy',
    source: 'Default Domain Policy GPO',
    policies: [
      {
        name: 'Minimum Password Length',
        default: '7 characters',
        range: '0–14 characters',
        description: 'Minimum number of characters required. Microsoft recommends 14+. NIST recommends 8+ with no complexity requirement.',
        severity: 'Warning',
      },
      {
        name: 'Maximum Password Age',
        default: '42 days',
        range: '0–999 days',
        description: 'How long before a password expires. NIST 800-63 now recommends against mandatory expiration unless compromise is suspected.',
        severity: 'Info',
      },
      {
        name: 'Minimum Password Age',
        default: '1 day',
        range: '0–998 days',
        description: 'Prevents users from immediately changing their password back. Must be less than Maximum Password Age.',
        severity: 'Info',
      },
      {
        name: 'Password History',
        default: '24 passwords remembered',
        range: '0–24 passwords',
        description: 'Number of previous passwords Windows remembers to prevent reuse. 24 is the maximum enforced by AD.',
        severity: 'Info',
      },
      {
        name: 'Complexity Requirements',
        default: 'Enabled',
        range: 'Enabled / Disabled',
        description: 'Requires passwords to contain characters from 3 of 4 categories: uppercase, lowercase, numbers, symbols. Also prevents using account name.',
        severity: 'Warning',
      },
      {
        name: 'Reversible Encryption',
        default: 'Disabled',
        range: 'Enabled / Disabled',
        description: 'Stores passwords using reversible encryption — essentially plaintext. Should always remain Disabled unless required by legacy apps.',
        severity: 'Critical',
      },
      {
        name: 'Account Lockout Threshold',
        default: '0 (disabled)',
        range: '0–999 attempts',
        description: 'Number of failed logon attempts before lockout. 0 means no lockout. Microsoft recommends 5–10 for most environments.',
        severity: 'Warning',
      },
      {
        name: 'Account Lockout Duration',
        default: 'Not defined',
        range: '0–99,999 minutes',
        description: 'How long an account stays locked. 0 means admin must unlock manually. Only applies if threshold > 0.',
        severity: 'Info',
      },
      {
        name: 'Lockout Observation Window',
        default: 'Not defined',
        range: '0–99,999 minutes',
        description: 'Time window in which failed attempts are counted. Must be <= Lockout Duration. Resets the failed attempt counter after this period.',
        severity: 'Info',
      },
    ],
  },
  {
    category: 'Azure AD / Entra ID Password Policy',
    source: 'Microsoft Entra ID (cloud-only accounts)',
    policies: [
      {
        name: 'Minimum Password Length',
        default: '8 characters',
        range: '8–256 characters',
        description: 'Fixed minimum for cloud-only accounts. Cannot be lowered below 8.',
        severity: 'Info',
      },
      {
        name: 'Maximum Password Length',
        default: '256 characters',
        range: 'Up to 256 characters',
        description: 'Entra ID supports passwords up to 256 characters for cloud accounts.',
        severity: 'Info',
      },
      {
        name: 'Password Expiration',
        default: '90 days (legacy) / Never (recommended)',
        range: '1–730 days or Never',
        description: 'Microsoft now recommends "Never expire" for cloud accounts when combined with MFA and password protection.',
        severity: 'Info',
      },
      {
        name: 'Complexity Requirements',
        default: 'Enabled (always)',
        range: 'Cannot be disabled',
        description: 'Entra ID always enforces complexity: 3 of 4 character categories required. Cannot be disabled for cloud accounts.',
        severity: 'Info',
      },
      {
        name: 'Smart Lockout Threshold',
        default: '10 attempts',
        range: '1–10 (configurable in P1/P2)',
        description: 'Entra ID Smart Lockout blocks brute force attacks. Default is 10 attempts. Requires AAD P1 to customize.',
        severity: 'Warning',
      },
      {
        name: 'Smart Lockout Duration',
        default: '60 seconds (first lockout)',
        range: 'Increases with each lockout',
        description: 'Lockout duration doubles with each subsequent lockout. Cloud-managed — admins cannot manually unlock Smart Lockout.',
        severity: 'Info',
      },
      {
        name: 'Password Protection (Banned List)',
        default: 'Global banned list always active',
        range: 'Custom list requires AAD P1',
        description: 'Microsoft maintains a global banned password list. Custom banned passwords require Azure AD Premium P1.',
        severity: 'Warning',
      },
      {
        name: 'On-Premises Password Protection',
        default: 'Requires agent install',
        range: 'Requires AAD P1',
        description: 'Extends Entra banned password list to on-premises AD via DC agent and proxy service. Requires AAD P1.',
        severity: 'Warning',
      },
    ],
  },
  {
    category: 'Fine-Grained Password Policies (PSO)',
    source: 'AD DS — Password Settings Objects',
    policies: [
      {
        name: 'PSO Precedence',
        default: 'Lower number = higher priority',
        range: '1–2,147,483,647',
        description: 'When multiple PSOs apply to a user, the one with the lowest precedence value wins.',
        severity: 'Info',
      },
      {
        name: 'PSO Application',
        default: 'Applied to users or global security groups',
        range: 'Users / Global Security Groups only',
        description: 'PSOs cannot be applied directly to OUs. Link to a group, then add users to that group.',
        severity: 'Warning',
      },
      {
        name: 'Resultant PSO',
        default: 'Viewed via ADAC or PowerShell',
        range: 'N/A',
        description: 'Use "Get-ADUserResultantPasswordPolicy -Identity username" to see which PSO applies to a specific user.',
        severity: 'Info',
      },
      {
        name: 'Domain Functional Level Required',
        default: 'Windows Server 2008 or higher',
        range: 'N/A',
        description: 'Fine-grained password policies require domain functional level of Windows Server 2008 or higher.',
        severity: 'Info',
      },
    ],
  },
  {
    category: 'NIST 800-63B Recommendations',
    source: 'NIST Special Publication 800-63B',
    policies: [
      {
        name: 'Minimum Length',
        default: '8 characters (user-chosen)',
        range: '15+ recommended for machine-generated',
        description: 'NIST recommends at least 8 characters for user-chosen passwords, 6 for OTPs.',
        severity: 'Info',
      },
      {
        name: 'Maximum Length',
        default: 'At least 64 characters',
        range: '64+ characters',
        description: 'Verifiers should allow passwords up to at least 64 characters. Truncating passwords is not permitted.',
        severity: 'Info',
      },
      {
        name: 'Complexity Rules',
        default: 'NOT recommended',
        range: 'N/A',
        description: 'NIST explicitly discourages composition rules (must have uppercase, symbol, etc.) as they reduce security by encouraging predictable patterns.',
        severity: 'Warning',
      },
      {
        name: 'Password Expiration',
        default: 'NOT recommended (routine)',
        range: 'N/A',
        description: 'Routine expiration is discouraged. Only require change if compromise is suspected or confirmed.',
        severity: 'Warning',
      },
      {
        name: 'Security Questions',
        default: 'NOT recommended',
        range: 'N/A',
        description: 'Knowledge-based authentication (security questions) should not be used as a password reset mechanism.',
        severity: 'Critical',
      },
      {
        name: 'Breach Corpus Check',
        default: 'Recommended',
        range: 'N/A',
        description: 'New passwords should be checked against known breached password lists (e.g. HaveIBeenPwned). Reject if found.',
        severity: 'Warning',
      },
      {
        name: 'MFA Requirement',
        default: 'Strongly recommended',
        range: 'N/A',
        description: 'NIST recommends phishing-resistant MFA (FIDO2/WebAuthn) as the preferred second factor over SMS OTP.',
        severity: 'Warning',
      },
    ],
  },
];
