"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * BookingCalFrame — the actual cal.com iframe + embed-config call.
 *
 * Kept in its own file so it can be code-split via `next/dynamic` from
 * `BookingEmbed.tsx`. That keeps `@calcom/embed-react` (and the cal.com
 * embed.js it loads) out of the initial bundle and out of the critical
 * path. The iframe only mounts once the booking section is near the
 * viewport.
 */
const CAL_NAMESPACE = "fiveleaf-discovery";
const CAL_LINK = "silviumajor/fiveleaf-ai-discovery-call";

export default function BookingCalFrame() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#171717" },
          dark: { "cal-brand": "#FAFAFA" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    // No fixed height: @calcom/embed-react auto-resizes the iframe to
    // the calendar's actual content height, so the white card hugs the
    // calendar instead of leaving a tall dead zone underneath it.
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: "100%" }}
      config={{ layout: "month_view" }}
    />
  );
}
