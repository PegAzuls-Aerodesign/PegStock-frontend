interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({ children, className }: Props) {
  return (
    <div className={`flex flex-1 flex-col items-center gap-2`}>
      <div className={`bg-brand-white-50 container py-4 lg:py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
