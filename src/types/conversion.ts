export type ImageFormat =
  | "png"
  | "jpg"
  | "gif"
  | "bmp"
  | "ico"
  | "tiff"
  | "webp"
  | "avif"
  | "svg"
  | "tga"
  | "qoi";

export type AudioFormat = "wav" | "mp3" | "flac" | "ogg" | "aac" | "aiff";

export type DocumentFormat = "pdf" | "png" | "jpg" | "txt" | "docx" | "odt" | "xlsx" | "ods" | "csv" | "pptx" | "odp";

export type OutputFormat = ImageFormat | AudioFormat | DocumentFormat;

export type FileCategory = "image" | "audio" | "document" | "textdoc" | "spreadsheet" | "presentation";

const IMAGE_EXTENSIONS: Record<string, ImageFormat> = {
  png: "png",
  jpg: "jpg",
  jpeg: "jpg",
  gif: "gif",
  bmp: "bmp",
  ico: "ico",
  tif: "tiff",
  tiff: "tiff",
  webp: "webp",
  avif: "avif",
  svg: "svg",
  tga: "tga",
  qoi: "qoi",
};

const AUDIO_EXTENSIONS: Record<string, AudioFormat> = {
  wav: "wav",
  mp3: "mp3",
  flac: "flac",
  ogg: "ogg",
  aac: "aac",
  aiff: "aiff",
  m4a: "aac",
};

const DOCUMENT_EXTENSIONS: Record<string, DocumentFormat> = {
  pdf: "pdf",
};

const TEXTDOC_EXTENSIONS: Record<string, string> = {
  docx: "docx",
  odt: "odt",
  txt: "txt",
};

const SPREADSHEET_EXTENSIONS: Record<string, string> = {
  xlsx: "xlsx",
  xls: "xlsx",
  ods: "ods",
  csv: "csv",
};

const PRESENTATION_EXTENSIONS: Record<string, string> = {
  pptx: "pptx",
  odp: "odp",
};

export function getFileCategory(extension: string): FileCategory | null {
  const ext = extension.toLowerCase().replace(/^\./, "");
  if (ext in IMAGE_EXTENSIONS) return "image";
  if (ext in AUDIO_EXTENSIONS) return "audio";
  if (ext in DOCUMENT_EXTENSIONS) return "document";
  if (ext in TEXTDOC_EXTENSIONS) return "textdoc";
  if (ext in SPREADSHEET_EXTENSIONS) return "spreadsheet";
  if (ext in PRESENTATION_EXTENSIONS) return "presentation";
  return null;
}

export function getOutputFormats(category: FileCategory): string[] {
  switch (category) {
    case "image":
      return ["png", "jpg", "webp", "bmp", "gif", "tiff", "avif", "ico", "tga", "qoi", "pdf"];
    case "audio":
      return ["wav", "flac"];
    case "document":
      return ["png", "jpg"];
    case "textdoc":
      return ["txt", "pdf", "docx", "odt"];
    case "spreadsheet":
      return ["csv", "xlsx", "ods"];
    case "presentation":
      return ["pdf", "pptx", "odp"];
  }
}

export function getAllSupportedExtensions(): string[] {
  return [
    ...Object.keys(IMAGE_EXTENSIONS),
    ...Object.keys(AUDIO_EXTENSIONS),
    ...Object.keys(DOCUMENT_EXTENSIONS),
    ...Object.keys(TEXTDOC_EXTENSIONS),
    ...Object.keys(SPREADSHEET_EXTENSIONS),
    ...Object.keys(PRESENTATION_EXTENSIONS),
  ];
}

export interface ConversionOptions {
  output_format: string;
  quality: number | null;
}

export interface ConversionJob {
  id: string;
  input_path: string;
  output_path: string;
  options: ConversionOptions;
}

export interface BatchConversionRequest {
  jobs: ConversionJob[];
}

export interface ProgressEvent {
  job_id: string;
  progress: number;
  status: JobStatus;
  error: string | null;
}

export type JobStatus = "pending" | "converting" | "done" | "error";

export interface BatchConversionResult {
  total: number;
  succeeded: number;
  failed: number;
  results: JobResult[];
}

