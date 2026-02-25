import { useConversion } from "@/hooks/useConversion";
import DropZone from "@/components/DropZone";
import FileList from "@/components/FileList";
import FormatPicker from "@/components/FormatPicker";
import QualitySlider from "@/components/QualitySlider";
import OutputFolderPicker from "@/components/OutputFolderPicker";
import ProgressBar from "@/components/ProgressBar";
import ConvertButton from "@/components/ConvertButton";
import logo from "@/assets/logo.png";

function App() {
  const {
    files,
    outputFormats,
    quality,
    outputFolder,
    deleteOriginals,
    isConverting,
    conversionDone,
    globalProgress,
    presentCategories,
    categoryFormats,
    hasLossyFormat,
    convertSingleFile,
    addFiles,
    addFolder,
    removeFile,
    clearFiles,
    setFormat,
    setQuality,
    setOutputFolder,
    setDeleteOriginals,
    startConversion,
    openFile,
    openFileFolder,
    openOutputFolder,
    resetConversion,
  } = useConversion();

  const hasFiles = files.length > 0;

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <header
        className="px-5 py-3 flex items-center gap-3 border-b border-border/40"
        data-tauri-drag-region
      >
        <img
          src={logo}
          alt="SuperConvert"
          className="h-7 w-7 opacity-80 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
          draggable={false}
        />
        <div className="flex items-baseline gap-1.5" data-tauri-drag-region>
          <h1
            className="text-sm font-semibold tracking-wide text-foreground/90"
            data-tauri-drag-region
          >
            SuperConvert
          </h1>
          <span
            className="text-[9px] tracking-wider text-muted-foreground/40 font-medium"
            data-tauri-drag-region
          >
            by dimzou
          </span>
        </div>
      </header>

      <main className="flex-1 px-5 pb-5 flex gap-5 overflow-hidden min-h-0">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <DropZone
            onFilesAdded={addFiles}
            onFolderAdded={addFolder}
            hasFiles={hasFiles}
            disabled={isConverting}
            presentCategories={presentCategories}
          />
          <FileList
            files={files}
            outputFormats={outputFormats}
            onRemove={removeFile}
            onOpenFile={openFile}
            onOpenFolder={openFileFolder}
            onConvertSingle={convertSingleFile}
            disabled={isConverting}
          />
        </div>

        <div className="w-[280px] flex-shrink-0 flex flex-col gap-3">
          {hasFiles && (
            <div className="rounded-xl bg-card/60 border border-border/50 p-4 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Output format
              </h3>
              {presentCategories.map((cat) => (
                <FormatPicker
                  key={cat}
                  category={cat}
                  showLabel={presentCategories.length > 1}
                  formats={categoryFormats[cat] ?? []}
                  selected={outputFormats[cat] ?? ""}
                  onChange={(fmt) => setFormat(cat, fmt)}
                  disabled={isConverting || conversionDone}
                />
              ))}
              {hasLossyFormat && (
                <QualitySlider
                  quality={quality}
                  onChange={setQuality}
                  disabled={isConverting || conversionDone}
                />
              )}
            </div>
          )}

          <div className="rounded-xl bg-card/60 border border-border/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
              Output folder
            </h3>
            <OutputFolderPicker
              folder={outputFolder}
              onChange={setOutputFolder}
              disabled={isConverting || conversionDone}
            />
          </div>

          <label className="flex items-center gap-2.5 px-2 py-1 cursor-pointer select-none rounded-lg hover:bg-card/40 transition-colors">
            <input
              type="checkbox"
              checked={deleteOriginals}
              onChange={(e) => setDeleteOriginals(e.target.checked)}
              disabled={isConverting || conversionDone}
              className="accent-primary h-3.5 w-3.5 rounded"
            />
            <span className="text-xs text-muted-foreground">Delete originals after conversion</span>
          </label>

          <div className="mt-auto flex flex-col gap-2.5">
            <ProgressBar
              progress={globalProgress}
              isConverting={isConverting}
            />
            <ConvertButton
              fileCount={files.length}
              isConverting={isConverting}
              conversionDone={conversionDone}
              onConvert={startConversion}
              onClear={clearFiles}
              onOpenFolder={openOutputFolder}
              onReset={resetConversion}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
