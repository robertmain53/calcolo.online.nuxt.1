<template>
  <div class="container mx-auto flex flex-col md:flex-row">
    <aside class="hidden md:block md:w-1/4 lg:w-1/5 p-4 sticky top-24">
      <slot name="sidebar" />
    </aside>
    <main class="flex-1 p-4">
      <slot />
    </main>
  </div>
</template>