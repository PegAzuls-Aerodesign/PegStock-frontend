import React from "react";
import { Breadcrumbs, type Breadcrumb } from "../ui/breadcrumbs";

interface Props {
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<Breadcrumb>;
  children?: React.ReactNode;
  subChildren?: React.ReactNode;
}

export function PrivateLayout({
  title,
  subtitle,
  breadcrumbs = [],
  children,
  subChildren,
}: Props) {
  return (
    <div className="flex size-full flex-col items-center gap-2 pt-[var(--h-header-breadcrumbs)]">
      <BreadcrumbsLayout>
        <Breadcrumbs items={breadcrumbs} />
      </BreadcrumbsLayout>
      <div className="container flex size-full flex-col shadow-2xl">
        <HeaderLayout
          title={title}
          subtitle={subtitle}
          subChildren={subChildren}
        />
        <ContainerLayout>{children}</ContainerLayout>
      </div>
    </div>
  );
}

const BreadcrumbsLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="fixed top-[var(--h-header)] z-25 container flex items-center p-2 px-8 lg:px-16">
      {children}
    </div>
  );
};

const HeaderLayout: React.FC<
  Readonly<{
    title?: string;
    subtitle?: string;
    subChildren?: React.ReactNode;
  }>
> = ({ title, subtitle, subChildren }) => {
  return (
    <div className="flex items-center justify-between gap-2 p-4 px-8 lg:px-16">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      {subChildren}
    </div>
  );
};

const ContainerLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return <div className="container flex size-full flex-col">{children}</div>;
};
