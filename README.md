# SuperConvert

A free, open-source desktop app for converting files locally. Your files never leave your machine.

Supports images, audio, video, documents, data files, and archives.

## Download

Available on **Windows**, **macOS**, and **Linux** — check the [Releases](https://github.com/clmvlt/superconvert/releases) page.

## Features

- Drag & drop files
- Batch conversion
- 100% local — no cloud, no upload
- Fast parallel processing
- Quality control for supported formats

## Build from source

Requires [Rust](https://rustup.rs/), [Node.js](https://nodejs.org/) 18+, and [FFmpeg](https://ffmpeg.org/) (optional, for video).

```bash
git clone https://github.com/clmvlt/superconvert.git
cd superconvert
npm install
npm run tauri build
```

## License

MIT
