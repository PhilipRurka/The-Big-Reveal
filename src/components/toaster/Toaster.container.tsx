import { FC, useCallback, useEffect, useRef } from "react";
import Toaster, { ToasterType } from "./Toaster";
import { useAppSelector } from "../../redux/redux_hooks";
import { selectToast } from "../../redux/slices/toasterSlice";
import gsap from "gsap"

const ToasterContainer: FC = () => {
  const toasterRef = useRef<HTMLDivElement>(null)
  const tlToasterRef = useRef<gsap.core.Timeline>(gsap.timeline({
    paused: true
  }))

  const content = useAppSelector(selectToast) as ToasterType

  const playGsap = useCallback(() => {
    if(!toasterRef.current) return

    const finalXValue = -toasterRef.current.clientWidth - 20

    tlToasterRef.current.fromTo('#toaster', {
      duration: 200,
      x: 40,
      ease: 'power1.inOut',
      boxShadow: '0 0 4px 0px black',
    }, {
      x: finalXValue
    }, 0)

    if(!content.title) return

    tlToasterRef.current.play()
  }, [content])

  const reverseGsap = useCallback(() => {
    tlToasterRef.current.reverse()
  }, [])

  const triggerShowToaster = useCallback(() => {
    setTimeout(() => {
      playGsap()
    }, 100)

    setTimeout(() => {
      reverseGsap()
    }, 4000)
  }, [playGsap, reverseGsap])

  useEffect(() => {
    const tlToasterReference = tlToasterRef.current

    triggerShowToaster()

    return () => {
      tlToasterReference.kill()
    }
  }, [triggerShowToaster])

  return (
    <Toaster
      ref={toasterRef || null}
      title={content.title}
      subtitle={content.subtitle}
      to={content.to} />
  )
}

export default ToasterContainer


/**
 * Implement Gsap
 * Have it come out on content change
 * have it auto leave after 5 sec
 * have it leave before its time, then come back out with the new content uppon content change.
 */