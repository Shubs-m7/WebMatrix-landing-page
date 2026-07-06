import { Button } from '@/components/ui/button';
import { DevicePreview } from '@/components/ui/device-preview';
import { cn } from '@/lib/utils';
import { Monitor, Smartphone, Video, MonitorSmartphone } from 'lucide-react';

interface PreviewModesProps {
  desktopImage: string;
  mobileImage?: string;
  videoSrc?: string;
  title: string;
  mode: 'both' | 'desktop' | 'mobile' | 'video';
  onModeChange: (mode: 'both' | 'desktop' | 'mobile' | 'video') => void;
  className?: string;
  showDevicePreview?: boolean;
}

export const PreviewModes = ({
  desktopImage,
  mobileImage,
  videoSrc,
  title,
  mode,
  onModeChange,
  className,
  showDevicePreview = true,
}: PreviewModesProps) => {
  return (
    <div className={cn("space-y-10 w-full", className)}>
      {/* Mode selector - Premium Segmented Control */}
      <div className="flex justify-center relative z-20">
        <div className="inline-flex items-center p-1.5 glass rounded-full border border-primary/20 shadow-[0_8px_30px_rgba(108,92,231,0.15)] bg-background/50 backdrop-blur-xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModeChange('both')}
            className={cn(
              "relative rounded-full px-6 transition-all duration-500 font-medium text-sm",
              mode === 'both' ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(108,92,231,0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
            )}
          >
            <MonitorSmartphone className={cn("w-4 h-4 mr-2 transition-colors duration-500", mode === 'both' ? "text-primary-foreground" : "text-primary")} />
            Both
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModeChange('desktop')}
            className={cn(
              "relative rounded-full px-6 transition-all duration-500 font-medium text-sm",
              mode === 'desktop' ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(108,92,231,0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
            )}
          >
            <Monitor className={cn("w-4 h-4 mr-2 transition-colors duration-500", mode === 'desktop' ? "text-primary-foreground" : "text-primary")} />
            Desktop
          </Button>

          {mobileImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onModeChange('mobile')}
              className={cn(
                "relative rounded-full px-6 transition-all duration-500 font-medium text-sm",
                mode === 'mobile' ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(108,92,231,0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
              )}
            >
              <Smartphone className={cn("w-4 h-4 mr-2 transition-colors duration-500", mode === 'mobile' ? "text-primary-foreground" : "text-primary")} />
              Mobile
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onModeChange('video')}
            disabled={!videoSrc}
            title={!videoSrc ? 'No video available for this project' : undefined}
            className={cn(
              "relative rounded-full px-6 transition-all duration-500 font-medium text-sm",
              mode === 'video' ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(108,92,231,0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
              !videoSrc && "opacity-40 cursor-not-allowed hover:bg-transparent"
            )}
          >
            <Video className={cn("w-4 h-4 mr-2 transition-colors duration-500", mode === 'video' ? "text-primary-foreground" : (!videoSrc ? "text-muted-foreground" : "text-primary"))} />
            Video
          </Button>
        </div>
      </div>

      {/* Preview area */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Background glow behind the previews */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Device Preview */}
        {mode !== 'video' && showDevicePreview && (
          <div className={cn("transition-all duration-700 ease-[0.16,1,0.3,1]", "opacity-100 translate-y-0 scale-100")}>
            <DevicePreview
              desktopImage={desktopImage}
              mobileImage={mobileImage}
              title={title}
              display={mode as 'both' | 'desktop' | 'mobile'}
            />
          </div>
        )}

        {/* Video Preview */}
        {mode === 'video' && (
          <div className={cn(
            "relative w-full aspect-video rounded-[2rem] overflow-hidden border border-border/30 glass shadow-2xl",
            "transition-all duration-700 ease-[0.16,1,0.3,1]",
            mode === 'video' ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
          )}>
            {videoSrc ? (
              <video
                src={videoSrc}
                controls
                className="absolute inset-0 w-full h-full object-cover"
                poster={desktopImage}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl">
                <div className="text-center p-12 glass rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <Video className="w-10 h-10 text-white/40" />
                  </div>
                  <div className="text-2xl md:text-3xl font-display font-semibold mb-3 text-white">No video available</div>
                  <div className="text-white/60 font-light text-lg">This project doesn't include a cinematic video preview.</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};