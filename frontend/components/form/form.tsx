import React, {
    cloneElement,
    createContext,
    ReactElement,
    ReactNode,
    useContext,
  } from "react";
  import { FieldValues, UseFormReturn } from "react-hook-form";
  
  import { cn } from "@/lib/utils";
  
  import {
    Form as CnForm,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  
  const FormContext = createContext<UseFormReturn<any> | undefined>(undefined);
  
  interface FormProps<T extends FieldValues> {
    children: React.ReactNode;
    form: UseFormReturn<T>;
    onFinish: (data: T) => void;
    classname?: string;
  }
  
  function Form<T extends FieldValues>({
    children,
    form,
    classname,
    onFinish,
  }: FormProps<T>) {
    return (
      <FormContext.Provider value={form}>
        <CnForm {...form}>
          <form className={cn(classname)} onSubmit={form.handleSubmit(onFinish)}>
            {children}
          </form>
        </CnForm>
      </FormContext.Provider>
    );
  }
  
  interface ItemProps {
    name?: string;
    label?: string;
    description?: string;
    itemClassname?: string;
    horizantal?: boolean;
    children: ReactNode;
  }
  
  function Item({
    name,
    label,
    description,
    children,
    itemClassname,
    horizantal,
  }: ItemProps) {
    let childProps: ReactElement["props"] | undefined;
    if (!React.isValidElement(children)) {
      console.error("Invalid Element");
    } else {
      childProps = { ...children.props };
    }
  
    const form = useContext(FormContext) as UseFormReturn<FieldValues>;
    if (!form) {
      throw new Error("Item must be used within a Form");
    }
  
    return (
      <FormField
        control={form?.control}
        name={name ?? ""}
        render={({ field }) => (
          <FormItem className={cn(itemClassname)}>
            <div
              className={cn(
                "flex justify-between w-full",
                !horizantal && "flex-col",
              )}
            >
              {label && (
                <FormLabel className="mb-3 me-3 text-xs" htmlFor={label}>
                  {label}
                </FormLabel>
              )}
              <div className="flex flex-col items-end justify-center">
                <FormControl>
                  {cloneElement(children as ReactElement, {
                    ...childProps,
                    ...field,
                  })}
                </FormControl>
                <FormMessage className="mt-2" />
                {description && (
                  <FormDescription className="text-[10px]">
                    {description}
                  </FormDescription>
                )}
              </div>
            </div>
          </FormItem>
        )}
      />
    );
  }
  
  Form.Item = Item;
  
  export default Form;
  