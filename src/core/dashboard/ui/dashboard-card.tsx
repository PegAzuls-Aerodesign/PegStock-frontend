import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  footer: string;
  url?: string;
  icon?: React.ReactNode;
}

export const DashboardCard: React.FC<Props> = ({
  title,
  description,
  footer,
  url,
  icon,
}) => {
  const card = (
    <Card className="h-full w-full bg-white text-center">
      <CardHeader>
        <CardTitle className="text-brand-blue-600 text-lg font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="self-center">{icon}</CardContent>
      <CardFooter className="self-center text-xs text-slate-700">
        {footer}
      </CardFooter>
    </Card>
  );

  if (url) {
    return (
      <Link href={url} className="transition-opacity hover:invert-2">
        {card}
      </Link>
    );
  }

  return card;
};
