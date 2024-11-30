import { YouTubeEmbed } from "@/components/youtube-embed";

export default function Mission() {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Mission Statement</h1>
          <p className="text-muted-foreground text-lg">More coming soon. Watch the video on the bottom right for now 🫡</p>
        </div>
        <YouTubeEmbed videoId="pYeQVEM4erk" />
      </div>
    );
  }