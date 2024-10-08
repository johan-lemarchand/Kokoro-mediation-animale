import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/helper";
import { PropsWithChildren } from "react";
import { UserDropdown } from "../auth/UserDropdown";
import { NavigationWrapper } from "./NavigationWrapper";

export default async function AuthNavigationWrapper(props: PropsWithChildren) {
  const user = await auth();

  if (!user) {
    return <NavigationWrapper>{props.children}</NavigationWrapper>;
  }

  return (
    <NavigationWrapper
      topBarCornerLeftChildren={
        <UserDropdown>
          <Button variant="ghost" className="size-10 rounded-full" size="sm">
            <Avatar className="size-8">
              <AvatarFallback>
                {user.email ? user.email.slice(0, 2) : "??"}
              </AvatarFallback>
              {user.image && <AvatarImage src={user.image} />}
            </Avatar>
          </Button>
        </UserDropdown>
      }
    >
      {props.children}
    </NavigationWrapper>
  );
}
