import { RefObject, useEffect, useState } from "react"

type useIsInputFocusedType = RefObject<HTMLInputElement>

const useIsInputFocused = ((ref: useIsInputFocusedType): boolean => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    if(ref) {
      ref.current?.addEventListener('focus', handleFocus)
      ref.current?.addEventListener('blur', handleBlur)
    }

    return () => {
      if(ref) {
        ref.current?.removeEventListener('focus', handleFocus)
        ref.current?.removeEventListener('blur', handleBlur)
      }
    }
  }, [ref])

  const handleFocus = (): void => {
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  return isFocused
})

export default useIsInputFocused