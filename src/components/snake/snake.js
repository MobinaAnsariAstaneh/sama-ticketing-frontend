import "./snake.css";
import imagelogin from "../../assets/MS.png";
import English from "../../assets/english.svg";
import Persian from "../../assets/persian.svg";
import chooselanguage from "../../assets/chooselanguage.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../utilies/i18n";
import { Helmet } from "react-helmet";
import { Button,Dropdown,Menu} from "antd";

const Snake = () => {

   const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // change direrction persian -> rtl / english -> ltr
  };


  /**
   * Namespace
   */
  var Game = Game || {};
  var Keyboard = Keyboard || {};
  var Component = Component || {};

  /**
   * Keyboard Map
   */
  Keyboard.Keymap = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  /**
   * Keyboard Events
   */
  Keyboard.ControllerEvents = function () {
    // Setts
    var self = this;
    this.pressKey = null;
    this.keymap = Keyboard.Keymap;

    // Keydown Event
    document.onkeydown = function (event) {
      self.pressKey = event.which;
    };

    // Get Key
    this.getKey = function () {
      return this.keymap[this.pressKey];
    };
  };

  /**
   * Game Component Stage
   */
  Component.Stage = function (canvas, conf) {
    // Sets
    console.log(conf);
    this.keyEvent = new Keyboard.ControllerEvents();
    this.width = canvas.width;
    this.height = canvas.height;
    this.length = [];
    this.food = {};
    this.score = 0;
    this.direction = "right";
    this.conf = {
      cw: 10,
      size: 5,
      fps: 100,
    };

    // Merge Conf
    if (typeof conf == "object") {
      for (var key in conf) {
        if (conf.hasOwnProperty.call(key)) {
          this.conf[key] = conf[key];
        }
      }
    }
  };
  /**
   * Game Component Snake
   */
  Component.Snake = function (canvas, conf) {
    // Game Stage
    this.stage = new Component.Stage(canvas, conf);

    // Init Snake
    this.initSnake = function () {
      // Itaration in Snake Conf Size
      for (var i = 0; i < this.stage.conf.size; i++) {
        // Add Snake Cells
        this.stage.length.push({ x: i, y: 0 });
      }
    };

    // Call init Snake
    this.initSnake();

    // Init Food
    this.initFood = function () {
      // Add food on stage
      this.stage.food = {
        x: Math.round(
          (Math.random() * (this.stage.width - this.stage.conf.cw)) /
            this.stage.conf.cw
        ),
        y: Math.round(
          (Math.random() * (this.stage.height - this.stage.conf.cw)) /
            this.stage.conf.cw
        ),
      };
    };

    // Init Food
    this.initFood();

    // Restart Stage
    this.restart = function () {
      this.stage.length = [];
      this.stage.food = {};
      this.stage.score = 0;
      this.stage.direction = "right";
      this.stage.keyEvent.pressKey = null;
      this.initSnake();
      this.initFood();
    };
  };

  /**
   * Game Draw
   */
  Game.Draw = function (context, snake) {
    // Draw Stage
    this.drawStage = function () {
      // Check Keypress And Set Stage direction
      var keyPress = snake.stage.keyEvent.getKey();
      if (typeof keyPress != "undefined") {
        snake.stage.direction = keyPress;
      }

      // Draw White Stage
      context.fillStyle = "white";
      context.fillRect(0, 0, snake.stage.width, snake.stage.height);

      // Snake Position
      var nx = snake.stage.length[0].x;
      var ny = snake.stage.length[0].y;

      // Add position by stage direction
      switch (snake.stage.direction) {
        case "right":
          nx++;
          break;
        case "left":
          nx--;
          break;
        case "up":
          ny--;
          break;
        case "down":
          ny++;
          break;
      }

      // Check Collision
      if (this.collision(nx, ny) == true) {
        snake.restart();
        return;
      }

      // Logic of Snake food
      if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
        var tail = { x: nx, y: ny };
        snake.stage.score++;
        snake.initFood();
      } else {
        tail = snake.stage.length.pop();
        tail.x = nx;
        tail.y = ny;
      }
      snake.stage.length.unshift(tail);

      // Draw Snake
      for (var i = 0; i < snake.stage.length.length; i++) {
        var cell = snake.stage.length[i];
        this.drawCell(cell.x, cell.y);
      }

      // Draw Food
      this.drawCell(snake.stage.food.x, snake.stage.food.y);

      // Draw Score
      context.fillText(
        "Score: " + snake.stage.score,
        5,
        snake.stage.height - 5
      );
    };

    // Draw Cell
    this.drawCell = function (x, y) {
      context.fillStyle = "#05299e";
      context.beginPath();
      context.arc(
        x * snake.stage.conf.cw + 6,
        y * snake.stage.conf.cw + 6,
        4,
        0,
        2 * Math.PI,
        false
      );
      context.fill();
    };

    // Check Collision with walls
    this.collision = function (nx, ny) {
      if (
        nx == -1 ||
        nx == snake.stage.width / snake.stage.conf.cw ||
        ny == -1 ||
        ny == snake.stage.height / snake.stage.conf.cw
      ) {
        return true;
      }
      return false;
    };
  };

  /**
   * Game Snake
   */
  Game.Snake = function (elementId, conf) {
    // Sets
    var canvas = document.getElementById(elementId);
    var context = canvas.getContext("2d");
    var snake = new Component.Snake(canvas, conf);
    var gameDraw = new Game.Draw(context, snake);

    // Game Interval
    setInterval(function () {
      gameDraw.drawStage();
    }, snake.stage.conf.fps);
  };

  /**
   * Window Load
   */
  window.onload = function () {
    var snake = new Game.Snake("stage", { fps: 100, size: 4 });
    return snake;
  };
  const menu = (
    <Menu>
      <Menu.Item>
      <li onClick={() => changeLanguage("en")}>
            <img src={English} alt="English" />
            {t("footer.english")}
       </li>
      </Menu.Item>
      <Menu.Item>
      
      <li onClick={() => changeLanguage("fa")}>
            <img src={Persian} alt="Persian" />
            {t("footer.persian")}
      </li>
      </Menu.Item>
    </Menu>
  );
  return (
    
    <div className="snake-game">
    <Helmet>
        <title>{t('title.snake')}</title>
      </Helmet>
      <a href={"./dashboard"}>
      <img src={imagelogin} alt="" className="logo" />
      </a>

  {/* Bilingual */}
  <Dropdown overlay={menu} placement="bottomCenter" arrow>
          <Button className="btn-footer">  
            <img src={chooselanguage} alt="Choose Language" />
            {t("footer.language")}
          </Button>
        </Dropdown>

      <h1 className="title">{t('title.game')}</h1>
      <h2 className="game">{t('title.snake')}</h2>
      <canvas id="stage" height="350" width="700"></canvas>
    </div>
  );
};

export default Snake;
