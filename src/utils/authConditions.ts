type ConditionType = (param: string) => boolean

/** Test for valid email format. */
export const emailTest: ConditionType = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

/** Test for name length. */
// export const nameLengthTest = (name) => (
//   name.length < 2
// );

/** Test for password length. */
export const passwordLengthTest: ConditionType = (password) => (
  password.length >= 8
);

/** Test for a uppercase in password */
export const passwordUpperTest: ConditionType = (password) => {
  const regex = /^(?=.*[A-Z]).+$/;
  return regex.test(password);
};

/** Test for a lowercase in password */
export const passwordLowerTest: ConditionType = (password) => {
  const regex = /^(?=.*[a-z]).+$/;
  return regex.test(password);
};

/** Test for a special character in password */
export const passwordSpecialTest: ConditionType = (password) => {
  const regex = /[-#?!@$%^&*-]/;
  return regex.test(password);
};

/** Test for a number in password */
export const passwordNumberTest: ConditionType = (password) => {
  if(password.match && password.match(/\d+/g)) {
    const passwordArray = password.match(/\d+/g) as Array<string>
    if(passwordArray.length > 0) {
      return true
    }
  }

  return false
};

/** Test the Confirmed Password input. */
export const confirmPasswordTest = (password: string, confirm: string): boolean => {
  return password === confirm
}