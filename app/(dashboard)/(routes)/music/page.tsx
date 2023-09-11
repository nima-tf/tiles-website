"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import OpenAI from "openai";
import axios from "axios";
import * as z from "zod";

import Header from "@/components/header";
import { Loader } from "@/components/loader";
import { formSchema } from "../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      setMusic(response.data.audio);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Header
        title="Music Generation"
        description="Turn your prompt into a music"
        icon={MusicIcon}
        iconColor="text-orange-500"
        iconBg="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outlie-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="What do you want to hear?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 2-full"
                disabled={isLoading}
                type="submit"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <Empty label="No music yet!" />
          )}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
