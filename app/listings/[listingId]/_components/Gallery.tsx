import { useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

type Props = {
  images: any;
};

export default function CustomGallery({ images }: Props) {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: any) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  console.log('currentImage', currentImage);

  const isMobile = window.innerWidth < 576;

  return (
    <div>
      {isMobile ? (
        <Gallery
          images={!isMobile ? images : images?.filter((v: any, i: any) => !i)}
          thumbnailStyle={{ width: '100%' }}
          onClick={handleClick}
          enableImageSelection={false}
        />
      ) : (
        // Картинки 4 раяда (галлерея)
        <Gallery
          images={!isMobile ? images : images?.filter((v: any, i: any) => !i)}
          onClick={handleClick}
          enableImageSelection={false}
          rowHeight={175}
        />
      )}

      {!!currentImage && (
        /* @ts-ignore */
        <Lightbox
          mainSrc={currentImage.src}
          imageTitle={''}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.src}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.src}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
}
