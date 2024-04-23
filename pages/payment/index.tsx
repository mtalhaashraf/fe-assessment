import { PaymentSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import valid from 'card-validator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Payment = () => {
    const [cardName, setCardName] = useState('')
    const { register, handleSubmit, formState: { errors }, setValue, setError, clearErrors } = useForm<z.infer<typeof PaymentSchema>>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            card_num: '',
            expiryDate: '',
            cvv: ''
        }
    })
    function formatCardNumber(value: string) {
        const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        return formattedValue;
    }

    function formatExpiryDate(value: string) {
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = cleanedValue;

        if (cleanedValue.length > 2) {
            formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
        }

        return formattedValue;
    }
    const handleCardNumberChange = (e: any) => {
        const formattedValue = formatCardNumber(e.target.value);
        const numberValidation = valid.number(formattedValue)
        if (numberValidation.card) {
            setCardName(numberValidation.card.type)
        } else {
            setCardName('')
        }
        clearErrors()
        setValue('card_num', formattedValue);
    };

    const handleExpiryDateChange = (e: any) => {
        const formattedValue = formatExpiryDate(e.target.value);
        clearErrors()
        setValue('expiryDate', formattedValue);
    };

    const handleCvvChange = (e: any) => {
        clearErrors()
    }

    const onSubmit = handleSubmit((data: any) => {
        if (!valid.number(data.card_num).isValid) {
            setError('card_num', { type: 'custom', 'message': "Invalid card number" })
            return
        }
        if (!valid.expirationDate(data.expiryDate).isValid) {
            setError('expiryDate', { type: 'custom', 'message': "Invalid expiry date" })
            return
        }
        if (!valid.cvv(data.cvv).isValid) {
            setError('cvv', { type: 'custom', 'message': "Invalid CVV" })
            return
        }

        console.log({ ...data, cardType: valid.number(data.card_num).card?.type })
    }
    )
    return (
        <div className='flex min-h-screen flex-col items-center justify-center p-24 gap-8 bg-background'>
            <h1 className='text-3xl font-bold text-primary'>Payment Details</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <div className="fieldset relative">
                        <label htmlFor="card_num" >Card Number</label>
                        <input type='text' id='card_num' {...register('card_num')} className={`w-full ${errors.card_num && 'border-red-500'}`} placeholder="1234 5678 9012 3456" onChange={handleCardNumberChange} />
                        <p className='uppercase absolute right-3 top-1/2 -translate-y-1/2 font-bold'>{cardName}</p>

                    </div>
                    {errors.card_num && <p className='text-xs text-red-600'>{errors.card_num.message}</p>}
                </fieldset>

                <div className='flex items-center gap-4'>
                    <fieldset className='flex-1'>
                        <div className="fieldset">
                            <label htmlFor="expiry-date">Expiry date</label>
                            <input {...register("expiryDate")} placeholder='MM/YY' onChange={handleExpiryDateChange} className={`${errors.expiryDate && 'border-red-500'}`} />
                        </div>
                        {errors.expiryDate && (<p className='text-xs text-red-600'>{errors.expiryDate.message}</p>)}

                    </fieldset>
                    <fieldset className='w-max'>
                        <div className="fieldset">
                            <label htmlFor="cvv">CVV</label>
                            <input {...register("cvv")} autoComplete='off' onChange={handleCvvChange} className={`${errors.cvv && 'border-red-500'}`} />
                        </div>
                        {errors.cvv && <p className='text-xs text-red-600'>{errors.cvv.message}</p>}

                    </fieldset>

                </div>
                <input type="submit" value="Purchase" className='cursor-pointer p-2 px-3 border border-border rounded-sm font-semibold hover:bg-accent' />
            </form>
        </div>
    )
}

export default Payment