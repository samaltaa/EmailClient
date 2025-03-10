'use client';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {sendEmail} from '@/app/utils/sendmail';

"shadcn components"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


/*
TODO: 
[]define the shape of the form using Zod schema
[X]define the form by using the useForm hook
[]add the styling to <form></form> using shadcn
[]style the input fields for name, email, and message
[]style the submit button to the form
*/

export type FormData ={
    name: string;
    email: string;
    message: string;
};

const Contact: FC = () => {
    const {register, handleSubmit} = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data)
    }

    return(
        <form 
        className='max-w-sm mx-auto box-border '
        onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
                <label
                htmlFor='name'
                className='mb-3 block text-base font-medium text-black'
                >
                    Full Name
                </label>
                <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base 
                               font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('name', {required: true})}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='email'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Email Address
                </label>
                <input
                    type='email'
                    placeholder='example@domain.com'
                    className='w-full rounded-mb border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-pruple-500 focus:shadow-md'
                    {...register('email', {required: true})}
                />
            </div>
            <div className='mb-5'>
                <label
                    htmlFor='message'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Message
                </label>
                <textarea
                    rows={4}
                    placeholder='Type your message'
                    className='w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md'
                    {...register('message', {required: true})}
                >

                </textarea>
            </div>
            <div>
               <Button>
                    Submit
               </Button>
            </div>
        </form>
    );
};

export default Contact