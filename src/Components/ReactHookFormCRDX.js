//https://react-hook-form.com/api/usefieldarray
import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";

import "./styles.css";

let renderCount = 0;

function App() {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [{ firstName: "Bill", lastName: "Luo" }]
    }
  });
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "test"
    }
  );

  const onSubmit = (data) => console.log("data", data);

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                defaultValue={`${item.firstName}`} // make sure to set up defaultValue
                {...register(`test.${index}.firstName`)}
              />

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
                defaultValue={item.lastName} // make sure to set up defaultValue
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ firstName: "appendBill", lastName: "appendLuo" });
          }}
        >
          append
        </button>
        <button
          type="button"
          onClick={() =>
            reset({
              test: [{ firstName: "Bill", lastName: "Luo" }]
            })
          }
        >
          reset
        </button>
      </section>

      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
