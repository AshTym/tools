<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Page not found - killer tools' });
</script>

<template>
  <div class="not-found">
    <div class="terminal-block">
      <p class="prompt">
        <span class="green">>_killer-tools</span>
      </p>
      <p class="command">
        <span class="green">$ </span>
        <span class="white">cd /{{ $route.path.replace('/', '') }}</span>
      </p>
      <p class="error">
        bash: cd: /{{ $route.path.replace('/', '') }}: No such file or directory
      </p>
      <p class="code">
        <span class="dim">exit code </span><span class="green">404</span>
      </p>
    </div>

    <c-button to="/" class="home-btn">
      <span class="green">~/</span> back to home
    </c-button>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 32px;
}

.terminal-block {
  font-family: 'Cascadia Code', 'Cascadia Mono', 'Consolas', 'Courier New', monospace;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 28px 36px;
  min-width: 380px;
  max-width: 560px;
  width: 100%;
}

.terminal-block p {
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.terminal-block p:last-child {
  margin-bottom: 0;
}

.green { color: #1ea54c; }
.white { color: rgba(255, 255, 255, 0.9); }
.dim   { color: rgba(255, 255, 255, 0.35); }

.error {
  color: rgba(255, 100, 100, 0.85);
  margin-top: 4px !important;
}

.code {
  margin-top: 12px !important;
  font-size: 0.85rem !important;
}

.prompt { margin-bottom: 12px !important; font-size: 1.05rem !important; }

@media (max-width: 480px) {
  .terminal-block {
    min-width: unset;
    padding: 20px;
  }
}
</style>
