import { Control } from "react-hook-form";

import { FormSchema } from "@/components/form";
import { RenderInputField } from "@/components/form/render-input-field";

interface PresetForm {
  formDefaultValues: FormSchema;
  inputDisabled?: boolean;
  formControl: Control<FormSchema>;
}

interface fieldsDescription {
  [key: string]: string;
}
export const fieldsDescription: fieldsDescription = {
  test: "test",
};

export const PresetForm = ({
  formDefaultValues,
  formControl,
  inputDisabled,
}: PresetForm) => {
  const formDefaultValuesLength = Object.keys(formDefaultValues).length;

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full justify-between items-center">
      <div className="m-auto lg:m-2">
        {Object.entries(formDefaultValues)
          .slice(0, formDefaultValuesLength / 2)
          .map(([fieldName, value], i) => (
            <div key={i}>
              <RenderInputField
                formControl={formControl}
                fieldName={fieldName}
                value={value}
                inputDisabled={inputDisabled}
                description={fieldsDescription[fieldName]}
              />
            </div>
          ))}
      </div>
      <div className="m-auto lg:m-2">
        {Object.entries(formDefaultValues)
          // '-1' for the checkbox input
          .slice(formDefaultValuesLength / 2, formDefaultValuesLength - 1)
          .map(([fieldName, value], i) => (
            <div key={i}>
              <RenderInputField
                formControl={formControl}
                fieldName={fieldName}
                value={value}
                inputDisabled={inputDisabled}
                description={fieldsDescription[fieldName]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
