export function SectionSkeleton() {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-background/50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading section...
        </div>
      </div>
    </div>
  );
}