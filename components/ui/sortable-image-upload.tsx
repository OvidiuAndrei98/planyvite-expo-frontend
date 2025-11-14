"use client";
import { useCallback, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import {
  CircleX,
  CloudUpload,
  GripVertical,
  ImageIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}
type SortableImage = {
  id: string;
  src: string;
  alt: string;
  type: "default" | "uploaded";
};
interface ImageUploadProps {
  path: string;
  defaultImages?: SortableImage[];
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onSaveImages?: (images: SortableImage[], onFinished: () => void) => void;
}
export default function SortableImageUpload({
  defaultImages,
  path,
  maxFiles = 5, // Changed to 5 as per UI reference
  maxSize = 10 * 1024 * 1024, // 10MB as per UI reference
  accept = "image/*",
  className,
  onSaveImages,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<SortableImage[]>(
    defaultImages ?? []
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (defaultImages && defaultImages.length > 0) {
      setAllImages(defaultImages);
    }
  }, [defaultImages]);

  const handleSave = useCallback(() => {
    if (isSaving) return;

    setIsSaving(true);

    onSaveImages?.(allImages, () => {
      setIsSaving(false);
    });
  }, [allImages, isSaving, onSaveImages]);

  useEffect(() => {
    if (allImages.length === 0 && images.length === 0) return;

    const allHavePermanentURL = allImages.every(
      (img) => !img.src.startsWith("blob:")
    );

    const allCompletedStatus = images.every(
      (img) => img.status === "completed" || img.status === "error"
    );

    if (allHavePermanentURL && allCompletedStatus) {
      handleSave();
    }
  }, [allImages, images, onSaveImages]);

  // Helper function to create SortableImage from ImageFile
  const createSortableImage = useCallback(
    (imageFile: ImageFile): SortableImage => ({
      id: imageFile.id,
      src: imageFile.preview,
      alt: imageFile.file.name,
      type: "uploaded",
    }),
    []
  );
  // Ensure arrays never contain undefined items
  useEffect(() => {
    setAllImages((prev) => prev.filter((item) => item && item.id));
    setImages((prev) => prev.filter((item) => item && item.id));
  }, []);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "File must be an image";
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(
        1
      )}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };
  const handleAddAndUpload = useCallback(
    (files: FileList | File[]) => {
      const newImagesToUpload: ImageFile[] = [];
      const newErrors: string[] = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }
        const imageFile: ImageFile = {
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading",
        };
        newImagesToUpload.push(imageFile);
      });

      if (newErrors.length > 0) {
        setErrors((prev) => [...prev, ...newErrors]);
      }

      if (newImagesToUpload.length > 0) {
        if (allImages.length + newImagesToUpload.length > maxFiles) {
          setErrors((prev) => [
            ...prev,
            maxFiles === 1
              ? 'Este permisa o singura imagine, pentru a adauga mai multe upgradeaza la planul "Pro".'
              : `Nu poti adauga mai mult de ${maxFiles} imagini.`,
          ]);
          return;
        }

        setErrors([]);

        setImages((prev) => [...prev, ...newImagesToUpload]);

        const newSortableImages = newImagesToUpload.map(createSortableImage);
        setAllImages((prev) => [...prev, ...newSortableImages]);

        newImagesToUpload.forEach((imageFile) => {
          handleUpload(imageFile);
        });
      }
    },
    [
      allImages.length,
      maxFiles,
      setErrors,
      setImages,
      setAllImages,
      createSortableImage,
    ]
  );

  const handleUpload = (imageFile: ImageFile) => {
    try {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `${path}/${Date.now()}_${imageFile.file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImages((prev) =>
            prev.map((img) =>
              img.id === imageFile.id ? { ...img, progress } : img
            )
          );
        },
        (error) => {
          console.error("Upload error:", error);
          setImages((prev) =>
            prev.map((img) =>
              img.id === imageFile.id
                ? { ...img, status: "error", error: error.message }
                : img
            )
          );
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Actualizează starea 'images' cu URL-ul final și statusul
            setImages((prev) =>
              prev.map((img) =>
                img.id === imageFile.id
                  ? {
                      ...img,
                      progress: 100,
                      status: "completed",
                      preview: downloadURL,
                    }
                  : img
              )
            );

            // Actualizează starea 'allImages' (lista sortabilă) cu URL-ul final
            setAllImages((prev) =>
              prev.map((img) =>
                img.id === imageFile.id ? { ...img, src: downloadURL } : img
              )
            );

            // Deconectează URL-ul Blob local (Curățare memorie)
            if (imageFile.preview.startsWith("blob:")) {
              URL.revokeObjectURL(imageFile.preview);
            }
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setImages((prev) =>
        prev.map((img) =>
          img.id === imageFile.id
            ? { ...img, status: "error", error: (error as Error).message }
            : img
        )
      );
    }
  };
  const removeImage = useCallback(
    (id: string) => {
      // Find the image in allImages to check if it's an uploaded image
      const imageToRemove = allImages.find((img) => img.id === id);

      // Remove from allImages
      setAllImages((prev) => prev.filter((img) => img.id !== id));

      // If it's an uploaded image, also remove from images array and Firebase storage
      const uploadedImage = images.find((img) => img.id === id);
      if (uploadedImage) {
        // Revoke local object URL if it exists
        if (uploadedImage.preview.startsWith("blob:")) {
          URL.revokeObjectURL(uploadedImage.preview);
        }

        setImages((prev) => prev.filter((img) => img.id !== id));
      }

      // Delete from Firebase Storage if it's an uploaded image (type === "uploaded")
      if (
        imageToRemove?.type === "uploaded" &&
        imageToRemove.src &&
        !imageToRemove.src.startsWith("blob:")
      ) {
        try {
          const storage = getStorage();
          const imageRef = ref(storage, imageToRemove.src);
          deleteObject(imageRef).catch((error) => {
            console.error("Error deleting image from Firebase:", error);
          });
        } catch (error) {
          console.error(
            "Error creating Firebase reference for deletion:",
            error
          );
        }
      }
    },
    [images, allImages]
  );
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleAddAndUpload(files);
      }
    },
    [handleAddAndUpload]
  );
  const openFileDialog = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleAddAndUpload(target.files);
      }
    };
    input.click();
  }, [accept, handleAddAndUpload]);
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };
  return (
    <div className={cn("w-full max-w-4xl", className)}>
      {/* Image Grid with Sortable */}
      <div className="mb-6">
        {/* Combined Images Sortable */}
        <Sortable
          value={allImages.map((item) => item.id)}
          onValueChange={(newItemIds) => {
            // Reconstruct the allImages array based on the new order
            const newAllImages = newItemIds
              .map((itemId) => {
                // First try to find in allImages (default images)
                const existingImage = allImages.find(
                  (img) => img.id === itemId
                );
                if (existingImage) return existingImage;
                // If not found, it's a newly uploaded image
                const uploadedImage = images.find((img) => img.id === itemId);
                if (uploadedImage) {
                  return createSortableImage(uploadedImage);
                }
                return null;
              })
              .filter((item): item is SortableImage => item !== null);
            setAllImages(newAllImages);
          }}
          getItemValue={(item) => item}
          strategy="grid"
          className="grid grid-cols-5 gap-2.5 auto-rows-fr"
          onDragStart={(event) => setActiveId(event.active.id as string)}
          onDragEnd={() => setActiveId(null)}
        >
          {allImages.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group border border-border hover:z-10 data-[dragging=true]:z-50 transition-all duration-200 hover:bg-accent/70">
                <img
                  src={item.src}
                  className="h-[120px] w-full object-cover rounded-md pointer-events-none"
                  alt={item.alt}
                />
                {/* Drag Handle */}
                <SortableItemHandle className="absolute top-2 start-2 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 cursor-grab active:cursor-grabbing">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-6 rounded-full"
                  >
                    <GripVertical className="size-3.5" />
                  </Button>
                </SortableItemHandle>
                {/* Remove Button Overlay */}
                <Button
                  onClick={() => removeImage(item.id)}
                  variant="outline"
                  size="icon"
                  className="shadow-sm absolute top-2 end-2 size-6 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 rounded-full"
                >
                  <XIcon className="size-3.5" />
                </Button>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-dashed shadow-none rounded-md transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="text-center">
          <div className="flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3">
            <CloudUpload className="size-4" />
          </div>
          <h3 className="text-2sm text-foreground font-semibold mb-0.5">
            Alege poze sau trage-le și plasează-le aici.
          </h3>
          <span className="text-xs text-secondary-foreground font-normal block mb-3">
            JPEG, PNG, până la {formatBytes(maxSize)}.
          </span>
          <Button size="sm" variant="ghost" onClick={openFileDialog}>
            Alege fișiere
          </Button>
        </CardContent>
      </Card>
      {/* Upload Progress Cards */}
      {images.length > 0 && (
        <div className="mt-6 space-y-3">
          {images.map((imageFile) => (
            <Card key={imageFile.id} className="shadow-none rounded-md">
              <CardContent className="flex items-center gap-2 p-3">
                <div className="flex items-center justify-center size-[32px] rounded-md border border-border shrink-0">
                  <ImageIcon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between gap-2.5 -mt-2 w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-foreground font-medium leading-none">
                        {imageFile.file.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-normal leading-none">
                        {formatBytes(imageFile.file.size)}
                      </span>
                      {imageFile.status === "uploading" && (
                        <p className="text-xs text-muted-foreground">
                          Se încarcă... {Math.round(imageFile.progress)}%
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => removeImage(imageFile.id)}
                      variant="ghost"
                      size="icon"
                      className="size-6"
                    >
                      <CircleX className="size-3.5" />
                    </Button>
                  </div>
                  <Progress
                    value={imageFile.progress}
                    className={cn(
                      "h-1 transition-all duration-300",
                      "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50"
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <AlertTitle>Eroare la încărcarea fișierelor</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
