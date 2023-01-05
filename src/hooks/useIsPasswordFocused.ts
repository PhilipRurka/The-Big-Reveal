import { RefObject, useEffect, useState } from "react"

type useIsPasswordFocusedType = RefObject<HTMLInputElement>

const useIsPasswordFocused = ((ref: useIsPasswordFocusedType): boolean => {
  const [isFocused, setIsFocused] = useState(false)

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

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return isFocused
})

export default useIsPasswordFocused