<template>
  <Navbar>
    <Menu />
  </Navbar>

  <ToastWrapper />

  <!--  <h1 class="bg-gradient-accent">New dashboard</h1>-->
  <!--  <p>{{ $t('Skins') }}</p>-->
  <!--  <code>Current locale: {{ currentLocale }}</code-->
  <!--  ><br />-->
  <!--  <button @click="() => changeLocale('fr-FR')">Change</button><br />-->
  <!--  <hr />-->
  <!--  <code>Version: {{ version }}</code-->
  <!--  ><br />-->
  <!--  <code>Env: {{ isOnDevEnvironment ? 'Dev' : 'Prod' }}</code-->
  <!--  ><br />-->
  <!--  <code>Fake data ? {{ useFakeData }}</code-->
  <!--  ><br />-->
  <!--  <hr />-->
  <!--  <button @click="() => pushLog('Toto', 'zone', 'level')">PushLog</button><br />-->
  <!--  <pre>{{ logs }}</pre>-->
  <!--  <br />-->
</template>

<script setup lang="ts">
import Menu from '@/jagfx/menu/components/Menu.vue';
import Navbar from '@/jagfx/navbar/components/Navbar.vue';
import { loadUserPreferences } from '@/jagfx/splash-screen/spalsh-screen';
import ToastWrapper from '@/jagfx/ui/toast/components/ToastWrapper.vue';

//import { useApplicationState } from '@/application/useApplicationState.ts';
//import { useLogger }           from "@/application/useLogger.ts";
//import { useTranslator }       from '@/application/useTranslator.ts';
//
//const { version, isOnDevEnvironment, useFakeData } = useApplicationState();
//const { currentLocale, changeLocale } = useTranslator();
//const { logs, pushLog } = useLogger();
loadUserPreferences();
</script>

<style lang="scss">
@import '@/jagfx/style/applicationNext.scss';
</style>
