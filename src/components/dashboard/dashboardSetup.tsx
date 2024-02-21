import React, { useState } from 'react'
import { User } from '@/app/Types/userInterface'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EmojiPicker } from '../global/Emoji-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FieldValue, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateWorkspaceFormSchema } from '@/app/Types/Schema';
import { Button } from '../ui/button';
import Loader from '../global/Loader';
import { useRouter } from 'next/navigation';
import { v4 } from "uuid";
interface DashboardSetupProps{
    user:User;
    subscription:{}|null; //type of the subscription
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
    const router=useRouter()
    const [selectedEmoji,setSelectedEmoji]=useState('💼')
    
     const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async value => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();
    console.log(file);

    if (file) {

        // upload file logo
    //   try {
    //     const { data, error } = await supabase.storage
    //       .from("workspace-logos")
    //       .upload(`workspaceLogo.${workspaceUUID}`, file, {
    //         cacheControl: "3600",
    //         upsert: true,
    //       });
    //     if (error) throw new Error("");
    //     filePath = data.path;
    //   } catch (error) {
    //     console.log("Error", error);
    //     // Error toast
    //     // toast({
    //     //   variant: "destructive",
    //     //   title: "Error! Could not upload your workspace logo",
    //     // });
    //   }
    }
    try {


// Creation of new workspace

    //   const newWorkspace: workspace = {
    //     data: null,
    //     createdAt: new Date().toISOString(),
    //     iconId: selectedEmoji,
    //     id: workspaceUUID,
    //     inTrash: "",
    //     title: value.workspaceName,
    //     workspaceOwner: user.id,
    //     logo: filePath || null,
    //     bannerUrl: "",
    //   };
    //   const { data, error: createError } = await createWorkspace(newWorkspace);
    //   if (createError) {
    //     throw new Error();
    //   }

      // Add workspace to the State
      // dispatch({
      //   type: "ADD_WORKSPACE",
      //   payload: { ...newWorkspace, folders: [] },
      // });

      // Toaser for workspace creation
      // toast({
      //   title: "Workspace Created",
      //   description: `${newWorkspace.title} has been created successfully.`,
      // });



    //   replace with the id of workspace
    //   router.replace(`/dashboard/${newWorkspace.id}`);  
    } catch (error) {
      console.log(error, "Error");

    //   Error toast
    //   toast({
    //     variant: "destructive",
    //     title: "Could not create your workspace",
    //     description:
    //       "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
    //   });
    } finally {
      reset();
    }
  };
  return (
    <Card
      className=" md:w-2/3
      h-screen
      sm:h-auto
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
              <div className="text-5xl">
                <EmojiPicker getValue={emoji => setSelectedEmoji(emoji)}>
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
                  {...register("workspaceName", {
                    required: "Workspace name is required",
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                htmlFor="logo"
                className="text-sm
                  text-muted-foreground
                "
              >
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Name"
                // disabled={isLoading || subscription?.status !== 'active'}
                {...register("logo", {
                  required: false,
                })}
              />
              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
              {/* {subscription?.status !== "active" && (
                <small
                  className="
                  text-muted-foreground
                  block
              "
                >
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )} */}
            </div>
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

export default DashboardSetup