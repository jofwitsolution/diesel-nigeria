"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlaceOrderSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./FormError";
import { Textarea } from "../ui/textarea";

interface Props {
  buyerData: {
    businessName: string;
    phoneNumber: string;
    email: string;
    branches: {
      id: string;
      state: string;
      address: string;
    }[];
  };
  sellerData: {
    businessName: string;
    products: {
      density: string;
      price: string;
      numberInStock: string;
      id: string;
      isAvailable: string;
    }[];
  };
}

const PlaceOrderForm = ({ buyerData, sellerData }: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PlaceOrderSchema>>({
    resolver: zodResolver(PlaceOrderSchema),
    defaultValues: {
      businessName: buyerData.businessName,
      email: buyerData.email,
      phoneNumber: buyerData.phoneNumber,
      deliveryLocation: "",
      branch: "",
      density: "",
      quantity: "",
      deliveryDate: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PlaceOrderSchema>) => {
    setError("");

    console.log(values);

    // startTransition(() => {
    //   sellerUpdateBusinessInfo(values, imageData, pathname).then((data) => {
    //     setError(data.error);

    //     if (data.success) {
    //       toast.success("Changes saved successfuly");
    //     }
    //   });
    // });
  };

  return <div></div>;
};

export default PlaceOrderForm;
