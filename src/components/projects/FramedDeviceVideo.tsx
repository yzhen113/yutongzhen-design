import { DeviceVideo, type DeviceVideoProps } from "@/components/projects/DeviceVideo";

const DEVICE_W = 449;
const ARTBOARD = 1082;

export function FramedDeviceVideo(props: DeviceVideoProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[8px] border border-solid border-[#f2f2f2] bg-[#fcfcfc]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: `${(DEVICE_W / ARTBOARD) * 100}%` }}
      >
        <DeviceVideo {...props} />
      </div>
    </div>
  );
}
