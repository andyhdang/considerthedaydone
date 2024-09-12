import React from 'react';

const Header = () => {
    const currentDate = new Date();
    const options = { weekday: "long" };
    const day = new Intl.DateTimeFormat("en-US", options).format(currentDate);

    const adjectives = ["Great", "Productive", "Awesome", "Fantastic", "Fine", "Good", "Wonderful", "Terrific", "Superb", "Excellent"];

    const randomIndex = Math.floor(Math.random() * adjectives.length);
    const randomAdjective = adjectives[randomIndex];

    return (
        <header>
            <h1>What do you need to do to consider this <span style={{ color: 'teal', whiteSpace: 'nowrap' }}>{randomAdjective} {day}</span> done?</h1>
        </header>
    );
};

export default Header;