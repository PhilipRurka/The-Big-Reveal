/**
 * FC function component
 * we must return a JSX
 * import react types in one line 
 * import our content in multiline
*/
import type { ChangeEvent, FC, RefObject } from "react";

import { 
  EasyLoginStyled,
  EasyLoginSelect,
  EasyLoginOption
 } from "./EasyLogin.styled";

type EasyLoginProps = {
  emailRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>
}

const EasyLogin: FC<EasyLoginProps> = ({
  emailRef,
  passwordRef
}) => {
  
  /* set an type object to specify our object types */
  type User = {
    label: number;
    value: number
  }

  const users: User[] = [
    { label: 1, value: 1},
    { label: 2, value: 2}
  ]

  let handleUserChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    /* this represents the input value of email input */ 
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = `person${event.target.value}@supabase.com`;
      passwordRef.current.value = 'Def22333!'
    }
  };

  /** add a prefix to this items keys  */
  return (
    <EasyLoginStyled>
      <EasyLoginSelect onChange={handleUserChange}>
        <EasyLoginOption value="Select a user">
          Select a user
        </EasyLoginOption>
        {users.map((user) => (
          <EasyLoginOption
            key={`EasyLogin-users-${user.label}`} 
            value={user.value} >
            { `person ${user.label}` }
          </EasyLoginOption>
        ))}
      </EasyLoginSelect>
    </EasyLoginStyled>
  );
}

export default EasyLogin;
