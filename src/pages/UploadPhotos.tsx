import { PlusIcon, X, ImageIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/api-client';
import toast from 'react-hot-toast';

interface UploadBox {
  id: number;
  position: string;
  image: string | null;
  file: File | null;
}

const UploadYourPhotos = (): JSX.Element => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadBoxes, setUploadBoxes] = useState<UploadBox[]>([
    { id: 1, position: 'top-left', image: null, file: null },
    { id: 2, position: 'top-right', image: null, file: null },
    { id: 3, position: 'bottom-left', image: null, file: null },
    { id: 4, position: 'bottom-right', image: null, file: null },
  ]);

  // Fetch existing images on component mount: At the moment this endpoint doesn't exist
  // useEffect(() => {
  //   const fetchExistingImages = async () => {
  //     try {
  //       const response = await axiosInstance.get('/users/profile/img');
  //       if (response.data && response.data.images && Array.isArray(response.data.images)) {
  //         // Map existing images to the upload boxes
  //         const updatedBoxes = [...uploadBoxes];
  //         response.data.images.forEach((imageUrl: string, index: number) => {
  //           if (index < updatedBoxes.length) {
  //             updatedBoxes[index].image = imageUrl;
  //           }
  //         });
  //         setUploadBoxes(updatedBoxes);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching existing images:', error);
  //       // It's okay if this fails, as the user might not have any images yet
  //     }
  //   };

  //   fetchExistingImages();
  // }, []);

  const handleImageUpload =
    (boxId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image is too large. Maximum size is 10MB.');
        return;
      }

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadBoxes((boxes) =>
          boxes.map((box) =>
            box.id === boxId 
              ? { ...box, image: reader.result as string, file: file } 
              : box
          )
        );

        // Upload the individual image immediately
        uploadSingleImage(boxId, file);
      };
      reader.readAsDataURL(file);
    };

  // Function to upload a single image
  const uploadSingleImage = async (boxId: number, file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('position', boxId.toString());

      const loadingToast = toast.loading('Uploading image...');
      
      // Use PUT method for updating a single image
      await axiosInstance.put('/users/profile/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss(loadingToast);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Function to change an existing image
  const handleChangeImage =
    (boxId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image is too large. Maximum size is 10MB.');
        return;
      }

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadBoxes((boxes) =>
          boxes.map((box) =>
            box.id === boxId 
              ? { ...box, image: reader.result as string, file: file } 
              : box
          )
        );

        // Upload the individual image immediately
        uploadSingleImage(boxId, file);
      };
      reader.readAsDataURL(file);
    };

  const removeImage = async (boxId: number) => {
    try {
      setIsUploading(true);
      const loadingToast = toast.loading('Removing image...');
      
      // First, update the UI
      setUploadBoxes((boxes) =>
        boxes.map((box) => (box.id === boxId ? { ...box, image: null, file: null } : box))
      );

      // Then, upload all current images to update the backend
      const formData = new FormData();
      
      // Append remaining images to FormData
      uploadBoxes.forEach(box => {
        if (box.id !== boxId && box.file) {
          formData.append('images', box.file);
          formData.append('positions', box.id.toString());
        }
      });

      // Call PATCH endpoint to update all images
      await axiosInstance.patch('/users/profile/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss(loadingToast);
      toast.success('Image removed successfully!');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);
      const loadingToast = toast.loading('Saving your photos...');
      
      // Prepare all images for upload
      const formData = new FormData();
      let hasImages = false;

      uploadBoxes.forEach(box => {
        if (box.file) {
          formData.append('images', box.file);
          formData.append('positions', box.id.toString());
          hasImages = true;
        }
      });

      // Only make the API call if there are images to upload
      if (hasImages) {
        // Use PATCH method for uploading all images
        await axiosInstance.patch('/users/profile/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast.dismiss(loadingToast);
      toast.success('Photos saved successfully!');
      navigate('/app/discover');
    } catch (error) {
      console.error('Error saving photos:', error);
      toast.error('Failed to save photos. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className='bg-white flex flex-row justify-center w-full min-h-screen'>
      <div className='bg-white w-full max-w-[1440px] relative'>
        {/* Decorative gradient elements */}
        <div className='absolute w-[432px] h-[145px] top-[-34px] left-[-138px] overflow-hidden'>
          <div className='absolute w-[429px] h-[55px] top-[23px] left-0.5 rounded-[0px_0px_119.06px_35.72px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
          <div className='absolute w-[292px] h-[37px] top-[93px] left-[5px] rounded-[0px_0px_81.03px_24.31px] rotate-[-6.07deg] [background:linear-gradient(252deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)]' />
        </div>

        {/* Main content container */}
        <div className='flex flex-col items-center px-4 pt-[170px] pb-[60px]'>
          {/* Heading */}
          <h1 className="font-semibold text-4xl text-center mb-8 max-w-[594px] font-['Poppins',Helvetica]">
            Upload your Photos
          </h1>

          {/* Description text */}
          <p className="font-normal text-xl text-[#6d6d6d] text-center mb-16 max-w-[693px] font-['Poppins',Helvetica]">
            Upload up to 4 photos to let your personality shine. Choose pictures
            that reflect who you are and what you love.
          </p>

          {/* Upload boxes grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[34px] gap-y-[35px] mb-16 w-full max-w-[776px]'>
            {uploadBoxes.map((box) => (
              <Card
                key={box.id}
                className='relative w-full h-[397px] bg-[#f5f6f8] rounded-2xl border-2 border-dashed border-[#f83e67] flex items-center justify-center overflow-hidden'
              >
                {box.image ? (
                  <>
                    <img
                      src={box.image}
                      alt='Uploaded preview'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute top-4 right-4 flex gap-2'>
                      {/* Change image button */}
                      <label className='p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors cursor-pointer'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleChangeImage(box.id)}
                          className='hidden'
                          disabled={isUploading}
                        />
                        <ImageIcon className='w-5 h-5 text-[#f83e67]' />
                      </label>
                      
                      {/* Remove image button */}
                      <button
                        onClick={() => removeImage(box.id)}
                        className='p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors'
                        disabled={isUploading}
                      >
                        <X className='w-5 h-5 text-[#f83e67]' />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className='w-full h-full flex items-center justify-center cursor-pointer'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload(box.id)}
                      className='hidden'
                      disabled={isUploading}
                    />
                    <PlusIcon className='w-[90px] h-[90px] text-[#f83e67]' />
                  </label>
                )}
              </Card>
            ))}
          </div>

          {/* Action buttons */}
          <div className='flex flex-col sm:flex-row gap-4 w-full max-w-[596px]'>
            <Button
              variant='outline'
              className="w-full h-[60px] bg-[#f5f6f8] rounded-[13.31px] text-[#a2a2a2] font-medium text-[15px] font-['Poppins',Helvetica]"
              onClick={() => navigate('/app/discover')}
              disabled={isUploading}
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full h-[60px] rounded-[13.31px] [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] font-medium text-[15px] font-['Poppins',Helvetica]"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                </>
              ) : (
                'Done'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadYourPhotos;