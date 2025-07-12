interface Props {
  children: React.ReactNode;
}

export function ContentLayout({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div className="bg-brand-white-50 container py-4 lg:py-8">{children}</div>
    </div>
  );
}
