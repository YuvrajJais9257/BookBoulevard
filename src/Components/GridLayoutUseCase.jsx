import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayoutUseCase = () => {
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [divArray, setDivArray] = useState([]);
  const [layout, setLayout] = useState([]);
  const [draggable, setDraggable] = useState(true);
  const [inputValue, setInputValue] = useState("");

  // Function to handle the form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0) {
      setNumberOfElements(num);
      setInputValue("");
    } else {
      alert("Please enter a valid positive number");
    }
  };

  // Initialize the divArray and layout state
  useEffect(() => {
    const divs = Array.from({ length: numberOfElements }, (_, i) => i);
    setDivArray(divs);

    const initialLayout = divs.map((item) => ({
      i: item.toString(),
      x: item * 3,
      y: 0,
      w: 3,
      h: 2,
    }));
    setLayout(initialLayout);
  }, [numberOfElements]);

  function handleDelete(id) {
    const updatedLayout = layout.filter((item) => item.i !== id.toString());
    const updatedDivArray = divArray.filter((item) => item !== id);
    setDivArray(updatedDivArray);
    setLayout(updatedLayout);
    setDraggable(false);
  }

  useEffect(() => {
    const colors = ["red", "green", "blue"];
    for (let i = 0; i < colors.length; i++) {
      const element = document.getElementById(i);
      if (element) {
        element.style.backgroundColor = colors[i];
      }
    }
  }, [divArray]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number of divs"
        />
        <button type="submit">Submit</button>
      </form>

      <ResponsiveGridLayout
        // preventCollision
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
        rowHeight={30}
        width={1200}
        isDraggable={draggable}
        isResizable
      >
        {divArray.map((item) => (
          <div
            id={item}
            key={item.toString()}
            data-grid={{ i: item.toString(), x: item * 3, y: 0, w: 3, h: 2 }}
          >
            Div #{item}
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayoutUseCase;
