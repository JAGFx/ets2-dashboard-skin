<template>
  <h1>New dashboard</h1>
  <p>{{ $t( "Skins" ) }}</p>
  <code>Version: {{ version }}</code><br>
  <code>Current locale: {{ currentLocale() }}</code><br>
  <button @click="() => changeLocale('fr-FR')">Change</button>
</template>

<script setup>
import { translate as $t } from "@/translator/i18n.util";
import { useAppState }     from "@/app/useAppState";
import useTranslatorState  from "@/translator/useTranslatorState";

const { version }                     = useAppState();
const { currentLocale, changeLocale } = useTranslatorState();

</script>

<style scoped>

</style>