import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID, isEnabled } from "@/lib/ga";

export const Analytics = () => {
  if (!isEnabled) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_ID} />;
};
