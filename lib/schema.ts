import { z } from "zod";

export const PaymentSchema = z.object({
  card_num: z.string()
  .max(19, { message: 'Invalid card number' })
  .min(16, {message: 'Invalid card number'})
  .refine((value) => /^\d{4}\s\d{4}\s\d{4}\s\d{3,4}$/.test(value), {
    message: "Invalid card number",
    path: ["cardNumber"],
  }),
  expiryDate: z
    .string()
    .refine((value) => /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value), {
      message: "Invalid expiry date",
      path: ["cardNumber"],
    }),
  cvv: z.string()
  .min(3, {message: 'Invalid CVV'})
  .max(4, {message: 'Invalid CVV'})
  .refine((value) => /^[0-9]{3,4}$/.test(value), {
    message: "Invalid CVV",
    path: ["cvv"],
  }),
});
