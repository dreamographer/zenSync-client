'use client'
import React, { useEffect, useState } from "react";
import { User } from "@/Types/userInterface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EmojiPicker } from "../global/Emoji-picker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldValue, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateWorkspaceFormSchema } from "@/Types/Schema";
import { Button } from "../ui/button";
import Loader from "../global/Loader";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import axios from "axios";
import { toast } from "sonner";
import {  useWorkspaceStore } from "@/store/store";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface DashboardSetupProps {
  user: User;
  subscription: {} | null; 
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
  const workspace = useWorkspaceStore(state => state.workspace);
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  const [workspaceData,setWorkspaceData]=useState(null)

  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState("💼");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      title: "",
    },
  });

  useEffect(()=>{
      setWorkspace(workspaceData);
      if (workspace) router.replace(`/dashboard/${workspace[0]?.id}`);
  },[workspaceData])
  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async value => {
  
    try {
      const response = await axios.post(`${BASE_URL}/workspace/`, value, {
        withCredentials: true,
      });
      if (response) {
        
        toast.success("Workspace Created", {
          position: "top-center",
        });

        setWorkspaceData(response.data);
      }
    } catch (error) {
      console.log(error, "Error");
        if (axios.isAxiosError(error) && error.response?.data?.message) {
          toast.error(error.response.data.message, {
            position: "top-left",
          });
          console.log("error in Workspace creation", error.response.data.message);
        } else {
          console.log("An unexpected error occurred:", error);
        }
    } finally {
      reset();
    }
  };
  return (
    <Card
      className=" md:w-2/3
      h-screen
      sm:h-auto
      relative
  "
    >
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex
            items-center
            gap-4"
            >
              <div className="text-5xl  ">
                <EmojiPicker  getValue={emoji => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full ">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm
                  text-muted-foreground
                "
                >
                  Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isLoading}
                  {...register("title", {
                    required: "Workspace name is required",
                  })}
                />
                <small className="text-red-600">
                  {errors?.title?.message?.toString()}
                </small>
              </div>
            </div>
          {/* logo update */}
            <div className="self-end">
              <button
                disabled={isLoading}
                type="submit"
                className="relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {!isLoading ? "Create Workspace" : <Loader />}
                </span>
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
