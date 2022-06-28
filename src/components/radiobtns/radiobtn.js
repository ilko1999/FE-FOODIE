import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  id={option.value}
                  {...field}
                  name="typeOfResturant"
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                />
                <label
                  htmlFor={option.value}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {option.key}
                </label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default RadioButton;
