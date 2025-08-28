import React from "react";

type InputEvt =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

export default function useFormFields<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues] = React.useState<T>(initialValues);
  
    const handleChange = React.useCallback((e: InputEvt) => {
      const target = e.target as HTMLInputElement;
      const { name, type, value } = target;
      const next = type === "checkbox" ? target.checked : value;
  
      setValues((prev) => ({ ...prev, [name]: next }));
    }, []);
  
    const setField = React.useCallback(
      <K extends keyof T>(name: K, val: T[K]) =>
        setValues((prev) => ({ ...prev, [name]: val })),
      []
    );
  
    const reset = React.useCallback(() => setValues(initialValues), [initialValues]);
  
    return { values, handleChange, setField, setValues, reset };
  }