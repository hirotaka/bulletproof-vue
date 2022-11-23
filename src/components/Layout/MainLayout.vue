<script setup lang="tsx">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { Bars3BottomLeftIcon } from "@heroicons/vue/24/outline";

import { AppSidebar, MobileSidebar, UserNavigation } from "@/components/Misc";

const sidebarOpen = ref(false);
const setSidebarOpen = (value: boolean) => (sidebarOpen.value = value);
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <MobileSidebar
      :sidebarOpen="sidebarOpen"
      :setSidebarOpen="setSidebarOpen"
    />
    <AppSidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          @click="setSidebarOpen(true)"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 px-4 flex justify-end">
          <div class="ml-4 flex items-center md:ml-6">
            <UserNavigation />
          </div>
        </div>
      </div>
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <RouterView />
      </main>
    </div>
  </div>
</template>
