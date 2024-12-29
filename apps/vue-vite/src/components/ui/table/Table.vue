<script setup lang="ts" generic="T extends BaseEntity">
import type { VNode } from 'vue'
import { ArchiveX } from 'lucide-vue-next'
import {
  TableElement,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from './'
import type { TablePaginationProps } from './'
import type { BaseEntity } from '@/types/api'

type TableColumn<Entry> = {
  title: string
  field: keyof Entry
  Cell?: ({ entry }: { entry: Entry }) => VNode
}

type TableProps<Entry> = {
  data: Entry[]
  columns: TableColumn<Entry>[]
  pagination?: TablePaginationProps
}

defineProps<TableProps<T>>()
</script>
<template>
  <div
    v-if="!data?.length"
    class="flex h-80 flex-col items-center justify-center bg-white text-gray-500"
  >
    <ArchiveX class="size-16" />
    <h4>No Entries Found</h4>
  </div>
  <template v-else>
    <TableElement>
      <TableHeader>
        <TableRow>
          <TableHead v-for="(column, index) in columns" :key="column.title + index">
            {{ column.title }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(entry, entryIndex) in data" :key="entry?.id || entryIndex">
          <TableCell
            v-for="({ Cell, field, title }, columnIndex) in columns"
            :key="title + columnIndex"
          >
            <component :is="Cell" v-if="Cell" :entry="entry" />
            <template v-else>{{ entry[field] }}</template>
          </TableCell>
        </TableRow>
      </TableBody>
    </TableElement>
    <TablePagination v-if="pagination" v-bind="pagination" />
  </template>
</template>
