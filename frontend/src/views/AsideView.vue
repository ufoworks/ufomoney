<template>
  <div class="min-h-full">
    <div class="pr-88">
      <div class="pt-28 pb-12 px-12">
        <router-view></router-view>
      </div>
    </div>
    <aside class="fixed top-0 right-0 h-screen w-88 bg-lightbrand pt-32 pb-10 px-8">
      <router-view name="aside"></router-view>
    </aside>
  </div>
</template>

<script>
export default {
}
</script>
