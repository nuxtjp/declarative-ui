import type { Json } from '@zixcel/interaction'
/** Display only the primitive accepted by the component; never coerce or overwrite a draft. */
export function inputValue(kind: 'string', value: Json | undefined): string | undefined
export function inputValue(kind: 'number', value: Json | undefined): number | undefined
export function inputValue(kind: 'boolean', value: Json | undefined): boolean | undefined
export function inputValue(kind: 'string' | 'number' | 'boolean', value: Json | undefined) {
  if (typeof value !== kind || (typeof value === 'number' && !Number.isFinite(value))) return undefined
  return value
}
