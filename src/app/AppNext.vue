<template>
  <h1>New dashboard</h1>
  <p>{{ $t('Skins') }}</p>
  <code>Current locale: {{ currentLocale }}</code
  ><br />
  <button @click="() => changeLocale('fr-FR')">Change</button><br />
  <hr />
  <code>Version: {{ version }}</code
  ><br />
  <code>Env: {{ isOnDevEnvironment ? 'Dev' : 'Prod' }}</code
  ><br />
  <code>Fake data ? {{ useFakeData }}</code
  ><br />
  <hr />
  <button @click="() => pushLog('Toto', 'zone', 'level')">PushLog</button><br />
  <pre>{{ logs }}</pre>
  <br />
</template>

<script setup>
import { useLogger } from '@/useLogger';
import { useApplicationState } from '@/app/useApplicationState';
import { useTranslator } from '@/translator/useTranslator';

const { version, isOnDevEnvironment, useFakeData } = useApplicationState();
const { currentLocale, changeLocale } = useTranslator();
const { logs, pushLog } = useLogger();
</script>

<style scoped></style>
