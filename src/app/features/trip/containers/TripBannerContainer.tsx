import React, { useState } from "react";
import Banner from "@/shared/components/Banner.tsx";
import ImagePicker from "@/shared/components/ImagePicker.tsx";
import LoadingOverlay from "@/shared/components/LoadingOverlay.tsx";
import {
  API_BACKEND_URL,
  API_UPLOAD_MEDIA,
} from "@/shared/constants/constants.ts";
import { ITrip } from "@/types.ts";
import { fetchTrip } from "@/shared/store/redux/TripSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/store/redux";

const DEFAULT_IMAGE_URL = "/background.png";

const getPresignedUrl = async (
  tripId: number,
  file: File,
): Promise<{ upload_url: string; file_key: string } | undefined> => {
  try {
    const [filenameWithoutExt, extension] = file.name.split(".");
    const queryParams = {
      trip_id: tripId,
      file_key: filenameWithoutExt,
      ext: extension,
      resource: "trips",
    };

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      params.append(key, value as string);
    }

    const response = await fetch(`${API_UPLOAD_MEDIA}?${params}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Get presigned url failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      upload_url: data["upload_url"],
      file_key: data["file_key"],
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

interface BannerContainerProps {
  trip: ITrip;
}

const TripBannerContainer = ({ trip }: BannerContainerProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/") && trip.id) {
      try {
        const presignedUrlData = await getPresignedUrl(trip.id, file);

        if (
          presignedUrlData &&
          presignedUrlData.upload_url &&
          presignedUrlData.file_key
        ) {
          const { upload_url, file_key } = presignedUrlData;

          const response = await fetch(upload_url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Upload failed: ${response.statusText} , file_key ${file_key}`,
            );
          } else {
            console.log("refetch trip");
            trip.id && dispatch(fetchTrip({ id: trip.id }));
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Upload error: ", error);
        setLoading(false);
      }
    }
  };

  const getSelectedImageUrl = (trip: ITrip) => {
    if (!trip?.metadataList?.length) return DEFAULT_IMAGE_URL;

    const selected = trip.metadataList.find((metadata) => metadata.selected);
    const fileKey = selected ? selected.fileKey : trip.metadataList[0].fileKey;

    return `${API_BACKEND_URL}/${fileKey}`;
  };

  return (
    <>
      <Banner imageUrl={getSelectedImageUrl(trip)}>
        <ImagePicker handleFileChange={handleFileChange} />
      </Banner>
      <LoadingOverlay visible={loading} message="Uploading image..." />
    </>
  );
};

export default TripBannerContainer;
