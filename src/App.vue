<script setup></script>

<template>
  <div class="container p-5">
    <div class="header mb-5">
      <h1 class="text-center m-5 text-light">Szélerőmű Park Kezelő</h1>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(162, 209, 247);
  height: 100vh;
}
.header {
  height: 250px;
  width: 100%;
  background-image: url('/header-pic.png');
  background-color: rgb(52, 126, 211);
  background-repeat: no-repeat;
  background-position: center;

  border: 1px solid rgb(24, 107, 202);
}
</style>
