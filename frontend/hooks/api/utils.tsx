import { AxiosError } from 'axios';
import { CircleCheck } from 'lucide-react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { cn } from '@/lib/utils';

type ErrorResponse422 = {
  detail: [
    {
      loc: [string];
      msg: string;
      type: string;
    },
  ];
};

type OtherErrorResponse = {
  detail: string;
};

export const logError = (e: AxiosError | unknown, toast: (options: any) => void) => {
  if (!(e instanceof AxiosError)) {
    console.error('e', e);
    return;
  }
  const response = e.response;
  const status = response?.status;
  const titleWithIcon = (errorMessage: string) => (
    <div className="flex items-center gap-x-2 text-[#73021D]">
      <span className="">{errorMessage}</span>
    </div>
  );

  const DescriptionWithPadded = (errorMessage: string) => (
    <div className="ms-4">{errorMessage}</div>
  );

  const toastClassname =
    'top-1 right-1 lg:top-4 lg:right-4 flex fixed md:max-w-[420px] plus-jakarta-sans-semibold bg-destructive border-none';

  if (status === undefined || response === undefined) {
    console.error('status || response ==> not given');
    toast({
      description: titleWithIcon('something went wrong'),
    });
    return;
  }

  if (status === 422) {
    const detail: ErrorResponse422 = response?.data?.detail;

    if (!Array.isArray(detail)) {
      toast({
        className: toastClassname,
        title: titleWithIcon('something went wrong'),
        style: { backgroundColor: '#F7D6D4', color: '#D63124' },
      });
      return;
    }

    detail.forEach((obj) => {
      if (Array.isArray(obj?.loc)) {
        obj?.loc?.forEach((title: string) => {
          if (title !== 'body') {
            toast({
              title: titleWithIcon(title.replace('_', ' ')),
              description: DescriptionWithPadded(obj.msg),
              className: toastClassname,
              style: { backgroundColor: '#F7D6D4', color: '#D63124' },
            });
          }
        });
      }
    });
  } else if (status === 400 || status === 404) {
    const detail: OtherErrorResponse = response?.data?.detail;

    toast({
      className: toastClassname,
      title: typeof detail === 'string' ? detail : 'something went wrong',
      style: { backgroundColor: '#F7D6D4', color: '#D63124' },
    });
  } else {
    toast({
      className: toastClassname,
      title: 'something went wrong',
      style: { backgroundColor: '#F7D6D4', color: '#D63124' },
    });
  }

  // error.map((err) => {
  //   console.error(err)
  //   // toast({
  //   //   className: cn(
  //   //     'top-4 right-4 flex fixed md:max-w-[420px] md:top-4 md:right-4 plus-jakarta-sans-semibold',
  //   //   ),
  //   //   title: title,
  //   //   description: (
  //   //     <div className="flex items-center gap-x-2">
  //   //       <Ban /> {err}
  //   //     </div>
  //   //   ),
  //   //   style: { backgroundColor: '#F7D6D4', color: '#D63124' },
  //   // });
};

export const logSuccess = (message: string, toast: (options: any) => void) => {
  toast({
    className: cn(
      'top-4 right-4 flex fixed md:max-w-[420px] md:top-4 md:right-4 plus-jakarta-sans-semibold',
    ),
    description: (
      <div className="flex items-center gap-x-2">
        <CircleCheck /> {message}
      </div>
    ),
    style: { backgroundColor: '#D8FFD3', color: '#44AC34' },
  });
};
