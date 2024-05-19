import React from "react";
import MainButton from "../buttons/MainButton";

function About () {
    return (
        <div className="layout">
            <div className="about_page_1">
                <div className="home_page_1_title">
                    Look no further! We've got everything you've been searching for: top-notch service, expert pros, and the perfect chill vibe for maximum comfort. Welcome to your new happy place!
                </div>
                <div className="home_page_1_content">
                    About Us
                </div>
            </div>

            <div className="about_our_story">
                <div className="about_our_story_title">
                    our story
                </div>
                <div className="about_our_story_content">
                    Okay, so picture this: Marieta Vardanyan, or Marik as her crew calls her, is this graphic designer, yeah? But get this – out of the blue, she's like, 'You know what Armenia needs? A killer nail salon!' So, she rolls up her sleeves, leaves the design board behind, and dives headfirst into the nail game. She's all about top-notch service, primo professionals, and making dreams come true. And that's how the magic began!
                </div>
            </div>

            <div className="about_page_2">
                <div className="about_page_2_title">
                    Creating an ideal environment . . .
                </div>
                <MainButton
                    text="Book Now"
                />
            </div>

            <div className="about_our_story">
                <div className="about_our_story_title">
                    our team
                </div>
                <div className="about_our_story_content margin-bottom">
                    At our salon, our team is like a family, with each member bringing their unique skills to make your experience exceptional. We have a diverse group of specialists who are dedicated to making you look and feel your best. Our nail technicians are the artists behind those intricate nail designs you love. From classic manicures to elaborate nail art, they have the creativity and expertise to bring your vision to life. With years of experience and ongoing training, they stay updated on the latest trends and techniques, ensuring that your nails are always on point. But our team isn't just about technical skills – it's also about genuine care and connection. Each member is dedicated to making you feel welcomed, valued, and comfortable during your visit. They take the time to listen to your needs, answer your questions, and ensure that every aspect of your experience exceeds your expectations.
                </div>
            </div>
        </div>
    )
}

export default About