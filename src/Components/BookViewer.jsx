import React from "react";
import mockingBirdBook from "../Assets/mockingbird_busypdf.json";

const BookViewer = () => {
  // Combine mapping steps
  const mockingBirdBookPageEntryContents = mockingBirdBook?.pages
    ? mockingBirdBook.pages.flatMap((page) =>
        page.txtRns.map((pageEntry) => pageEntry.text)
      )
    : [];

  // Render the content on the page instead of logging to console
  return (
    <div>
      {mockingBirdBookPageEntryContents.length > 0 ? (
        mockingBirdBookPageEntryContents.map((text, index) => (
          <p key={index}>{text}</p>
        ))
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default BookViewer;
