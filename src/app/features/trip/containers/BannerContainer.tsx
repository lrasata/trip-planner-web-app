import React, { useState } from "react";
import Banner from "@/shared/components/Banner.tsx";
import ImagePicker from "@/shared/components/ImagePicker.tsx";
import LoadingOverlay from "@/shared/components/LoadingOverlay.tsx";

const BannerContainer = () => {
  const [loading, setLoading] = useState(false);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3-second process
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      try {
        simulateLoad();
        /*            const formData = new FormData();
            formData.append("image", file); // 'image' is the field name expected by your backend

            const response = await fetch("https://your-api.com/upload", {
                method: "POST",
                body: formData,
                // Do NOT set Content-Type manually — browser sets it correctly with boundary
                // headers: {
                //   "Content-Type": "multipart/form-data", ❌ Don't do this with FormData
                // },
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();*/
        console.log("Upload success:", file.name);
        // You can do something with the response, e.g., show a success message or store the URL
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <>
      <Banner>
        <ImagePicker handleFileChange={handleFileChange} />
      </Banner>
      <LoadingOverlay visible={loading} message="Uploading image..." />
    </>
  );
};

export default BannerContainer;