export interface JobResult {
  job_id: string;
  success: boolean;
  output_path: string | null;
  error: string | null;
}

export interface FileInfo {
  path: string;
  name: string;
  extension: string;
  size: number;
  format: string | null;
}

export interface OutputFormatInfo {
  format: string;
  extension: string;
  label: string;
  supports_quality: boolean;
  category: string;
}

export interface ConversionFile extends FileInfo {
  id: string;
  progress: number;
  status: JobStatus;
  error: string | null;
  outputPath: string | null;
  category: FileCategory;
}

export const FORMAT_OPTIONS: Record<string, { label: string; color: string }> = {
  png: { label: "PNG", color: "bg-blue-600" },
  jpg: { label: "JPG", color: "bg-amber-600" },
  webp: { label: "WebP", color: "bg-green-600" },
  bmp: { label: "BMP", color: "bg-purple-600" },
  gif: { label: "GIF", color: "bg-pink-600" },
  tiff: { label: "TIFF", color: "bg-cyan-600" },
  avif: { label: "AVIF", color: "bg-red-600" },
  ico: { label: "ICO", color: "bg-indigo-600" },
  svg: { label: "SVG", color: "bg-orange-600" },
  tga: { label: "TGA", color: "bg-violet-600" },
  qoi: { label: "QOI", color: "bg-lime-600" },
  pdf: { label: "PDF", color: "bg-rose-600" },
  wav: { label: "WAV", color: "bg-sky-600" },
  mp3: { label: "MP3", color: "bg-fuchsia-600" },
  flac: { label: "FLAC", color: "bg-teal-600" },
  ogg: { label: "OGG", color: "bg-yellow-600" },
  aac: { label: "AAC", color: "bg-emerald-600" },
  aiff: { label: "AIFF", color: "bg-slate-600" },
  txt: { label: "TXT", color: "bg-stone-600" },
  docx: { label: "DOCX", color: "bg-blue-700" },
  odt: { label: "ODT", color: "bg-sky-700" },
  xlsx: { label: "XLSX", color: "bg-green-700" },
  ods: { label: "ODS", color: "bg-emerald-700" },
  csv: { label: "CSV", color: "bg-teal-700" },
  pptx: { label: "PPTX", color: "bg-orange-700" },
  odp: { label: "ODP", color: "bg-amber-700" },
};

export const FORMAT_DESCRIPTIONS: Record<string, string> = {
  png: "Lossless, transparency",
  jpg: "Lossy, small size",
  webp: "Modern, best compression",
  bmp: "Uncompressed bitmap",
  gif: "Animation support",
  tiff: "High quality, large",
  avif: "Next-gen, best quality",
  ico: "Windows icon (256x256)",
  tga: "Targa, legacy format",
  qoi: "Quite OK Image, fast",
  pdf: "Document format",
  wav: "Uncompressed audio",
  mp3: "Compressed, universal",
  flac: "Lossless audio",
  ogg: "Open source, compressed",
  aac: "Advanced audio codec",
  aiff: "Apple lossless audio",
  txt: "Plain text, universal",
  docx: "Word document",
  odt: "OpenDocument text",
  xlsx: "Excel spreadsheet",
  ods: "OpenDocument spreadsheet",
  csv: "Comma-separated values",
  pptx: "PowerPoint presentation",
  odp: "OpenDocument presentation",
};

export const LOSSY_FORMATS: string[] = ["jpg", "webp", "avif"];

export const CATEGORY_LABELS: Record<FileCategory, string> = {
  image: "Image",
  audio: "Audio",
  document: "Document",
  textdoc: "Text Doc",
  spreadsheet: "Spreadsheet",
  presentation: "Presentation",
};

export const CATEGORY_COLORS: Record<FileCategory, string> = {
  image: "bg-blue-500/15 text-blue-400",
  audio: "bg-purple-500/15 text-purple-400",
  document: "bg-rose-500/15 text-rose-400",
  textdoc: "bg-sky-500/15 text-sky-400",
  spreadsheet: "bg-green-500/15 text-green-400",
  presentation: "bg-orange-500/15 text-orange-400",
};
