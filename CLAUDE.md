# Killer Tools Site - Project Context

## Developer Environment
- **OS: Windows 11** - Steve is a Windows sysadmin. Never use Unix-style env vars, Unix commands, or assume Linux/macOS.
- Shell scripts in package.json MUST use `cross-env` for environment variables (Windows compatibility).
- PowerShell 5.1/7 and CMD are the available shells. Git Bash is installed but not the default.
- When writing CLI instructions, always use Windows-compatible syntax.

## Project Details
- Vue 3 + Vite + TypeScript web app (based on it-tools)
- Capacitor Android app that bundles from `dist/` (NOT a live wrapper - must rebuild APK for updates)
- Deployed to killertools.net
- Package manager: pnpm
- Android signing config in `android/keystore.properties`

## Build & Deploy
- Build: `pnpm build` (requires cross-env in build script for Windows)
- Android sync: `npx cap sync android`
- Android release build via Android Studio or Gradle

## Style / Preferences
- No em dashes in any content
- No double hyphens as em dash substitutes either - use periods or restructure the sentence
- ODT for documents, not DOCX
- Short, direct commit messages
- Minimal explanations, lead with actual output
