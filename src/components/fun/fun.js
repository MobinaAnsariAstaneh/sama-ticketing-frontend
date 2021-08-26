import "./fun.css";
import { useRef , useEffect } from "react";
import anime from 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js';

const Bug = () => {
    const button = useRef();
    const animateMove = (element, prop, pixels) =>
      anime ({
        targets: element,
        [prop]: `${pixels}px`,
        easing: "easeOutCirc",
      });

      const getRandomNumber = (num) => {
        return Math.floor(Math.random() * (num + 1));
      };

      useEffect( () => {
        ["mouseover", "click"].forEach(function (el) {
          button.current.addEventListener(el, function (event) {
            console.log("this :" , this)
            const top = getRandomNumber(window.innerHeight - this.offsetHeight);
            const left = getRandomNumber(window.innerWidth - this.offsetWidth);
            console.log(event);
            animateMove(this, "left", left).play();
            animateMove(this, "top", top).play();
          });
        });
      });
    


  return (
    <div>
      <button ref={button} id="runaway-btn">Click Me &#129315;</button>
    </div>
  );
};

export default Bug;
