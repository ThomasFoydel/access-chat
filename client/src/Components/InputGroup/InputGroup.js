import React from 'react';
import { Input } from 'reakit/Input';

const FormInput = ({
  props: {
    value,
    onChange,
    input: { placeholder, id, name, type },
  },
}) => {
  return (
    <>
      <label htmlFor={id}>{name}:</label>
      <Input
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        aria-required='true'
        aria-label={name}
        name={name}
        data-testid='input'
      />
    </>
  );
};

const InputGroup = ({ props: { handleForm, form, inputs } }) => {
  return inputs.map((input) => (
    <FormInput
      key={input.id}
      props={{
        input,
        onChange: handleForm,
        value: form[input.id],
      }}
    />
  ));
};

export default InputGroup;
