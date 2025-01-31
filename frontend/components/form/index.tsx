import { usePostData } from '@/hooks/api/use-post-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import Form from './form';
import { fieldsDescription } from './form-inputs';
import { RenderInputField } from './render-input-field';

export type FormSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  'test': z.coerce.number().min(0).max(2000),
});

export const emptyFormValues: FormSchema = {
  'test': 0,
};

const transformDataShape = (values: FormSchema) => {
  return {
    test: values['test'],
  };
};

export const CustomForm = () => {
  const [formDefaultValues, setFormDefaultValues] = useState<FormSchema>(emptyFormValues);
  const formDefaultValuesLength = Object.keys(formDefaultValues).length;

  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const mutation = usePostData('/stock/', 'post-stock');

  const client = useQueryClient();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    // You must add same keys from formSchema in default values in order to render all inputs
    // Some defaultValues will be used as a placeholder
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    const newValues = emptyFormValues;
    setFormDefaultValues(newValues);
  }, [setFormDefaultValues]);

  useEffect(() => {
    form.reset(formDefaultValues);
  }, [formDefaultValues, form]);
  /* -------------------------------------------------------------------------- */
  /*                              submit handlers                               */
  /* -------------------------------------------------------------------------- */

  async function onSubmitNewPreset(values: FormSchema) {
    const stockToPost = transformDataShape(values);
    const response = await mutation.mutateAsync(stockToPost);

    client.invalidateQueries({
      queryKey: [''],
    });

    if (response !== null) {
      form.reset(formDefaultValues);
    }
  }

  return (
    <Card className={cn('min-w-[300px] h-full shadow-none  flex flex-col w-full')}>
      <CardContent className="flex-grow flex justify-center">
        <Form
          classname="grid gap-2 w-full m-2"
          form={form}
          onFinish={onSubmitNewPreset}>
          <div className="flex flex-wrap lg:flex-nowrap w-full justify-between items-center">
            <div className="m-auto lg:m-2">
              {Object.entries(formDefaultValues)
                .slice(0, formDefaultValuesLength / 2)
                .map(([fieldName, value], i) => (
                  <div key={i}>
                    <RenderInputField
                      formControl={form.control}
                      fieldName={fieldName}
                      value={value}
                      // inputDisabled={inputDisabled}
                      description={fieldsDescription[fieldName]}
                    />
                  </div>
                ))}
            </div>
            <div className="m-auto lg:m-2">
              {Object.entries(formDefaultValues)
                // '-1' for the checkbox input
                .slice(formDefaultValuesLength / 2, formDefaultValuesLength)
                .map(([fieldName, value], i) => (
                  <div key={i}>
                    <RenderInputField
                      formControl={form.control}
                      fieldName={fieldName}
                      value={value}
                      // inputDisabled={inputDisabled}
                      description={fieldsDescription[fieldName]}
                    />
                  </div>
                ))}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full lg:w-[177px] m-auto text-sm plus-jakarta-sans-bold h-[40px]">
            {'Create'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
