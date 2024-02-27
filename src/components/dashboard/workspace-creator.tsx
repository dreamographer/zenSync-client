"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { User } from "@/Types/userInterface";
import { Lock, Plus, Share } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import CollaboratorSearch from "./collaborator-search";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useUserStore, useWorkspaceStore } from "@/store/store";
import axios from "axios";
import { Workspace } from "@/Types/workspaceType";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
interface WorkspaceCreatorProps{
  close:()=>void
}
const WorkspaceCreator: React.FC<WorkspaceCreatorProps> = ({close}) => {
  const user = useUserStore(state => state.user);
  const router = useRouter();
  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setWorkspace = useWorkspaceStore(state => state.setWorkspace);
  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborator = (user: User) => {
    setCollaborators(collaborators.filter(c => c.id !== user.id));
  };

  const createWorkspace = async (value: Partial<Workspace>) => {
    try {
      const response = await axios.post(`${BASE_URL}/workspace/`, value, {
        withCredentials: true,
      });
      if (response) {
        return response.data;
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
    }
  };

  const addCollaborators = async (
    collaborators: string[],
    workspaceId: string
  ) => {
    try {
      const data = {
        collaborators: collaborators,
      };
      const response = await axios.post(
        `${BASE_URL}/workspace/collaborators/${workspaceId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response) {
        return response.data;
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
    }
  };

  const createItem = async () => {
    setIsLoading(true);
    if (user?.id) {
      const newWorkspace: Partial<Workspace> = {
        title,
        workspaceOwner: user.id,
        workspaceType: permissions,
      };
      if (permissions === "private") {
        const workspace = await createWorkspace(newWorkspace);
        setWorkspace(workspace);
        toast.success("Workspace Created", {
          position: "top-center",
        });
        if (workspace?.id) router.replace(`/dashboard/${workspace?.id}`);
      }
      if (permissions === "shared") {
        const workspace = await createWorkspace(newWorkspace);
        setWorkspace(workspace);
        const ids=collaborators.map(user=>user.id)
        await addCollaborators(ids, workspace.id);
        if (workspace?.id) router.replace(`/dashboard/${workspace?.id}`);

        toast.success("Workspace Created", {
          position: "top-center",
        });
      }
    }
    close()
    setIsLoading(false);
  };

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Name
        </Label>
        <div
          className="flex 
        justify-center 
        items-center 
        gap-2
        "
        >
          <Input
            name="name"
            value={title}
            placeholder="Workspace Name"
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <>
        <Label
          htmlFor="permissions"
          className="text-sm
          text-muted-foreground"
        >
          Permission
        </Label>
        <Select
          onValueChange={val => {
            setPermissions(val);
          }}
          defaultValue={permissions}
        >
          <SelectTrigger className="w-full h-26 -mt-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div
                  className="p-2
                  flex
                  gap-4
                  justify-center
                  items-center
                "
                >
                  <Lock />
                  <article className="text-left flex flex-col">
                    <span>Private</span>
                    <p>
                      Your workspace is private to you. You can choose to share
                      it later.
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="p-2 flex gap-4 justify-center items-center">
                  <Share></Share>
                  <article className="text-left flex flex-col">
                    <span>Shared</span>
                    <span>You can invite collaborators.</span>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
      {permissions === "shared" && (
        <div>
          <CollaboratorSearch
            existingCollaborators={collaborators}
            getCollaborator={user => {
              addCollaborator(user);
            }}
          >
            <Button type="button" className="text-sm mt-4">
              <Plus />
              Add Collaborators
            </Button>
          </CollaboratorSearch>
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">
              Collaborators {collaborators.length || ""}
            </span>
            <ScrollArea
              className="
            h-[120px]
            overflow-y-scroll
            w-full
            rounded-md
            border
            border-muted-foreground/20"
            >
              {collaborators.length ? (
                collaborators.map(c => (
                  <div
                    className="p-4 flex
                      justify-between
                      items-center
                "
                    key={c.id}
                  >
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src={c.profile as string} />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div
                        className="text-sm 
                          gap-2
                          text-muted-foreground
                          overflow-hidden
                          overflow-ellipsis
                          sm:w-[300px]
                          w-[140px]
                        "
                      >
                        {c.email}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => removeCollaborator(c)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <div
                  className="absolute
                  right-0 left-0
                  top-0
                  bottom-0
                  flex
                  justify-center
                  items-center
                "
                >
                  <span className="text-muted-foreground text-sm">
                    You have no collaborators
                  </span>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      )}
      <Button
        type="button"
        disabled={
          !title ||
          (permissions === "shared" && collaborators.length === 0) ||
          isLoading
        }
        variant={"secondary"}
        onClick={createItem}
      >
        Create
      </Button>
    </div>
  );
};

export default WorkspaceCreator;
