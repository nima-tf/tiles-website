"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, Divide } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import OpenAI from "openai";
import axios from "axios";
import * as z from "zod";
import React from "react";
import ReactMarkdown from "react-markdown";

import Header from "@/components/header";
import { Loader } from "@/components/loader";
import { formSchema } from "../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const markdown = `Just a link: https://reactjs.com.`;

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<
    OpenAI.Chat.CreateChatCompletionRequestMessage[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Header
        title="Code Generation"
        description="Generate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        iconBg="bg-green-700/10"
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
                        placeholder="What are you trying to code?"
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
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation yet!" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10 flex-row-reverse"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    className="text-sm overflow-hidden leading-7"
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.content || ""}
                  </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
