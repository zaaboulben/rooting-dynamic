"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormSchema, dynamicformz } from "../../../typeZod/zform";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function DynamicForm() {
    const router = useRouter();

    const { register, handleSubmit, control, setError, formState: { errors } } = useForm<FormSchema>({
        resolver: zodResolver(dynamicformz),
        defaultValues: {
            dynamicField: [`value`]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        // @ts-ignore 
        name: "dynamicField" as keyof FormSchema
    });

    const onSubmit = (data: FormSchema) => {
        const arrayLink: string[] = [""];
        let link: string;
        const dynamicFields = data.dynamicField.map((value: string) => {
            arrayLink.push(`${value}`);
        });

        link = `${arrayLink.join("/")}`;

        console.log("onsubmit" + link);

        router.push(link);
        return `${link}`;
    };

    return (<>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col  items-center flex-wrap   place-content-evenly	 content-around h-96 w-5/6  "
            >
                {fields.map((field, index: number) => (
                    <div className="flex  items-center content-around  w-5/5   " key={field.id}>
                        <input
                            className="text-black rounded-2xl h-8  text-center static  "
                            key={field.id}
                            {...register(`dynamicField.${index}`, {
                                required: "field cannot be empty"
                            })}
                        />
                        {errors.dynamicField && errors.dynamicField[index] && (
                            // @ts-ignore 
                            <span className="text-red-700 p-3 ">{errors.dynamicField[index].message}</span>
                        )}
                    </div>
                ))}
                
                <button
                    type="button"
                    className="   bg-white rounded-2xl shadow-md  shadow-grey-600 
                    text-gray-700  h-7 p-2 text-center flex items-center justify-center pointer-events-auto  "
                    onClick={() => {
                        append("" + fields.length);
                        console.log(fields.length);
                    }}
                >
                    Ajouter un champ
                </button>

                <button
                    className="   bg-white rounded-2xl shadow-md  shadow-grey-600 mt-10 flex items-center justify-center
                  text-gray-700  h-7 w-72 p-2 text-center "
                    type="submit"
                >
                    Envoyer
                </button>
            </form>
        
        </>   );
}

// export const sendsingleton = (data: FormSchema) => {
//     const arrayLink: string[] = [""];
//     let link: string;
//     const dynamicFields = data.dynamicField.map((value: string) => {
//         link = `/api${value}`;
//         arrayLink.push(link);
//         console.log("send singleton" + link);
//     });
//     return arrayLink;
// };
