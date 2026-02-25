import { FolderOpen, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConvertButtonProps {
  fileCount: number;
  isConverting: boolean;
  conversionDone: boolean;
  onConvert: () => void;
  onClear: () => void;
  onOpenFolder: () => void;
  onReset: () => void;
}

export default function ConvertButton({
  fileCount,
  isConverting,
  conversionDone,
  onConvert,
  onClear,
  onOpenFolder,
  onReset,
}: ConvertButtonProps) {
  if (conversionDone) {
    return (
      <div className="flex flex-col gap-1.5">
        <Button
          onClick={onOpenFolder}
          className="w-full bg-green-600/90 hover:bg-green-600 text-white"
          size="default"
        >
          <FolderOpen className="size-3.5" />
          Open output folder
        </Button>
        <div className="flex gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            className="flex-1"
          >
            <RotateCcw className="size-3" />
            Convert again
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground/50 hover:text-red-400"
          >
            <Trash2 className="size-3" />
            Clear
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={onConvert}
        disabled={fileCount === 0 || isConverting}
        className="flex-1"
        size="default"
      >
        {isConverting ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Converting...
          </>
        ) : (
          `Convert ${fileCount} file${fileCount !== 1 ? "s" : ""}`
        )}
      </Button>
      {fileCount > 0 && !isConverting && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="text-muted-foreground/40 hover:text-red-400"
        >
          <Trash2 className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
