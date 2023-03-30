import { RefObject, useEffect, useState } from "react"

type UseIsInputFocusedType = (
  ref: RefObject<HTMLInputElement>,
  dependencies?: Array<unknown>
) => boolean

const useIsInputFocused: UseIsInputFocusedType = (ref, dependencies) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    const refScoped = ref?.current

    if(refScoped) {
      refScoped.addEventListener('focus', handleFocus)
      refScoped.addEventListener('blur', handleBlur)
    }

    return () => {
      if(refScoped) {
        refScoped.removeEventListener('focus', handleFocus)
        refScoped.removeEventListener('blur', handleBlur)
      }
    }
  }, [ref, dependencies])

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  return isFocused
}

export default useIsInputFocused