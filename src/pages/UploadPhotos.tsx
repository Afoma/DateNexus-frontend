import { PlusIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UploadBox {
  id: number;
  position: string;
  image: string | null;
}

const UploadYourPhotos = (): JSX.Element => {
  const navigate = useNavigate();

  const [uploadBoxes, setUploadBoxes] = useState<UploadBox[]>([
    { id: 1, position: 'top-left', image: null },
    { id: 2, position: 'top-right', image: null },
    { id: 3, position: 'bottom-left', image: null },
    { id: 4, position: 'bottom-right', image: null },
  ]);

  const handleImageUpload =
    (boxId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadBoxes((boxes) =>
          boxes.map((box) =>
            box.id === boxId ? { ...box, image: reader.result as string } : box
          )
        );
      };
      reader.readAsDataURL(file);
    };

  const removeImage = (boxId: number) => {
    setUploadBoxes((boxes) =>
      boxes.map((box) => (box.id === boxId ? { ...box, image: null } : box))
    );
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted with images:', uploadBoxes);

    navigate('/app/discover');
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
                    <button
                      onClick={() => removeImage(box.id)}
                      className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors'
                    >
                      <X className='w-5 h-5 text-[#f83e67]' />
                    </button>
                  </>
                ) : (
                  <label className='w-full h-full flex items-center justify-center cursor-pointer'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload(box.id)}
                      className='hidden'
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
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full h-[60px] rounded-[13.31px] [background:linear-gradient(90deg,rgba(248,62,103,1)_0%,rgba(165,9,118,1)_100%)] font-medium text-[15px] font-['Poppins',Helvetica]"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadYourPhotos;
