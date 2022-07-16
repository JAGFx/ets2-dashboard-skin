<template>
  <div class="menu d-flex flex-column h-100">
    <div class="row">
      <div class="col">
        <nav class="nav nav-pills d-flex-center-center my-2">
          <Navlink :active="true">
            <template #icon>
              <i class=" icon-route mx-1"></i>
            </template>
            <template #default>
              Skin
            </template>
          </Navlink>
          <Navlink>
            <template #icon>
              <i class=" icon-route mx-1"></i>
            </template>
            <template #default>
              Config
            </template>
          </Navlink>
          <Navlink>
            <template #icon>
              <i class=" icon-route mx-1"></i>
            </template>
            <template #default>
              About
            </template>
          </Navlink>
        </nav>
      </div>
    </div>
<!--    <div class="row h-100">-->
<!--      <div class="col-6">-->
<!--        <div class="d-flex-center-center flex-column">-->
<!--          <div class="card bg-acrylic my-2">-->
<!--            <div class="card-body">-->
<!--              #1-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="card bg-dark my-2">-->
<!--            <div class="card-body">-->
<!--              #1-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-6">-->
<!--        <div class="card bg-gradient-accent my-2 h-100">-->
<!--          <div class="card-body">-->
<!--            #1-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import Navlink from '@/application/ui/Navlink/Navlink.vue';
</script>

<style lang="scss" scoped>
@import "menu";
</style>