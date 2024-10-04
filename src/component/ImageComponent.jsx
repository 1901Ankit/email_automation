import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';

const ImageComponent = ({ item }) => {
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    const generateImages = async () => {
      const newImageURLs = {};

      for (const i of item) {
        const response = await fetch(i.file_url);
        console.log(response);

        const html = await response.text();
        const sanitizedHTML = DOMPurify.sanitize(html);

        // Create a temporary div to render the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sanitizedHTML;
        document.body.appendChild(tempDiv);

        // Use html2canvas to convert the div to an image
        const canvas = await html2canvas(tempDiv, { width: 100, height: 200 });
        newImageURLs[i.id] = canvas.toDataURL();

        document.body.removeChild(tempDiv); // Clean up
      }

      setImageURLs(newImageURLs);
    };

    generateImages();
  }, [item]);
  const handleImageClick = () => {
  }

  return (
    <div className="absolute left-0 w-full bg-white border border-[#93C3FD] rounded-md mt-1 z-10 overflow-y-auto h-96">
      {item.map((value) => (
        <div
          key={value.id}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100 my-1"
          onClick={() => handleImageClick(value.file_url)}
        >
          {/* Display the generated image */}
          {imageURLs[value.id] ? (
            <img
              src={imageURLs[value.id]}
              alt={value.name}
              style={{ width: '100px', height: '200px' }} // Set the image size
              className="mr-2"
            />
          ) : (
            <div style={{ width: '100px', height: '200px', backgroundColor: '#f0f0f0' }} className="mr-2" />
          )}
          <span>{item.value}</span>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ImageComponent;