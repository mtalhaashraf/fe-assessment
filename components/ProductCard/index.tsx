import { Product } from '@/lib/interfaces'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React from 'react'

const ProductCard = (product: Product) => {
    const router = useRouter()

    const handleBuy = () => {
        router.push('/payment')
    }

    return (
        <div className='border border-border rounded-md p-4 col-span-1 flex flex-col h-full'>
            <div className='relative'>
                <Image src={product.thumbnail} width={100} height={100} alt={product.title} className='w-full h-48 rounded-sm object-cover mb-2' />
                {product.discountPercentage && (
                    <div className='w-10 h-10 absolute right-2 top-2 rounded-full bg-green-600 flex justify-center items-center'>
                        <p className='text-white font-bold text-sm'>{Number.parseInt(product.discountPercentage.toString())}%</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1 h-full justify-between">
                <div className="flex flex-col gap-2">

                    <h2 className='text-primary text-xl font-semibold line-clamp-1'>{product.title}</h2>
                    <div className="flex flex-col gap-0.5">
                    {product.discountPercentage ? (
                        <p className='flex items-end justify-start gap-2'>
                            <span className='font-bold text-2xl text-blue-500 no-underline'>${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className='line-through text-base font-semibold text-gray-600 decoration-2 decoration-gray-600'>${product.price}</span>
                        </p>
                    ) : (

                        <p className='font-bold text-2xl text-blue-500'>${product.price}</p>
                    )}
                    <small className='text-xs font-medium'>{product.stock} items left</small>

                    </div>
                    <p className='text-primary line-clamp-3'>{product.description}</p>
                </div>
                <div className='flex items-end justify-between'>
                    <small className='font-semibold uppercase text-blue-600'>{product.category}</small>
                    <button className='justify-self-end w-max p-2 px-4 border border-border rounded-md hover:bg-accent' onClick={handleBuy}>Buy Now</button>
                </div>
            </div>

        </div >
    )
}

export default ProductCard