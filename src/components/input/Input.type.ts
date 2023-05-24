import type { ChangeEvent } from "react"

export type InputRefType = HTMLInputElement
export type InputOnChange = ChangeEvent<HTMLInputElement>

export type InputType = {
  id: string
  type: string
  value?: string | number
  tabIndex?: number
  handleChange?: (event: InputOnChange) => void
  defaultValue?: string | number
}