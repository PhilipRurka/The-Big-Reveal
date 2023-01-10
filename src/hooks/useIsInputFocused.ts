import { RefObject, useEffect, useState } from "react"

type UseIsInputFocusedType = (
  ref: RefObject<HTMLInputElement>,
  dependencies: Array<unknown>
) => boolean

const useIsInputFocused: UseIsInputFocusedType = (ref, dependencies) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    // console.log({
    //   message: 'useIsInputFocused mounted',
    //   ref
    // })

    if(ref) {
      ref.current?.addEventListener('focus', handleFocus)
      ref.current?.addEventListener('blur', handleBlur)
    }

    return () => {
      if(ref) {
        // console.log({
        //   message: 'useIsInputFocused unmounted'
        // })
        ref.current?.removeEventListener('focus', handleFocus)
        ref.current?.removeEventListener('blur', handleBlur)
      }
    }
  }, [ref, dependencies])

  const handleFocus = (): void => {
    // console.log({
    //   message: 'useIsInputFocused Focus'
    // })
    setIsFocused(true)
  }

  const handleBlur = (): void => {
    setIsFocused(false)
  }

  return isFocused
}

export default useIsInputFocused



// There may never be a ref due to the fact that password ay never be defined.
// Add a condition for is being used

// Also I think there may be a race, The fact that password and its object may or may not be defined instead of always being defined.