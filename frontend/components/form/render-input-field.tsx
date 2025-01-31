import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Minus } from "lucide-react";
import { Control } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Form from "@/components/form/form";

import { FormSchema } from "@/components/form";

export interface RenderCheckboxFieldProps {
  fieldName: string;
  inputDisabled?: boolean;
  formControl: Control<FormSchema>;
  description?: string;
  checkbox?: boolean;
}

export const RenderCheckboxField = ({
  formControl,
  fieldName,
  inputDisabled,
  description,
  checkbox,
}: RenderCheckboxFieldProps) => {
  return (
    <Form.Item
      itemClassname={cn((!description && "my-2 lg:my-4") || "my-2")}
      name={fieldName}
      label={(!checkbox && fieldName) || ""}
      description={description}
      horizantal={undefined}
    >
      <FormField
        control={formControl}
        name={fieldName as keyof FormSchema}
        render={({ field }) => (
          <FormControl>
            <div className="flex items-center gap-2">
              <Checkbox
                id="default"
                className={cn(
                  "h-[20px] w-[20px] border shadow-sm bg-muted-foreground flex items-center justify-center rounded-[4px] bg-custom-white-100",
                  Boolean(field.value) && "bg-custom-green-300",
                )}
                checked={Boolean(field.value)}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                disabled={inputDisabled}
              >
                <CheckboxIndicator>
                  <Minus className="text-custom-white-300" />
                </CheckboxIndicator>
              </Checkbox>
              <label
                htmlFor="default"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set as default
              </label>
            </div>
          </FormControl>
        )}
      />
    </Form.Item>
  );
};

export interface RenderInputFieldProps {
  fieldName: string;
  inputDisabled?: boolean;
  value: string | number | boolean;
  formControl: Control<FormSchema>;
  description?: string;
  checkbox?: boolean;
}

export const RenderInputField = ({
  formControl,
  fieldName,
  value,
  inputDisabled,
  description,
  checkbox,
}: RenderInputFieldProps) => {
  return (
    <Form.Item
      itemClassname={cn((!description && "my-2 lg:my-4") || "my-2")}
      name={fieldName}
      label={(!checkbox && fieldName) || ""}
      description={description}
      horizantal={undefined}
    >
      <FormField
        control={formControl}
        name={fieldName as keyof FormSchema}
        render={({ field }) => (
          <Input
            {...field}
            id={fieldName}
            type={getInputType(value)}
            placeholder={`Enter ${fieldName}`}
            className="lg:w-[300px] h-[38px] justify-self-end shadow-none  border-custom-blue-100 border-[1/2px] bg-custom-white-600"
            step={typeof value === "number" ? "0.1" : undefined}
            value={
              field.value as string | number | readonly string[] | undefined
            }
            disabled={inputDisabled && true}
          />
        )}
      />
    </Form.Item>
  );
};

function getInputType(value: any): string {
  switch (typeof value) {
    case "string":
      return "text";
    case "number":
      return "number";
    case "boolean":
      return "checkbox";
    default:
      return "text";
  }
}
