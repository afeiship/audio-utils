import MediaDevices from 'media-devices';

type PermissionFailed =
  | 'NotAllowedError'
  | 'NotFoundError'
  | 'NotReadableError'
  | 'OverconstrainedError'
  | 'SecurityError'
  | 'TypeError';

interface CheckResponse {
  success: boolean;
  data: MediaStream | PermissionFailed;
}

export default async function checkPermission(): Promise<CheckResponse> {
  return new Promise((resolve) => {
    let stream: MediaStream | null;
    MediaDevices.getUserMedia({ audio: true, video: false })
      .then((res) => {
        stream = res;
        resolve({ success: true, data: res });
      })
      .catch((e) => {
        const { name } = e;
        resolve({ success: false, data: name as PermissionFailed });
      })
      .finally(() => {
        if (!stream) return;
        const tracks = stream.getTracks();
        tracks.forEach((track) => stream!.removeTrack(track));
        stream = null;
      });
  });
}
