import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconProps } from "@/components/utils/iconProps";

// ===============================================================
interface ServiceCard1Props {
  title: string;
  linkType: string;
  description: string;
  learnMore: string;
  cardClassName?: string;
  iconClassName?: string;
  Icon: (props: IconProps) => JSX.Element;
}
// ===============================================================

export default function ServiceCard({
  title,
  Icon,
  linkType,
  description,
  learnMore,
}: ServiceCard1Props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center p-6">
        <div
          className={`bg- mb-4 flex size-20 items-center justify-center rounded-full${linkType}-100`}
        >
          <Icon className={`text- size-12${linkType}-500`} />
        </div>
        <h4 className="mb-2 text-center text-xl font-semibold">{title}</h4>
        <p className="mb-2 text-center text-sm text-gray-600">
          {description.split("<br/>")[0]}
        </p>
        <p className="mb-4 text-center text-sm text-gray-600">
          {description.split("<br/>")[1]}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <button
              className={`text-${linkType}-500 hover:text-${linkType}-600 text-sm font-medium`}
            >
              En savoir plus
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <DialogDescription asChild>
                  <div
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: learnMore }}
                  />
                </DialogDescription>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
