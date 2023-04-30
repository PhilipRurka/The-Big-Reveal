import { useRouter } from "next/router"
import { FC, useEffect, useRef } from "react"
import brandLogo from '../../../../../public/assets/Philip_Rurka_Logo.png'
import {
  BrandImg,
  BrandLogoAnchor,
  BrandLogoWrapper
} from "./BrandLogo.styled"

const BrandLogo: FC = () => {
  const brandLogoRef = useRef<HTMLAnchorElement>(null)
  const router = useRouter()

  useEffect(() =>  {
    brandLogoRef.current?.focus()
  }, [router])

  return (
    <BrandLogoWrapper>
      <BrandLogoAnchor
        ref={brandLogoRef}
        href='/'
        aria-label='Home page' >
        <BrandImg
          src={brandLogo}
          alt='Brand\s logo'
          width={30}
          height={30}
          priority />
      </BrandLogoAnchor>
    </BrandLogoWrapper>
  )
}

export default BrandLogo