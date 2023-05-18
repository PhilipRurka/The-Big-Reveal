// FC function component
// we must return a JSX
import { ChangeEvent, FC, Ref, RefObject } from "react";
import { EasyLoginStyled } from "./EasyLogin.styled";

type EasyLoginProps = {
  emailRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>
}

const EasyLogin: FC<EasyLoginProps> = ({
  emailRef,
  passwordRef
}) => {
  
  // set an interface object to specify our object types
  interface User {
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
    // this represents the input value of email input  
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = `person${event.target.value}@supabase.com`;
      passwordRef.current.value = 'Def22333!'
    }
  };

  return (
    <EasyLoginStyled>
      <select onChange={handleUserChange}>
        <option value="Select a user">Select a user</option>
        {users.map((user) => (
          <option key={user.label} value={user.value}>
            {`person ${user.label}`}
          </option>
        ))}
      </select>
    </EasyLoginStyled>
  );
}

export default EasyLogin;
