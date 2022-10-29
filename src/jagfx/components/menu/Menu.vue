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

<script setup lang="ts">
import type { Component } from 'vue';
import { shallowRef } from 'vue';

import SkinTab from '@/jagfx/components/menu/SkinTab.vue';
import AboutTab from '@/jagfx/components/menu/about-tab/AboutTab.vue';
import UserPreferenceTab from '@/jagfx/components/menu/user-preference-tab/UserPreferenceTab.vue';
import Navlink from '@/jagfx/components/shared/ui/Navlink.vue';

type TabsType = {
  icon: string;
  label: string;
  component: Component;
};

const tabs: TabsType[] = [
  {
    icon: 'icon-route',
    label: 'Skin',
    component: SkinTab
  },
  {
    icon: 'icon-route',
    label: 'Preferences',
    component: UserPreferenceTab
  },
  {
    icon: 'icon-route',
    label: 'About',
    component: AboutTab
  }
];
const currentTab = shallowRef<TabsType>(UserPreferenceTab);
</script>
