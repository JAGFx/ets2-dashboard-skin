<template>
  <div class="menu d-flex flex-column h-100 container-fluid">
    <div class="row">
      <div class="col">
        <nav class="nav nav-pills d-flex-center-center my-2">
          <Navlink
            v-for="tab in tabs"
            :key="tab.label"
            :active="currentTab === tab.component"
            @click="currentTab = tab.component"
          >
            <template #icon>
              <i class="mx-1" :class="tab.icon"></i>
            </template>
            {{ $t(tab.label) }}
          </Navlink>
        </nav>
      </div>
    </div>
    <Transition mode="out-in" name="fade">
      <component :is="currentTab" />
    </Transition>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';

import AboutTab from '@/jagfx/shared/components/menu/AboutTab/AboutTab.vue';
import SkinTab from '@/jagfx/shared/components/menu/SkinTab.vue';
import Navlink from '@/jagfx/shared/components/ui/Navlink/Navlink.vue';
import UserPreferenceTab from '@/jagfx/user-preferences/user-preferences-tab/UserPreferenceTab.vue';

const tabs = [
  {
    icon: 'icon-route',
    label: 'Skin',
    component: SkinTab
  },
  {
    icon: 'icon-route',
    label: 'User preferences',
    component: UserPreferenceTab
  },
  {
    icon: 'icon-route',
    label: 'About',
    component: AboutTab
  }
];
const currentTab = shallowRef(UserPreferenceTab);
</script>

<style lang="scss">
@import 'menu';
</style>
