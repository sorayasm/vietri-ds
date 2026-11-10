import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { Icon } from "../Icon";
import { Play } from "../Icon/icons";

export interface VideoEmbedProps {
  /** YouTube video id, for example "jNQXAC9IVRw". */
  videoId: string;
  /** Title of the video. It is the accessible name of the player. */
  title: string;
  /** Image shown before the video loads. Without it a black surface is shown. */
  poster?: string;
  /** Start time in seconds. */
  start?: number;
  /**
   * When true (default) nothing is loaded from YouTube until the person
   * presses play: faster pages and no third-party tracking before consent.
   * When false the player loads right away.
   */
  lazy?: boolean;
  /** Label of the play button. Default "Play video: {title}". */
  playLabel?: string;
}

function embedUrl(videoId: string, start: number | undefined, autoplay: boolean) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (start) params.set("start", String(Math.floor(start)));
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

/**
 * Responsive 16:9 YouTube player. It uses the privacy-enhanced domain
 * (youtube-nocookie.com) and, by default, loads nothing until the person
 * presses play. After pressing play, focus moves to the player.
 */
export function VideoEmbed({
  videoId,
  title,
  poster,
  start,
  lazy = true,
  playLabel,
}: VideoEmbedProps) {
  const [active, setActive] = useState(!lazy);
  const startedByUser = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (active && startedByUser.current) iframeRef.current?.focus();
  }, [active]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        borderRadius: 2,
        bgcolor: "#000000",
      }}
    >
      {active ? (
        <iframe
          ref={iframeRef}
          src={embedUrl(videoId, start, startedByUser.current)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <ButtonBase
          aria-label={playLabel ?? `Play video: ${title}`}
          onClick={() => {
            startedByUser.current = true;
            setActive(true);
          }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            "&:focus-visible": {
              outline: "3px solid #FFFFFF",
              outlineOffset: -6,
            },
          }}
        >
          {poster && (
            <Box
              component="img"
              src={poster}
              alt=""
              loading="lazy"
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <Box
            aria-hidden="true"
            sx={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(0, 0, 0, 0.8)",
              color: "#FFFFFF",
            }}
          >
            <Icon icon={Play} size={32} />
          </Box>
        </ButtonBase>
      )}
    </Box>
  );
}
