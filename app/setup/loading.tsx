import Logo from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
export default function loading() {
  return <div className="flex flex-col items-center justify-center h-screen w-full">
    <Logo  iconSize={50} fontSize="text-3xl"/>
    <Separator className="w-1/2 my-4" />
    <div className="flex items-center gap-2 justify-center">
      <Loader2Icon size={16} className="animate-spin stroke-primary"/>
      <p className="text-muted-foreground">Setting up your account</p>
    
    </div>
  </div>
}