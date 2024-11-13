import React, { useEffect, useState } from "react";
import "../CSS/CardStyles.css"; // Import CSS for styling

const Alert = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [checkboxValues, setCheckboxValues] = useState({
    needsms: false,
    needcall: false,
    needemail: false
  });
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked
    }));
  };

  const handleIgnore = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const [cards, setCards] = useState([
    { title: "Comment Card 1", text: "Lorem ipsum dolor sit amet, cUt tempus iaculis augue vel pellentesque.", img: "https://i.pinimg.com/originals/8e/07/80/8e078013204d0cc9876e9edbb1fd3f85.jpg" },
    { title: "Comment Card 2", text: "Vestibulum nunc massa, gravida quis porta nec, feugiat id metus. Nunc ac arcu dolor, quis vestibulum leo. Cras tempor tincidunt.", img: "https://th.bing.com/th/id/OIP.o8d0STltT9yqVBNZrR96DgHaE8?rs=1&pid=ImgDetMain" },
    { title: "Comment Card 3", text: "Donec nunc ligula, vulputate quis rutrum dignissim. Nulla eros nisl, venenatis quis rhoncus sit amet, molestie nec nisl. Pellentesque vel neque sapien, et sagittis nulla.", img: "https://th.bing.com/th/id/OIP.SLCDTPdjJLu2u6aTbivMtAHaEO?rs=1&pid=ImgDetMain" },
    { title: "Comment Card 4", text: "Donec nunc ligula, vulputate quis feugiat sed. Aliquam erat volutpat. Pellentesque vel neque sapien, et sagittis nulla.", img: "https://th.bing.com/th/id/OIP.COkrveVISYLGNp1jfz_GsAHaE8?w=1024&h=683&rs=1&pid=ImgDetMain" }
  ]);

  const handleCardClick = (index) => {
    setCurrentCardIndex(index);
  };

  const getCardClass = (index) => {
    if (index === currentCardIndex) {
      return "card card--current";
    } else if (index === currentCardIndex + 1 || (currentCardIndex === cards.length - 1 && index === 0)) {
      return "card card--next";
    } else {
      return "card card--out";
    }
  };
  return (
    <ul className="cards">
      {cards.map((card, index) => (
        <li
          key={index}
          className={getCardClass(index)}
          onClick={() => handleCardClick(index)}
        >
            <img src={card.img} alt={card.title} className="card-image"/>
          <h1>{card.title}</h1>
          <p>{card.text}</p>
          <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="needsms"
                  checked={checkboxValues.needsms}
                  onChange={handleCheckboxChange}
                />
                SMS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="needcall"
                  checked={checkboxValues.needcall}
                  onChange={handleCheckboxChange}
                />
                Call
              </label>
              <label>
                <input
                  type="checkbox"
                  name="needemail"
                  checked={checkboxValues.needemail}
                  onChange={handleCheckboxChange}
                />
                Email
              </label>
            </div>

            {/* Ignore Button */}
            <button className="ignore-button" onClick={handleIgnore}>Ignore</button>
        </li>
      ))}
    </ul>
  );
};

export default Alert;
