"use client";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { User } from "@/Types/userInterface";
import { Workspace } from "@/Types/workspaceType";
import { useParams, useRouter } from "next/navigation";
import {
  Briefcase,
  CreditCard,
  ExternalLink,
  Lock,
  LogOut,
  Plus,
  Share,
  User as UserIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CollaboratorSearch from "../dashboard/collaborator-search";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";
import LogoutButton from "../global/Logout";
import { useUserStore, useWorkspaceStore } from "@/store/store";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const SettingsForm = () => {
  const user=useUserStore(state=>state.user)
  const setUser=useUserStore(state=>state.setUser)
  const workspaces=useWorkspaceStore(state=>state.workspace)
  const updateWs=useWorkspaceStore(state=>state.updateWS)
  const router = useRouter();
  const params = useParams();
  let workspaceId = params?.workspaceId as string;
  const [permissions, setPermissions] = useState("private");
  const [collaborators, setCollaborators] = useState<User[] | []>([]);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [workspaceDetails, setWorkspaceDetails] = useState<Workspace>();
  const titleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const addCollaborator = (user: User) => {
    setCollaborators([...collaborators, user]);
  };


  // api calll
  const addCollaborators = async (
    collaborators: string[],
    workspaceId: string
  ) => {
    try {
      if(collaborators.length<1) return
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
        console.log("Add collab req", response.data.data);
          updateWs(response.data.data);
            console.log("All WS",workspaces);
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




  


  // api call
  const removeCollaborators=async (userId:string[],workspaceId:string)=>{
    
      const response = await axios.delete(
        `${BASE_URL}/workspace/${workspaceId}/removecollaborators`,
        {
          data:{ userIds: userId },
          withCredentials: true,
        }
      );
      if (response) {
        console.log("Add collab req", response.data.data);
        updateWs(response.data.data);
        console.log("All WS", workspaces);
        return response.data;
      }

  }

  

    const removeCollaborator =  (user: User) => {
      console.log("The User", user);
      const userId=user.id
      console.log("req at col", userId);
      if (!workspaceId) return;
      if (collaborators.length === 1) {
        setPermissions("private");
      }
      
       removeCollaborators([userId], workspaceId);
      
      setCollaborators(
        collaborators.filter(collaborator => collaborator.id !== userId)
      );
      router.refresh();
    };

    useEffect(()=>{
      const ids = collaborators.map(user => user.id);
      async function updateCollaborator() {
        const res = await addCollaborators(ids, workspaceId);
      }
      updateCollaborator();

    },[collaborators])
 
  // api call

  const userNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.id || !e.target.value) return;
    const data = { fullname: e.target.value };
    console.log(data);
    
    async function updateName() {
      const response = await axios.put(
        `${BASE_URL}/auth/${user?.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response) {
        console.log("Update Name REq", response.data);
        setUser(response.data)
        return response.data;
      }
    }

    if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    titleTimerRef.current = setTimeout(async () => {
      await updateName();
    }, 500);
  };

  //on change
  const workspaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!workspaceId || !e.target.value) return;
    const data={ title: e.target.value }
    async function updateName(){

      const response = await axios.put(
        `${BASE_URL}/workspace/${workspaceId}`,data,
        {
          withCredentials: true,
        }
        );
        if (response) {
          console.log("Update Name REq", response.data.data);
          updateWs(response.data);
        return response.data;
      }
    }
    
    if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    titleTimerRef.current = setTimeout(async () => {
      await updateName()
    }, 500);
  };


  const onClickAlertConfirm = async () => {
    if (!workspaceId) return;
    if (collaborators.length > 0) {
      const ids=collaborators.map(ele=>ele.id)
      await removeCollaborators(ids, workspaceId);
    }
    setPermissions("private");
    setOpenAlertMessage(false);
  };

  const onPermissionsChange = (val: string) => {
    if (val === "private") {
      setOpenAlertMessage(true);
    } else setPermissions(val);
  };


  useEffect(() => {
    const showingWorkspace = workspaces.find(
      workspace => workspace.id === workspaceId
    );
    if (showingWorkspace) setWorkspaceDetails(showingWorkspace);
  }, [workspaceId,workspaces]);



  // api call
  const getCollaborators = async (workspaceId: string) => {
    const response = await axios.get(
      `${BASE_URL}/workspace/collaborators/${workspaceId}`,
      {
        withCredentials: true,
      }
    );
    if (response) {
      return response.data;
    }
  };
  useEffect(() => {
    if (!workspaceId) return;
    const fetchCollaborators = async () => {
      const response = await getCollaborators(workspaceId);
      console.log("The resp Collab",response);
      
      if (response.length) {
        setPermissions("shared");
        setCollaborators(response);
      }
    };
    fetchCollaborators();
  }, [workspaceId]);

  return (
    <div className="flex gap-4 flex-col">
      <p className="flex items-center gap-2 mt-6">
        <Briefcase size={20} />
        Workspace
      </p>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="workspaceName"
          className="text-sm text-muted-foreground"
        >
          Name
        </Label>
        <Input
          name="workspaceName"
          defaultValue={workspaceDetails ? workspaceDetails.title : ""}
          placeholder="Workspace Name"
          onChange={workspaceNameChange}
        />
      </div>
      <>
        <Label htmlFor="permissions">Permissions</Label>
        <Select onValueChange={onPermissionsChange} value={permissions}>
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

        {permissions === "shared" && (
          <div>
            <CollaboratorSearch
              existingCollaborators={collaborators}
              getCollaborator={(user: User) => {
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
        {/* <Alert variant={"destructive"}>
          <AlertDescription>
            Warning! deleting you workspace will permanantly delete all data
            related to this workspace.
          </AlertDescription>
          <Button
            type="submit"
            size={"sm"}
            variant={"destructive"}
            className="mt-4 
            text-sm
            bg-destructive/40 
            border-2 
            border-destructive"
            onClick={async () => {
              if (!workspaceId) return;
              await deleteWorkspace(workspaceId);
            
              router.replace("/dashboard");
            }}
          >
            Delete Workspace
          </Button>
        </Alert> */}
        <p className="flex items-center gap-2 mt-6">
          <UserIcon size={20} /> Profile
        </p>
        <Separator />
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={user?.profile as string} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-6">
            <Label htmlFor="fullname" className="pb-2">prefered Name</Label>
            <Input
              type="text"
              name="fullname"
              defaultValue={user ? user.fullname : ""}
              onChange={userNameChange}
            />
            <small className="text-muted-foreground cursor-not-allowed">
              {user ? user.email : ""}
            </small>
          </div>
        </div>
        <div className="flex items-center">
          <LogoutButton />
        </div>
      </>
      <AlertDialog open={openAlertMessage}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDescription>
              Changing a Shared workspace to a Private workspace will remove all
              collaborators permanantly.
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlertMessage(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onClickAlertConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingsForm;
