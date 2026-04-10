import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import * as budoux from "budoux";
import satori from "satori";
import sharp from "sharp";

import { TagLabel } from "@/lib/const";
import type { Tag } from "@/lib/const";

type OgCardProps = {
  labels: string[];
  title: string;
  titleFontSize: number;
};

const imageWidth = 1200;
const imageHeight = 630;
const fontCacheDir = path.join(process.cwd(), ".cache", "og-fonts");
const frameColor = "#e66f19";
const regularFontPath = path.join(fontCacheDir, "NotoSansJP-Regular.otf");
const boldFontPath = path.join(fontCacheDir, "NotoSansJP-Bold.otf");
const regularFontUrl =
  "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf";
const boldFontUrl =
  "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf";
const parser = budoux.loadDefaultJapaneseParser();

const estimateTextWidth = (value: string) => {
  let width = 0;

  for (const char of value) {
    if (/[A-Z]/.test(char)) {
      width += 0.92;
      continue;
    }
    if (/[a-z]/.test(char)) {
      width += 0.72;
      continue;
    }
    if (/[0-9]/.test(char)) {
      width += 0.76;
      continue;
    }
    if (/\s/.test(char)) {
      width += 0.42;
      continue;
    }
    if (/[!-~]/.test(char)) {
      width += 0.72;
      continue;
    }
    width += 1;
  }

  return width;
};

const normalizeTitle = (value: string) => value.trim().replaceAll(/\s+/g, " ");

const resolveTitleFontSize = (title: string) => {
  const width = estimateTextWidth(title);

  if (width > 30) {
    return 42;
  }
  if (width > 25) {
    return 46;
  }
  if (width > 21) {
    return 50;
  }
  return 56;
};

const ensureFontFile = async (filePath: string, url: string) => {
  try {
    await access(filePath);
    return filePath;
  } catch {
    await mkdir(path.dirname(filePath), { recursive: true });
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to download font: ${url} (${response.status.toString()} ${response.statusText})`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(filePath, Buffer.from(arrayBuffer));

  return filePath;
};

const OgCard = ({ labels, title, titleFontSize }: OgCardProps) => {
  const titleLineHeight =
    titleFontSize >= 56 ? 1.1 : titleFontSize >= 50 ? 1.12 : 1.15;
  const separatedTitles = parser.parse(title);

  return (
    <div
      style={{
        background: "#ffffff",
        border: `12px solid ${frameColor}`,
        borderRadius: "40px",
        boxSizing: "border-box",
        color: "#1f2937",
        display: "flex",
        fontFamily: '"Noto Sans JP"',
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "32px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "32px",
          overflow: "hidden",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {labels.map((label) => (
            <div
              key={label}
              style={{
                background: "transparent",
                border: "2px solid rgba(83, 86, 97, 0.42)",
                borderRadius: "999px",
                color: "#535661",
                display: "flex",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                padding: "10px 18px",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxWidth: "1020px",
          }}
        >
          <div
            style={{
              color: "#0f172a",
              display: "flex",
              flexWrap: "wrap",
              fontFamily: '"Noto Sans JP"',
              fontSize: `${titleFontSize.toString()}px`,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: titleLineHeight,
              maxWidth: "980px",
            }}
          >
            {separatedTitles.map((line, index) => (
              <span key={index}>
                {line}
                <wbr />
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              color: "#475569",
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              transform: "translateY(10px)",
            }}
          >
            The daku10 blog
          </div>
        </div>
      </div>
    </div>
  );
};

const loadFonts = async () => {
  const [cachedRegularFontPath, cachedBoldFontPath] = await Promise.all([
    ensureFontFile(regularFontPath, regularFontUrl),
    ensureFontFile(boldFontPath, boldFontUrl),
  ]);
  const [regularFontData, boldFontData] = await Promise.all([
    readFile(cachedRegularFontPath),
    readFile(cachedBoldFontPath),
  ]);

  return [
    {
      data: regularFontData,
      name: "Noto Sans JP",
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      data: boldFontData,
      name: "Noto Sans JP",
      style: "normal" as const,
      weight: 700 as const,
    },
  ];
};

let fontCache: Awaited<ReturnType<typeof loadFonts>> | undefined;

const getFonts = async () => {
  fontCache ??= await loadFonts();
  return fontCache;
};

export const renderOgImage = async ({
  tags,
  title,
}: {
  tags: Tag[];
  title: string;
}) => {
  const normalizedTitle = normalizeTitle(title);
  const titleFontSize = resolveTitleFontSize(normalizedTitle);
  const labels = tags.map((tag) => TagLabel[tag] ?? tag);
  const svg = await satori(
    <OgCard
      labels={labels}
      title={normalizedTitle}
      titleFontSize={titleFontSize}
    />,
    {
      fonts: await getFonts(),
      height: imageHeight,
      width: imageWidth,
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
};
