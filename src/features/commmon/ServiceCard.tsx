import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div className={`w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-${linkType}-100`}>
          <Icon className={`w-12 h-12 text-${linkType}-500`} />
        </div>
        <h4 className="text-xl font-semibold mb-2 text-center">{title}</h4>
        <p className="text-sm text-gray-600 text-center mb-2">{description.split('<br/>')[0]}</p>
        <p className="text-sm text-gray-600 text-center mb-4">{description.split('<br/>')[1]}</p>
        <Dialog>
          <DialogTrigger asChild>
            <button className={`text-${linkType}-500 hover:text-${linkType}-600 font-medium text-sm`}>
              En savoir plus
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <DialogDescription asChild>
                  <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: learnMore }} />
                </DialogDescription>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
