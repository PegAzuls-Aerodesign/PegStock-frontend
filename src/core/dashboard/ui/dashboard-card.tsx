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
    <Card className="w-full bg-white text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="self-center">{icon}</CardContent>
      <CardFooter className="self-center">{footer}</CardFooter>
    </Card>
  );

  if (url) {
    return <Link href={url}>{card}</Link>;
  }

  return card;
};
