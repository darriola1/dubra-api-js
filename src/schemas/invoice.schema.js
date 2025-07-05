import { z } from 'zod'

export const createInvoiceSchema = z.object({
  number: z
    .string()
    .min(1, 'El número de la factura es obligatorio'),
      
  fileBase64: z
    .string()
    .min(1, 'El archivo de la factura es obligatorio')
    .regex(/^data:application\/pdf;base64,/, 'El archivo debe estar en formato PDF'),
  
  customerId: z
    .number()
    .min(1, 'El cliente es obligatorio')
})

export const updateInvoiceSchema = createInvoiceSchema.partial()
