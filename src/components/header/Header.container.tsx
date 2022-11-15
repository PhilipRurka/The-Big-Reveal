
import { useUser } from "@auth0/nextjs-auth0";
import { FC, useState } from "react"
import Header from "./Header"

export type handleUpdateBurgerType = (openBurger: boolean) => void;

const HeaderContainer: FC = () => {
  const [openedBurger, setOpenedBurger] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

  console.log({
    user, error, isLoading
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleUpdateBurger: handleUpdateBurgerType = (openBurger) => {
    setOpenedBurger(openBurger)
  }
  
  return (
    <Header
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      hasUser={!!user} />
  )
}

export default HeaderContainer