import { DropdownMenu as DropdownPrimitive } from 'radix-vue/namespaced'

const DropdownLabel = DropdownPrimitive.Label
const DropdownGroup = DropdownPrimitive.Group
const DropdownSub = DropdownPrimitive.Sub
const DropdownSubTrigger = DropdownPrimitive.SubTrigger
const DropdownSubContent = DropdownPrimitive.SubContent
const DropdownRadioGroup = DropdownPrimitive.RadioGroup
const DropdownRadioItem = DropdownPrimitive.RadioItem
const DropdownCheckboxItem = DropdownPrimitive.CheckboxItem

export {
  DropdownLabel,
  DropdownGroup,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownCheckboxItem,
}

export { default as Dropdown } from './Dropdown.vue'
export { default as DropdownTrigger } from './DropdownTrigger.vue'
export { default as DropdownContent } from './DropdownContent.vue'
export { default as DropdownItem } from './DropdownItem.vue'
export { default as DropdownSeparator } from './DropdownSeparator.vue'
