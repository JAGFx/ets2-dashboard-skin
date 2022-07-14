<template>
  <pre
    style="
      color: #000;
      font-size: 2rem;
      background: #fff;
      position: fixed;
      z-index: 100000;
    "
  >
    <slot />
  </pre>
</template>

<script>
export default {
  name: 'Debug'
};
</script>
