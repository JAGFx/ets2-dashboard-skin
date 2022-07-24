<template>
  <Navbar>
    <Menu />
  </Navbar>

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

<script setup>
//import { useApplicationState } from '@/application/useApplicationState.js';
//import { useLogger }           from "@/application/useLogger.js";
//import { useTranslator }       from '@/application/useTranslator.js';
//
//const { version, isOnDevEnvironment, useFakeData } = useApplicationState();
//const { currentLocale, changeLocale } = useTranslator();
//const { logs, pushLog } = useLogger();

import Navbar from '@/application/components/navbar/Navbar.vue';
import Menu from '@/application/components/menu/Menu.vue';
</script>

<style lang="scss">
@import './style/applicationNext.scss';
</style>
