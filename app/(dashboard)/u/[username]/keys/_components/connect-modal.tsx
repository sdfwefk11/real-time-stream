"use client";
import { Button } from "@/components/ui/button";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition, useRef, ElementRef } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT); // 0: string;
const WHIP = String(IngressInput.WHIP_INPUT); // 1: string;

type IngressType = typeof RTMP | typeof WHIP;

export function ConnectModal() {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType)) //다시 Int형태로 변환
        .then(() => {
          toast.success("Ingress created");
          closeRef?.current?.click(); //URL과 Key가 설정된후 자동으로 창이 닫히게 하기위해 Cancel 버튼에 ref를 걸어주었다.
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          {/* Select 태그가 SelectItem 태그의 선택된 현재 value값을 가지고있음 */}
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} variant="primary">
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
