import { useEffect, useState } from "react"
import { passwordLengthTest, passwordLowerTest, passwordNumberTest, passwordSpecialTest, passwordUpperTest } from "../utils/authConditions"

type UsePasswordValidation = (password: string | undefined) => ItemsSuccessStatesType
export type ItemsSuccessStatesType = {
  isSuccess: boolean
  hasLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecial: boolean
}

const usePasswordValidation: UsePasswordValidation = (password = '') => {
  const [itemsSuccessStates, setItemsSuccessStates] = useState<ItemsSuccessStatesType>({
    isSuccess: false,
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  })

  useEffect(() => {
      const itemsStatus = {
        hasLength: passwordLengthTest(password),
        hasUppercase: passwordUpperTest(password),
        hasLowercase: passwordLowerTest(password),
        hasSpecial: passwordSpecialTest(password),
        hasNumber: passwordNumberTest(password)
      }

      let isSuccess = true

      for (let i = 0; i < Object.keys(itemsStatus).length; i++) {
        const keys = Object.keys(itemsStatus) as Array<keyof typeof itemsStatus>
        const key = keys[i];
        
        if(!itemsStatus[key]) {
          isSuccess = false
          break
        }
      }

    setItemsSuccessStates({
      ...itemsStatus,
      isSuccess
    })
  }, [password])

  return itemsSuccessStates
}

export default usePasswordValidation