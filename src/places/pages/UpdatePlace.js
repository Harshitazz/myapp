import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/componets/Formelement/Input";
import Button from "../../shared/componets/ui elements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/Utils/validators";
import { useForm } from "../../shared/componets/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u3",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
  const identifiedplaces = DUMMY_PLACES.find((p) => p.id === placeId);

  const [formState, inputHandler,setFormData] = useForm(
    {
      title:{
        value:'',
        isValid:false
      },
      description:{
        value: '',
        isValid: false
      }
    },false
  );
  console.log(formState.inputs);

  useEffect(() => {
    if(identifiedplaces)
    setFormData(
      {
        title: {
          value: identifiedplaces.title,
          isValid: true
        },
        description: {
          value: identifiedplaces.description,
          isValid: true
        }
      },
      true
    );
    setIsLoading(false);

  }, [setFormData, identifiedplaces]);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  if (!identifiedplaces) {
    return (
      <div className="center">
        <h2>could not find places...</h2>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
 
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValid={formState.inputs.title.isValid}
        initialValue={formState.inputs.title.value}
        
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
