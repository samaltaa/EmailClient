'use client';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {sendEmail} from '@/app/utils/sendmail';

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    )
}