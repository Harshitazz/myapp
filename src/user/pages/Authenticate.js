import React ,{useContext} from "react";
import Input from "../../shared/componets/Formelement/Input";
import Button from "../../shared/componets/ui elements/Button";
import { useForm } from "../../shared/componets/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import { useState } from "react";
import { AuthContext } from "../../shared/componets/hooks/context/auth-context";

const Authenticate = () => {
  const auth=useContext(AuthContext)

  const [isLoginMode, setisLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          }
        },
        false
      );
    }
    setisLoginMode(prevMode => !prevMode);
  };
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    auth.login();
  };

  return (
    <form
      style={{ width: "30%", textAlign: "center" }}
      className="place-form"
      onSubmit={placeSubmitHandler}
    >
      <h2 style={{ textAlign: "center", padding: "10px" }}>LOGIN REQUIRED</h2>
      <hr></hr>
      {!isLoginMode && (
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
      )}
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid Email."
        onInput={inputHandler}
      />

      <Input
        id="password"
        element="input"
        label="Password"
        validators={[VALIDATOR_MINLENGTH(9)]}
        errorText="Please enter a valid password."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        {isLoginMode ? "LOGIN" : "SIGN UP"}
      </Button>
      <Button onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ?  "SIGN UP":'LOGIN'}
      </Button>
    </form>
  );
};

export default Authenticate;
