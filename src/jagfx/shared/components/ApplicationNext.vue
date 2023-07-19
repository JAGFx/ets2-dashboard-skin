<template>
  <ToastWrapper />

  <SplashScreen v-if="!hasUserPreferenceLoaded()"> </SplashScreen>
  <div v-else>
    <Navbar>
      <Menu />
    </Navbar>
  </div>
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
import SplashScreen from '@/jagfx/splash-screen/components/SplashScreen.vue';
import { initSplashScreen } from '@/jagfx/splash-screen/splash-screen';
import ToastWrapper from '@/jagfx/ui/toast/components/ToastWrapper.vue';
import { useUserPreference } from '@/jagfx/user-preference/hook/useUserPreference';

const { hasUserPreferenceLoaded } = useUserPreference();

//import { useApplicationState } from '@/application/useApplicationState.ts';
//import { useLogger }           from "@/application/useLogger.ts";
//import { useTranslator }       from '@/application/useTranslator.ts';
//
//const { version, isOnDevEnvironment, useFakeData } = useApplicationState();
//const { currentLocale, changeLocale } = useTranslator();
//const { logs, pushLog } = useLogger();
initSplashScreen();
</script>

<style lang="scss">
@import '@/jagfx/style/applicationNext.scss';
</style>
