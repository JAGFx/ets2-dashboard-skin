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
import { UserPreferenceCollection } from 'ets2-dashboard-lib/jagfx/configuration/user-preference/user-preference.type';

import Menu from '@/jagfx/components/menu/Menu.vue';
import { getUserPreferences } from '@/jagfx/components/menu/user-preference-tab/loader';
import Navbar from '@/jagfx/components/navbar/Navbar.vue';
import ToastWrapper from '@/jagfx/components/shared/toast/ToastWrapper.vue';
import { useUserPreference } from '@/jagfx/components/shared/useUserPreference';

//import { useApplicationState } from '@/application/useApplicationState.ts';
//import { useLogger }           from "@/application/useLogger.ts";
//import { useTranslator }       from '@/application/useTranslator.ts';
//
//const { version, isOnDevEnvironment, useFakeData } = useApplicationState();
//const { currentLocale, changeLocale } = useTranslator();
//const { logs, pushLog } = useLogger();
const { load } = useUserPreference();

getUserPreferences().then((userPreferences: UserPreferenceCollection) =>
  load(userPreferences)
);
</script>

<style lang="scss">
@import '@/jagfx/style/applicationNext.scss';
</style>
