import {z} from 'zod';

export const dynamicformz = z.object({

        dynamicField:z.array(z.string().nonempty({message:"Can't be empty "}).regex(/^[a-zA-Z\s]*$/, "Seules les lettres sont autorisées")),

});


export type FormSchema = z.infer<typeof dynamicformz>;

// Path: typeZod/zform.ts
