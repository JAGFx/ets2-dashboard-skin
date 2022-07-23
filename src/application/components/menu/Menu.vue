<template>
  <div class="menu d-flex flex-column h-100 container-fluid">
    <div class="row my-2">
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
import AboutTab from '@/application/components/menu/AboutTab/AboutTab.vue';
import ConfigurationTab from '@/application/components/menu/ConfigurationTab.vue';
import SkinTab from '@/application/components/menu/SkinTab.vue';
import Navlink from '@/application/ui/Navlink/Navlink.vue';
import { shallowRef } from 'vue';

const tabs = [
  {
    icon: 'icon-route',
    label: 'Skin',
    component: SkinTab
  },
  {
    icon: 'icon-route',
    label: 'Configuration',
    component: ConfigurationTab
  },
  {
    icon: 'icon-route',
    label: 'About',
    component: AboutTab
  }
];
const currentTab = shallowRef(AboutTab);
</script>

<style lang="scss" scoped>
@import 'menu';
</style>
