"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var throttle = function throttle(type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function func() {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");
})();

(function (obj) {
  obj = obj || window;

  obj.animation = function (elem, prop, cb) {
    var count = prop.count;
    var counter = 0;

    if (prop.start) {
      prop.start.forEach(function (item) {
        elem.style[item[0]] = item[1];
      });
    }

    var allAnimation = [];
    prop.anim.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          style = _ref2[0],
          from = _ref2[1],
          to = _ref2[2];

      var max = Math.max(from, to);
      var min = Math.min(from, to);
      var step = (max - min) / count;
      allAnimation.push({
        style: style,
        from: from,
        to: to,
        step: step,
        reverse: min === to
      });
    });

    var rafAnimation = function rafAnimation() {
      allAnimation.forEach(function (item) {
        if (item.reverse) {
          item.from -= item.step;
        } else {
          item.from += item.step;
        }

        elem.style[item.style] = item.from;
      });
      counter++;

      if (counter < count) {
        requestAnimationFrame(rafAnimation);
      } else {
        if (prop.end) {
          prop.end.forEach(function (item) {
            elem.style[item[0]] = item[1];
          });
        }

        if (cb) cb();
      }
    };

    requestAnimationFrame(rafAnimation);
  };
})();

var init = function init() {
  var overlay = document.createElement("div");
  overlay.className = "videotube-modal-overlay";
  document.body.insertAdjacentElement("beforeend", overlay);
  var video = document.createElement("div");
  video.id = "videotube-modal-container";
  var sizeBlockList = [[3840, 2160], [2560, 1440], [1920, 1080], [1280, 720], [854, 420], [640, 360], [426, 240]];

  var sizeVideo = function sizeVideo() {
    var sizeBlock = sizeBlockList.find(function (item) {
      return item[0] < window.visualViewport.width;
    }) || sizeBlockList[sizeBlockList.length - 1];
    var iframe = document.getElementById("videotube-modal");
    iframe.width = sizeBlock[0];
    iframe.height = sizeBlock[1];
    video.style.cssText = "\n\t\t\twidth: ".concat(sizeBlock[0], ";\n\t\t\theight: ").concat(sizeBlock[1], ";\n\t\t");
  };

  var sizeContainer = function sizeContainer() {
    var wh = window.visualViewport.height;
    var ww = window.visualViewport.width;
    var fw = video.style.width;
    var fh = video.style.height;
    video.style.left = (ww - fw) / 2;
    video.style.top = (wh - fh) / 2;
    overlay.style.height = document.documentElement.clientHeight;
  };

  var sizeVideoTubeModal = function sizeVideoTubeModal() {
    sizeContainer();
    sizeVideo();
  };

  var closeVideoTubeModal = function closeVideoTubeModal() {
    animation(overlay, {
      end: [["display", "none"]],
      anim: [["opacity", 1, 0]],
      count: 20
    }, function () {
      overlay.textContent = "";
    });
    window.removeEventListener("optimizedResize", sizeVideoTubeModal);
    document.removeEventListener("keyup", closeContainerEsc);
  };

  var closeContainerEsc = function closeContainerEsc(e) {
    if (e.keyCode === 27) {
      closeVideoTubeModal();
    }
  };

  var openVideoTubeModal = function openVideoTubeModal(e) {
    var target = e.target.closest(".tube");
    if (!target) return;
    var href = target.href;
    var search = href.includes("youtube");
    var idVideo = search ? href.match(/(\?|&)v=([^&]+)/)[2] : href.match(/(\.be\/)([^&]+)/)[2];
    if (idVideo.length === 0) return;
    e.preventDefault();
    animation(overlay, {
      start: [["display", "block"]],
      anim: [["opacity", 0, 1]],
      count: 20
    });
    overlay.insertAdjacentHTML("beforeend", "\n\t\t\t<div id=\"videotube-modal-loading\">\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...</div>\n\t\t\t<div id=\"videotube-modal-close\">&#10006;</div>\n\t\t\t<div id=\"videotube-modal-container\">\n\t\t\t\t<iframe src=\"https://youtube.com/embed/".concat(idVideo, "?autoplay=1\" \n\t\t\t\t\tframeborder=\"0\"\n\t\t\t\t\tid=\"videotube-modal\" \n\t\t\t\t\tallowfullscreen\n\t\t\t\t\tallow=\"autoplay\">\n\t\t\t\t</iframe>\n\t\t\t</div>\n\t\t"));
    sizeVideo();
    sizeContainer();
    window.addEventListener("optimizedResize", sizeVideoTubeModal);
    document.addEventListener("keyup", closeContainerEsc);
  };

  overlay.addEventListener("click", closeVideoTubeModal);
  document.addEventListener("click", openVideoTubeModal);
};

document.addEventListener("DOMContentLoaded", init);